import { Hero } from "@/components/home/Hero";
import { FeaturedDrops } from "@/components/home/FeaturedDrops";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedDrops />
      <RecentlyViewed />
    </div>
  );
}
