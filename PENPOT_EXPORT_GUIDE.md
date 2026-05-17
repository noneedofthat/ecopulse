# Penpot Export Guide for EcoPulse

Quick reference guide for exporting EcoPulse frontend to Penpot design tool.

## Important Note

React applications cannot be directly exported to Penpot. You'll need to manually recreate the design using the specifications in `DESIGN_SYSTEM.md`.

## Recommended Workflow

### Step 1: Setup Design Tokens

1. Open Penpot and create a new file
2. Create color palette:
   - Add all forest colors (forest-50 through forest-950)
   - Add earth, bark, and amber colors
   - Name them exactly as in DESIGN_SYSTEM.md
3. Import fonts:
   - Playfair Display (weights: 400, 600, 700, 800)
   - DM Sans (weights: 300, 400, 500, 600, 700)

### Step 2: Create Component Library

Build these components in order:

1. **Buttons** (4 variants)
   - Primary: forest-700 background, white text
   - Secondary: forest-100 background, forest-800 text
   - Outline: transparent with forest-700 border
   - Ghost: transparent with forest-700 text

2. **Badges** (2 variants)
   - Green: forest-100 background, forest-800 text
   - Amber: amber-100 background, amber-600 text

3. **Input Field**
   - White background, forest-200 border
   - 16px border radius, 10px vertical padding

4. **Card**
   - White background, 24px border radius
   - Shadow: 0 2px 16px rgba(26,58,42,0.08)

### Step 3: Build Major Components

1. **Navigation Bar**
   - Height: 72px
   - Background: forest-900
   - Logo with Leaf icon
   - Nav links with hover states

2. **News Card**
   - Thumbnail area (192px height)
   - Content section with title, excerpt, meta
   - Action buttons at bottom

3. **Hero Section**
   - forest-900 background
   - Large heading with Playfair Display
   - CTA buttons

### Step 4: Create Page Layouts

1. **Home Page**
   - Hero section
   - Stats bar
   - News feed grid (3 columns on desktop)
   - Feature highlights

2. **Other Pages**
   - AQI Page
   - NGO Page
   - About Page
   - Feedback Page

## Alternative: Screenshot Method

If manual recreation is too time-consuming:

1. Run the EcoPulse app locally:
   ```bash
   cd frontend
   npm run dev
   ```

2. Take screenshots of each page at different breakpoints:
   - Mobile: 375px width
   - Tablet: 768px width
   - Desktop: 1440px width

3. Import screenshots into Penpot as reference layers

4. Trace over screenshots using Penpot tools

5. Use DESIGN_SYSTEM.md for exact colors, fonts, and spacing

## Key Design System Values

### Colors
- Primary: #2d6a4f (forest-700)
- Background: #f0faf2 (forest-50)
- Text: #1a3a2a (forest-900)

### Typography
- Headings: Playfair Display, bold
- Body: DM Sans, regular (400) or medium (500)

### Spacing
- Card padding: 20px
- Button padding: 10px 20px
- Grid gap: 20px

### Border Radius
- Buttons/Inputs: 16px
- Cards: 24px
- Badges: full (9999px)

### Shadows
- Card: 0 2px 16px rgba(26,58,42,0.08)
- Card Hover: 0 8px 32px rgba(26,58,42,0.16)

## Testing Breakpoints

Test your Penpot design at these widths:
- Mobile: 375px, 414px
- Tablet: 768px, 834px
- Desktop: 1024px, 1280px, 1440px, 1920px

## Resources

- Full Design System: `DESIGN_SYSTEM.md`
- Lucide Icons: https://lucide.dev/
- Google Fonts: https://fonts.google.com/
- Penpot Help: https://help.penpot.app/

## Need Help?

Refer to these files in the codebase:
- `frontend/tailwind.config.js` - Complete color and spacing system
- `frontend/src/index.css` - CSS custom properties and component classes
- `frontend/src/components/` - Component implementations
- `frontend/src/pages/` - Page layouts

---

Good luck with your Penpot recreation!
