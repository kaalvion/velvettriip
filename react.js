const express = require('express');
const fetch = require('node-fetch'); // or global fetch if Node 18+
const app = express();

const TARGET = 'https://www.velvettriip.com';

app.use(async (req, res) => {
  const targetUrl = TARGET + req.url;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || '',
      }
    });

    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType || 'text/html');

    if (contentType && contentType.includes('text/html')) {
      let html = await response.text();

       const badge = `
        <div style="
          text-align:center;
          padding:14px;
          font-size:14px;
          color:#cfcfcf;
          background:#1f1228;
          border-top:1px solid rgba(255,255,255,0.08);
        ">
          Powered by <strong style="color:#e8b563;">KAALVION</strong>
        </div>
      `;

      html = html.includes('</body>')
        ? html.replace('</body>', badge + '</body>')
        : html + badge;

      res.status(response.status).send(html);
    } else {
      const buffer = Buffer.from(await response.arrayBuffer());
      res.status(response.status).send(buffer);
    }
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));