# PaymentMethodSelector Components

The PaymentMethodSelector has been refactored into smaller, more maintainable components following the single responsibility principle.

## Component Structure

### PaymentMethodSelector (Main Component)

- **Purpose**: Main container component that orchestrates all payment method functionality
- **Responsibilities**:
  - Manages the layout of payment methods
  - Handles method selection coordination
  - Provides data to child components

### PaymentMethodCard

- **Purpose**: Individual payment method card display
- **Responsibilities**:
  - Renders a single payment method option
  - Handles card selection state and styling
  - Manages hover and active states

### AdditionalPaymentDropdown

- **Purpose**: Container for the "Other" payment methods dropdown
- **Responsibilities**:
  - Manages dropdown open/close state
  - Handles click outside detection
  - Coordinates between trigger and menu components

### DropdownTrigger

- **Purpose**: The clickable trigger for the additional payment dropdown
- **Responsibilities**:
  - Displays current selection or "Other"
  - Shows dropdown arrow with rotation
  - Handles trigger styling and interactions

### DropdownMenu

- **Purpose**: The dropdown menu containing additional payment options
- **Responsibilities**:
  - Renders the dropdown menu with proper positioning
  - Manages visibility animations
  - Contains individual payment options

### AdditionalPaymentOptionComponent

- **Purpose**: Individual option within the dropdown menu
- **Responsibilities**:
  - Renders a single dropdown option
  - Handles selection state
  - Manages hover effects

## Benefits of This Structure

1. **Single Responsibility**: Each component has a clear, focused purpose
2. **Reusability**: Components can be easily reused or replaced
3. **Maintainability**: Easier to modify specific functionality without affecting others
4. **Testability**: Each component can be tested in isolation
5. **Code Organization**: Related functionality is grouped together
6. **Performance**: Smaller components can be optimized individually

## Usage

```tsx
import PaymentMethodSelector from './PaymentMethodSelector';

function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState('card');

  return (
    <PaymentMethodSelector
      selectedMethod={selectedMethod}
      onMethodChange={setSelectedMethod}
    />
  );
}
```

All individual components are also exported and can be used independently if needed.
