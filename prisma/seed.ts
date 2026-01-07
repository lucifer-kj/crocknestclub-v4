import { PrismaClient, ScarcityLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Cleanup
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test Customer',
      role: 'USER',
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@crocknest.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Apparel', slug: 'apparel' } }),
    prisma.category.create({ data: { name: 'Accessories', slug: 'accessories' } }),
    prisma.category.create({ data: { name: 'Digital', slug: 'digital' } }),
    prisma.category.create({ data: { name: 'Collectibles', slug: 'collectibles' } }),
  ]);

  const [apparel, accessories, digital, collectibles] = categories;

  // Products Data
  const products = [
    // Apparel (10 items)
    {
      title: 'Acid Glitch Tee',
      description: 'Heavyweight cotton tee with distorted reality print. 100% Cotton. Oversized fit.',
      price: 45.00,
      category: apparel.id,
      images: ['/products/tee-acid-glitch.jpg'],
      scarcity: ScarcityLevel.MEDIUM,
    },
    {
      title: 'Neon Void Hoodie',
      description: 'French terry hoodie in void black with neon piping. Kangaroo pocket. Dropped shoulders.',
      price: 95.00,
      category: apparel.id,
      images: ['/products/hoodie-neon-void.jpg'],
      scarcity: ScarcityLevel.HIGH,
    },
    {
      title: 'Cyber Psychosis Long Sleeve',
      description: 'Mesh panel long sleeve with cybernetic prints. Breathable fabric. Slim fit.',
      price: 60.00,
      category: apparel.id,
      images: ['/products/ls-cyber.jpg'],
      scarcity: ScarcityLevel.MEDIUM,
    },
    {
      title: 'Data Crash Cargo Pants',
      description: 'Tactical cargo pants with excessive pockets and data stream embroidery. Water resistant.',
      price: 120.00,
      category: apparel.id,
      images: ['/products/pants-data.jpg'],
      scarcity: ScarcityLevel.LOW,
    },
    {
      title: 'System Failure Tank',
      description: 'Ribbed tank top with raw hems and "SYSTEM FAILURE" graphic.',
      price: 35.00,
      category: apparel.id,
      images: ['/products/tank-system.jpg'],
      scarcity: ScarcityLevel.MEDIUM,
    },
    {
      title: 'Protocol 0 Crewneck',
      description: 'Premium fleece crewneck featuring Protocol 0 minimalist branding.',
      price: 80.00,
      category: apparel.id,
      images: ['/products/crew-protocol.jpg'],
      scarcity: ScarcityLevel.MEDIUM,
    },
    {
      title: 'Binary Rain Windbreaker',
      description: 'Lightweight windbreaker with matrix-style binary rain pattern. Reflective details.',
      price: 110.00,
      category: apparel.id,
      images: ['/products/jacket-binary.jpg'],
      scarcity: ScarcityLevel.HIGH,
    },
    {
      title: 'Null Pointer Socks',
      description: '3-pack of comfy socks. Null pointer exception logs knitted in.',
      price: 25.00,
      category: apparel.id,
      images: ['/products/socks-null.jpg'],
      scarcity: ScarcityLevel.LOW,
    },
    {
      title: 'Stack Overflow Cap',
      description: 'Structured 6-panel cap with raised embroidery. Adjustable strap.',
      price: 40.00,
      category: apparel.id,
      images: ['/products/cap-stack.jpg'],
      scarcity: ScarcityLevel.MEDIUM,
    },
    {
      title: 'Runtime Error Beanie',
      description: 'Chunky knit beanie with "ERROR" patch. Keeps your head warm while code breaks.',
      price: 30.00,
      category: apparel.id,
      images: ['/products/beanie-error.jpg'],
      scarcity: ScarcityLevel.LOW,
    },

    // Accessories (6 items)
    {
      title: 'Neural Link Totebag',
      description: 'Canvas tote bag with schematic diagrams of a neural link interface.',
      price: 35.00,
      category: accessories.id,
      images: ['/products/tote-neural.jpg'],
      scarcity: ScarcityLevel.MEDIUM,
    },
    {
      title: 'Holo-Sticker Pack',
      description: 'Set of 10 holographic stickers for your laptop or deck.',
      price: 15.00,
      category: accessories.id,
      images: ['/products/stickers-holo.jpg'],
      scarcity: ScarcityLevel.LOW,
    },
    {
      title: 'Cyberdeck Deskmat',
      description: 'XL Deskmat (900x400mm) with retro cyberdeck layout design.',
      price: 50.00,
      category: accessories.id,
      images: ['/products/deskmat-cyber.jpg'],
      scarcity: ScarcityLevel.MEDIUM,
    },
    {
      title: 'Keycap Set: Void',
      description: 'PBT Keycap set for mechanical keyboards. Blank black with neon legends.',
      price: 85.00,
      category: accessories.id,
      images: ['/products/keycaps-void.jpg'],
      scarcity: ScarcityLevel.HIGH,
    },
    {
      title: 'Lanyard: Access Granted',
      description: 'Heavy duty lanyard with "ACCESS GRANTED" print and metal clip.',
      price: 12.00,
      category: accessories.id,
      images: ['/products/lanyard-access.jpg'],
      scarcity: ScarcityLevel.LOW,
    },
    {
      title: 'Phone Case: Circuit',
      description: 'Tough phone case with circuit board traces pattern. MagSafe compatible.',
      price: 40.00,
      category: accessories.id,
      images: ['/products/phone-circuit.jpg'],
      scarcity: ScarcityLevel.MEDIUM,
    },

    // Digital (2 items)
    {
      title: 'Loud Pack V1 (Audio)',
      description: 'Sample pack containing over 200 hard-hitting glitch and bass samples.',
      price: 25.00,
      category: digital.id,
      images: ['/products/digital-loud-v1.jpg'],
      scarcity: ScarcityLevel.LOW,
    },
    {
      title: 'Wallpaper Collection: Dystopia',
      description: '4K/8K Desktop and Mobile wallpapers featuring dystopian cityscapes.',
      price: 10.00,
      category: digital.id,
      images: ['/products/digital-wallpaper.jpg'],
      scarcity: ScarcityLevel.LOW,
    },

    // Collectibles (2 items)
    {
      title: 'Vinyl Figure: The Glitch',
      description: 'Limited edition 6-inch vinyl figure. Glows in the dark.',
      price: 150.00,
      category: collectibles.id,
      images: ['/products/toy-glitch.jpg'],
      scarcity: ScarcityLevel.HIGH,
    },
    {
      title: 'Art Print: Hello World',
      description: 'A3 Giclee print on archival paper. Signed and numbered.',
      price: 75.00,
      category: collectibles.id,
      images: ['/products/print-hello.jpg'],
      scarcity: ScarcityLevel.MEDIUM,
    }
  ];

  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        title: p.title,
        description: p.description,
        basePrice: p.price,
        categoryId: p.category,
        images: p.images,
        scarcityLevel: p.scarcity,
        variants: {
          createMany: {
            data: [
              { size: 'S', color: 'Default', sku: `${p.title.substring(0, 3).toUpperCase()}-S-${Math.floor(Math.random() * 1000)}`, stock: 50 },
              { size: 'M', color: 'Default', sku: `${p.title.substring(0, 3).toUpperCase()}-M-${Math.floor(Math.random() * 1000)}`, stock: 50 },
              { size: 'L', color: 'Default', sku: `${p.title.substring(0, 3).toUpperCase()}-L-${Math.floor(Math.random() * 1000)}`, stock: 50 },
              { size: 'XL', color: 'Default', sku: `${p.title.substring(0, 3).toUpperCase()}-XL-${Math.floor(Math.random() * 1000)}`, stock: 20 },
            ],
          },
        },
      },
    });
    console.log(`Created product: ${product.title}`);
  }

  console.log('✅ Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
