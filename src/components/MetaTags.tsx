import React, { useEffect } from 'react';
// The purpose-built 1200x630 card in public/. The Figma asset previously used
// here was a 1000x1000 square, which contradicted the og:image:width/height
// declared below and got cropped unpredictably by every scraper.
const ogImage = '/og-image.png';

export function MetaTags() {
  useEffect(() => {
    // Set page title
    document.title = 'VibeCafe - Lofi Music & Ambient Sounds';

    // Get the full URL of the OG image
    const ogImageUrl = new URL(ogImage, window.location.origin).href;

    // Create or update meta tags
    const metaTags = [
      // Primary Meta Tags
      { name: 'title', content: 'VibeCafe - Lofi Music & Ambient Sounds' },
      { name: 'description', content: 'Immerse yourself in lofi beats with animated cafe scenes, ambient sounds, and customizable playlists. Perfect for studying, working, or relaxing.' },
      { name: 'keywords', content: 'lofi, lofi music, ambient sounds, study music, relax, chill beats, cafe ambience, animated wallpaper' },
      
      // Open Graph / Facebook
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:title', content: 'VibeCafe - Lofi Music & Ambient Sounds' },
      { property: 'og:description', content: 'Immerse yourself in lofi beats with animated cafe scenes, ambient sounds, and customizable playlists. Perfect for studying, working, or relaxing.' },
      { property: 'og:image', content: ogImageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'VibeCafe - Lofi Music Player with Sunset Beach Scene' },
      { property: 'og:site_name', content: 'VibeCafe' },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: window.location.href },
      { name: 'twitter:title', content: 'VibeCafe - Lofi Music & Ambient Sounds' },
      { name: 'twitter:description', content: 'Immerse yourself in lofi beats with animated cafe scenes, ambient sounds, and customizable playlists. Perfect for studying, working, or relaxing.' },
      { name: 'twitter:image', content: ogImageUrl },
      { name: 'twitter:image:alt', content: 'VibeCafe - Lofi Music Player with Sunset Beach Scene' },
      
      // Additional Meta Tags
      { name: 'theme-color', content: '#8B5CF6' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: 'VibeCafe' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? 'name' : 'property';
      const attributeValue = name || property;
      
      // Check if tag already exists
      let tag = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      
      if (!tag) {
        // Create new tag
        tag = document.createElement('meta');
        tag.setAttribute(attribute, attributeValue!);
        document.head.appendChild(tag);
      }
      
      // Set content
      tag.setAttribute('content', content);
    });

    // Add link tags for app icons
    const linkTags = [
      { rel: 'icon', type: 'image/png', href: ogImageUrl },
      { rel: 'apple-touch-icon', href: ogImageUrl },
    ];

    linkTags.forEach(({ rel, type, href }) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        if (type) link.type = type;
        document.head.appendChild(link);
      }
      
      link.href = href;
    });

  }, []);

  return null; // This component doesn't render anything
}
