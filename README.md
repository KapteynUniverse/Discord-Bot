# 🌤️ Discord Weather & Astronomy Bot

A Discord bot built with Discord.js v14 that provides weather forecasts and astronomical data (sunrise, sunset, moonrise, moonset) using WeatherAPI.

## 📚 Table of contents

- [Features](#features)
- [Commands](#commands)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Discord Bot Setup](#discord-bot-setup)
- [Structure](#structure)
- [API](#api)
- [Author](#author)

---

## 🚀 Features

🌦️ 7-day weather forecast • 🌍 Location search • 🌅 Sunrise & sunset • 🌙 Moonrise & moonset • 📊 Embeds • ⚡ Slash commands

---

## 📦 Commands

Users can use the following Discord slash commands:

- `/forecast location:City / ZIP / postal code / coordinates` → 7-day weather forecast
- `/astro location:City / ZIP / postal code / coordinates` → sunrise, sunset, moonrise, moonset data

---

## 🧠 Tech Stack

Node.js • Discord.js v14 • WeatherAPI • Express • dotenv

---

## ⚙️ Setup

```bash
1. git clone https://github.com/KapteynUniverse/Discord-Bot
2. cd Discord-Bot
3. npm install
4. create .env file:
   DISCORD_TOKEN=your_token
   DISCORD_CLIENT_ID=your_client_id
   DISCORD_GUILD_ID=your_guild_id
   WEATHER_API_KEY=your_api_key
5. npm start
```

## 🤖 Discord Bot Setup

Before running the project, you need to create a Discord bot and add it to your server.

### 1. Create a bot

- Go to https://discord.com/developers/applications
- Click **New Application**
- Give it a name and create it
- Go to the **Bot** tab
- Click **Add Bot**

---

### 2. Get bot token

- In the Bot section, click **Reset Token**
- Copy the token
- Add it to your `.env` file as: `DISCORD_TOKEN=your_token`

---

### 3. Enable intents (important)

In the Bot tab:

- Enable **SERVER MEMBERS INTENT** (optional depending on features)
- Enable **MESSAGE CONTENT INTENT** (only if you use message commands)

---

### 4. Invite bot to your server

- Go to **OAuth2 → URL Generator**
- Select:
- `bot`
- `applications.commands`
- Bot Permissions:
- Send Messages
- Read Message History
- Use Slash Commands
- Copy generated URL
- Open it in browser and invite bot

---

### 5. Run the bot

```bash
npm start


## 📁 Structure
src/
 ├── commands (forecast, astro)
 ├── events (clientReady, interactionCreate)
 ├── requests (forecast API)

## 🌍 API
[WeatherAPI](https://www.weatherapi.com/)
[Discord](https://discord.js.org/)

## 🧑‍💻 Author
Asilcan Toper
```
