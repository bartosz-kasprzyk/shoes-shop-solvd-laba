# Overview

Overview of products page and filters.

## Diagrams

When i put all relations on single chart it started to be unreadable. So i decided to split them into 3 diagrams:

- **Comunication between Filter module (layout) and Products module (Page)** (without comunication with strapi),
- **Coumunication between Modules and Strapi Api** (without coumnication with URL),
- all relations

### Diagram showing comunication Filter module (layout) - Products module (Page)

```mermaid
flowchart TB

        %% URL relation
        URL[URL]



        subgraph Layout_Filters["Layout - Filters"]
            LFServer[Server Layout Filters]
            LFClient[Client Layout Filters]
        end
        URL -->|Selected Filters Slug| PServer
        subgraph Page_Products["Page - Products"]
            PServer[Server Products]
            PClient[Client Products]
        end

    %% Layout Filters flow
    LFServer -->|All Filters| LFClient
    LFClient --> |Selected Filters stored as a slug| URL
    %% Page Products flow
    PServer -->|Selected Filters| PClient
    PServer -->|Hydrating with 2 pages| PClient
    PClient -.-> |Retrive filters| LFClient

```

### Diagram showing comunication between Modules and Strapi Api

```mermaid
flowchart TB
   Strapi[Strapi API]

    subgraph App
        subgraph Page_Products["Page - Products"]
            PServer[Server Products]
            PClient[Client Products]
        end

        subgraph Layout_Filters["Layout - Filters"]
            LFServer[Server Layout Filters]
            LFClient[Client Layout Filters]
        end

    end

    %% Strapi connections
    Strapi -->|All Filters| LFServer
    Strapi -->|2 pages of products| PServer
    Strapi -->|All filters*| PServer

    %% Layout Filters flow
    LFClient -->|Filters Count| Strapi
    LFServer -->|All Filters| LFClient

    %% Page Products flow
    PServer -->|Selected Filters| PClient
    PServer -->|Hydrating with 2 pages| PClient

    %% Next pages loop
    PClient -->|Next Pages| Strapi

```

### Diagram showing all data flow

```mermaid
flowchart TB
  Strapi[Strapi API]

   subgraph App
       subgraph Page_Products["Page - Products"]
           PServer[Server Products]
           PClient[Client Products]
       end

       subgraph Layout_Filters["Layout - Filters"]
           LFServer[Server Layout Filters]
           LFClient[Client Layout Filters]
       end
   Page_Products -.-> |Retrive filters| Layout_Filters
       %% URL relation
       URL[URL]
       URL -->|Selected Filters Slug| PServer
       LFClient --> |Selected Filters stored as a slug| URL
   end

   %% Strapi connections
   Strapi -->|All Filters| LFServer
   Strapi -->|2 pages of products| PServer
   Strapi -->|All filters*| PServer

   %% Layout Filters flow
   LFClient -->|Filters Count| Strapi
   LFServer -->|All Filters| LFClient

   %% Page Products flow
   PServer -->|Selected Filters| PClient
   PServer -->|Hydrating with 2 pages| PClient

   %% Next pages loop
   PClient -->|Next Pages| Strapi

```

## Key Modules

### Server Layout Filters

- **What it does:**
  - Prefetches filters data from **Strapi API**.
  - Caches prefetched data and revalidates on demand when changes occur in Strapi.
- **Incoming data:**
  - All filters data from **Strapi API**.
- **Outgoing data:**
  - All filters data to **Client Layout Filters**.
- **Why:**
  - Users see filters instantly.
  - Improves SEO.
  - Reduces server computation load.

### Client Layout Filters

- **What it does:**
  - Provides interactive filter sections for users.
  - Shows how many products will be returned for each filter value.
  - Passes selected filters to the URL upon submission.
- **Incoming data:**
  - Selected filters data from **Server Layout Filters**.
- **Outgoing data:**
  - Filters data serialized as a slug to **URL**.
- **Why:**
  - Displays fresh filter counts.
  - Maintains the state of selected filters on refresh.
  - Passes selected filters to the products page via URL.

### Server Products Page

- **What it does:**
  - Caches pages with applied filters.
  - Prefetches all filters.
  - Prefetches the first 2 pages of products for given filters.
- **Incoming data:**
  - Filters slug from **URL**.
  - All filters data from **Strapi API**.
  - Products data from **Strapi API**.
- **Outgoing data:**
  - Filters data serialized as a slug to **URL**.
  - Selected filters data to **Client Layout Filters**.
- **Why:**
  - Displays products to users instantly.
  - Caches previously generated pages for ISR.
  - Improves SEO.

### Client Products Page

- **What it does:**
  - Presents products to users with infinite scrolling.
  - Fetches additional pages from **Strapi API** when users reach near the page bottom.
  - Retrieves filters from the URL after a browser refresh.
- **Incoming data:**
  - Selected filters data from **Server Products Page**.
  - Prefetched 2 pages of products data from **Server Products Page**.
- **Outgoing data:**
  - End of data flow (optionally in future: passes selected filters to Zustand for faster retrieval).
- **Why:**
  - Supports infinite scroll experience.

### URL

- **What it does:**
  - Stores filters data as a serialized slug (e.g., brands Red Wing and Nike saved as `/brand:red_wing-nike`).
- **Incoming data:**
  - Serialized selected filters.
- **Outgoing data:**
  - Serialized selected filters to **Products Page**.
  - Serialized selected filters to **Layout Filters**.
- **Why:**
  - Enables communication between **Products Page** and **Layout Filters**.
  - Retrieves used filters on browser refresh.
