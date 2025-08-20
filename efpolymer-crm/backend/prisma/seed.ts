import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create users
  const adminPasswordHash = await argon2.hash('ChangeMe!123', {
    type: argon2.argon2id,
    memoryCost: 196608, // 192 MiB
    timeCost: 3,
    parallelism: 1,
  })

  const salesPasswordHash = await argon2.hash('ChangeMe!123', {
    type: argon2.argon2id,
    memoryCost: 196608, // 192 MiB
    timeCost: 3,
    parallelism: 1,
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@local' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@local',
      role: 'admin',
      locale: 'en',
      timeZone: 'UTC',
      passwordHash: adminPasswordHash,
      isActive: true,
    },
  })

  const salesUser = await prisma.user.upsert({
    where: { email: 'sales@local' },
    update: {},
    create: {
      name: 'Sales User',
      email: 'sales@local',
      role: 'sales',
      locale: 'en',
      timeZone: 'UTC',
      passwordHash: salesPasswordHash,
      isActive: true,
    },
  })

  // Create sample accounts
  const account1 = await prisma.account.create({
    data: {
      name: 'Finca Sol de Almería',
      type: 'farmer',
      region: 'Andalusia',
      segment: 'horticulture',
      size: 'medium',
      website: 'https://fincasol.example.com',
      notes: 'Leading tomato grower in the region. Interested in water-saving solutions.',
      tags: '["sustainable", "tomatoes", "greenhouse"]',
    },
  })

  const account2 = await prisma.account.create({
    data: {
      name: 'IrrigaDistrib SL',
      type: 'distributor',
      region: 'Andalusia',
      segment: 'distribution',
      size: 'large',
      website: 'https://irrigadistrib.example.com',
      notes: 'Major irrigation equipment distributor. Potential partner for EF Polymer.',
      tags: '["distribution", "irrigation", "partner"]',
    },
  })

  // Create contacts
  const contact1 = await prisma.contact.create({
    data: {
      accountId: account1.id,
      firstName: 'María',
      lastName: 'González',
      title: 'Farm Manager',
      email: 'maria.gonzalez@fincasol.example.com',
      phone: '+34 600 123 456',
      locale: 'es',
      consentEmail: true,
      consentDate: new Date(),
      notes: 'Primary contact for technical discussions.',
    },
  })

  const contact2 = await prisma.contact.create({
    data: {
      accountId: account2.id,
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      title: 'Sales Director',
      email: 'carlos.rodriguez@irrigadistrib.example.com',
      phone: '+34 600 789 012',
      locale: 'es',
      consentEmail: true,
      consentDate: new Date(),
      notes: 'Decision maker for new product partnerships.',
    },
  })

  // Create opportunities
  const opportunity1 = await prisma.opportunity.create({
    data: {
      accountId: account1.id,
      name: 'Almería tomato fields 2025',
      stage: 'trial_planned',
      currency: 'EUR',
      amount: 35000,
      probability: 75,
      expectedClose: new Date('2025-03-01'),
      ownerId: salesUser.id,
      useCase: 'Water conservation in greenhouse tomato production',
      efpSoilType: 'sandy',
      efpClimateZone: 'semi-arid',
      efpCrop: 'tomato',
      efpIrrigation: 'drip',
      efpApplication: 'in-furrow',
      efpDosageKgHa: 15,
      efpExpectedWaterSavingsPct: 25,
      efpExpectedYieldUpliftPct: 8,
      efpExpectedROI: 2.5,
      tags: '["high-value", "greenhouse", "water-savings"]',
    },
  })

  // Create products
  const product1 = await prisma.product.create({
    data: {
      sku: 'EFP-001',
      name: 'EF Polymer Soil Conditioner 25kg',
      packageSizeKg: 25,
      description: 'Premium organic hydrogel made from fruit peels for soil water retention.',
      active: true,
    },
  })

  const product2 = await prisma.product.create({
    data: {
      sku: 'EFP-002',
      name: 'EF Polymer Hydrogel 10kg',
      packageSizeKg: 10,
      description: 'Concentrated organic hydrogel for small-scale applications.',
      active: true,
    },
  })

  // Create price tiers
  await prisma.priceTier.createMany({
    data: [
      {
        productId: product1.id,
        region: 'EU',
        currency: 'EUR',
        minQty: 1,
        unitPrice: 85.00,
        validFrom: new Date('2025-01-01'),
      },
      {
        productId: product1.id,
        region: 'EU',
        currency: 'EUR',
        minQty: 10,
        unitPrice: 78.00,
        validFrom: new Date('2025-01-01'),
      },
      {
        productId: product2.id,
        region: 'EU',
        currency: 'EUR',
        minQty: 1,
        unitPrice: 42.00,
        validFrom: new Date('2025-01-01'),
      },
    ],
  })

  // Create trial
  const trial1 = await prisma.trial.create({
    data: {
      opportunityId: opportunity1.id,
      siteName: 'Greenhouse Block A',
      locationLat: 36.8381,
      locationLng: -2.4597,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-05-01'),
      protocolVersion: 'EFP-TRIAL-v2.1',
      hasControl: true,
      status: 'planned',
      notes: 'Trial comparing control vs EF Polymer treated plots in tomato greenhouse.',
    },
  })

  // Create activities
  await prisma.activity.createMany({
    data: [
      {
        relatedType: 'opportunity',
        relatedId: opportunity1.id,
        type: 'call',
        subject: 'Initial discussion about EF Polymer benefits',
        dueAt: new Date('2025-01-15'),
        ownerId: salesUser.id,
        notes: 'Scheduled call to discuss water savings potential and trial setup.',
      },
      {
        relatedType: 'trial',
        relatedId: trial1.id,
        type: 'visit',
        subject: 'Site visit for trial setup',
        dueAt: new Date('2025-01-30'),
        ownerId: salesUser.id,
        location: 'Finca Sol de Almería, Andalusia',
        notes: 'On-site visit to set up trial plots and train local team.',
      },
    ],
  })

  console.log('✅ Seed data created successfully!')
  console.log(`👤 Admin user: admin@local / ChangeMe!123`)
  console.log(`👤 Sales user: sales@local / ChangeMe!123`)
  console.log(`🏢 Created ${await prisma.account.count()} accounts`)
  console.log(`👥 Created ${await prisma.contact.count()} contacts`)
  console.log(`🎯 Created ${await prisma.opportunity.count()} opportunities`)
  console.log(`🧪 Created ${await prisma.trial.count()} trials`)
  console.log(`📦 Created ${await prisma.product.count()} products`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })