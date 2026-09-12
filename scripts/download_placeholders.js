import fs from 'fs';
import path from 'path';

// Curated high-aesthetic authentic Indian wedding photography from Unsplash
const imagesToDownload = [
  {
    filename: 'couple-hero.jpg',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80' // Royal couple portrait
  },
  {
    filename: 'story-01.jpg',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' // Beginning / flowers & smiles
  },
  {
    filename: 'story-02.jpg',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' // Journey / couple hands
  },
  {
    filename: 'story-03.jpg',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80' // Memories
  },
  {
    filename: 'story-04.jpg',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80' // The Promise
  },
  {
    filename: 'story-05.jpg',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80' // Forever
  },
  {
    filename: 'mehendi.jpg',
    url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80' // Intricate Indian Henna Mehendi
  },
  {
    filename: 'sangeet.jpg',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80' // Celebratory lights & dance
  },
  {
    filename: 'haldi.jpg',
    url: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=800&q=80' // Haldi yellow marigold florals
  },
  {
    filename: 'wedding.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' // Royal Mandap & Saat Phere
  },
  {
    filename: 'reception.jpg',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80' // Reception gala dinner & chandeliers
  },
  {
    filename: 'venue.jpg',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80' // Luxury Palace venue
  },
  {
    filename: 'og-share.jpg',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80' // Social share preview
  },
  // Gallery 01 to 18
  { filename: 'gallery-01.jpg', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-02.jpg', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-03.jpg', url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-04.jpg', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-05.jpg', url: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-06.jpg', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-07.jpg', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-08.jpg', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-09.jpg', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-10.jpg', url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-11.jpg', url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-12.jpg', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-13.jpg', url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-14.jpg', url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-15.jpg', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-16.jpg', url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-17.jpg', url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=700&q=80' },
  { filename: 'gallery-18.jpg', url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=700&q=80' }
];

async function downloadAll() {
  const dirs = [
    path.join(process.cwd(), 'assets', 'images'),
    path.join(process.cwd(), 'public', 'assets', 'images')
  ];

  for (const d of dirs) {
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d, { recursive: true });
    }
  }

  console.log(`Starting download of ${imagesToDownload.length} placeholder images...`);

  for (const item of imagesToDownload) {
    try {
      const res = await fetch(item.url);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        for (const d of dirs) {
          fs.writeFileSync(path.join(d, item.filename), buffer);
        }
        console.log(`✓ Saved ${item.filename}`);
      } else {
        console.warn(`! Failed to fetch ${item.filename} (status ${res.status})`);
      }
    } catch (err) {
      console.warn(`! Error downloading ${item.filename}:`, err.message);
    }
  }
  console.log('Finished placeholder setup.');
}

downloadAll();
