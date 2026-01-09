import { StitchHero } from "@/components/home/StitchHero";
import { StitchTrending } from "@/components/home/StitchTrending";
import { StitchShopByVibe } from "@/components/home/StitchShopByVibe";
import { StitchNewsletter } from "@/components/home/StitchNewsletter";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const trendingProducts = await prisma.product.findMany({
    take: 4,
    include: {
      variants: true,
      category: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <StitchHero />
      <StitchTrending products={trendingProducts} />
      <StitchShopByVibe />
      <StitchNewsletter />
    </div>
  );
}
