# TRJE Engineering Solutions — Website Starter

A responsive React + Vite website starter with a corporate-minimal engineering aesthetic.

## Included
- Responsive navigation and homepage
- Five service cards
- Filterable sample project gallery
- About and project-process sections
- PEB project planner (calculates floor area, not a construction price)
- Quote enquiry form with WhatsApp/email handoff placeholders
- Custom editable SVG TRJE logo mark
- Mobile, tablet, and desktop layouts

## Requirements
Install a current Node.js LTS release and VS Code.

## Run locally
1. Extract this ZIP.
2. Open the extracted `trje-engineering-website` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Before publishing
Open `src/main.jsx` and replace these values:
- `WHATSAPP_NUMBER` — country code and number only, e.g. digits only, no plus sign or spaces.
- `BUSINESS_EMAIL` — official company enquiry email.
- `BUSINESS_PHONE` — official company phone number.

Also replace:
- Sample project gallery cards and remote images with approved TRJE project photographs and verified details.
- Sample About content with the actual company history, capabilities, team, and claims.
- Generic location and project information with accurate company details.

The current enquiry form does not store data on a server. With a configured WhatsApp number it opens a prefilled WhatsApp message; with a configured email it opens the user's email application. For production use, consider a backend or reputable form service with spam protection and privacy information.

## Build for production
```bash
npm run build
npm run preview
```

The production files are generated in `dist/`. Deploy `dist/` to a static hosting provider such as Netlify or Vercel.

## Notes
- Images are remote Unsplash image URLs; internet access is needed to load them.
- The estimator currently calculates floor area only. It does not produce construction costs or engineering advice.
- The SVG logo is a starter concept and can be replaced with a final approved logo.
