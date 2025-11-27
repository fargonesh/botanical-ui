clear
# 🌿 Botanical UI

A brutalist botanical React component library with dynamic theming capabilities. Extract colors from images and automatically theme your entire UI.

## Features

✨ **Component Library**
- Brutalist design system
- 10+ React components
- Type-safe with TypeScript
- Dark/Light theme support

🎨 **Dynamic Theming**
- Extract colors from images automatically
- Primary/Secondary/Accent color system
- CSS variables for easy customization
- Real-time theme updates

💻 **Developer Experience**
- Tree-shakeable exports
- ESM and CommonJS support
- Full TypeScript support
- Zero runtime dependencies (except React)

## Installation

```bash
npm install botanical-ui
# or
yarn add botanical-ui
# or
pnpm add botanical-ui
```

## Quick Start

```tsx
import { ThemeProvider, BrutalCard, Badge } from 'botanical-ui';
import 'botanical-ui/style.css';

function App() {
  return (
    <ThemeProvider>
      <BrutalCard title="Welcome">
        <Badge variant="default">Botanical UI</Badge>
      </BrutalCard>
    </ThemeProvider>
  );
}
```

## With Image-Based Theming

Automatically extract colors from an image:

```tsx
import { ThemeProvider } from 'botanical-ui';

function App() {
  return (
    <ThemeProvider image="https://example.com/hero.jpg">
      <YourApp />
    </ThemeProvider>
  );
}
```

## Components

### Layout & Structure
- `BrutalCard` - Brutalist card container with optional decorations
- `Separator` - Horizontal or vertical divider
- `GridLineVertical` / `GridLineHorizontal` - Grid reference lines
- `FloralDecoration` - Decorative thorns/vines elements

### Typography
- `Heading` - Semantic heading component
- `Text` - Text variant system (body, mono, caption)

### Navigation
- `NavBar` - Navigation bar with branding
- `NavLink` - Navigation link component
- `Sidebar` - Sidebar navigation

### Feedback
- `Badge` - Badge/label component
- `Alert` - Alert notification component

### Forms
- Form components with validation support

### Data Display
- Chart integration with Chart.js
- Data table components
- Terminal-like output display

### Overlays & Modals
- Modal dialog
- Command palette
- Tooltip

## Theming API

### Using the Theme Hook

```tsx
import { useTheme } from 'botanical-ui';

function Component() {
  const { colors, theme, toggleTheme } = useTheme();
  
  return (
    <div style={{ color: colors.primary }}>
      Current theme: {theme}
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

### Color Roles

- **primary** - Main accent color
- **secondary** - Highlight/complement color
- **accent** - Tertiary emphasis color
- **ink** - Text color
- **paper** - Background color
- **gray** - Neutral/disabled text

### ThemeProvider Props

```tsx
interface ThemeProviderProps {
  // Initial custom colors
  colours?: Partial<ThemeColors>;
  
  // Image URL to extract colors from
  image?: string;
  
  // Children components
  children: React.ReactNode;
}
```

## CSS Variables

All theme colors are available as CSS variables:

```css
:root {
  --bio-primary: /* Current primary color */
  --bio-secondary: /* Current secondary color */
  --bio-accent: /* Current accent color */
  --bio-ink: /* Current text color */
  --bio-paper: /* Current background color */
  --bio-gray: /* Current gray color */
}
```

## Styling

The library includes default styles via `index.css`. Import it in your app:

```tsx
import 'botanical-ui/style.css';
```

### Tailwind Integration

The library works seamlessly with Tailwind CSS. Color utilities are automatically available:

```tsx
<div className="text-bio-primary bg-bio-secondary">
  Themed content
</div>
```

## Examples

### Gallery with Per-Image Theming

```tsx
import { ThemeProvider } from 'botanical-ui';

function Gallery() {
  const [image, setImage] = useState<string | null>(null);
  
  return (
    <ThemeProvider image={image || undefined}>
      <div>
        {images.map(img => (
          <img 
            key={img}
            src={img}
            onClick={() => setImage(img)}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}
```

### Custom Color Palette

```tsx
import { useTheme } from 'botanical-ui';

function ColorCustomizer() {
  const { setCustomColor } = useTheme();
  
  return (
    <div>
      <button onClick={() => setCustomColor('primary', '#ff00ff')}>
        Magenta Theme
      </button>
      <button onClick={() => setCustomColor('primary', '#00ff00')}>
        Green Theme
      </button>
    </div>
  );
}
```
