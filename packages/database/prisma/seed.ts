import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding GABON BIZ database...');

  // ==========================================
  // SECTORS
  // ==========================================
  const sectors = await Promise.all([
    prisma.sector.create({
      data: { name: "Technologies de l'Information", isFiliere: false },
    }),
    prisma.sector.create({
      data: { name: 'Agriculture', isFiliere: true },
    }),
    prisma.sector.create({
      data: { name: 'Tourisme', isFiliere: true },
    }),
    prisma.sector.create({
      data: { name: 'Bâtiment et Travaux Publics', isFiliere: false },
    }),
    prisma.sector.create({
      data: { name: 'Commerce et Distribution', isFiliere: false },
    }),
    prisma.sector.create({
      data: { name: 'Économie Verte', isFiliere: true },
    }),
    prisma.sector.create({
      data: { name: 'Économie Bleue', isFiliere: true },
    }),
    prisma.sector.create({
      data: { name: 'Santé et Pharmaceutique', isFiliere: false },
    }),
    prisma.sector.create({
      data: { name: 'Finance et Assurances', isFiliere: false },
    }),
    prisma.sector.create({
      data: { name: 'Éducation et Formation', isFiliere: false },
    }),
    prisma.sector.create({
      data: { name: 'Mines et Hydrocarbures', isFiliere: false },
    }),
    prisma.sector.create({
      data: { name: 'Transport et Logistique', isFiliere: false },
    }),
  ]);

  console.log(`✅ ${sectors.length} secteurs créés`);

  // ==========================================
  // CATEGORIES (pour les solutions Innovation Hub)
  // ==========================================
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'FinTech', slug: 'fintech', icon: '💰' } }),
    prisma.category.create({ data: { name: 'AgriTech', slug: 'agritech', icon: '🌾' } }),
    prisma.category.create({ data: { name: 'HealthTech', slug: 'healthtech', icon: '🏥' } }),
    prisma.category.create({ data: { name: 'EdTech', slug: 'edtech', icon: '📚' } }),
    prisma.category.create({ data: { name: 'GovTech', slug: 'govtech', icon: '🏛️' } }),
    prisma.category.create({ data: { name: 'E-Commerce', slug: 'e-commerce', icon: '🛒' } }),
    prisma.category.create({ data: { name: 'Logistique', slug: 'logistique', icon: '🚚' } }),
    prisma.category.create({ data: { name: 'CyberSécurité', slug: 'cybersecurite', icon: '🔒' } }),
    prisma.category.create({ data: { name: 'Intelligence Artificielle', slug: 'ia', icon: '🤖' } }),
    prisma.category.create({ data: { name: 'Énergie Renouvelable', slug: 'energie', icon: '⚡' } }),
  ]);

  console.log(`✅ ${categories.length} catégories créées`);

  // ==========================================
  // USERS
  // ==========================================
  const users = await Promise.all([
    prisma.user.create({
      data: {
        nip: '24010112345601',
        profileType: 'ENTREPRENEUR',
        email: 'jean.mbadinga@email.ga',
        phone: '+24107123456',
        fullName: 'Jean-Pierre Mbadinga',
        preferredLanguage: 'fr',
      },
    }),
    prisma.user.create({
      data: {
        nip: '24020298765402',
        profileType: 'ENTREPRENEUR',
        email: 'marie.nzeng@email.ga',
        phone: '+24106654321',
        fullName: 'Marie-Claire Nzeng Obiang',
        preferredLanguage: 'fr',
      },
    }),
    prisma.user.create({
      data: {
        nip: '24030387654303',
        profileType: 'STARTUP',
        email: 'patrick.ondo@email.ga',
        phone: '+24107987654',
        fullName: 'Patrick Ondo Bile',
        preferredLanguage: 'fr',
      },
    }),
    prisma.user.create({
      data: {
        nip: '24040476543204',
        profileType: 'INVESTOR',
        email: 'sophie.nguema@email.ga',
        phone: '+24106543210',
        fullName: 'Sophie Nguema Ndong',
        preferredLanguage: 'fr',
      },
    }),
    prisma.user.create({
      data: {
        nip: '24050565432105',
        profileType: 'ADMIN',
        email: 'admin@menudi.gov.ga',
        phone: '+24101000001',
        fullName: 'Admin MENUDI',
        preferredLanguage: 'fr',
      },
    }),
    prisma.user.create({
      data: {
        nip: '24060654321006',
        profileType: 'STARTUP',
        email: 'eric.moussavou@email.ga',
        phone: '+24107111222',
        fullName: 'Éric Moussavou',
        preferredLanguage: 'fr',
      },
    }),
    prisma.user.create({
      data: {
        nip: '24070743210907',
        profileType: 'PUBLIC',
        email: 'citoyen.test@email.ga',
        phone: '+24106000000',
        fullName: 'Alain Mba Nzé',
        preferredLanguage: 'fr',
      },
    }),
  ]);

  console.log(`✅ ${users.length} utilisateurs créés`);

  // ==========================================
  // ENTERPRISES
  // ==========================================
  const enterprises = await Promise.all([
    prisma.enterprise.create({
      data: {
        rccm: 'GA-LBV-2024-B-00142',
        nif: 'NIF-GA-000142',
        ownerNip: users[0].nip,
        name: 'Mbadinga Technologies SARL',
        legalForm: 'SARL',
        sectorId: sectors[0].id,
        status: 'ACTIVE',
        address: { city: 'Libreville', quartier: 'Akébé', province: 'Estuaire', bp: 'BP 1234' },
        description:
          'Entreprise spécialisée dans le développement de solutions logicielles pour les administrations publiques gabonaises.',
        employeeCount: 15,
        revenue: 85000000,
      },
    }),
    prisma.enterprise.create({
      data: {
        rccm: 'GA-LBV-2024-B-00287',
        nif: 'NIF-GA-000287',
        ownerNip: users[1].nip,
        name: 'Nzeng Import-Export',
        legalForm: 'SA',
        sectorId: sectors[4].id,
        status: 'ACTIVE',
        address: {
          city: 'Port-Gentil',
          quartier: 'Centre-ville',
          province: 'Ogooué-Maritime',
          bp: 'BP 456',
        },
        description:
          'Commerce général, import-export de produits alimentaires et matériaux de construction.',
        employeeCount: 42,
        revenue: 450000000,
      },
    }),
    prisma.enterprise.create({
      data: {
        rccm: 'GA-LBV-2024-B-00391',
        nif: 'NIF-GA-000391',
        ownerNip: users[2].nip,
        name: 'GabonPay Solutions',
        legalForm: 'SAS',
        sectorId: sectors[0].id,
        status: 'ACTIVE',
        address: { city: 'Libreville', quartier: 'Glass', province: 'Estuaire', bp: 'BP 789' },
        description:
          'Startup FinTech développant des solutions de paiement mobile pour le marché gabonais.',
        employeeCount: 8,
        revenue: 25000000,
      },
    }),
    prisma.enterprise.create({
      data: {
        rccm: 'GA-LBV-2025-A-00012',
        nif: 'NIF-GA-000012',
        ownerNip: users[5].nip,
        name: 'AgriGabon Tech',
        legalForm: 'SARL',
        sectorId: sectors[1].id,
        status: 'ACTIVE',
        address: { city: 'Oyem', quartier: 'Centre', province: 'Woleu-Ntem', bp: 'BP 55' },
        description:
          'Plateforme numérique connectant les agriculteurs gabonais aux marchés locaux et internationaux.',
        employeeCount: 5,
        revenue: 12000000,
      },
    }),
  ]);

  console.log(`✅ ${enterprises.length} entreprises créées`);

  // ==========================================
  // STARTUPS
  // ==========================================
  const startups = await Promise.all([
    prisma.startup.create({
      data: {
        enterpriseId: enterprises[2].id,
        pitch:
          "GabonPay simplifie les paiements numériques au Gabon. Notre solution permet à n'importe quel commerçant d'accepter les paiements mobiles avec un simple QR code, sans terminal de paiement coûteux.",
        teamSize: 8,
        fundingStage: 'SEED',
        metrics: { mrr: 2100000, users: 1500, growthRate: 0.15 },
        website: 'https://gabonpay.ga',
        seekingFunding: true,
      },
    }),
    prisma.startup.create({
      data: {
        enterpriseId: enterprises[3].id,
        pitch:
          'AgriGabon Tech connecte directement les agriculteurs gabonais aux consommateurs et exportateurs via une marketplace mobile, avec suivi de traçabilité et données météo en temps réel.',
        teamSize: 5,
        fundingStage: 'PRE_SEED',
        metrics: { mrr: 500000, users: 320, growthRate: 0.25 },
        website: 'https://agrigabon.tech',
        seekingFunding: true,
      },
    }),
  ]);

  console.log(`✅ ${startups.length} startups créées`);

  // ==========================================
  // SOLUTIONS (Innovation Hub)
  // ==========================================
  const solutions = await Promise.all([
    prisma.solution.create({
      data: {
        startupId: startups[0].id,
        name: 'GabonPay QR',
        description:
          'Solution de paiement par QR code pour commerçants. Interface simple, commissions réduites, tableau de bord en temps réel.',
        categoryId: categories[0].id,
        pricingModel: 'FREEMIUM',
        status: 'PUBLISHED',
        averageRating: 4.2,
      },
    }),
    prisma.solution.create({
      data: {
        startupId: startups[0].id,
        name: 'GabonPay API',
        description:
          "API de paiement pour intégrer les paiements mobiles dans n'importe quelle application. Documentation complète, sandbox de test.",
        categoryId: categories[0].id,
        pricingModel: 'PAID',
        status: 'PUBLISHED',
        averageRating: 4.5,
      },
    }),
    prisma.solution.create({
      data: {
        startupId: startups[1].id,
        name: 'FarmConnect Gabon',
        description:
          'Marketplace mobile pour la vente directe de produits agricoles gabonais. Connecte producteurs et acheteurs en temps réel.',
        categoryId: categories[1].id,
        pricingModel: 'FREE',
        status: 'PUBLISHED',
        averageRating: 3.8,
      },
    }),
  ]);

  console.log(`✅ ${solutions.length} solutions créées`);

  // ==========================================
  // TENDERS (Marchés Publics)
  // ==========================================
  const tenders = await Promise.all([
    prisma.tender.create({
      data: {
        reference: 'DGMP-2026-AO-001',
        title: "Développement du système d'information de gestion des marchés publics",
        description:
          "Le Ministère de l'Économie Numérique lance un appel d'offres pour le développement d'une plateforme numérique de gestion des marchés publics. La solution doit permettre la dématérialisation complète du processus de passation.",
        issuingAuthority: 'MENUDI - Direction Générale des Marchés Publics',
        sectorId: sectors[0].id,
        budgetMin: 500000000,
        budgetMax: 1200000000,
        submissionDeadline: new Date('2026-06-30'),
        openingDate: new Date('2026-07-05'),
        status: 'PUBLISHED',
      },
    }),
    prisma.tender.create({
      data: {
        reference: 'DGMP-2026-AO-002',
        title:
          'Fourniture et installation de bornes WiFi publiques dans les chefs-lieux de province',
        description:
          'Installation de 100 bornes WiFi dans les 9 chefs-lieux de province du Gabon dans le cadre du programme Gabon Digital.',
        issuingAuthority: 'ANINF',
        sectorId: sectors[0].id,
        budgetMin: 200000000,
        budgetMax: 400000000,
        submissionDeadline: new Date('2026-05-15'),
        status: 'PUBLISHED',
      },
    }),
    prisma.tender.create({
      data: {
        reference: 'DGMP-2026-AO-003',
        title: "Construction d'un centre de données souverain à Libreville",
        description:
          "Construction et équipement d'un datacenter Tier III conforme aux normes internationales pour héberger les services numériques de l'État gabonais.",
        issuingAuthority: 'ANINF - Agence Nationale des Infrastructures Numériques',
        sectorId: sectors[3].id,
        budgetMin: 5000000000,
        budgetMax: 8000000000,
        submissionDeadline: new Date('2026-08-01'),
        status: 'PUBLISHED',
      },
    }),
    prisma.tender.create({
      data: {
        reference: 'DGMP-2026-AO-004',
        title: 'Audit de sécurité informatique des systèmes gouvernementaux',
        description:
          "Audit de pénétration et évaluation de la posture de sécurité de 25 systèmes d'information de l'administration publique gabonaise.",
        issuingAuthority: 'SOC National du Gabon',
        sectorId: sectors[0].id,
        budgetMin: 50000000,
        budgetMax: 150000000,
        submissionDeadline: new Date('2026-04-30'),
        status: 'PUBLISHED',
      },
    }),
  ]);

  console.log(`✅ ${tenders.length} marchés publics créés`);

  // ==========================================
  // INVESTOR PROFILE
  // ==========================================
  const investor = await prisma.investorProfile.create({
    data: {
      userNip: users[3].nip,
      type: 'ANGEL',
      ticketMin: 5000000,
      ticketMax: 50000000,
      bio: 'Investisseuse gabonaise spécialisée dans les startups tech en Afrique Centrale. Ancienne directrice chez un opérateur télécom.',
      languages: ['fr', 'en'],
      focusSectors: ['FinTech', 'AgriTech', 'HealthTech'],
    },
  });

  console.log('✅ 1 profil investisseur créé');

  // ==========================================
  // COHORT (Incubateur)
  // ==========================================
  const cohort = await prisma.cohort.create({
    data: {
      name: 'Cohorte Gabon Digital 2026 — Saison 1',
      description:
        "Premier programme d'accélération de 12 semaines pour les startups tech gabonaises dans le cadre du PNCD 2026-2030.",
      startDate: new Date('2026-09-01'),
      endDate: new Date('2026-11-24'),
      maxStartups: 15,
      status: 'OPEN',
    },
  });

  console.log('✅ 1 cohorte créée');

  // ==========================================
  // COHORT APPLICATION
  // ==========================================
  await prisma.cohortApplication.create({
    data: {
      cohortId: cohort.id,
      startupId: startups[0].id,
      status: 'PENDING',
    },
  });

  console.log('✅ 1 candidature de cohorte créée');

  // ==========================================
  // INDICATORS (Observatoire)
  // ==========================================
  const indicators = await Promise.all([
    prisma.indicator.create({
      data: {
        name: 'Taux de pénétration internet',
        source: 'ARCEP',
        category: 'INFRASTRUCTURE',
        value: 62.5,
        unit: '%',
        period: '2026-Q1',
      },
    }),
    prisma.indicator.create({
      data: {
        name: 'Taux de pénétration mobile',
        source: 'ARCEP',
        category: 'INFRASTRUCTURE',
        value: 142.3,
        unit: '%',
        period: '2026-Q1',
      },
    }),
    prisma.indicator.create({
      data: {
        name: 'Abonnés mobile money',
        source: 'Opérateurs télécom',
        category: 'INCLUSION',
        value: 1250000,
        unit: 'abonnés',
        period: '2026-Q1',
      },
    }),
    prisma.indicator.create({
      data: {
        name: 'Entreprises créées en ligne',
        source: 'GABON BIZ',
        category: 'INNOVATION',
        value: 342,
        unit: 'entreprises',
        period: '2026-Q1',
      },
    }),
    prisma.indicator.create({
      data: {
        name: 'Marchés publics dématérialisés',
        source: 'DGMP',
        category: 'POLICY',
        value: 28,
        unit: 'marchés',
        period: '2026-Q1',
      },
    }),
    prisma.indicator.create({
      data: {
        name: 'Startups actives',
        source: 'GABON BIZ',
        category: 'INNOVATION',
        value: 87,
        unit: 'startups',
        period: '2026-Q1',
      },
    }),
    prisma.indicator.create({
      data: {
        name: 'Score IDES global',
        source: 'Banque Mondiale',
        category: 'INCLUSION',
        value: 45.2,
        unit: 'score (0-100)',
        period: '2025',
      },
    }),
    prisma.indicator.create({
      data: {
        name: 'Score EGDI',
        source: 'ONU',
        category: 'POLICY',
        value: 0.4215,
        unit: 'index (0-1)',
        period: '2024',
      },
    }),
    prisma.indicator.create({
      data: {
        name: 'Débit internet moyen',
        source: 'ARCEP',
        category: 'INFRASTRUCTURE',
        value: 8.7,
        unit: 'Mbps',
        period: '2026-Q1',
      },
    }),
    prisma.indicator.create({
      data: {
        name: 'Couverture réseau 4G',
        source: 'ARCEP',
        category: 'INFRASTRUCTURE',
        value: 58.3,
        unit: '%',
        period: '2026-Q1',
      },
    }),
  ]);

  console.log(`✅ ${indicators.length} indicateurs créés`);

  // ==========================================
  // NOTIFICATIONS
  // ==========================================
  await Promise.all([
    prisma.notification.create({
      data: {
        userNip: users[0].nip,
        type: 'enterprise.created',
        title: 'Entreprise créée avec succès',
        body: 'Votre entreprise "Mbadinga Technologies SARL" a été enregistrée. Votre RCCM est GA-LBV-2024-B-00142.',
        read: true,
        link: '/dashboard/entreprise',
      },
    }),
    prisma.notification.create({
      data: {
        userNip: users[0].nip,
        type: 'tender.match',
        title: 'Nouveau marché correspondant à votre profil',
        body: 'Un marché public dans le secteur "Technologies de l\'Information" vient d\'être publié : "Développement du SI de gestion des marchés publics".',
        read: false,
        link: `/marches/${tenders[0].id}`,
      },
    }),
    prisma.notification.create({
      data: {
        userNip: users[2].nip,
        type: 'cohort.open',
        title: "Nouvelle cohorte d'accélération ouverte",
        body: 'La "Cohorte Gabon Digital 2026 — Saison 1" est ouverte aux candidatures. 15 places disponibles.',
        read: false,
        link: '/incubateur/cohorts',
      },
    }),
  ]);

  console.log('✅ 3 notifications créées');

  // ==========================================
  // SUMMARY
  // ==========================================
  console.log('\n🎉 Seed terminé !');
  console.log('📊 Résumé :');
  console.log(`   - ${sectors.length} secteurs`);
  console.log(`   - ${categories.length} catégories`);
  console.log(`   - ${users.length} utilisateurs`);
  console.log(`   - ${enterprises.length} entreprises`);
  console.log(`   - ${startups.length} startups`);
  console.log(`   - ${solutions.length} solutions`);
  console.log(`   - ${tenders.length} marchés publics`);
  console.log('   - 1 profil investisseur');
  console.log("   - 1 cohorte d'accélération");
  console.log('   - 1 candidature de cohorte');
  console.log(`   - ${indicators.length} indicateurs`);
  console.log('   - 3 notifications');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Erreur lors du seed :', e);
    await prisma.$disconnect();
    process.exit(1);
  });
