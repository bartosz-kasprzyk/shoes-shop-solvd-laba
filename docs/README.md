# Shoes Shop Solvd Laba - Complete Documentation

## Project Overview

A modern, high-performance e-commerce platform built with Next.js 15, specializing in shoe retail. This application demonstrates advanced web development patterns including SSR/ISR, sophisticated filtering, authentication, and state management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Core Features](#core-features)
3. [Architecture](#architecture)
4. [Authentication System](./auth/README.md)
5. [Products & Filtering](./products/README.md)
6. [Cart & Checkout](./cart-checkout/README.md)
7. [Component Library](./components/README.md)
8. [API Integration](./api/README.md)
9. [Testing Strategy](./testing/README.md)
10. [Deployment](./deployment/README.md)
11. [Development Guidelines](./development/README.md)

## 🏗️ Project Structure

```
shoes-shop-solvd-laba/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   │   ├── (protected)/   # Protected user routes
│   │   ├── product/       # Individual product pages
│   │   └── products/      # Products listing with filters
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Context providers
├── features/              # Feature-based modules
│   ├── auth/              # Authentication logic
│   ├── cart/              # Shopping cart functionality
│   ├── checkout/          # Checkout process
│   ├── filter/            # Product filtering system
│   ├── layout/            # Layout components
│   ├── order-history/     # Order management
│   ├── products/          # Product-related components
│   ├── profile/           # User profile management
│   ├── recently-viewed/   # Recently viewed products
│   └── wishlist/          # Wishlist functionality
├── shared/                # Shared utilities and components
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── icons/             # SVG icon components
│   ├── interfaces/        # TypeScript interfaces
│   ├── lib/               # Utility libraries
│   └── utils/             # Utility functions
├── docs/                  # Documentation
├── public/                # Static assets
└── styles/                # Global styles
```

## 🎯 Core Features

### 🔐 Authentication & User Management

- **NextAuth.js** integration with custom credentials provider
- **JWT-based sessions** with configurable expiration
- **Password reset** via email
- **Remember me** functionality
- **Protected routes** middleware
- **User profile** management with avatar upload

### 🛍️ E-commerce Functionality

- **Advanced product filtering** with real-time counts
- **Infinite scroll** product listing
- **Shopping cart** with persistent state
- **Wishlist** functionality
- **Recently viewed** products tracking
- **Product search** and categorization
- **Multi-step checkout** process

### 🎨 User Interface

- **Material-UI (MUI)** component library
- **Responsive design** for all screen sizes

### ⚡ Performance & SEO

- **Server-Side Rendering (SSR)** for critical pages
- **Incremental Static Regeneration (ISR)** for product pages
- **Image optimization** with Next.js Image component
- **Code splitting** and lazy loading
- **SEO optimization** with meta tags and structured data

### 🔧 Developer Experience

- **TypeScript** for type safety
- **ESLint & Prettier** for code quality
- **Jest & Testing Library** for testing
- **Husky** for git hooks
- **Hot reload** in development

## 🏛️ Architecture

This application follows a **feature-based architecture** combined with **domain-driven design** principles:

### 🔄 Data Flow Pattern

```
URL ↔ Server Components ↔ Client Components ↔ Zustand Stores ↔ API
```

### 📡 State Management

- **Zustand** for client-side state (cart, filters, user preferences)
- **TanStack Query** for server state management and caching
- **NextAuth** for authentication state

## 🛠️ Technology Stack

### Core Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Material-UI 7** - Component library

### State & Data Management

- **TanStack Query 5** - Server state management
- **Zustand 5** - Client state management
- **NextAuth 4** - Authentication
- **Zod 4** - Schema validation

### Testing & Quality

- **Jest 30** - Testing framework
- **Testing Library** - Component testing
- **ESLint 9** - Code linting
- **Prettier 3** - Code formatting

### Additional Libraries

- **React Hook Form 7** - Form management
- **Browser Image Compression** - Image optimization

## 📁 Feature Modules

Each feature module follows a consistent structure:

```
feature/
├── components/        # UI components
├── hooks/            # Custom hooks
├── services/         # API services
├── types/            # TypeScript types
├── utils/            # Utility functions
├── schemas/          # Validation schemas
└── __tests__/        # Test files
```

## 🌐 Environment Variables

Required environment variables:

```env
# Authentication
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_STRAPI_URL=your_strapi_api_url
SHOES_SHOP_BASE_API=your_api_base_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 📚 Additional Documentation

- [Authentication System](./auth/README.md) - Complete auth flow documentation
- [Products & Filtering](./products/README.md) - Product system architecture
- [Cart & Checkout](./cart-checkout/README.md) - E-commerce functionality
- [Component Library](./components/README.md) - Reusable component documentation
- [API Integration](./api/README.md) - API design and integration
- [Testing Strategy](./testing/README.md) - Testing approach and guidelines
- [Development Guidelines](./development/README.md) - Coding standards and best practices
- [Deployment Guide](./deployment/README.md) - Deployment and infrastructure documentation

## 🤝 Contributing

Please read our [Development Guidelines](./development/README.md) before contributing.

## 📄 License

This project is developed as part of Solvd Laba training program.
