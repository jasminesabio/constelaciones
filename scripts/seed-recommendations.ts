import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function seedRecommendations() {
  console.log('✨ Seeding sample recommendations...\n');

  const sampleRecommendations = [
    {
      city: 'Paris, France',
      category: 'eat',
      name: 'L\'As du Fallafel',
      description: 'Famous falafel spot in the Marais. Get the special with everything!',
      address: '34 Rue des Rosiers, 75004 Paris',
      submitted_by: 'Jasmine',
      status: 'approved',
    },
    {
      city: 'Paris, France',
      category: 'see',
      name: 'Musée Rodin',
      description: 'Beautiful sculpture museum with amazing gardens. Less crowded than the Louvre.',
      address: '77 Rue de Varenne, 75007 Paris',
      submitted_by: 'Dan',
      status: 'approved',
    },
    {
      city: 'Lisbon, Portugal',
      category: 'drink',
      name: 'Park Bar',
      description: 'Rooftop bar with incredible sunset views over the city',
      address: 'Calçada do Combro 58, 1200-114 Lisboa',
      url: 'https://www.instagram.com/park.lisbon/',
      submitted_by: 'Marine',
      status: 'approved',
    },
    {
      city: 'Lisbon, Portugal',
      category: 'eat',
      name: 'Time Out Market',
      description: 'Food hall with the best chefs in Lisbon. Perfect for trying multiple dishes.',
      address: 'Av. 24 de Julho 49, 1200-479 Lisboa',
      url: 'https://www.timeoutmarket.com/lisbon/',
      submitted_by: 'Mitch',
      status: 'approved',
    },
    {
      city: 'Madrid, Spain',
      category: 'do',
      name: 'El Retiro Park',
      description: 'Massive park in the heart of Madrid. Rent a rowboat on the lake!',
      address: 'Plaza de la Independencia, 7, 28001 Madrid',
      submitted_by: 'Jasmine',
      status: 'approved',
    },
    {
      city: 'Ibiza, Spain',
      category: 'see',
      name: 'Benirràs Beach Sunset',
      description: 'Famous Sunday drum circle at sunset. Get there early for a good spot.',
      notes: 'Sunday evenings only!',
      submitted_by: 'Daniel',
      status: 'approved',
    },
  ];

  for (const rec of sampleRecommendations) {
    console.log(`Creating: ${rec.name} in ${rec.city}`);
    const response = await fetch(`${BASE_URL}/Recommendations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: rec }),
    });

    if (!response.ok) {
      console.error(`Failed to create ${rec.name}:`, await response.text());
    } else {
      console.log(`✓ Created ${rec.name}`);
    }
  }

  console.log('\n✅ Sample recommendations seeded!');
  console.log('\n📋 Recommendations table fields needed in Airtable:');
  console.log('  - city (Single line text)');
  console.log('  - category (Single select: eat, drink, see, do, stay, other)');
  console.log('  - name (Single line text)');
  console.log('  - description (Long text)');
  console.log('  - address (Single line text)');
  console.log('  - url (URL)');
  console.log('  - submitted_by (Single line text)');
  console.log('  - notes (Long text)');
  console.log('  - status (Single select: approved, pending)');
}

seedRecommendations().catch(console.error);
