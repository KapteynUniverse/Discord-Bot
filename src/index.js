import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import clientReadyHandler from "./events/clientReady.js";
import interactionCreateHandler from "./events/interactionCreate.js";
import * as ping from "./commands/ping.js";
import * as forecast from "./commands/forecast.js";
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

client.commands = new Collection();

client.commands.set(ping.data.name, ping);
client.commands.set(forecast.data.name, forecast);

client.once(Events.ClientReady, clientReadyHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(process.env.DISCORD_TOKEN);
