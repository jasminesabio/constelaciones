import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

const recommendations = [
  // --- LANDMARKS ---
  {
    city: 'Paris, France', category: 'see', name: 'Basilique du Sacré-Cœur',
    description: 'Go inside — most people don\'t realize you can. Stunning interior + amazing view of Paris from the top. Hang in the gardens.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Cathédrale Notre-Dame de Paris',
    description: 'Iconic, worth a glimpse.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Eiffel Tower',
    description: 'Great for a picnic at Champ de Mars below.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Arc de Triomphe',
    description: 'Glimpse; the Champs-Élysées shopping street runs from here.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Moulin Rouge',
    description: 'Sightseeing. Walk via Rue Lepic on the way — nice street with good food.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Pigalle Basketball Court',
    description: 'Famous colorful outdoor court, great for a photo.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Louvre Pyramid',
    description: 'Iconic. The museum itself is worth booking in advance.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Place de la Concorde',
    description: 'Grand square connecting the Tuileries garden to the Champs-Élysées.',
  },

  // --- BRIDGES ---
  {
    city: 'Paris, France', category: 'see', name: 'Pont Alexandre III',
    description: 'Most ornate bridge in Paris, beautiful at night.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Pont Neuf',
    description: 'Oldest bridge in Paris, iconic.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Pont Notre-Dame',
    description: 'Great views of the Seine and Île de la Cité.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Pont des Arts',
    description: 'Classic Paris bridge, nice stroll.',
  },

  // --- MUSEUMS ---
  {
    city: 'Paris, France', category: 'see', name: 'Le Louvre',
    description: 'Book in advance. The pyramid entrance alone is iconic.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Musée Carnavalet',
    description: 'Free permanent collection on the history of Paris. Highly recommended.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Grand Palais',
    description: 'Beautiful Belle Époque building; check what\'s on.',
  },
  {
    city: 'Paris, France', category: 'see', name: 'Hôtel des Invalides',
    description: 'Famous military museum and Napoleon\'s tomb.',
  },

  // --- PARKS & NEIGHBORHOODS ---
  {
    city: 'Paris, France', category: 'do', name: 'Champ de Mars',
    description: 'Flat green park at the base of the Eiffel Tower — perfect picnic spot.',
  },
  {
    city: 'Paris, France', category: 'do', name: 'Jardin des Tuileries',
    description: 'Garden right outside the Louvre, perfect post-museum stroll.',
  },
  {
    city: 'Paris, France', category: 'do', name: 'Parc des Buttes-Chaumont',
    description: 'Hilly park with great views. Climb to the top and the island in the middle.',
  },
  {
    city: 'Paris, France', category: 'do', name: 'Le Marais',
    description: 'One of the best neighborhoods in Paris. Walk around, grab falafel or other specialties.',
  },
  {
    city: 'Paris, France', category: 'do', name: 'Rue de l\'Abreuvoir',
    description: 'Super cute street near Sacré-Cœur, just wander.',
  },
  {
    city: 'Paris, France', category: 'do', name: 'Rue des Martyrs',
    description: 'Short street but every single food spot is high quality. Don\'t miss it.',
  },
  {
    city: 'Paris, France', category: 'do', name: 'Rue Crémieux',
    description: 'Cute colorful street, great for photos.',
  },
  {
    city: 'Paris, France', category: 'do', name: 'Rue Princesse',
    description: 'Good vibes party street — the go-to for nightlife.',
  },
  {
    city: 'Paris, France', category: 'do', name: 'Canal Saint-Martin',
    description: 'Chill, mostly locals; great picnic spot when the weather is nice.',
  },

  // --- BAKERIES ---
  {
    city: 'Paris, France', category: 'eat', name: 'Du Pain et des Idées',
    description: 'Amazing bakery, very popular.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Le Pain Retrouvé',
    description: 'Favorite bakery in the 9th.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Le Pétrin de Pigalle',
    description: 'Amazing bakery.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Pain Pain',
    description: 'Bakery worth stopping at.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'B.O.U.L.O.M',
    description: 'Brunch buffet.',
  },

  // --- PÂTISSERIES ---
  {
    city: 'Paris, France', category: 'eat', name: 'Popelini',
    description: 'Best choux / cream puffs in Paris.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Yann Couvreur',
    description: 'Best Paris-Brest in the city.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Bontemps La Pâtisserie',
    description: 'Custard pâtisserie.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Cédric Grolet Opéra',
    description: 'World-famous pastry chef, stunning pastries.',
  },

  // --- CRÊPES & STREET FOOD ---
  {
    city: 'Paris, France', category: 'eat', name: 'Breizh Café Abbesses',
    description: 'Favorite crêpes in Paris. Traditional Breton-style.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Au P\'tit Grec',
    description: 'Best savory crêpes, great late night.',
    notes: 'Rue Mouffetard, 5th arrondissement',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Caractère de Cochon',
    description: 'Best sandwich in Paris.',
  },

  // --- MARKETS & PROVISIONS ---
  {
    city: 'Paris, France', category: 'eat', name: 'Le Marché des Enfants Rouges',
    description: 'Covered market since 1615, lots of local food.',
  },
  {
    city: 'Paris, France', category: 'eat', name: '37 Rue Charlot',
    description: 'Indoor market with a variety of food vendors.',
    address: '37 Rue Charlot, Paris',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Causses',
    description: 'Épicerie fine — upscale deli and provisions.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Barthélemy',
    description: 'Best cheese shop in Paris.',
  },

  // --- RESTAURANTS: FRENCH & BISTROS ---
  {
    city: 'Paris, France', category: 'eat', name: 'Bouillon Chartier Grands Boulevards',
    description: 'Classic French food, great value, very popular with locals and tourists.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Chez Georges',
    description: 'Cute classic French bistro.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Bistrot des Tournelles',
    description: 'Great bistro.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Moncoeur Belleville',
    description: 'Best patio in Paris; brunch and dinner.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'La Fontaine',
    description: 'Typical café / breakfast spot.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Chez Jeanphi',
    description: 'Local favorite.',
  },

  // --- RESTAURANTS: INTERNATIONAL ---
  {
    city: 'Paris, France', category: 'eat', name: 'L\'Alivi',
    description: 'Corsican restaurant.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Kolam Paris',
    description: 'Sri Lankan.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Coloré Restaurant Paris 18',
    description: 'French-Japanese fusion, super tasty.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Libertino',
    description: 'Good pasta, part of the Big Mamma group.',
  },
  {
    city: 'Paris, France', category: 'eat', name: 'Pink Mamma',
    description: 'Italian, Big Mamma group, very popular.',
  },

  // --- COFFEE ---
  {
    city: 'Paris, France', category: 'drink', name: 'Café Pigalle',
    description: 'Great coffee, nice ambiance.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Café Ventura',
    description: 'Good espresso, cute patio.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Boot Café',
    description: 'Cute coffee shop.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Ernestine Café',
    description: 'Cutest coffee shop, great iced coffees.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Le Pavillon des Canaux',
    description: 'Cool coffee shop by Canal de l\'Ourcq.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Céline Paris — Printemps Haussmann',
    description: 'Rooftop café upstairs; great views.',
  },

  // --- WINE BARS ---
  {
    city: 'Paris, France', category: 'drink', name: 'La Bascule',
    description: 'Super chill wine bar with great French bites and charcuterie.',
  },

  // --- BARS & NIGHTLIFE ---
  {
    city: 'Paris, France', category: 'drink', name: 'Le Syndicat',
    description: 'Speakeasy, amazing cocktails.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Lavomatic',
    description: 'Speakeasy — hidden bar inside a laundromat.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Little Red Door',
    description: 'Best cocktails in Paris.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Le Perchoir',
    description: 'Best views of Paris.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'NUBA Paris',
    description: 'Trendy bar with dancing.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Le Hibou Paris',
    description: 'Brewery.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Brasserie Barbès',
    description: 'Great drinks, stunning glass ceiling.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'BarOurcq',
    description: 'Cool bar on the water.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Rooftop Bar Dame des Arts',
    description: 'Rooftop with great views.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Le Faust & Bistrot Alexandre',
    description: 'Two bars by the river; nice crowd — similar vibe to Chicago riverwalk bars.',
  },
  {
    city: 'Paris, France', category: 'drink', name: 'Le Rosa Bonheur',
    description: 'Docked péniche (boat bar) on the Seine.',
  },
];

async function addParisRecommendations() {
  console.log(`✨ Adding ${recommendations.length} Paris recommendations from Marine & Hadrien...\n`);

  let success = 0;
  let failed = 0;

  for (const rec of recommendations) {
    const res = await fetch(`${BASE_URL}/Recommendations`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: { ...rec, submitted_by: 'Marine & Hadrien', status: 'approved' },
      }),
    });

    if (res.ok) {
      console.log(`✓ ${rec.name}`);
      success++;
    } else {
      console.error(`✗ ${rec.name}: ${await res.text()}`);
      failed++;
    }
  }

  console.log(`\n✅ Done! ${success} added, ${failed} failed.`);
  console.log('\n📊 Breakdown:');
  const counts: Record<string, number> = {};
  for (const r of recommendations) counts[r.category] = (counts[r.category] || 0) + 1;
  for (const [cat, count] of Object.entries(counts)) console.log(`  - ${cat}: ${count}`);
}

addParisRecommendations().catch(console.error);
