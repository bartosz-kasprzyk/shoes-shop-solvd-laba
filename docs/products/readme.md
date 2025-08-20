# Products docs

## Goals 

- **Instant filters availability**  
  Prefetch and cache all filter data on the server so users see filters instantly, without waiting for API calls.  

- **SEO optimization**  
  Server-side rendering of filters and products improves crawlability and ranking.  

- **Reduced server load**  
  Cached filters and prefetched product pages minimize redundant requests to Strapi.  

- **Fast initial product load**  
  Prefetch the first two pages of products for given filters, ensuring users see results immediately.  

- **Consistent filter state**  
  Serialize filters in the URL so selections survive browser refresh and can be shared.  

- **Seamless UX with infinite scroll**  
  Use client-side fetching for subsequent product pages, providing a smooth browsing experience.  

- **Reusable communication layer**  
  The URL acts as a single source of truth, synchronizing filters between layouts and product pages.  

- **Filter recovery after browser restart**  
  On page load, filters are rehydrated from the URL, restoring the user’s previous state without extra interaction.  

## How to read this docs

```
/docs/products
 ├── overview.md        # Architecture + diagram + short overview
 ├── rationale.md       # Why it is made how it is
 ├── filters/         # docs for filters.
```
