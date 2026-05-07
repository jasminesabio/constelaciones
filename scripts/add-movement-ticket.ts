import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addMovementTicket() {
  console.log('🎫 Adding Movement Festival ticket listing...\n');

  // 1. Get Jasmine's Airtable ID
  console.log('Finding Jasmine in People table...');
  const peopleRes = await fetch(`${BASE_URL}/People`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const peopleData = await peopleRes.json();
  const jasmine = peopleData.records.find(
    (p: any) => p.fields.name === 'Jasmine + Dan' || p.fields.name === 'Jasmine'
  );

  if (!jasmine) {
    console.error('❌ Could not find Jasmine in People table');
    return;
  }

  console.log(`✓ Found ${jasmine.fields.name} (ID: ${jasmine.id})\n`);

  // 2. Add Movement ticket
  console.log('Creating Movement festival ticket listing...');

  // Movement 2026 - Memorial Day weekend (May 23-25, 2026)
  const ticket = {
    event_name: 'Movement Electronic Music Festival',
    event_date: '2026-05-23',
    event_location: 'Hart Plaza, Detroit, MI',
    seller_id: [jasmine.id], // Array format for linked record
    asking_price: '$450 for both',
    status: 'available',
    notes: '2 VIP weekend passes (3-day). VIP includes: expedited entry, dedicated bars, premium viewing areas, air-conditioned bathrooms, and more. Contact via Angelo.',
  };

  const ticketRes = await fetch(`${BASE_URL}/Tickets`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: ticket }),
  });

  if (!ticketRes.ok) {
    console.error('Failed to create ticket:', await ticketRes.text());
    return;
  }

  console.log('✓ Created Movement festival ticket listing');
  console.log('\n✨ Done! Ticket available at http://localhost:4321/tickets');
}

addMovementTicket().catch(console.error);
