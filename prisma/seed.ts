import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed cities
  const cities = [
    { name: "Los Angeles", state: "CA", country: "USA" },
    { name: "San Francisco", state: "CA", country: "USA" },
    { name: "Portland", state: "OR", country: "USA" },
    { name: "Seattle", state: "WA", country: "USA" },
    { name: "Austin", state: "TX", country: "USA" },
    { name: "Nashville", state: "TN", country: "USA" },
    { name: "New York", state: "NY", country: "USA" },
    { name: "Brooklyn", state: "NY", country: "USA" },
    { name: "Chicago", state: "IL", country: "USA" },
    { name: "Denver", state: "CO", country: "USA" },
  ];

  for (const city of cities) {
    await prisma.city.upsert({
      where: {
        id: `seed-${city.name.toLowerCase().replace(/\s+/g, "-")}`,
      },
      update: {},
      create: {
        id: `seed-${city.name.toLowerCase().replace(/\s+/g, "-")}`,
        ...city,
      },
    });
    console.log(`✓ Created city: ${city.name}, ${city.state}`);
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

