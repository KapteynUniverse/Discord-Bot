import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import clientReadyHandler from "./commands/events/clientReady.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
client.on(Events.ClientReady, clientReadyHandler);

client.login(process.env.DISCORD_TOKEN);
