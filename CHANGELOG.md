# v0.3.0-beta.3 – Wireframe redesign

Changes since **v0.2.1-beta.3** (and the upload from 12.10.2026).

# What Changed

The whole website was rebuilt following the wireframes by Hang Minh Hoang (`Wireframe_Website` for desktop, `Wireframe_Phone 4` for phones), plus ideas from the website pitch.

## Design
- New look on every page, matching the wireframes: dark and grey sections, purple accents and a purple footer
- New header: bigger SynBioTeam logo, **Projects** dropdown and **What is iGEM?** on the left, **About Us** and **CONTACT US!** on the right, and a menu button on phones
- New footer: logo, CONTACT US button, Instagram / LinkedIn / GitLab / email buttons, credits, and links to the Legal Notice and Privacy Policy
- Phone layout built to match `Wireframe_Phone 4`
- From the moodboard: sharp corners instead of rounded ones, Share Tech Mono as the second font, and the logo black `#131613` for dark text
- "Work in progress" banner with a roadmap pop-up (it can be closed and reopened from a small button)
- Removed: the dark/light theme switch, the old page headers, the scrolling sponsor slider, and the placeholder FAQ, "Our numbers" and "Services & Pricing" content

## Homepage
- Hero with the catchphrase and a **brobiotics\*** button linking to the current project
- "Who are we?" section
- **Project Discography**: a timeline from 2017 (left) to 2027 (right) that moves with the selected project. It has blurred side cards, arrow buttons and smooth card transitions.
- "What is iGEM?" section
- Sponsors: the scrolling logo slider is now a sponsor grid with search and filters (Reagents & Enzymes, Software & Tools, Lab Equipment, Safety & Patrons)

## Projects
- All project pages now live in a `projects/` folder
- Renamed: `BDO` → `LOTP`, `AGBC` → `TAGC`, `VNOO` → `PhyCoVi`
- The Projects menu lists every project from 2017 to 2027
- **2025 ARALEX**: full copy of the team wiki (`projects/aralex/`)
- **2023 DentoZym**: full copy of the team wiki (`projects/dentozym/`)
- **2017–2021** (Light of the Pipe, TAGC – Anti-Germ Bio Coating, PhyCoVi, LAC-MAN, Tardisun): pages now use the website's design, with project details still to come
- **2027 brobiotics\***: new page built from wireframe page 3 (red design, original brobiotics logo)
- `projects/brobiotics_old/`: plain HTML copy of the 2026 brobiotics page from WordPress. Nothing links to it; it can only be opened by its address.
- Removed the old files `brobiotics.html`, `project2.html` and `project3.html`, and the old project folders in the main folder

## Other pages
- **About Us**: who we are, University of Stuttgart, and a photo gallery for our day-to-day life (placeholders for now)
- **What is iGEM?**: rebuilt in the new design
- **Contact Us**: new "For Sponsors" box (most important) and "For Students" box, plus a message form
- **Legal Notice** (Impressum): now in English, updated from § 5 TMG to § 5 DDG, typos fixed
- **Privacy Policy** (`datenschutz.html`): new; the page was empty before

## Language & Privacy
- The whole website is now in English
- Fonts are now stored on our own server instead of being loaded from Google Fonts, so visitors' IP addresses are no longer sent to Google

## Fixes
- Removed links to pages that don't exist (`news.html`, `mission.html`, `contact_students.html`, `contact_companies.html`)
- Removed the extra logo icon in the footer

## Known Issues
- `team.html` is still empty
- The 2017–2021 project pages don't have project details yet. 
- The contact form doesn't send messages yet
- Legal Notice and Privacy Policy: a named responsible person and the hosting provider still need to be added, and the two pages should be checked by the university

## Note
Report Issues at https://github.com/meowHung/SynBio-Stuttgart.Website/issues
