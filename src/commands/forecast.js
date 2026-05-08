import { SlashCommandBuilder } from "discord.js";
import { fetchForecast } from "../requests/forecast.js";

export const data = new SlashCommandBuilder()
  .setName("forecast")
  .setDescription("Replies with forecast!")
  .addStringOption((option) => {
    return option
      .setName("location")
      .setDescription(
        "The location can be a city, zip/postal code, or a latitude and longitude",
      )
      .setRequired(true);
  });

export async function execute(interaction) {
  const location = interaction.options.getString("location");

  await interaction.deferReply();

  try {
    const forecast = await fetchForecast(location);

    if (!forecast) {
      return interaction.editReply("❌ Could not fetch weather data.");
    }

    const { locationName, weatherData } = forecast;

    const formatted = weatherData
      .map((day) => `📅 ${day.date} — 🌡️ ${day.maxTemp}°C / ${day.minTemp}°C`)
      .join("\n");

    await interaction.editReply(`🌍 **${locationName}**\n\n${formatted}`);
  } catch (error) {
    console.error(error);
    await interaction.editReply("❌ Something went wrong.");
  }
}
