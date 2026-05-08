import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import clientReadyHandler from "./commands/events/clientReady.js";
import { data } from "./commands/ping.js";
import express from "express";

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
client.on(Events.ClientReady, clientReadyHandler);

client.commands = new Collection();

client.commands.set(data.name, data.description);

new Collection();

client.login(process.env.DISCORD_TOKEN);
