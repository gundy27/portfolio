# Design Guidelines

**Last Updated**: January 2025

This document defines the design system for the portfolio website. **Always reference this file when making UI changes.**

---

## Typography

### Base Assumption

- **Body text base size**: 16px

### Type Scale

#### Headings

**H1** — Space Grotesk 600 — 48px

- Not too large. Clear and confident.

**H2** — Space Grotesk 600 — 32px

**H3** — Space Grotesk 500 — 24px

**H4** — Space Grotesk 500 — 20px

**H5** — Poppins 500 — 18px

#### Body Text

**Body** — Poppins 400 — 16–17px

- Line-height: 150–165%
- Extremely readable.

**Small Body** — Poppins 400 — 14px

- For captions, footnotes, case study metadata.

#### Labels & Buttons

**Labels / Buttons** — Lexend Exa 600 — 12–13px

- ALL CAPS
- Letter-spacing: +6% to +10% (more modest than before)
- Line-height: 110%
- Keep these subtle — quiet indicators, not loud UI elements

**Label Variants:**

- **Default**: Secondary gray (`#6A6A6A`) — for tags, metadata, general labels
- **Accent**: Accent color (`#4A67FF`) — for section labels above headers

#### Section Headers

Use the `SectionHeader` component for consistent section introductions:

- **Label**: Uppercase, accent color, positioned above header
- **Spacing**: 12-16px gap between label and header (responsive)
- **Header**: Standard heading (H1-H4) with existing typography scale
- **Usage**: Apply to major sections on project detail pages and home page sections

---

## Spacing & Layout

### Vertical Rhythm

**Space BEFORE headers**: 2.5× the header's font size

- Example: H1 (48px) → 120px space before

**Space AFTER headers**: 1× the header's font size

- Example: H1 (48px) → 48px space after

**Paragraph spacing**: 1.25em

- This keeps everything feeling airy and intentional.

### Section Spacing

- **64–80px** between major sections
- **40–56px** between subsections (e.g., problem → solution → outcome)

### Section Header Pattern

- **Label to Header spacing**: 12px (mobile) → 14px (tablet) → 16px (desktop)
- **Label**: Accent color (`#4A67FF`), uppercase, Lexend Exa
- **Header**: Maintains existing typography scale and spacing
- Use `SectionHeader` component for consistent implementation

### Text Block Width

- **620–720px max** for best readability

---

## Responsive Design & Grid System

### Core Requirement

**All future UI components MUST be responsive and aligned with the grid system.**

### Breakpoints

The design system uses Tailwind CSS breakpoints:

- **Mobile (default)**: < 640px
- **Tablet (sm)**: ≥ 640px
- **Desktop (md)**: ≥ 768px
- **Large Desktop (lg)**: ≥ 1024px
- **XL Desktop (xl)**: ≥ 1280px

### Grid System

- **Container (Standard)**: `max-w-7xl` with responsive padding

  - Mobile: `px-4`
  - Tablet: `sm:px-6`
  - Desktop: `lg:px-8`

- **Container (Wide)**: `.container-wide` with `max-w-[1600px]` and generous desktop padding

  - Mobile: `px-4`
  - Tablet: `sm:px-6` (px-6)
  - Desktop: `lg:px-12` (px-12)
  - XL Desktop: `xl:px-16` (px-16)
  - 2XL Desktop: `2xl:px-24` (px-24)

  Use `.container-wide` for pages that benefit from generous desktop whitespace, such as project detail pages and home page sections.

- **Grid Layouts**: Use responsive grid classes
  - Mobile-first approach (single column by default)
  - Add columns at appropriate breakpoints: `sm:grid-cols-2`, `lg:grid-cols-3`, etc.

### Responsive Typography

All typography scales responsively:

- **H1**: 32px (mobile) → 40px (tablet) → 48px (desktop)
- **H2**: 24px (mobile) → 28px (tablet) → 32px (desktop)
- **H3**: 20px (mobile) → 22px (tablet) → 24px (desktop)
- **H4**: 18px (mobile) → 19px (tablet) → 20px (desktop)

### Responsive Spacing

- **Section spacing**: Scales from mobile (48px) to desktop (64-80px)
- **Vertical padding**: `py-8 sm:py-12 lg:py-16`
- **Gaps**: `gap-6 sm:gap-8` for consistent spacing across breakpoints

### Component Guidelines

1. **Mobile-First**: Design for mobile first, then enhance for larger screens
2. **Touch Targets**: Minimum 44×44px for interactive elements on mobile
3. **Text Readability**: Ensure text sizes remain readable on all screen sizes
4. **Navigation**: Use hamburger menu pattern for mobile/tablet (< md breakpoint)
5. **Navbar Behavior**:
   - Fixed to top of viewport (always visible)
   - Lightly gradiented translucent background with backdrop blur
   - Fades (opacity) as user scrolls down (starts fading at 200px, fully faded by 600px)
   - Smooth opacity transition (200ms ease-out)
6. **Images**: Use responsive images with appropriate aspect ratios
7. **Layouts**: Stack vertically on mobile, use grid layouts on larger screens

### Testing Requirements

- Test components at all breakpoints
- Ensure no horizontal scrolling on mobile
- Verify touch targets are appropriately sized
- Check text remains readable without zooming

---

## Color Palette

### Primary Text Colors

- **#111111** — Headers (Space Grotesk)
- **#2C2C2C** / **#333333** — Body text (Poppins)

### Secondary Text

- **#6A6A6A** — Small body, labels, metadata

### Background Neutrals

- **#FAFAFA** or **#FFFFFF** for clean layouts
- Avoid heavy textures or dark backgrounds (too distracting for case studies)

### Accent Colors

**Use ONE subtle, muted accent for buttons & labels:**

- **Slate Blue**: #4A67FF

**Guidelines:**

- Keep accents minimal — prefer monochrome with a hint of color.
- Use sparingly for interactive elements only.

---

## Font Families

1. **Space Grotesk** — Headings (H1–H4)
2. **Poppins** — Body text and H5
3. **Lexend Exa** — Labels and buttons

---

## Implementation Notes

- All measurements are in pixels for precision
- Line-heights are percentages for responsive scaling
- Letter-spacing for labels is a percentage increase
- Maintain consistent spacing ratios throughout
- Prioritize readability and clean aesthetics
- Avoid heavy visual elements that distract from content
- **All components must be responsive and grid-aligned** — see Responsive Design & Grid System section
- Use mobile-first approach: design for smallest screen first, then enhance for larger breakpoints

---

## Quick Reference

### Typography Stack

```
H1: Space Grotesk 600, 48px
H2: Space Grotesk 600, 32px
H3: Space Grotesk 500, 24px
H4: Space Grotesk 500, 20px
H5: Poppins 500, 18px
Body: Poppins 400, 16–17px (line-height: 150–165%)
Small: Poppins 400, 14px
Labels: Lexend Exa 600, 12–13px, ALL CAPS, +6–10% letter-spacing
```

### Spacing Ratios

```
Before header: 2.5× font size
After header: 1× font size
Paragraph: 1.25em
Major sections: 64–80px
Subsections: 40–56px
Max text width: 620–720px
```

### Colors

```
Headers: #111111
Body: #2C2C2C / #333333
Secondary: #6A6A6A
Background: #FAFAFA / #FFFFFF
Accent: #4A67FF (use sparingly)
```

### Responsive Design

```
Breakpoints: Mobile (<640px), Tablet (≥640px), Desktop (≥768px), Large (≥1024px), XL (≥1280px), 2XL (≥1536px)
Container (Standard): max-w-7xl with px-4 sm:px-6 lg:px-8
Container (Wide): max-w-[1600px] with px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24
Grid: Mobile-first, add columns at sm:, md:, lg: breakpoints
Typography: Scales responsively (see Responsive Design section)
Spacing: Scales from mobile to desktop (py-8 sm:py-12 lg:py-16)
```

---

**Remember**: Always reference this file when making UI changes to maintain consistency. **All future components must be responsive and grid-aligned.**
