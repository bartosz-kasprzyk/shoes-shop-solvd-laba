# Home Page Component Structure

The home page has been successfully split into smaller, more manageable chunks for better maintainability and reusability.

## Current Structure

### Main Home Page (`app/(main)/page.tsx`)

- Simple container that orchestrates the main sections
- Uses: `LandingSection`, `WhyUsSection`, and `Footer`

### LandingSection Components (`features/layout/components/LandingSection/`)

- **`index.tsx`** - Main container component
- **`HeroContent.tsx`** - Contains the main headline, description, and action buttons
- **`HeroImage.tsx`** - Contains the hero image and promotional badge
- **`StatsSection.tsx`** - Contains the statistics (customers, models, brands)

### WhyUsSection Components (`features/layout/components/WhyUsSection/`)

- **`index.tsx`** - Main container component
- **`SectionHeader.tsx`** - Section title and description
- **`FeaturesGrid.tsx`** - Grid of feature cards with icons
- **`CallToAction.tsx`** - Bottom CTA section with button
- **`FeatureCard.tsx`** - Individual feature card component (existing)

### Shared Components (`shared/components/ui/`)

- **`SectionHeader/index.tsx`** - Reusable section header component with optional highlighting

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be reused across different pages
3. **Maintainability**: Easier to locate and modify specific sections
4. **Testing**: Smaller components are easier to test individually
5. **Performance**: Potential for better code splitting and lazy loading

## Component Features

### SectionHeader (Shared)

- Configurable title with optional word highlighting
- Optional subtitle and description
- Flexible text alignment
- Responsive typography
- Customizable max width

### LandingSection Components

- **HeroContent**: Contains all text content and buttons
- **HeroImage**: Handles image display and promotional overlay
- **StatsSection**: Displays key statistics with responsive layout

### WhyUsSection Components

- **SectionHeader**: Uses the shared SectionHeader component
- **FeaturesGrid**: Contains all feature data and renders feature cards
- **CallToAction**: Self-contained CTA section with background effects

## Usage Examples

```tsx
// Using the shared SectionHeader component
<SectionHeader
  title='Why Choose ShoesShop?'
  highlightedWord='ShoesShop'
  description="We're committed to providing..."
  textAlign='center'
  maxWidth={600}
/>
```

## Future Improvements

1. Consider extracting the features data to a separate config file
2. Add loading states for better UX
3. Implement lazy loading for non-critical sections
4. Add animation components for better visual appeal
5. Create variant props for different section styles
