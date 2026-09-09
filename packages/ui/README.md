# @soundsgood/ui

Shared UI component library built with [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS.

## Overview

This package provides a collection of accessible, customizable React components based on Radix UI primitives and styled with Tailwind CSS.

## Installation

From the monorepo root:

```bash
npm install
```

## Usage

Import components in your Next.js app:

```tsx
import { Button, Card, Input, Label } from "@soundsgood/ui";

export default function MyPage() {
  return (
    <Card>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <Button>Submit</Button>
      </div>
    </Card>
  );
}
```

## Available Components

### Form Components
- `Button` - Versatile button with multiple variants (default, destructive, outline, secondary, ghost, link)
- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Label` - Form label
- `Checkbox` - Checkbox input
- `Select` - Dropdown select menu
- `Switch` - Toggle switch
- `Slider` - Range slider

### Layout Components
- `Card` (with CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- `Separator` - Visual divider
- `ScrollArea` - Custom scrollable area
- `Tabs` (with TabsList, TabsTrigger, TabsContent)

### Feedback Components
- `Badge` - Status badges with variants
- `Progress` - Progress bar
- `Toast` / `Toaster` - Toast notifications
- `AlertDialog` - Confirmation dialogs

### Overlay Components
- `Dialog` - Modal dialogs
- `DropdownMenu` - Dropdown menus
- `Popover` - Popover panels
- `Tooltip` - Hover tooltips

### Data Display
- `Avatar` - User avatars with fallback

## Styling

Components use CSS variables for theming. Add these to your `globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode variables */
  }
}
```

## Adding New Components

Use the shadcn CLI to add new components:

```bash
cd packages/ui
npx shadcn@latest add [component-name]
```

Then export from `src/index.ts`.

## Utilities

### `cn()` - Class Name Utility

Combines `clsx` and `tailwind-merge` for optimal class handling:

```tsx
import { cn } from "@soundsgood/ui";

<div className={cn("base-class", isActive && "active-class", className)} />
```

## Hooks

### `useToast()`

Hook for programmatic toast notifications:

```tsx
import { useToast } from "@soundsgood/ui";

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Success!",
          description: "Your changes have been saved.",
        });
      }}
    >
      Save
    </Button>
  );
}
```

## Dependencies

- `@radix-ui/*` - Accessible UI primitives
- `class-variance-authority` - Variant management
- `clsx` - Conditional classes
- `tailwind-merge` - Tailwind class deduplication
- `lucide-react` - Icons


