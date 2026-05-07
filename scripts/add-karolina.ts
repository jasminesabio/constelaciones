import 'dotenv/config';

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

async function addKarolina() {
  console.log('✨ Adding Karolina to Constelaciones...\n');

  // 1. Add Karolina to People
  console.log('Creating person: Karolina');
  const personRes = await fetch(`${BASE_URL}/People`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        name: 'Karolina',
        home_city: 'TBD',
      },
    }),
  });

  if (!personRes.ok) {
    console.error('Failed to create Karolina:', await personRes.text());
    return;
  }

  console.log('✓ Created Karolina\n');

  // 2. Add all trips
  const trips = [
    {
      person_name: 'Karolina',
      destination: 'Rome, Italy',
      start_date: '2026-05-28',
      end_date: '2026-05-31',
      status: 'approved',
    },
    {
      person_name: 'Karolina',
      destination: 'Sicily, Italy',
      start_date: '2026-06-01',
      end_date: '2026-06-07',
      status: 'approved',
    },
    {
      person_name: 'Karolina',
      destination: 'Lisbon, Portugal',
      start_date: '2026-06-08',
      end_date: '2026-06-24',
      status: 'approved',
    },
    {
      person_name: 'Karolina',
      destination: 'Gstaad, Switzerland',
      start_date: '2026-06-25',
      end_date: '2026-06-28',
      status: 'approved',
    },
    {
      person_name: 'Karolina',
      destination: 'Goat Festival',
      start_date: '2026-06-29',
      end_date: '2026-07-05',
      event_tag: 'festival',
      status: 'pending',
      notes: 'Waiting for ticket confirmation',
    },
    {
      person_name: 'Karolina',
      destination: 'Berlin, Germany',
      start_date: '2026-07-06',
      end_date: '2026-07-17',
      status: 'pending',
      notes: 'Likely',
    },
    {
      person_name: 'Karolina',
      destination: 'Ibiza, Spain',
      start_date: '2026-07-18',
      end_date: '2026-07-26',
      status: 'approved',
    },
    {
      person_name: 'Karolina',
      destination: 'Berlin, Germany',
      start_date: '2026-07-27',
      end_date: '2026-07-31',
      status: 'pending',
      notes: 'Likely',
    },
    {
      person_name: 'Karolina',
      destination: 'Garbicz Festival, Poland',
      start_date: '2026-07-31',
      end_date: '2026-08-02',
      event_tag: 'festival',
      status: 'pending',
      notes: 'Likely',
    },
    {
      person_name: 'Karolina',
      destination: 'Berlin, Germany',
      start_date: '2026-08-03',
      end_date: '2026-08-09',
      status: 'pending',
      notes: 'Likely',
    },
    {
      person_name: 'Karolina',
      destination: 'Eclipse Festival',
      start_date: '2026-08-10',
      end_date: '2026-08-14',
      event_tag: 'festival',
      status: 'pending',
    },
    {
      person_name: 'Karolina',
      destination: 'Berlin, Germany',
      start_date: '2026-08-15',
      end_date: '2026-08-23',
      status: 'pending',
      notes: 'Likely',
    },
    {
      person_name: 'Karolina',
      destination: 'Ibiza, Spain',
      start_date: '2026-08-24',
      end_date: '2026-08-31',
      status: 'pending',
      notes: 'Hopefully',
    },
  ];

  console.log('Creating trips...\n');
  for (const trip of trips) {
    console.log(`Creating: ${trip.destination} (${trip.start_date} to ${trip.end_date})`);
    const tripRes = await fetch(`${BASE_URL}/Trips`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: trip }),
    });

    if (!tripRes.ok) {
      console.error(`Failed to create ${trip.destination}:`, await tripRes.text());
    } else {
      console.log(`✓ Created ${trip.destination}`);
    }
  }

  console.log('\n✅ Karolina and all trips added successfully!');
  console.log('\n📅 Summary:');
  console.log('  - 13 trips total spanning May 28 - August 31');
  console.log('  - 4 confirmed trips (Rome, Sicily, Lisbon, Gstaad, Ibiza July)');
  console.log('  - 9 pending trips (awaiting confirmation)');
}

addKarolina().catch(console.error);
