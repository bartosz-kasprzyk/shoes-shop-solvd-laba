# Products docs

```
/products
├── [[...searchpath]]
│   └── page.tsx
└── layout.tsx
```

## `page.tsx`

- This page uses a hybrid of ISR (Incremental Static Regeneration) and CSR (Client-Side Rendering). What does that mean?
  - The first "two pages" of products are prefetched on the server.
  - The remaining pages are fetched on the client.
  - This is a compromise between SEO optimization and supporting infinite scroll.
  - The page is a Server Component, but it contains a Client Component that hydrates using a prefetched query and `<HydrationBoundary>`.
- Data Fetching:
  - On the client, data is fetched using TanStack Query’s useInfiniteQuery.
  - On the server, data is prefetched using prefetchInfiniteQuery – this is almost like ISR, but without any other setup it is just SSR.
- Transition from SSR to ISR:
  - The line in file `export const revalidate = 60 * 60 * 24 * 7 (one week)` sets the SSG revalidation time.
  - `generateStaticParams` is used to pre-render the base product page (without filters). Basic filters may be pre-rendered in the future.
  - In Next.js App Router, if a page isn’t pre-rendered, the server renders it at runtime and caches it.
  - Read this section in docs for a better understanding how rendering works in this approach [Next.js: replacing fallback](https://nextjs.org/docs/app/guides/migrating/app-router-migration#replacing-fallback)
  - The filter structure in the URL also plays a key role in enabling this behavior (explained below).
- Search Filters:
  - Filters are stored using the `[[...searchpath]]` catch-all segment.
    - This structure works seamlessly with ISR and SSG.
    - It integrates with `generateStaticParams` and revalidate.
    - Using Next.js `fetch()` function (that is also responsible for caching in SSG) could conflict with the TanStack and make the behavior messy and unpredictable.
  - Why not use searchParams?
    - Initially, filters were handled via query strings and searchParams, but:
      - According to the [Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/page) docs, using searchParams forces dynamic rendering: “searchParams is a Dynamic API whose values cannot be known ahead of time. Using it will opt the page into dynamic rendering at request time.”
    - To maintain static/ISR behavior, filters were adapted to use the `[[...searchpath]]` segment.

### Loading skeleton Components

- A custom loading product card and grid were added.
  `features/products/components/LoadingProductsSkeleton/LoadingProductsSkeleton.tsx`

### ProductsPage Component

- responsible for displaying fetched data and for fetching next pages via infinite query on client.
  `features/products/components/ProductsPage/index.tsx`

### Infinite Scroll Functionality

- Pagination was originally implemented but replaced with infinite scroll based on mentor recommendations.
- Uses useInView from react-intersection-observer to detect when the user nears the bottom of the page, triggering the next page fetch.

## `layout.tsx`

- Marked with `"use client"` – must be interactive.
- May support partial pre-rendering (ISR) in the future; currently remains fully CSR.
  Why is it located outside the `[[...searchpath]]` folder?
- When inside the folder, applying filters would cause a full re-render, closing all filter categories — which is disruptive.
- Outside the folder, state is preserved via partial rendering, and the layout still accesses the filters via the URL.
  Filter Management:
- Filters are stored in the URL and are retrieved on initial load — filters persist across refreshes.
- Almost each category uses two TanStack queries:
  1. To get the count of products available after applying filters (excluding the current category) — this is CSR, which is acceptable.
  2. To fetch the category data itself (e.g., brands like Nike, Adidas) — currently CSR, but ISR could be implemented in the future.
- Filters are first stored in a local state managed by a reducer, then added to the URL.
  - This logic needs refactoring — possibly by introducing context to eliminate prop drilling.

### FilterSideBar Component:

- Separates some logic from layout.tsx
  `features/filter/components/FilterSideBar/index.tsx`

### Filter Category Component:

- The implementation is currently messy — a single adaptive category component handles almost all categories.
- One benefit of this implementation is avoiding code duplication across multiple categories.
  `features/filter/components/Category/index.tsx`
- It relies on multiple if statements.
  - Consider applying creational design patterns to improve maintainability.
- The Price category has a separate component and TanStack query, with different logic for data fetching and display.
  `features/filter/components/PriceCategory/index.tsx`

### Filter Category Wrapper Component:

- responsible for displaying name and opening and closing category.
  `features/filter/components/CategoryWrapper/index.tsx`

## TanStack Query Integration

- Configured according to official TanStack + Next.js guidelines.
- Uses a custom getQueryClient `shared/lib/getQueryClient.ts` function to ensure:
  - The same query instance is reused on the client.
  - Separate instances on the server (as recommended).
- Four main TanStack queries:
  1. Categories by name `features/filter/api/fetchCategoryByName.ts`
  2. Category counts `features/filter/api/fetchCategoryCount.ts`
  3. Products `shared/api/fetchProducts.ts`
  4. Price filter category `features/filter/api/fetchPrices.ts`
- Each query includes:
  - A query builder function, if necessary (e.g. `features/filter/api/buildQuaryForCategoryCount.ts`)
  - Custom hook, if necessary (e.g. `features/filter/hooks/useCategoryByName.ts`)
- Uses the `qs` library to construct query strings from objects.
- Adapter functions transform API data into a structure suitable for the app.
