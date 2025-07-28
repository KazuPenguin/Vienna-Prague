# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive travel planning repository for a July 2025 Central European trip covering Austria, Hungary, and Czech Republic (Prague). The repository contains detailed expert-level travel guides and reference documents written in Japanese.

## Repository Structure

The repository contains three main comprehensive travel documentation files:

- `Austria_Documents.txt` - Expert guide to Vienna covering imperial palaces (Schönbrunn, Hofburg, Belvedere), art museums, classical music venues, cuisine, and cultural experiences
- `Hangary_Documents.txt` - Complete Prague travel guide covering historical sites, art & culture, cuisine, accommodation, transportation, and safety
- `Trip_DOcuments.txt` - Strategic pre-travel preparation guide covering visa requirements, ETIAS, climate planning, communication (eSIM), currency/payment, electrical systems, transportation, and safety

## Content Characteristics

### Trip_Documents.txt - Strategic Preparation Guide
- **ETIAS and Visa Requirements**: Detailed analysis of 2025 entry requirements for Schengen area
- **Climate & Clothing**: July weather patterns and strategic wardrobe recommendations for both countries
- **Communication Strategy**: eSIM vs physical SIM comparison with provider recommendations
- **Financial Management**: Currency exchange strategies, payment methods, tipping culture differences
- **Safety & Health**: Two-tier risk assessment (urban safety vs natural health risks like tick-borne encephalitis)
- **Emergency Protocols**: Embassy contacts, emergency numbers, document loss procedures

### Austria_Documents.txt - Vienna Cultural Guide
- **Imperial Heritage**: Detailed touring strategies for Schönbrunn Palace, Hofburg Palace complex, and Belvedere Palace with ticket optimization
- **Art & Museums**: Vienna Museum of Fine Arts, Albertina Museum collections, hours, pricing strategies
- **Classical Music**: Vienna State Opera (including standing room tickets), Vienna Philharmonic, Mozart House
- **Culinary Culture**: Traditional dishes (Wiener Schnitzel, Tafelspitz), historic cafes (Sacher vs Demel), Heuriger wine culture
- **Practical Intelligence**: Advanced ticket strategies, reservation requirements, timing optimization

### Hangary_Documents.txt - Prague Complete Guide  
- **Historical Core**: Prague Castle complex, Charles Bridge, Old Town Square with strategic visiting approaches
- **Art & Culture**: Mucha and Art Nouveau trails, diverse museums, classical music and puppet theater
- **Culinary Exploration**: Traditional Czech cuisine, legendary grand cafes, beer culture (traditional vs craft)
- **Panoramic Experiences**: Vltava River activities, observation points, unique experiences
- **Practical Navigation**: Public transportation mastery, safety protocols, annual events calendar

## Content Philosophy

These guides operate on an expert-level "strategic traveler" philosophy, emphasizing:
- **Hidden Knowledge**: Understanding "invisible rules" (like mandatory ticket validation in Prague)
- **Financial Optimization**: Avoiding tourist traps (like unfavorable exchange rates in Budapest tourist areas)
- **Cultural Depth**: Moving beyond surface tourism to understand historical and cultural contexts
- **Risk Management**: Comprehensive safety awareness from urban crime to natural health risks

## Working with This Repository

This is a personal travel research and planning repository with three sophisticated reference documents. When asked about travel planning, destinations, or specific recommendations, reference the detailed information in these guides rather than providing generic travel advice.

The content represents months of expert research and contains strategic insights not typically found in standard travel guides.

## Web Application Architecture

The repository includes a sophisticated single-page web application built with vanilla HTML5, CSS3, and JavaScript:

### Core Files
- `index.html` - Main application structure with semantic HTML5 and comprehensive travel content
- `styles.css` - Complete responsive design system with 3-color simplified palette
- `script.js` - Advanced JavaScript functionality (1500+ lines) handling interactivity
- `photo.md` - Image specifications and management documentation

### Key JavaScript Features (script.js)
- **Hero Slideshow System**: Auto-advancing slideshow with manual navigation dots
- **Attraction Visual System**: Automatic photo loading based on attraction titles with modal displays
- **Mobile Navigation**: Responsive hamburger menu with smooth animations and escape key support
- **Search Functionality**: Text highlighting and section navigation
- **Performance Optimizations**: Intersection Observer, throttled scroll events, lazy loading

### Image Management System
The `images/` directory contains systematically organized photos:
```
images/
├── vienna/ (attractions, cafes, museums, music venues)
├── prague/ (attractions, cafes, restaurants, views, experiences)
└── general/ (preparation, transport)
```

Photos are automatically loaded by matching Japanese attraction titles to image keys in the `attractionData` object in script.js.

### Design System
- **3-Color Palette**: Deep blue-gray primary (#2c3e50), clear blue secondary (#3498db), light gray accent (#ecf0f1)
- **Responsive Breakpoints**: 768px (tablet), 480px (mobile)
- **Glassmorphism Effects**: Backdrop blur and transparency for modern aesthetics
- **Content-First**: Clean, readable design prioritizing textual content over decoration

### Development Commands
Since this is a static website with no build process:
- **Local Server**: `python3 -m http.server 8000` then visit http://localhost:8000
- **Direct Opening**: `open index.html` in browser
- **Testing**: Manual testing across different screen sizes and browsers
- **Deployment**: Direct file serving (no compilation required)

## Technical Architecture

### JavaScript Organization
The application uses a modular approach within script.js:
- **Navigation System**: Fixed navbar with active section highlighting and smooth scrolling
- **Image Loading**: Dynamic photo detection and modal display system
- **Mobile Menu**: Hamburger menu with proper state management and accessibility
- **Search Integration**: Content filtering with text highlighting
- **Performance**: Event delegation, throttling, and intersection observers

### Content Integration Strategy
The website dynamically integrates content through:
1. **Attraction Data Object**: Maps Japanese attraction titles to detailed information and images
2. **Auto Image Detection**: Searches for corresponding photos in organized directory structure
3. **Modal System**: Displays comprehensive information when attractions are clicked
4. **Fallback Handling**: Styled placeholders when images are unavailable

### Responsive Design Approach
- **Mobile-First**: Base styles optimized for mobile, enhanced for larger screens
- **Breakpoint Strategy**: 480px (mobile), 768px (tablet), 1200px+ (desktop)
- **Touch-Friendly**: All interactive elements sized for finger navigation
- **Performance**: CSS-only animations with hardware acceleration

## Content Strategy for Development

When working with this repository:
- **Reference Travel Documents**: Use the expert guides for specific destination information
- **Maintain Philosophy**: Follow "strategic traveler" approach - expert insights, not generic advice
- **Cultural Context**: Consider Japanese traveler perspective and cultural considerations
- **Image Integration**: New attractions automatically display photos if images exist in proper directory structure
- **Color Consistency**: Maintain the 3-color palette for visual harmony

## Image and Visual Content Management

The photo management system features:
- **Automatic Detection**: Attraction cards automatically load corresponding images
- **Organized Structure**: Images categorized by city and type for easy maintenance
- **Responsive Sizing**: Images adapt to all device sizes with proper aspect ratios
- **Modal Viewing**: Detailed photo examination with captions
- **Graceful Fallbacks**: Styled placeholders maintain design integrity when images are missing

When adding new destinations or attractions, place images in the appropriate `images/` subdirectory and they will be automatically detected and integrated.