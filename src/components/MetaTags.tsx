
import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
  structuredData?: Record<string, any>;
  type?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = "SnaillyDevs | Code Alchemist",
  description = "Portfolio of a passionate code alchemist specializing in creating immersive digital experiences with neural network topologies and quantum circuit design.",
  keywords = [
    "code alchemist", 
    "digital artistry", 
    "React developer", 
    "TypeScript",
    "Three.js", 
    "creative coding", 
    "portfolio", 
    "3D web",
    "interactive experiences",
    "neural networks",
    "quantum circuits",
    "cyberpunk design",
    "immersive web",
    "GSAP animations",
    "performance optimization",
    "WebGL",
    "TensorFlow.js",
    "machine learning visualization"
  ],
  ogImage = "/lovable-uploads/aa6d2e9f-e481-4679-bd22-fb73a40246b5.png",
  ogUrl = "https://snaillydevs.com",
  structuredData,
  type = "website"
}) => {
  const formattedKeywords = keywords.join(", ");
  
  // Default structured data if none provided
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "SnaillyDevs",
    "url": "https://snaillydevs.com",
    "image": ogImage,
    "sameAs": [
      "https://github.com/snaillydevs",
      "https://twitter.com/snaillydevs",
      "https://linkedin.com/in/snaillydevs"
    ],
    "jobTitle": "Code Alchemist",
    "worksFor": {
      "@type": "Organization",
      "name": "Digital Alchemy Labs"
    },
    "description": description,
    "knowsAbout": [
      "React",
      "Three.js",
      "WebGL",
      "TensorFlow.js",
      "Machine Learning Visualization",
      "Interactive 3D Graphics",
      "Frontend Development",
      "Creative Coding"
    ]
  };
  
  // Portfolio collection structured data
  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "SnaillyDevs Portfolio Projects",
    "description": "A collection of innovative web projects focusing on interactive visualizations and creative coding",
    "url": "https://snaillydevs.com/#projects",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": "https://snaillydevs.com/#projects",
          "item": {
            "@type": "SoftwareApplication",
            "name": "Neural Network Visualizer",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web Browser",
            "description": "Interactive 3D visualization of neural networks that helps explain machine learning concepts in an intuitive way."
          }
        }
      ]
    }
  };
  
  // Combine all structured data
  const allStructuredData = [
    defaultStructuredData,
    portfolioStructuredData,
    structuredData
  ].filter(Boolean);
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={formattedKeywords} />
      <meta name="author" content="SnaillyDevs" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="SnaillyDevs Portfolio" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:creator" content="@snaillydevs" />
      
      {/* Additional Meta Tags for SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6A1B9A" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={ogUrl} />
      
      {/* Preload critical resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preload" as="image" href={ogImage} />
      
      {/* Structured Data for Rich Snippets */}
      {allStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default MetaTags;
