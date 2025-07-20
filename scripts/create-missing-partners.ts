import { db } from '../src/config/db';
import { partners } from '../src/config/db/schema';
import bcrypt from 'bcrypt';

const missingOwners = [
  'BASUDEV RAO',
  'TULASI DAS',
  'SRI KARTHIKEYA ENTERPRISES',
  'SAMEER PANDA',
  'TIKIRI SITE',
  'RAVI TEJA',
  'JK',
  'Ram Ji',
  'RAJA TRANSPORT',
  'RAJESH',
  'RAMA',
  'Maa Kuthari Infracon private limited',
  'Rahman Transport',
  'Ayappa Transport',
  'D.Naga Vijay kumar',
  'SHRI BALAJI TRADERS',
  'NIHAR RANJAN MISHRA',
  'ASHOK NAIK',
  'RUBEN',
  'ASHISH PATTANAIK',
  'KIRAN',
  'BHUBANESWAR BISOI',
  'SHAIK ABDUL',
  'KALI PRASAD',
  'SUBRAT CHANDAN KHORA',
  'Market',
  'Damru Nayak',
  'DIBAKAR',
  'Sanjeeb Kumar Rout',
  'NIRANJAN DASH',
  'SUKANTABAGH',
  'PRAHALAD NAIK',
  'ROJALIN JENA',
  'BB PANDA'
];

function generatePartnerId(name: string): string {
  const prefix = name.substring(0, 1).toUpperCase();
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}${randomNum}`;
}

function generatePassword(): string {
  return Math.random().toString(36).slice(-8);
}

async function createMissingPartners() {
  console.log('🚀 Creating missing partners...');
  
  let createdCount = 0;
  let skippedCount = 0;

  for (const ownerName of missingOwners) {
    try {
      // Check if partner already exists
      const existingPartner = await db.query.partners.findFirst({
        where: (partners, { eq }) => eq(partners.name, ownerName),
      });

      if (existingPartner) {
        console.log(`⏭️  Skipping ${ownerName} - already exists`);
        skippedCount++;
        continue;
      }

      // Generate unique partner ID
      let partnerId = generatePartnerId(ownerName);
      let attempts = 0;

      while (attempts < 10) {
        const existing = await db.query.partners.findFirst({
          where: (partners, { eq }) => eq(partners.partnerId, partnerId),
        });

        if (!existing) break;
        partnerId = generatePartnerId(ownerName);
        attempts++;
      }

      if (attempts >= 10) {
        console.log(`❌ Failed to generate unique partner ID for ${ownerName}`);
        continue;
      }

      // Create new partner
      const password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 12);

      await db.insert(partners).values({
        name: ownerName,
        partnerId,
        password: hashedPassword,
      });

      console.log(`✅ Created partner: ${ownerName} (ID: ${partnerId})`);
      createdCount++;
    } catch (error) {
      console.log(`❌ Error creating ${ownerName}: ${error}`);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Created: ${createdCount} partners`);
  console.log(`⏭️  Skipped: ${skippedCount} partners (already existed)`);
  console.log(`🎉 Total partners now available: ${createdCount + skippedCount}`);
  
  if (createdCount > 0) {
    console.log('\n💡 You can now upload your diesel file successfully!');
  }
}

createMissingPartners()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 