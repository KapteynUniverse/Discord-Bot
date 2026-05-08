import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { fetchForecast } from "../requests/forecast.js";

export const data = new SlashCommandBuilder()
  .setName("forecast")
  .setDescription("Replies with forecast!")
  .addStringOption((option) =>
    option
      .setName("location")
      .setDescription(
        "The location can be a city, zip/postal code, or coordinates",
      )
      .setRequired(true),
  );

export async function execute(interaction) {
  await interaction.deferReply();
  const location = interaction.options.getString("location");
  try {
    const forecast = await fetchForecast(location);

    if (!forecast) {
      return await interaction.editReply("❌ Could not fetch weather data.");
    }

    const { locationName, weatherData } = forecast;

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`🌤️ Forecast for ${locationName}`)
      .setTimestamp()
      .setFooter({ text: "Powered by WeatherAPI" });

    embed.addFields(
      ...weatherData.slice(0, 7).map((day) => ({
        name: day.date,
        value: `🌡️ ${day.maxTemp}°C / ${day.minTemp}°C`,
      })),
    );

    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error(error);

    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({
        content: "❌ Something went wrong.",
        flags: 64,
      });
    }
  }
}
