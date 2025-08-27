# Component Library Documentation

## Overview

The component library provides a comprehensive set of reusable UI components built with **Material-UI (MUI)** and enhanced with custom styling and functionality. All components are fully typed with TypeScript, accessible, and follow consistent design patterns.

## Architecture

### 🏗️ Component Structure

```
shared/components/
├── ui/                    # Core UI components
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   ├── SectionHeader/
│   └── ScrollableContainer/
├── layout/                # Layout components
└── forms/                 # Form-specific components
```

### 🎨 Design System

#### **Theme Integration**

All components integrate with the MUI theme system:

```typescript
// Theme configuration in app/theme.ts
const theme = createTheme({
  palette: {
    primary: {
      main: '#FE645E',
    },
    primaryGrey: {
      main: '#6e7378',
    },
    textPrimary: {
      main: '#494949',
    },
  },
  typography: {
    fontFamily: 'var(--font-work-sans)',
  },
});
```

#### **Responsive Design**

All components use consistent breakpoint system:

- **xs**: 0px+ (mobile)
- **sm**: 600px+ (tablet)
- **md**: 900px+ (small laptop)
- **lg**: 1200px+ (desktop)
- **xl**: 1536px+ (large desktop)

## Icon Components

### 📦 Icon System (`shared/icons/`)

All icons are implemented as React components with consistent styling:

#### **Available Icons**

- **E-commerce**: `CartIcon`, `BagIcon`, `WishlistIcon`
- **Payment**: `CreditCardIcon`, `PayPalIcon`, `ApplePayIcon`
- **Navigation**: `ArrowIcon`, `CloseIcon`, `MenuIcon`
- **Social**: `FacebookIcon`, `TwitterIcon`, `InstagramIcon`
- **Actions**: `AddIcon`, `DeleteIcon`, `EditIcon`
