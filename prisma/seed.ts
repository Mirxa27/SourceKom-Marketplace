import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'logistics' },
      update: {},
      create: {
        name: 'Logistics & Supply Chain',
        slug: 'logistics',
        description: 'Transportation, warehousing, and distribution services',
        icon: '🚚'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'legal' },
      update: {},
      create: {
        name: 'Legal & Consultancy',
        slug: 'legal',
        description: 'Legal services, contracts, and business consultancy',
        icon: '⚖️'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'equipment' },
      update: {},
      create: {
        name: 'Equipment & Machinery',
        slug: 'equipment',
        description: 'Industrial equipment, tools, and machinery',
        icon: '⚙️'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'hr' },
      update: {},
      create: {
        name: 'Human Resources',
        slug: 'hr',
        description: 'Recruitment, training, and HR services',
        icon: '👥'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'technology' },
      update: {},
      create: {
        name: 'Technology & IT',
        slug: 'technology',
        description: 'Software, IT services, and digital solutions',
        icon: '💻'
      }
    })
  ])

  console.log(`Created ${categories.length} categories`)

  // Create users
  const adminPassword = await bcrypt.hash('Admin@123', 10)
  const creatorPassword = await bcrypt.hash('Creator@123', 10)
  const userPassword = await bcrypt.hash('User@123', 10)

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sourcekom.com' },
    update: {},
    create: {
      email: 'admin@sourcekom.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isActive: true,
      emailVerified: new Date()
    }
  })

  const creatorUser = await prisma.user.upsert({
    where: { email: 'creator@sourcekom.com' },
    update: {},
    create: {
      email: 'creator@sourcekom.com',
      password: creatorPassword,
      name: 'Sarah Abdullah',
      role: 'CREATOR',
      isActive: true,
      emailVerified: new Date()
    }
  })

  const normalUser = await prisma.user.upsert({
    where: { email: 'user@sourcekom.com' },
    update: {},
    create: {
      email: 'user@sourcekom.com',
      password: userPassword,
      name: 'Mohammed Ali',
      role: 'USER',
      isActive: true,
      emailVerified: new Date()
    }
  })

  console.log('Created users:', { adminUser: adminUser.email, creatorUser: creatorUser.email, normalUser: normalUser.email })

  // Create resources
  const resources = await Promise.all([
    prisma.resource.upsert({
      where: { slug: 'warehouse-jeddah-port' },
      update: {},
      create: {
        title: 'Warehouse Space - Jeddah Port',
        slug: 'warehouse-jeddah-port',
        description: 'Premium warehouse space available near Jeddah Islamic Port. 5000 sqm with modern facilities.',
        category: { connect: { slug: 'logistics' } },
        price: 15000,
        location: 'Jeddah, Saudi Arabia',
        thumbnail: '/images/warehouse-1.jpg',
        author: { connect: { id: creatorUser.id } },
        metadata: JSON.stringify({
          size: '5000 sqm',
          features: ['Climate Control', 'Security 24/7', 'Loading Docks', 'Office Space']
        }) as any,
        isPublished: true
      }
    }),
    prisma.resource.upsert({
      where: { slug: 'legal-contract-services' },
      update: {},
      create: {
        title: 'Business Contract Legal Services',
        slug: 'legal-contract-services',
        description: 'Expert legal services for business contracts, agreements, and compliance in Saudi Arabia.',
        category: { connect: { slug: 'legal' } },
        price: 5000,
        location: 'Riyadh, Saudi Arabia',
        thumbnail: '/images/legal-1.jpg',
        author: { connect: { id: creatorUser.id } },
        metadata: JSON.stringify({
          services: ['Contract Drafting', 'Legal Review', 'Compliance Check', 'Dispute Resolution'],
          languages: ['Arabic', 'English']
        }) as any,
        isPublished: true
      }
    }),
    prisma.resource.upsert({
      where: { slug: 'forklift-rental' },
      update: {},
      create: {
        title: 'Forklift Equipment Rental',
        slug: 'forklift-rental',
        description: 'Heavy-duty forklifts available for short and long-term rental. Various capacities available.',
        category: { connect: { slug: 'equipment' } },
        price: 800,
        location: 'Dammam, Saudi Arabia',
        thumbnail: '/images/forklift-1.jpg',
        author: { connect: { id: creatorUser.id } },
        metadata: JSON.stringify({
          capacity: '5 tons',
          rental: 'per day',
          quantity: 10
        }) as any,
        isPublished: true
      }
    })
  ])

  console.log(`Created ${resources.length} resources`)

  // Create form templates
  const formTemplate = await (prisma as any).formTemplate.upsert({
    where: { slug: 'business-verification-form' },
    update: {},
    create: {
      name: 'Business Verification Form',
      slug: 'business-verification-form',
      type: 'BUSINESS_VERIFICATION',
      description: 'Standard form for business verification and onboarding',
      fields: [
        {
          id: 'business_name',
          type: 'text',
          label: 'Business Name',
          required: true,
          validation: { minLength: 3 }
        },
        {
          id: 'tax_number',
          type: 'text',
          label: 'Tax Number',
          required: true,
          validation: { pattern: '^TAX[0-9]{6}$' }
        },
        {
          id: 'business_type',
          type: 'select',
          label: 'Business Type',
          required: true,
          options: ['Logistics', 'Legal', 'Technology', 'Manufacturing', 'Other']
        }
      ],
      validation: {},
      createdBy: adminUser.id,
      isActive: true,
      category: 'legal'
    }
  })

  console.log('Created form template:', formTemplate.name)

  // Create an agreement
  const agreement = await (prisma as any).agreement.upsert({
    where: { slug: 'standard-service-agreement' },
    update: {},
    create: {
      title: 'Standard Service Agreement',
      slug: 'standard-service-agreement',
      type: 'SERVICE_AGREEMENT',
      templateId: formTemplate.id,
      content: {
        en: 'This is a standard service agreement template...',
        ar: 'هذا نموذج اتفاقية خدمة قياسية...'
      },
      version: '1.0',
      isActive: true,
      isRequired: true,
      createdBy: adminUser.id,
      categoryId: categories.find(c => c.slug === 'legal')?.id
    }
  })

  console.log('Created agreement:', agreement.title)

  // Create a contract
  const contract = await (prisma as any).contract.upsert({
    where: { id: 'contract-logistics-2025' },
    update: {},
    create: {
      id: 'contract-logistics-2025',
      title: 'Logistics Service Contract 2025',
      slug: 'logistics-service-contract-2025',
      type: 'SERVICE_CONTRACT',
      status: 'draft',
      effectiveDate: new Date(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      parties: {
        buyer: { name: 'Tech Solutions Co.', representative: 'Mohammed Ali' },
        seller: { name: 'Al-Riyadh Logistics', representative: 'Sarah Abdullah' }
      },
      terms: {
        payment: '30 days net',
        delivery: 'FOB Jeddah Port',
        warranty: '12 months'
      },
      content: 'Full contract terms and conditions...',
      createdBy: creatorUser.id
    }
  })

  console.log('Created contract:', contract.title)

  // Create notifications
  await prisma.notification.create({
    data: {
      userId: normalUser.id,
      type: 'INFO',
      title: 'Welcome to SourceKom!',
      message: 'Your account has been created successfully. Start exploring resources now.',
      isRead: false
    }
  })

  await prisma.notification.create({
    data: {
      userId: creatorUser.id,
      type: 'SUCCESS',
      title: 'Your resource was approved',
      message: 'Your warehouse space listing has been approved and is now live.',
      isRead: false
    }
  })

  console.log('Created sample notifications')

  // Create AI generation record
  await (prisma as any).aiGeneration?.create?.({
    data: {
      userId: creatorUser.id,
      type: 'CONTRACT_GENERATION',
      prompt: 'Generate a logistics service contract for warehouse rental',
      response: 'Contract generated successfully...',
      metadata: {
        template: 'logistics_service',
        language: 'en'
      },
      provider: 'openai',
      model: 'gpt-4',
      tokensUsed: 1500,
      status: 'completed'
    }
  })

  console.log('Created AI generation record (if model exists)')

  // Create agent settings
  await prisma.agentSettings.create({
    data: {
      provider: 'openai',
      model: 'gpt-4',
      apiKey: 'encrypted_key_here',
      systemPrompt: 'You are a helpful assistant for the SourceKom platform...',
      temperature: 0.7,
      maxTokens: 2000,
      enabled: true
    }
  })

  console.log('Created agent settings (if model exists)')

  console.log('✅ Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
