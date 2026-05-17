# EcoPulse Design System

Complete design specifications for recreating the EcoPulse frontend in Penpot or any design tool.

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Border Radius](#spacing--border-radius)
4. [Shadows](#shadows)
5. [Components](#components)
6. [Layout & Grid](#layout--grid)
7. [Icons](#icons)
8. [Animations](#animations)
9. [Export Guide](#export-guide)

---

## Color Palette

### Primary Colors (Forest Green)
```
forest-950: #0d1f17
forest-900: #1a3a2a
forest-800: #1e4d35
forest-700: #2d6a4f
forest-600: #3a7d5e
forest-500: #52b788
forest-400: #74c69d
forest-300: #95d5b2
forest-200: #b7e4c7
forest-100: #d8f3dc
forest-50:  #f0faf2
```

### Secondary Colors
```
earth-900: #3d2b1f
earth-700: #6b4226
earth-500: #a0522d
earth-300: #c8956c
earth-100: #f0dfd0

bark-900: #2c2416
bark-700: #4a3f28
bark-500: #7a6642
bark-300: #b5a07a
bark-100: #ede0c8

amber-600: #d97706
amber-500: #f59e0b
amber-400: #fbbf24
amber-100: #fef3c7
```

### Semantic Colors
```
Background: #f0faf2 (forest-50)
Text:       #1a3a2a (forest-900)
AQI Good:   #52b788
AQI Moderate: #fbbf24
AQI Unhealthy: #f97316
AQI Hazardous: #dc2626
```

---

## Typography

### Font Families
- **Display/Headings**: Playfair Display (serif)
  - Weights: 400, 600, 700, 800
  - Google Fonts URL: `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800`

- **Body/UI**: DM Sans (sans-serif)
  - Weights: 300, 400, 500, 600, 700
  - Google Fonts URL: `https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700`

### Font Sizes
```
12px (text-xs)   - Tags, meta info, small labels
14px (text-sm)   - Body text, descriptions, nav links
16px (text-base) - Default body, card titles
18px (text-lg)   - Subtitles, lead paragraphs
20px (text-xl)   - Section headings, logo
24px (text-2xl)  - Page subheadings
30px (text-3xl)  - Section titles
36px (text-4xl)  - Page titles (mobile)
48px (text-5xl)  - Hero headings (desktop)
```

### Line Heights
```
Headings (h1-h3):  1.2
Subheadings (h4-h6): 1.3
Body text:         1.6
Relaxed:           1.625
```

---

## Spacing & Border Radius

### Spacing (4px grid)
```
2px, 4px, 6px, 8px, 10px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 56px, 64px, 80px, 96px
```

### Border Radius
```
rounded-sm:   2px
rounded:      4px
rounded-md:   6px
rounded-lg:   8px
rounded-xl:   16px
rounded-2xl:  24px
rounded-3xl:  32px
rounded-full: 9999px (circle)
```

---

## Shadows

```
Card Shadow:
  0 2px 16px 0 rgba(26, 58, 42, 0.08)

Card Hover Shadow:
  0 8px 32px 0 rgba(26, 58, 42, 0.16)

Navigation Shadow:
  0 2px 24px 0 rgba(26, 58, 42, 0.12)

Modal Shadow:
  0 24px 64px 0 rgba(26, 58, 42, 0.24)

Button Shadow:
  0 1px 2px 0 rgba(0, 0, 0, 0.05)
```

---

## Components

### Buttons

#### Primary Button
- Background: #2d6a4f (forest-700)
- Text: white, DM Sans 500 weight
- Padding: 10px 20px
- Border Radius: 16px
- Hover: #3a7d5e (forest-600)
- Active: #1e4d35 (forest-800)
- Shadow: 0 1px 2px rgba(0,0,0,0.05)
- Transition: all 200ms

#### Secondary Button
- Background: #d8f3dc (forest-100)
- Text: #1e4d35 (forest-800), DM Sans 500
- Padding: 10px 20px
- Border Radius: 16px
- Hover: #b7e4c7 (forest-200)
- Transition: all 200ms

#### Outline Button
- Background: transparent
- Border: 2px solid #2d6a4f (forest-700)
- Text: #2d6a4f, DM Sans 500
- Padding: 10px 20px
- Border Radius: 16px
- Hover: background #2d6a4f, text white
- Transition: all 200ms

#### Ghost Button
- Background: transparent
- Text: #2d6a4f (forest-700), DM Sans 500
- Padding: 8px 16px
- Border Radius: 16px
- Hover: #d8f3dc background
- Transition: all 200ms

### Cards

#### Standard Card
- Background: white
- Border Radius: 24px
- Shadow: 0 2px 16px rgba(26,58,42,0.08)
- Hover Shadow: 0 8px 32px rgba(26,58,42,0.16)
- Transition: all 300ms
- Overflow: hidden

#### Bordered Card
- Background: white
- Border: 1px solid #d8f3dc (forest-100)
- Border Radius: 24px
- Hover Border: #95d5b2 (forest-300)
- Transition: all 200ms

### Badges

#### Base Badge
- Display: inline-flex, align center
- Gap: 4px
- Padding: 2px 10px
- Border Radius: full (9999px)
- Font: DM Sans, 12px, 500 weight

#### Green Badge
- Background: #d8f3dc (forest-100)
- Text: #1e4d35 (forest-800)

#### Amber Badge
- Background: #fef3c7 (amber-100)
- Text: #d97706 (amber-600)

### Input Fields

- Width: 100%
- Background: white
- Border: 1px solid #b7e4c7 (forest-200)
- Border Radius: 16px
- Padding: 10px 16px
- Text: #1a3a2a (forest-900), DM Sans
- Placeholder: #74c69d (forest-400)
- Focus: 2px ring #52b788, border transparent
- Transition: all 200ms

### Navigation Bar

#### Desktop Navbar
- Height: 72px
- Background: #1a3a2a (forest-900)
- Text: white
- Position: fixed top
- Shadow: 0 2px 24px rgba(26,58,42,0.12) (on scroll)
- Z-index: 40

#### Logo
- Icon Container: 36px × 36px, rounded-xl, #2d6a4f background
- Icon: Leaf (20px), #b7e4c7 color, rotated 12deg
- Text: Playfair Display, 20px, bold
- "Eco" in white, "Pulse" in #74c69d (forest-400)

#### Nav Links
- Font: DM Sans, 14px, 500 weight
- Padding: 8px 16px
- Border Radius: 16px
- Default: #b7e4c7 text
- Hover: #1e4d35 background, white text
- Active: #2d6a4f/60 background, white text
- Transition: all 200ms

### News Card

#### Structure
- Base: white card, 24px radius, card shadow
- Thumbnail: 192px height
- Content padding: 20px
- Hover: card-hover shadow, image scale 1.05

#### Thumbnail Placeholder Gradients
1. #1e4d35 to #3a7d5e
2. #1a3a2a to #2d6a4f
3. #6b4226 to #1e4d35
4. #4a3f28 to #2d6a4f
5. #2d6a4f to #7a6642

#### Section Badge (on thumbnail)
- Position: absolute, top 12px, left 12px
- Badge with 6px colored dot
- Shadow: button shadow

#### Meta Row
- Font: 12px, #74c69d (forest-400)
- Icons: 11px (Lucide)
- Gap: 12px

#### Title
- Font: Playfair Display, 16px, bold
- Color: #1a3a2a (forest-900)
- Line Clamp: 3 lines
- Hover: #2d6a4f
- Transition: 200ms

#### Excerpt
- Font: DM Sans, 14px
- Color: #3a7d5e (forest-600)
- Line Clamp: 3 lines
- Line Height: 1.625

#### Action Buttons
- Border Top: 1px #f0faf2
- Padding Top: 12px
- Two buttons: AI Summary (secondary) + Read (primary)
- Font: 12px
- Icons: 13px (Sparkles), 12px (ExternalLink)

---

## Layout & Grid

### Page Container
- Max Width: 1280px
- Margin: auto
- Padding: 16px (mobile), 24px (tablet), 32px (desktop)

### Grid Systems

#### News Grid
- Mobile: 1 column
- Tablet (768px+): 2 columns
- Desktop (1024px+): 3 columns
- Gap: 20px

#### Stats Grid
- Mobile: 2 columns
- Tablet (768px+): 4 columns
- Gap: 16px

### Breakpoints
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## Icons

Using Lucide React icon library (https://lucide.dev/)

### Common Icons & Sizes
```
Logo: Leaf (20px)
Navigation: Menu/X (22px), LogIn/LogOut (15px), UserCircle (18px)
News: Clock (11px), User (11px), BookOpen (11px), Tag (9px), Sparkles (13px), ExternalLink (12px)
Features: Wind (16px), Globe (16px), Leaf (16px), TrendingUp (16px), ArrowRight (13px)
```

### Icon Colors
- Primary: #2d6a4f (forest-700)
- Secondary: #74c69d (forest-400)
- On Dark: #b7e4c7 (forest-200)
- Muted: #74c69d (forest-400)

---

## Animations

### Keyframes

#### Fade In
```
From: opacity 0, translateY(8px)
To: opacity 1, translateY(0)
Duration: 500ms, ease-out
```

#### Scale In (Modal)
```
From: opacity 0, scale(0.95), translateY(10px)
To: opacity 1, scale(1), translateY(0)
Duration: 300ms, cubic-bezier(0.16, 1, 0.3, 1)
```

#### Pulse Green
```
0%, 100%: opacity 1
50%: opacity 0.5
Duration: 2s, infinite
```

#### Float
```
0%, 100%: translateY(0px)
50%: translateY(-8px)
Duration: 6s, ease-in-out, infinite
```

### Transition Durations
- Fast: 200ms
- Default: 300ms
- Slow: 500ms

---

## Export Guide

### Workflow for Penpot

Since React apps cannot be directly exported to Penpot, here are three approaches:

#### 1. Screenshot-Based Approach
- Take screenshots of each page/component from the running app
- Import screenshots into Penpot as reference layers
- Trace and recreate using this design system
- Lock reference layers and build on top

#### 2. Component-by-Component Recreation (Recommended)
1. Set up color palette in Penpot (use hex codes above)
2. Import fonts: Playfair Display and DM Sans
3. Create button components with variants (Primary, Secondary, Outline, Ghost)
4. Create badge components (Green, Amber)
5. Create input field component
6. Build navigation bar component
7. Create news card component
8. Assemble page layouts

#### 3. HTML/CSS Extraction
- Inspect individual components in browser DevTools
- Copy computed styles
- Manually recreate in Penpot using extracted values

### Component Priority

High Priority (Core UI):
1. Buttons (4 variants)
2. Cards (2 variants)
3. Badges
4. Navigation bar
5. News card

Medium Priority:
1. Input fields
2. Hero section
3. Modal

Low Priority (Can be simplified):
1. Animations
2. Complex hover states
3. Gradient backgrounds

### Tips for Penpot Recreation

1. Start with design tokens (colors, typography, spacing)
2. Create reusable components with variants
3. Use auto-layout (flex) for responsive behavior
4. Create a component library for consistency
5. Use grids for page layouts
6. Export components as SVG when needed
7. Test at multiple breakpoints (375px, 768px, 1024px, 1440px)

---

## Additional Resources

- Lucide Icons: https://lucide.dev/
- Google Fonts: https://fonts.google.com/
- Penpot Documentation: https://help.penpot.app/
- Tailwind CSS (reference): https://tailwindcss.com/docs

---

Generated for EcoPulse v1.0  
Last Updated: 2026-04-18
