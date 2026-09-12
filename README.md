# SAKET ❤️ DEEKSHA — Luxury Indian Wedding Invitation Website

A bespoke, production-quality luxury Indian wedding invitation microsite for **Saket & Deeksha**.
Domain: **https://saketkideeksha.com**

Designed with modern editorial sensibilities, romantic minimalism, and authentic Indian wedding traditions.

---

## ✨ Features

- **Trilingual Multilingual Support**: Instant, non-reloading switching between **English (en)**, **हिन्दी (hi)**, and **छत्तीसगढ़ी (cg)** with authentic native dialect wedding phrasing.
- **Language Persistence**: Automatically saves selected language in `localStorage` and restores upon revisiting.
- **Opening Royal Invitation Experience**: Luxury greeting card / envelope entrance with "Enter Invitation" and "Skip" options.
- **Personalized Guest Experience**: Supports `https://saketkideeksha.com/?guest=Rahul` rendering:
  - English: *"Dear Rahul & Family ❤️"*
  - Hindi: *"प्रिय राहुल एवं परिवार ❤️"*
  - Chhattisgarhi: *"दुलरुवा राहुल अउ परिवार ❤️"*
- **Accurate Event Times (No Fake Times)**:
  - **Mehendi**: 10 December 2026 (date only)
  - **Sangeet**: 10 December 2026 (date only)
  - **Haldi**: 11 December 2026, 11:00 AM onwards
  - **Wedding (Saat Phere)**: 12 December 2026 (date only)
  - **Reception**: 13 December 2026 (date only)
- **Live Dynamic QR Code & Google Maps Integration**:
  - Encodes the exact Google Maps URL: `https://maps.app.goo.gl/GNADEw5rV7HUUakZ6`
  - High-contrast client-side QR renderer with "Scan for Directions" and "Save QR Code" download button.
  - Prominent "Get Directions" button opening Google Maps in a new tab.
- **Live Countdown**: Precise days, hours, minutes, seconds countdown to 12 December 2026 in local user timezone with zero-day celebration state.
- **Photo Gallery & Lightbox**:
  - Desktop editorial masonry & mobile 2-column grid.
  - Full lightbox with Previous, Next, Close, keyboard navigation, and mobile touch-swipe support.
  - Graceful fallback: If any image is missing, displays an elegant gold monogram card without broken image icons.
- **Background Music**:
  - Configurable audio file at `assets/music/wedding-song.mp3`.
  - Floating music control (Play/Pause) with animated equalizer sound waves.
  - Graceful fallback: Never throws errors if the audio file is missing.
- **RSVP Management**:
  - Full client-side validation for Name, 10-digit Phone, Guest count, Attending status, Events selection, and Blessings.
  - Stored locally in `localStorage` under `saket_deeksha_rsvps`.
  - Easy webhook connector hook in `js/rsvp.js` for Google Forms, Google Sheets, Supabase, or Firebase.
- **WhatsApp & Social Sharing**:
  - Pre-composed invitation message in the selected language.
  - Native Web Share API + WhatsApp direct link.
- **Calendar Integration**:
  - One-click Google Calendar generator.
  - One-click `.ics` calendar file download.

---

## 📸 How to Replace Photos & Content

All images are easily replaceable directly in the `assets/images/` folder without needing to modify code:

| Filename | Purpose | Recommended Size |
| :--- | :--- | :--- |
| `couple-hero.jpg` | Main full-screen cinematic couple portrait | 1600 × 1200 px |
| `story-01.jpg` to `story-05.jpg` | Timeline relationship milestones | 800 × 1000 px |
| `mehendi.jpg` | Mehendi ceremony photo | 800 × 1000 px |
| `sangeet.jpg` | Sangeet celebration photo | 800 × 1000 px |
| `haldi.jpg` | Haldi ceremony photo | 800 × 1000 px |
| `wedding.jpg` | Main Wedding / Mandap photo | 800 × 1000 px |
| `reception.jpg` | Reception party photo | 800 × 1000 px |
| `venue.jpg` | Saptapadi Palace venue photograph | 1200 × 800 px |
| `gallery-01.jpg` to `gallery-18.jpg` | Gallery photos | 800 × 800 or 800 × 1000 px |
| `og-share.jpg` | WhatsApp & social link preview image | 1200 × 630 px |

### Replacing Background Music
Place your wedding song in:
`assets/music/wedding-song.mp3`

---

## ⚙️ Central Configuration

Edit `js/main.js` to modify `weddingConfig`:

```javascript
const weddingConfig = {
  groom: "Saket",
  bride: "Deeksha",
  weddingDate: "2026-12-12",
  venue: "Saptapadi Palace, Hanoda",
  address: "Bosri Hanoda Road, Durg, Chhattisgarh, India",
  mapsUrl: "https://maps.app.goo.gl/GNADEw5rV7HUUakZ6",
  websiteUrl: "https://saketkideeksha.com",
  defaultLanguage: "en"
};
```

---

## 🚀 Deployment

This website is built with clean static HTML5, CSS3, and Vanilla JavaScript. It requires no backend server and can be deployed directly to:
- **GitHub Pages**: Push this repository to GitHub and enable Pages in repository settings.
- **Cloudflare Pages**: Connect repository and select Static deployment.
- **Any Web Hosting**: Upload all files to `public_html`.
