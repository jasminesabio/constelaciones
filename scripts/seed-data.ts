import 'dotenv/config';
import { createPerson, createTrip, type Flight, type Accommodation, type Event } from '../src/lib/airtable';

async function seedData() {
  console.log('🌱 Seeding Constelaciones data...\n');

  // Step 1: Create People
  console.log('Creating people...');

  const jasmine = await createPerson({
    name: 'Jasmine',
    home_city: 'Boston, MA',
    contact_handles: '@jasmine',
  });

  const dan = await createPerson({
    name: 'Dan',
    home_city: 'Boston, MA',
    contact_handles: '@dan',
  });

  console.log('✓ Created Jasmine and Dan\n');

  // Step 2: Create Jasmine's Trips
  console.log('Creating Jasmine\'s trips...');

  // Trip 1: Madrid (May 11-15, 2026)
  const madridFlight: Flight = {
    airline: 'easyJet-style',
    flight_number: 'TBD',
    departure_airport: 'BOS',
    departure_time: '2026-05-10T17:25:00',
    arrival_airport: 'MAD',
    arrival_time: '2026-05-11T06:20:00',
    booking_ref: 'TBD',
    status: 'booked',
  };

  const madridAccommodation: Accommodation = {
    name: "Nir's Apartment",
    type: 'friend',
    notes: 'Staying at Nir\'s apartment',
    status: 'booked',
  };

  const madridEvents: Event[] = [
    {
      name: 'Real Madrid vs Real Oviedo',
      date: '2026-05-14',
      time: '21:30',
      location: 'Santiago Bernabéu Stadium',
      notes: 'CEST timezone',
    },
  ];

  await createTrip({
    person_name: 'Jasmine',
    destination: 'Madrid, Spain',
    start_date: '2026-05-11',
    end_date: '2026-05-15',
    event_tag: 'vacation',
    status: 'approved',
    flight_to: JSON.stringify(madridFlight),
    accommodation: JSON.stringify(madridAccommodation),
    events: JSON.stringify(madridEvents),
    notes: 'Overnight flight from BOS. Staying at Nir\'s place. Real Madrid match highlight!',
  });

  console.log('✓ Created Madrid trip');

  // Trip 2: Lisbon (May 15-21, 2026)
  const lisbonFlightTo: Flight = {
    airline: 'easyJet',
    flight_number: 'EJU7654',
    departure_airport: 'MAD T1',
    departure_time: '2026-05-15T17:10:00',
    arrival_airport: 'LIS T1',
    arrival_time: '2026-05-15T17:30:00',
    booking_ref: 'KCL65PC',
    status: 'booked',
  };

  const lisbonAccommodation: Accommodation = {
    name: 'Hotel TBD',
    type: 'hotel',
    notes: 'Options: JAM Lisbon, 106 Letter, or Casa do Jasmim (near Príncipe Real). May 15-17 at hotel, May 18-21 at friend\'s apartment.',
    status: 'options',
  };

  const lisbonEvents: Event[] = [
    {
      name: 'Music Hackspace Lisbon Spring 2026',
      date: '2026-05-16',
      time: 'All day',
      location: 'Unicorn Factory Lisboa',
      notes: 'Hackathon - Sat May 16 to Sun May 17',
    },
  ];

  await createTrip({
    person_name: 'Jasmine',
    destination: 'Lisbon, Portugal',
    start_date: '2026-05-15',
    end_date: '2026-05-21',
    event_tag: 'conference',
    status: 'approved',
    flight_to: JSON.stringify(lisbonFlightTo),
    accommodation: JSON.stringify(lisbonAccommodation),
    events: JSON.stringify(lisbonEvents),
    shared_with: 'Dan',
    notes: 'Music Hackspace hackathon weekend. Hotel May 15-17, friend\'s apartment May 18-21. Dan joining for hotel portion.',
  });

  console.log('✓ Created Lisbon trip');

  // Trip 3: Porto (mid-week, TBD)
  await createTrip({
    person_name: 'Jasmine',
    destination: 'Porto, Portugal',
    start_date: '2026-05-19',
    end_date: '2026-05-20',
    event_tag: 'vacation',
    status: 'approved',
    notes: 'Side trip from Lisbon. Dates and transport TBD.',
  });

  console.log('✓ Created Porto trip');

  // Trip 4: Ibiza (May 22-24, 2026)
  await createTrip({
    person_name: 'Jasmine',
    destination: 'Ibiza, Spain',
    start_date: '2026-05-22',
    end_date: '2026-05-24',
    event_tag: 'festival',
    status: 'approved',
    shared_with: 'Evan',
    notes: 'Weekend trip with Evan + others TBD. Flights and lodging TBD.',
  });

  console.log('✓ Created Ibiza trip');

  // Step 3: Create Dan's Trips
  console.log('\nCreating Dan\'s trips...');

  const danLisbonAccommodation: Accommodation = {
    name: 'Hotel TBD',
    type: 'hotel',
    notes: 'Options: JAM Lisbon, 106 Letter, or Casa do Jasmim (near Príncipe Real)',
    status: 'options',
  };

  await createTrip({
    person_name: 'Dan',
    destination: 'Lisbon, Portugal',
    start_date: '2026-05-15',
    end_date: '2026-05-17',
    event_tag: 'vacation',
    status: 'approved',
    accommodation: JSON.stringify(danLisbonAccommodation),
    shared_with: 'Jasmine',
    notes: 'Joining Jasmine for the hotel portion. Confirm other legs TBD.',
  });

  console.log('✓ Created Dan\'s Lisbon trip');

  console.log('\n✨ Seeding complete!');
  console.log('\nNext steps:');
  console.log('1. Visit your Airtable base to verify the data');
  console.log('2. Check the app at http://localhost:4321');
  console.log('3. Add more friends and trips as needed!');
}

seedData().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
