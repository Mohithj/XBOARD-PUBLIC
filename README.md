# 📰 XBOARD

**XBOARD** is a responsive, real-time news feed web application that integrates with public Flipboard RSS feeds. Built entirely using **Vanilla JavaScript**, the application dynamically fetches the latest news from multiple sources and presents them in a clean accordion-style layout.

---

## 📌 Features

- ✅ Responsive, single-page news reader UI
- 🔄 Real-time fetching of the latest RSS articles
- 📂 Dynamic rendering using DOM manipulation
- 🧩 Accordion-style display for news items
- 🌐 Hosted on Netlify for fast, global access

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- RSS to JSON API: [`rss2json`](https://api.rss2json.com)
- Public RSS feeds from Flipboard

---

## 📡 RSS Feeds Used

```js
const magazines = [
  "https://flipboard.com/topic/indianpolitics.rss",
  "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
  "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss"
];
```

These feeds are parsed using:
https://api.rss2json.com/v1/api.json?rss_url=${url}

---

## 🌐 Live Demo

The project is deployed and accessible at:
🔗 https://xboardmohith.netlify.app/
