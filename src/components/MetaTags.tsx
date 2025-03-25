
import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
  structuredData?: Record<string, any>;
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
    "performance optimization"
  ],
  ogImage = "/lovable-uploads/503bc110-8232-4e3e-8caa-a8ef73ade003.png",
  ogUrl = "https://snaillydevs.com",
  structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "SnaillyDevs",
    "url": "https://snaillydevs.com",
    "image": "/lovable-uploads/503bc110-8232-4e3e-8caa-a8ef73ade003.png",
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
    "description": "Portfolio of a passionate code alchemist specializing in creating immersive digital experiences with neural network topologies and quantum circuit design."
  }
}) => {
  const formattedKeywords = keywords.join(", ");
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={formattedKeywords} />
      <meta name="author" content="SnaillyDevs" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
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
      
      {/* Preconnect to essential domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default MetaTags;
