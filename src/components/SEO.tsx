import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  twitterHandle?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "BeeBuzz - Creative Agency",
  description = "Execution partners for brands who care about conversions, not just creatives. We partner with startups, brands, and VCs to build video systems across post, 3D, and AI that drive real performance.",
  keywords = "video production, creative agency, post production, 3D animation, AI video, brand videos, startup videos, marketing videos, video marketing, creative services, video systems",
  image = "https://beebuzz.co.in/assets/og-image.jpg",
  url = "https://beebuzz.co.in",
  type = "website",
  siteName = "BeeBuzz",
  twitterHandle = "@beebuzz"
}) => {
  const fullTitle = title.includes("BeeBuzz") ? title : `${title} | BeeBuzz`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content={twitterHandle} />
      <meta property="twitter:site" content={twitterHandle} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
