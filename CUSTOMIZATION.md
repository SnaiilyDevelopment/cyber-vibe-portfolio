
# Portfolio Customization Guide

This guide will help you customize the portfolio website to make it your own. Follow these steps to update content, styles, and personal information.

## Table of Contents
1. [Personal Information](#personal-information)
2. [Social Media Links](#social-media-links)
3. [Projects](#projects)
4. [Skills](#skills)
5. [Navbar](#navbar)
6. [Styling](#styling)
7. [Advanced Customization](#advanced-customization)

## Personal Information

### Update Your Name and Brand
1. Open `src/components/Navbar.tsx`
2. Find the `LogoAnimation` component and update the `brandName` constant:
   ```typescript
   const brandName = "YourName"; // Replace with your name or brand
   ```

3. Open `src/components/Hero.tsx`
4. Update your name, title, and introduction text.

### Update Profile Image
1. Add your profile image to the `public` folder
2. Update the image path in `src/components/About.tsx`

## Social Media Links

1. Open `src/components/Footer.tsx`
2. Find the social media links section and update the URLs:
   ```typescript
   const socialLinks = [
     { icon: Github, url: "https://github.com/yourusername" },
     { icon: Linkedin, url: "https://linkedin.com/in/yourusername" },
     { icon: Twitter, url: "https://twitter.com/yourusername" },
     // Add or remove social platforms as needed
   ];
   ```

3. You can also update the contact email in the Footer component.

## Projects

### Using Supabase Database (Recommended)
The portfolio uses Supabase to store and retrieve project data. To update your projects:

1. Login to your Supabase account
2. Navigate to the `projects` table
3. Add or edit projects with the following fields:
   - `id`: Unique identifier (auto-generated)
   - `title`: Project title
   - `description`: Brief project description
   - `image_url`: URL to project screenshot/image
   - `technologies`: Array of technologies used (relates to project_technologies table)
   - `live_demo_url`: URL to live demo (optional)
   - `github_url`: URL to GitHub repository (optional)
   - `featured`: Boolean to mark featured projects

4. Update the `project_technologies` table to define technologies used in each project:
   - `id`: Unique identifier
   - `project_id`: Reference to the project
   - `technology`: Name of the technology

### Using Local Fallback Data
If you're not using Supabase, you can update the fallback project data:

1. Open `src/hooks/useProjects.ts`
2. Find the fallback projects array and update with your own projects:
   ```typescript
   setProjects([
     {
       id: '1',
       title: "Your Project Name",
       description: "Your project description...",
       image_url: "path/to/your/image.jpg",
       technologies: ["Technology1", "Technology2"],
       live_demo_url: "https://yourproject.com",
       github_url: "https://github.com/yourusername/project",
       featured: true,
     },
     // Add more projects...
   ]);
   ```

## Skills

1. Open `src/components/Skills.tsx`
2. Update the skills data with your own skills and expertise levels.

## Navbar

1. Open `src/components/Navbar.tsx`
2. Update the navigation items array to customize your menu:
   ```typescript
   const navItems = [
     { name: 'Home', href: '#hero' },
     { name: 'About', href: '#about' },
     { name: 'Skills', href: '#skills' },
     { name: 'Projects', href: '#projects' },
     // Add or remove menu items as needed
   ];
   ```

## Styling

### Colors
The portfolio uses a cyberpunk-inspired color scheme. To change the colors:

1. Open `tailwind.config.ts`
2. Find the `cyber` colors section and update with your preferred colors:
   ```typescript
   'cyber': {
     'dark': '#0F0E17',     // Background color
     'purple': '#7B5EA7',   // Accent color 1
     'blue': '#4361EE',     // Accent color 2
     'neon': '#00F5FF',     // Highlight color
     'pink': '#FF3864',     // Accent color 3
     'accent': '#FFD166'    // Secondary highlight
   }
   ```

### Fonts
1. Open `tailwind.config.ts`
2. Update the fontFamily section with your preferred fonts:
   ```typescript
   fontFamily: {
     sans: ['Your Primary Font', 'sans-serif'],
     mono: ['Your Monospace Font', 'monospace'],
   }
   ```
3. Make sure to also update the font imports in `src/index.css`

## Advanced Customization

### Adding New Sections
1. Create a new component in the `src/components` directory
2. Import and add the component to `src/pages/Index.tsx`
3. Add a corresponding navigation item in `src/components/Navbar.tsx`

### Customizing Animations
1. Open the component file you want to modify
2. Find the `framer-motion` animation properties and update them according to your preferences

### Performance Analytics
The performance analytics feature uses mock data for demonstration. To connect it to real analytics:

1. Implement a proper analytics tracking solution
2. Update the data retrieval logic in the analytics components

---

## Need More Help?
For more advanced customization, you can modify the React components directly. Each component is designed to be modular and self-contained.

If you run into any issues, check the React and Framer Motion documentation, or consider hiring a developer for complex modifications.
