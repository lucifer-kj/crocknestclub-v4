import { Hero } from "@/components/home/Hero";
import { FeaturedDrops } from "@/components/home/FeaturedDrops";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedDrops />
    </div>
  );
}
