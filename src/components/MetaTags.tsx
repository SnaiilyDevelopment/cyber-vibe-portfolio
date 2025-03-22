
import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = "SnaillyDevs | Code Developer",
  description = "Portfolio of a passionate code developer specializing in creating immersive digital experiences with modern web technologies.",
  keywords = [
    "web developer", 
    "frontend developer", 
    "React developer", 
    "TypeScript",
    "Three.js", 
    "creative coding", 
    "portfolio", 
    "3D web",
    "interactive websites",
    "UI/UX",
    "performance optimization"
  ],
  ogImage = "/lovable-uploads/503bc110-8232-4e3e-8caa-a8ef73ade003.png",
  ogUrl = "https://snaillydevs.com"
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
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6A1B9A" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={ogUrl} />
    </Helmet>
  );
};

export default MetaTags;
