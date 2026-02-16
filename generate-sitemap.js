const fs = require('fs');
const path = require('path');

// 設定
const BASE_URL = 'https://harajuku-neo-uranai.com'; // 必要に応じて変更してください
const columnsDir = path.join(__dirname, 'columns');
const fortunesDir = path.join(__dirname, 'fortunes');

// 現在の日本時間を基準にする
const now = new Date();
const jstOffset = 9 * 60 * 60 * 1000;
const todayJST = new Date(now.getTime() + jstOffset);
todayJST.setUTCHours(0, 0, 0, 0);

function getPublishedFiles(dir, filterFn) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(file => file.endsWith('.html') && file !== 'index.html')
        .filter(filterFn);
}

// カラム（コラム）のフィルタリング
const publishedColumns = getPublishedFiles(columnsDir, (fileName) => {
    const parts = fileName.split('-');
    if (parts.length < 3) return false;
    const articleDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return articleDate <= todayJST;
});

// 占いのフィルタリング
const publishedFortunes = getPublishedFiles(fortunesDir, (fileName) => {
    const parts = fileName.split('-');
    if (parts.length < 3) return false;
    // YYYY-MM-DD.html の形式を想定
    const dateStr = fileName.replace('.html', '');
    const dateParts = dateStr.split('-');
    const articleDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    return articleDate <= todayJST;
});

// メインページのリスト
const mainPages = [
    { rel: '', priority: '1.0', freq: 'daily' },
    { rel: 'horoscope.html', priority: '0.8', freq: 'daily' },
    { rel: 'tarot.html', priority: '0.8', freq: 'daily' },
    { rel: 'crystal.html', priority: '0.8', freq: 'daily' },
    { rel: 'columns/index.html', priority: '0.8', freq: 'daily' }
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

const lastmod = todayJST.toISOString().split('T')[0];

// メインページ追加
mainPages.forEach(page => {
    sitemap += `  <url>
    <loc>${BASE_URL}/${page.rel}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
});

// 公開済みコラム追加
publishedColumns.forEach(file => {
    sitemap += `  <url>
    <loc>${BASE_URL}/columns/${file}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
});

// 公開済み占い追加
publishedFortunes.forEach(file => {
    sitemap += `  <url>
    <loc>${BASE_URL}/fortunes/${file}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>\n`;
});

sitemap += '</urlset>';

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
console.log(`✅ sitemap.xml を生成しました。 (計 ${mainPages.length + publishedColumns.length + publishedFortunes.length} ページ)`);

// --- HTML サイトマップの生成 ---

const sitemapHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>サイトマップ - 原宿ネオ占い</title>
    <link rel="icon" href="icon.png" type="image/png">
    <link rel="stylesheet" href="style.css">
    <style>
        .sitemap-container { max-width: 1200px; margin: 120px auto 60px; padding: 40px; background: rgba(20, 20, 40, 0.6); backdrop-filter: blur(20px); border-radius: 30px; border: 1px solid rgba(255,255,255,0.1); }
        .sitemap-section { margin-bottom: 50px; }
        .sitemap-section h2 { font-size: 2rem; color: #a78bfa; margin-bottom: 25px; border-bottom: 2px solid rgba(167, 139, 250, 0.3); padding-bottom: 10px; }
        .sitemap-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; }
        .sitemap-link { color: #e0e0e0; text-decoration: none; padding: 10px 15px; background: rgba(255,255,255,0.05); border-radius: 10px; transition: 0.3s; font-size: 0.95rem; border: 1px solid transparent; }
        .sitemap-link:hover { background: rgba(102, 126, 234, 0.2); border-color: #667eea; color: #fff; transform: translateX(5px); }
        .main-pages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
        .main-page-card { padding: 20px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1)); border-radius: 15px; text-align: center; font-weight: bold; border: 1px solid rgba(255,255,255,0.1); }
        .main-page-card:hover { border-color: #a78bfa; }
    </style>
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="logo">🔮 原宿ネオ占い</div>
            <ul class="nav-links">
                <li><a href="index.html">ホーム</a></li>
                <li><a href="horoscope.html">星座占い</a></li>
                <li><a href="tarot.html">タロット占い</a></li>
                <li><a href="crystal.html">水晶占い</a></li>
                <li><a href="columns/index.html">開運コラム</a></li>
            </ul>
        </nav>
    </header>

    <main class="sitemap-container">
        <h1 class="section-title">サイトマップ</h1>
        
        <section class="sitemap-section">
            <h2>主要ページ</h2>
            <div class="main-pages-grid">
                <a href="index.html" class="sitemap-link main-page-card">ホーム</a>
                <a href="horoscope.html" class="sitemap-link main-page-card">星座占い</a>
                <a href="tarot.html" class="sitemap-link main-page-card">タロット占い</a>
                <a href="crystal.html" class="sitemap-link main-page-card">水晶占い</a>
                <a href="columns/index.html" class="sitemap-link main-page-card">開運コラム一覧</a>
            </div>
        </section>

        <section class="sitemap-section">
            <h2>最近の開運コラム</h2>
            <div class="sitemap-grid">
                ${publishedColumns.slice(-20).reverse().map(file => {
    const date = file.split('-').slice(0, 3).join('/');
    return `<a href="columns/${file}" class="sitemap-link">${date} のコラム</a>`;
}).join('\n')}
                <a href="columns/index.html" class="sitemap-link" style="background: rgba(167, 139, 250, 0.2); font-weight: bold;">もっと見る →</a>
            </div>
        </section>

        <section class="sitemap-section">
            <h2>今日の運勢（アーカイブ）</h2>
            <div class="sitemap-grid">
                ${publishedFortunes.slice(-20).reverse().map(file => {
    const date = file.replace('.html', '').replace(/-/g, '/');
    return `<a href="fortunes/${file}" class="sitemap-link">${date} の運勢</a>`;
}).join('\n')}
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 原宿ネオ占い. All rights reserved.</p>
    </footer>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.html'), sitemapHtml);
console.log('✅ sitemap.html を生成しました。');

// --- robots.txt の生成 ---
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt);
console.log('✅ robots.txt を生成しました。');
