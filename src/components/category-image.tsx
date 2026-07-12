import { useState } from "react";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&h=900&q=84`;

const categoryImages: Record<string, string> = {
  knit: unsplash("photo-1521572163474-6864f9cf17ab"),
  "knit-men": unsplash("photo-1617137968427-85924c800a22"),
  "knit-women": unsplash("photo-1515886657613-9f3515b0c78f"),
  "knit-kids": unsplash("photo-1503919545889-aef636e10ad4"),
  woven: unsplash("photo-1598033129183-c4f50c736f10"),
  "woven-men": unsplash("photo-1507679799987-c73779587ccf"),
  "woven-women": unsplash("photo-1485968579580-b6d095142e6e"),
  "woven-kids": unsplash("photo-1519238263530-99bdd11df2ea"),
  others: unsplash("photo-1521369909029-2afed882baee"),
  "others-men": unsplash("photo-1516762689617-e1cffcef479d"),
  "others-women": unsplash("photo-1505693416388-ac5ce068fe85"),
  "others-kids": unsplash("photo-1514090458221-65bb69cf63e6"),
  mens: "/images/categories/mens-polo-shirt.png",
  "men-s": "/images/categories/mens-polo-shirt.png",
  "men-s-sleepwear": "/images/categories/mens-sleepwear.png",
  "men-s-light-knit": "/images/categories/mens-light-knit.png",
  "men-s-polo-shirt": "/images/categories/mens-polo-shirt.png",
  "men-s-heavy-knit": "/images/categories/mens-heavy-knit.png",
  "men-s-boxer": "/images/categories/mens-boxer.png",
  "women-s": "/images/categories/womens-tops.png",
  "women-s-sweat": "/images/categories/womens-sweat.png",
  "women-s-top-s": "/images/categories/womens-tops.png",
  "women-s-heavy-kint": "/images/categories/womens-heavy-knit.png",
  "women-s-sleepwear": "/images/categories/womens-sleepwear.png",
  "kid-s": "/images/categories/kids-heavy-knit.png",
  "boy-s-t-shirt": "/images/categories/boys-tshirt.png",
  "girls-dress": "/images/categories/girls-dress.png",
  "kid-s-heavy-kint": "/images/categories/kids-heavy-knit.png",
};

export function getCategoryImage(slug: string, parentSlug?: string) {
  return categoryImages[slug] ?? categoryImages[parentSlug ?? ""] ?? categoryImages.others;
}

export function ImageWithSkeleton({
  src,
  alt,
  className = "",
  imageClassName = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-neutral-200 ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-r from-neutral-200 via-white/80 to-neutral-200 bg-[length:200%_100%] transition-opacity duration-500 motion-safe:animate-pulse ${loaded ? "opacity-0" : "opacity-100"}`}
      />
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full transition duration-700 ${loaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"} ${imageClassName}`}
      />
    </div>
  );
}
