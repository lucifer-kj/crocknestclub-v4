import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Seeding database...")

    // Clean up existing data
    try {
        await prisma.review.deleteMany()
        await prisma.cartItem.deleteMany()
        await prisma.cart.deleteMany()
        await prisma.variant.deleteMany()
        await prisma.product.deleteMany()
        await prisma.category.deleteMany()
    } catch (e) {
        console.warn("Error clearing data (tables might differ):", e)
    }

    // Create Categories
    const tees = await prisma.category.create({
        data: { name: "Tees", slug: "tees" },
    })
    const hoodies = await prisma.category.create({
        data: { name: "Hoodies", slug: "hoodies" },
    })
    const accessories = await prisma.category.create({
        data: { name: "Accessories", slug: "accessories" },
    })

    // Create Products
    const crocknestTee = await prisma.product.create({
        data: {
            title: "Crocknest Tee",
            description: "Premium heavy-weight cotton tee with puff print logo.",
            basePrice: 45.00,
            scarcityLevel: "MEDIUM",
            categoryId: tees.id,
            images: ["/placeholder-tee.jpg"],
            variants: {
                create: [
                    { size: "S", color: "Black", sku: "CROCK-TEE-BLK-S", stock: 10 },
                    { size: "M", color: "Black", sku: "CROCK-TEE-BLK-M", stock: 20 },
                    { size: "L", color: "Black", sku: "CROCK-TEE-BLK-L", stock: 15 },
                ]
            }
        },
    })

    const clubHoodie = await prisma.product.create({
        data: {
            title: "Club Hoodie",
            description: "Oversized fit hoodie. Ultimate comfort.",
            basePrice: 85.00,
            scarcityLevel: "HIGH",
            categoryId: hoodies.id,
            images: ["/placeholder-hoodie.jpg"],
            variants: {
                create: [
                    { size: "M", color: "Charcoal", sku: "CLUB-HOOD-CHAR-M", stock: 5 },
                    { size: "L", color: "Charcoal", sku: "CLUB-HOOD-CHAR-L", stock: 5 },
                ]
            }
        },
    })

    console.log("Seeded:", { tees: tees.name, hoodies: hoodies.name })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
