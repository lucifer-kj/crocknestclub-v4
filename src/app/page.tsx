import { StitchHero } from "@/components/home/StitchHero";
import { StitchTrending } from "@/components/home/StitchTrending";
import { StitchShopByVibe } from "@/components/home/StitchShopByVibe";
import { StitchNewsletter } from "@/components/home/StitchNewsletter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <StitchHero />
      <StitchTrending />
      <StitchShopByVibe />
      <StitchNewsletter />
    </div>
  );
}
