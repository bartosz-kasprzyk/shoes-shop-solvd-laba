# Cart & Checkout System Documentation

## Overview

The cart and checkout system provides a comprehensive e-commerce experience with persistent cart state, real-time updates, promotional codes, and a multi-step checkout process. The system is built with TypeScript, Material-UI, and integrates seamlessly with the authentication system.

## Architecture

### 🛒 Cart System Flow

```mermaid
flowchart TB
    A[Product Page] --> B[Add to Cart]
    B --> C[Cart Context]
    C --> D[Zustand Store]
    D --> E[Local Storage]

    F[Cart Page] --> G[Cart Items Display]
    G --> H[Quantity Controls]
    G --> I[Delete Actions]

    J[Cart Summary] --> K[Price Calculation]
    K --> L[Promocodes]
    L --> M[Tax & Shipping]
    M --> N[Total Price]

    N --> O[Checkout Button]
    O --> P[Checkout Process]
```

### 🔄 State Management

```mermaid
graph LR
    A[useCart Hook] --> B[Zustand Store]
    B --> C[Local Storage]
    B --> D[Cart Context]
    D --> E[Product Queries]
    E --> F[Cart Display]
```
