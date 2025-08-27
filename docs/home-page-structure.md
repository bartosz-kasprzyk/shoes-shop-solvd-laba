# Home Page Component Structure

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
