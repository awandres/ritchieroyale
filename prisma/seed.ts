import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@ritchieroyale.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        id: "seed-admin",
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`✓ Created admin user: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log(`  ⚠️  CHANGE THIS PASSWORD IMMEDIATELY!`);
  } else {
    console.log(`✓ Admin user already exists: ${adminEmail}`);
  }

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

