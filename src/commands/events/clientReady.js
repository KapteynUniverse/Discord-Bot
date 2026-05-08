import { REST, Routes } from "discord.js";

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

export default async function clientReadyHandler(client) {
  console.log(`Logged in as ${client.user.tag}!`);

  try {
    console.log(`Started refreshing ${client.commands.size} commands!`);

    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID,
      ),
      {
        body: client.commands.map((command) => command.data.toJSON()),
      },
    );

    console.log(`Successfully reloaded ${data.length} commands.`);
  } catch (error) {
    console.error(error);
  }
}
