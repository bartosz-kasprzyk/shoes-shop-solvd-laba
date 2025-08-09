import type { FiltersAction } from '../types/FiltersAction';
import type { FiltersState } from '../types/FiltersState';

const initialState: FiltersState = {
  Gender: [],
  Brand: [],
  Color: [],
  Size: [],
  Price: { range: [0, 1], set: false },
  searchTerm: '',
  category: '',
};

export default function filtersReducer(
  state: FiltersState,
  action: FiltersAction,
): FiltersState {
  switch (action.type) {
    case 'TOGGLE': {
      if (action.category === 'Price') return state;
      const prev = state[action.category];
      const updated = prev.includes(action.value)
        ? prev.filter((v) => v !== action.value)
        : [...prev, action.value];
      return { ...state, [action.category]: updated };
    }
    case 'SET_PRICE':
      return { ...state, Price: { range: action.range, set: action.set } };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}
