# <img width="25px" src="/public/favicon.ico" /> Shoes Shop

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Demo

https://shoes-shop-solvd-laba-bk.vercel.app

## 📁 Project Structure

```
.
├── app/                    # Routing and page structure (Next.js App Router)
│   ├── (main)/             # Public and protected sub-sections
│   ├── (auth)/               # Authentication-related routes
│   ├── layout.tsx          # Global application layout
│   └── page.tsx            # Landing page
│
├── features/               # Feature-scope logic (e.g. checkout, wishlist)
│   └── checkout/           # Logic related to cart and payment flows
│       └── components/
│
├── shared/                 # Globally reused assets
│   ├── components/         # Reusable presentational components
│   ├── icons/              # SVG/TSX icons with central re-export via index.ts
│   ├── mocks/              # Mock data for tests/development
│
├── styles/                 # Global styles (Tailwind / CSS)
├── public/                 # Static assets
└── ...
```

---

## 📦 Conventions

### 🧱 Feature-Based Architecture (FBA)

- **Each feature** has its own folder in `features/` containing its components, hooks, services, etc.
- Code is grouped by use-case (feature), not by file type.
- Internal-only components (e.g. `CartListItem`) stay inside their feature directory.

### 🔍 Shared Layer

- `shared/components` — used in multiple features or pages (e.g. `ReviewCarousel`, `CardsContainer`, `ProductCard`).
- `shared/ui` — atomic UI elements (Button, Input, Dropdown, etc.).
- `shared/icons` — icon components exported via a central `index.ts`.

### 🔺 Component Naming and Grouping

- Components with tightly coupled logic are kept together (e.g. `MenuItem` and `MenuList`)
- If a component is only used once (e.g. inside `UserSideBar`), keep it local or under `shared/components` if it may be reused later.
- Use `index.tsx` + `interface.ts` per exportable component.
- Place tests in `__tests__` folders alongside components.

## Getting Started

First, install all dependencies:

```
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
