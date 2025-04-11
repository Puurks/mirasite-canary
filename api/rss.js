// api/rss.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Construct the path to the news.json in the public folder.
    const filePath = path.join(process.cwd(), 'public', 'news.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const newsItems = JSON.parse(jsonData);

    // Build the RSS feed XML.
    let rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>`;
    rss += `<title>Miracat's Website</title>`;
    rss += `<link>https://www.miracat.net</link>`;
    rss += `<description>Miracat's most recent news.</description>`;
    rss += `<language>en-us</language>`;

    newsItems.forEach(item => {
      // Format the publication date in RFC-2822 format.
      const pubDate = new Date(item.date).toUTCString();

      rss += `<item>`;
      rss += `<title>${escapeXml(item.title)}</title>`;
      rss += `<link>https://your-site.vercel.app/news/${encodeURIComponent(item.title)}</link>`;
      rss += `<pubDate>${pubDate}</pubDate>`;
      if (item.image) {
        rss += `<enclosure url="${escapeXml(item.image)}" type="image/jpeg" />`;
      }
      rss += `<description>${escapeXml(item.body)}</description>`;
      rss += `</item>`;
    });

    rss += `</channel></rss>`;

    // Set the correct headers for RSS/XML.
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.status(200).send(rss);
  } catch (error) {
    res.status(500).send('Error generating RSS feed');
  }
}

// Simple XML escaping function.
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}
