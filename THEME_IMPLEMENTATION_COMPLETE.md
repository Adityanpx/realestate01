# Complete Theme Implementation Guide

## Overview

This comprehensive theme implementation provides a global theme system that affects the entire application while keeping the Hero section completely immune to theme changes. The system includes smooth transitions, localStorage persistence, and theme-aware components.

## 🎯 Key Features

- **Global Theme Context**: Manages theme state across the entire application
- **Hero Section Protection**: Hero section maintains fixed styling regardless of theme
- **Smooth Transitions**: All theme changes are animated with CSS transitions
- **LocalStorage Persistence**: Theme preference is saved and restored on page reload
- **Theme-Aware Components**: All components use CSS variables for theme responsiveness
- **Enhanced Theme Toggle**: Beautiful animated toggle button with visual effects

## 📁 File Structure

```
contexts/
├── ThemeContext.tsx          # Global theme context and provider

components/
├── ThemeToggle.tsx           # Enhanced animated theme toggle button
├── Navbar.tsx                # Updated navbar with theme toggle integration
├── Footer.tsx                # Theme-aware footer component
└── [other components]        # All components use theme-aware classes

app/
├── layout.tsx                # Root layout with ThemeProvider wrapper
├── page.tsx                  # Updated page with theme-aware components
└── globals.css              # Theme CSS variables and utilities

public/
└── [static assets]          # Images and other static assets
```

## 🛠️ Implementation Details

### 1. ThemeContext / ThemeProvider

**File**: `contexts/ThemeContext.tsx`

```typescript
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Apply theme to HTML element with transition
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    
    // Add transition class for smooth theme switching
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      
      // Reset transition after theme change
      setTimeout(() => {
        document.documentElement.style.transition = '';
        setIsTransitioning(false);
      }, 300);
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

**Key Features:**
- **localStorage Persistence**: Theme preference is saved and restored
- **System Preference Detection**: Detects user's system theme preference
- **Smooth Transitions**: Manages transition states during theme changes
- **Context Safety**: Throws error if used outside ThemeProvider

### 2. Root Layout with ThemeProvider

**File**: `app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhichFloor - Commercial Real Estate & Coworking Spaces",
  description: "Find your perfect commercial property or coworking space...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 transition-colors duration-300`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Key Features:**
- **ThemeProvider Wrapper**: Wraps entire application with theme context
- **Transition Classes**: Base transition classes for smooth theme changes
- **HTML Attributes**: `suppressHydrationWarning` prevents hydration mismatches

### 3. Enhanced Theme Toggle Component

**File**: `components/ThemeToggle.tsx`

The theme toggle button includes:
- **Animated Icons**: Sun and Moon icons with smooth transitions
- **Visual Effects**: Sparkles, particles, and magnetic hover effects
- **State Management**: Disabled during transitions to prevent conflicts
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Smooth Animations**: Uses Framer Motion for fluid animations

### 4. Updated Navbar with Theme Integration

**File**: `components/Navbar.tsx`

Key updates:
- **Theme Toggle Integration**: Seamlessly integrated ThemeToggle component
- **Theme-Aware Classes**: Uses CSS variables for colors
- **Glass Morphism**: Uses backdrop blur with theme-aware backgrounds
- **Smooth Transitions**: All interactive elements have theme transitions

Example theme-aware navbar styling:
```typescript
className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border transition-all duration-300"
```

### 5. Hero Section - Theme-Immune Design

**File**: `app/page.tsx` - HeroSection Component

```typescript
const HeroSection = () => {
  return (
    <section className="hero-section relative h-[100vh] min-h-[700px] w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Hero content with fixed dark theme styling */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="hero-background.jpg" 
          alt="Modern Office Building" 
          fill 
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>
      
      {/* Hero content with fixed colors */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
        Which floor are you looking at?
      </h1>
      
      {/* Search components with fixed dark styling */}
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 md:p-8">
        {/* Form elements with fixed dark theme colors */}
      </div>
    </section>
  );
};
```

**Protection Strategy:**
- **CSS Class Isolation**: Uses `hero-section` class for CSS overrides
- **Fixed Color Values**: Uses hardcoded dark colors instead of CSS variables
- **CSS Overrides**: Global CSS rules force hero section colors

### 6. Global CSS Theme Variables

**File**: `app/globals.css`

```css
:root {
  /* Light theme colors */
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #facc15;
  --primary-foreground: #000000;
  --secondary: #f8fafc;
  --secondary-foreground: #0f172a;
  --accent: #f1f5f9;
  --accent-foreground: #334155;
  --muted: #f8fafc;
  --muted-foreground: #64748b;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #facc15;
  --card: #ffffff;
  --card-foreground: #0a0a0a;
}

.dark {
  /* Dark theme colors */
  --background: #0a0a0a;
  --foreground: #f8fafc;
  --primary: #facc15;
  --primary-foreground: #000000;
  --secondary: #1e293b;
  --secondary-foreground: #f8fafc;
  --accent: #334155;
  --accent-foreground: #e2e8f0;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --border: #334155;
  --input: #334155;
  --ring: #facc15;
  --card: #1e293b;
  --card-foreground: #f8fafc;
}

/* Hero Section Protection - Force fixed dark colors */
.hero-section {
  /* Override any theme variables that might affect hero section */
  --hero-bg: #111827 !important;
  --hero-bg-gradient: #1f2937 !important;
  --hero-text: #ffffff !important;
  --hero-text-secondary: #d1d5db !important;
  --hero-border: #374151 !important;
  --hero-primary: #facc15 !important;
}

.hero-section * {
  /* Force specific colors for all elements in hero */
  background: var(--hero-bg) !important;
  color: var(--hero-text) !important;
}
```

### 7. Theme-Aware Component Examples

**Example 1: Card Component**
```typescript
const ThemeAwareCard = ({ children, className = "" }) => (
  <div className={`bg-card border border-border rounded-xl p-6 transition-colors duration-300 ${className}`}>
    {children}
  </div>
);
```

**Example 2: Button Component**
```typescript
const ThemeAwareButton = ({ children, variant = "primary", ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};
```

**Example 3: Navigation Component**
```typescript
const ThemeAwareNav = () => (
  <nav className="bg-background/95 backdrop-blur-lg border-b border-border transition-colors duration-300">
    <ul className="flex space-x-8">
      <li><a href="/properties" className="text-muted-foreground hover:text-primary transition-colors">Properties</a></li>
      <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
    </ul>
  </nav>
);
```

## 🎨 Theme-Aware CSS Classes Reference

### Background Colors
- `bg-background` - Main background (white/dark)
- `bg-card` - Card backgrounds (white/dark)
- `bg-muted` - Muted backgrounds (light gray/dark gray)
- `bg-secondary` - Secondary backgrounds
- `bg-accent` - Accent backgrounds

### Text Colors
- `text-foreground` - Primary text (black/white)
- `text-muted-foreground` - Secondary text (gray/light gray)
- `text-primary` - Primary brand color (yellow)

### Border Colors
- `border-border` - Default borders
- `border-primary` - Primary brand borders

### Interactive States
- `hover:text-primary` - Hover text color
- `hover:border-primary` - Hover border color
- `hover:bg-primary` - Hover background color

### Glass Morphism
- `backdrop-blur-lg` - Blur effect
- `bg-background/95` - Semi-transparent background

## 🔧 Usage Guide

### Using the Theme Context

```typescript
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  
  return (
    <div className="theme-aware-container">
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme} disabled={isTransitioning}>
        Toggle Theme
      </button>
    </div>
  );
};
```

### Making Components Theme-Aware

```typescript
// ✅ DO: Use CSS variables
const GoodComponent = () => (
  <div className="bg-background text-foreground border-border">
    Content
  </div>
);

// ❌ DON'T: Use hardcoded colors
const BadComponent = () => (
  <div className="bg-white text-black border-gray-200">
    Content
  </div>
);
```

### Protecting Components from Themes

```typescript
// For components that should never change with theme
const ThemeProtectedComponent = () => (
  <div className="hero-section"> {/* This ensures fixed styling */}
    {/* All internal styling uses fixed colors */}
    <div className="bg-black text-white"> {/* Fixed colors */}
  </div>
);
```

## 🚀 Benefits

1. **Consistent Experience**: All components respond to theme changes uniformly
2. **Hero Section Integrity**: Hero maintains its visual identity regardless of theme
3. **Performance**: Efficient context-based state management
4. **Accessibility**: Proper contrast ratios for both themes
5. **User Preference**: Respects user's system theme preference
6. **Smooth Transitions**: All theme changes are animated
7. **Persistence**: Theme preference is saved across sessions
8. **Developer Experience**: Easy to make components theme-aware

## 🧪 Testing

### Manual Testing Checklist

1. **Theme Toggle Functionality**
   - [ ] Toggle button works in both desktop and mobile navbar
   - [ ] Theme changes apply to all components except Hero
   - [ ] Transitions are smooth and not jarring
   - [ ] Theme persists after page reload

2. **Hero Section Integrity**
   - [ ] Hero section maintains dark styling in both themes
   - [ ] Hero background image remains consistent
   - [ ] Hero text colors stay fixed
   - [ ] Hero form elements maintain dark theme

3. **Component Responsiveness**
   - [ ] Navbar adapts to theme changes
   - [ ] Cards change colors appropriately
   - [ ] Footer adjusts to theme
   - [ ] All text becomes readable in both themes

4. **Performance**
   - [ ] No layout shifts during theme changes
   - [ ] Smooth transitions without lag
   - [ ] No flash of incorrect theme on load

## 🔄 Migration Guide

### For Existing Components

1. **Replace hardcoded colors with CSS variables:**
   ```css
   /* Before */
   .component { background: #ffffff; color: #000000; }
   
   /* After */
   .component { background: var(--background); color: var(--foreground); }
   ```

2. **Add transition classes:**
   ```typescript
   className="transition-colors duration-300"
   ```

3. **Test component in both themes**

### For New Components

1. **Always use theme-aware classes**
2. **Add smooth transitions**
3. **Test in both light and dark themes**
4. **Ensure proper contrast ratios**

## 📝 Summary

This implementation provides a robust, scalable theme system that:

- ✅ **Applies to entire app** - All components respond to theme changes
- ✅ **Protects Hero section** - Hero maintains fixed dark styling
- ✅ **Smooth transitions** - All theme changes are animated
- ✅ **LocalStorage persistence** - Theme preference is saved
- ✅ **Theme-aware components** - All components use CSS variables
- ✅ **Developer-friendly** - Easy to add theme support to new components
- ✅ **Performance optimized** - Efficient context-based state management
- ✅ **Accessibility compliant** - Proper contrast ratios maintained

The system is production-ready and provides an excellent user experience while maintaining the design integrity of the Hero section.