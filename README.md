# Constelaciones

A friends-only summer travel hub for coordinating trips, spotting overlaps, and sharing festival tickets.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env` file

Copy `.env.example` to `.env` and fill in your Airtable credentials:

```
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXXXX...
CONSTELACIONES_PASSWORD=mexicocity
NOTIFICATION_EMAIL=jasmine.operations@gmail.com
```

### 3. Run locally

```bash
npm run dev
```

The site will be at `http://localhost:3000`. Log in with password: `mexicocity`

### 4. Deploy to Netlify

1. Push your code to GitHub
2. Connect to Netlify and select the repository
3. Build command: `npm run build`
4. Publish directory: `dist/`
5. Add environment variables in Netlify settings
6. Deploy!

## Features

- **Password gate**: Single shared password for all visitors
- **Trip tracking**: Log your summer destinations and dates
- **Overlaps view**: See when friends will be in the same place at the same time
- **Ticket marketplace**: List and discover festival/event tickets
- **Submission queue**: All adds/edits go through Jasmine's approval queue before publishing
- **Mobile-first**: Optimized for checking on the go

## File structure

```
src/
├── pages/
│   ├── login.astro          (password gate)
│   ├── index.astro          (dashboard)
│   ├── trips/
│   │   ├── index.astro      (all trips)
│   │   └── [id].astro       (trip detail)
│   ├── overlaps.astro       (timeline + map)
│   ├── tickets/
│   │   ├── index.astro      (all tickets)
│   │   └── [id].astro       (ticket detail)
│   ├── friends/
│   │   ├── index.astro      (roster)
│   │   └── [id].astro       (friend profile)
│   └── submit.astro         (submission form)
├── layouts/
│   └── BaseLayout.astro     (shared nav + footer)
├── lib/
│   └── airtable.ts          (API client)
├── middleware.ts            (auth middleware)
└── styles/
    └── global.css           (design tokens)
```

## Airtable Tables

The base needs 4 tables:

- **People**: id, name, home_city, avatar_url, contact_handles, last_updated
- **Trips**: id, person_id, destination, start_date, end_date, event_tag, notes, status, last_updated
- **Tickets**: id, event_name, event_date, event_location, seller_id, asking_price, status, notes, last_updated
- **Submissions**: id, type, submitter_name, submitter_contact, payload, status, admin_notes, created_at, updated_at

## Admin workflow

1. Check **Submissions** table in Airtable (filter: status = "pending")
2. Review each submission and either approve or reject
3. If approved, create a row in **Trips** or **Tickets** with the data from the submission's `payload` field
4. Update submission status to "approved"
5. Approved entries appear on the public site

## Notes

- The password gate uses a single shared password (distributed by Jasmine)
- No user accounts or per-friend authentication yet
- Contact between friends happens out-of-band (IG/WhatsApp/etc.)
- Future enhancement: Add real-time updates with Supabase for live trip notifications
