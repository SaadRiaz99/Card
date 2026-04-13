# Luxury Digital Wedding Invitation Design & Implementation Plan

## 1. Goal
Create an ultra-modern, one-page, interactive digital wedding invitation with a cinematic user experience.

## 2. Technical Stack
- **Structure:** HTML5 (Semantic)
- **Styling:** Vanilla CSS (Modern features: Flexbox, Grid, Custom Properties, Glassmorphism, Neumorphism, Keyframe Animations)
- **Interactions & Animations:** 
  - **GSAP (GreenSock Animation Platform):** For high-performance, complex scroll-triggered and timeline animations.
  - **ScrollTrigger:** For scene-based reveal animations.
  - **Canvas/Particles.js:** For background floating particles/gold dust.
- **Typography:** Google Fonts (Luxury Serif/Script + Minimal Sans-Serif).
- **Icons:** Lucide or Phosphor Icons (SVG).

## 3. Architecture & File Structure
- `luxury_wedding/`
  - `index.html` (Main entry)
  - `assets/`
    - `css/`
      - `main.css` (Main styles)
      - `animations.css` (Complex keyframes)
    - `js/`
      - `main.js` (GSAP logic, RSVP, Countdown)
      - `particles-config.js` (Background effects)
    - `img/` (Placeholders for gallery/hero)
    - `audio/` (Background music)

## 4. Feature Implementation Strategy
1.  **Hero Scene:** Fullscreen intro with GSAP `text-reveal` and a "Grainy" overlay.
2.  **Parallax Sections:** Using `ScrollTrigger` to create a depth effect where sections slide over each other.
3.  **Smart Card System:** Event details using CSS 3D transforms (flip/hover).
4.  **Story Timeline:** A vertical line that grows on scroll with nodes fading in.
5.  **RSVP Modal:** Glassmorphism design with a simple validation script.
6.  **Music Toggle:** A fixed button with a SVG frequency visualizer.

## 5. Timeline
- **Phase 1: Foundation (HTML/CSS Base)** - Scaffolding and base typography/colors.
- **Phase 2: Visual Effects** - Particles, glassmorphism, and grain textures.
- **Phase 3: GSAP Orchestration** - Scene transitions and scroll-based reveals.
- **Phase 4: Components** - RSVP, Countdown, Gallery, Map.
- **Phase 5: Refinement** - Mobile responsiveness, performance optimization, and accessibility.

## 6. Resources to Use
- **Fonts:** 'Pinyon Script' (Names), 'Montserrat' (Content).
- **Colors:** `#F5F5DC` (Ivory), `#D4AF37` (Champagne Gold), `#022D1F` (Deep Emerald).
