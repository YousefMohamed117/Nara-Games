<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/29710896-2b12-4d11-9ec1-d51461aab0f3" /># 🎮 Nara Games

A responsive online game discovery platform that lets users browse and explore a large catalog of games from around the world.

**[→ Live Demo](https://nara-games.netlify.app/)**

![screenshot](<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2c846e27-f458-49f9-aacc-13b40eb46717" />
)

---

## What it does

- Fetches and displays a large catalog of games via an external games API
- Users can browse, search, and explore game details
- Fully responsive across mobile and desktop

---

## How it works

The app relies on an external games API that has a usage limit per key. To keep the app live without manual intervention, I built a small Node.js backend hosted on Railway that automatically rotates to a fresh API key before the limit is hit — then pushes the new key back to the frontend config.

This keeps the app self-sustaining without any manual key management.

> ⚠️ **Note:** The backend runs on Railway's free tier, so the first request after a period of inactivity may take ~30 seconds while the server wakes up. Subsequent requests are fast.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js / Express |
| Frontend Hosting | Netlify |
| Backend Hosting | Railway |
| Data | External Games API |

---

## Running locally
```bash
git clone https://github.com/YousefMohamed117/Nara-Games.git
cd Nara-Games
npm install
# Add your API key to .env
REACT_APP_API_KEY=your_key_here
npm start
```
