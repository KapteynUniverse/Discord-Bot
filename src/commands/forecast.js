import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
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
  await interaction.deferReply();

  const location = interaction.options.getString("location");

  try {
    const forecast = await fetchForecast(location);

    if (!forecast) {
      return interaction.editReply("❌ Could not fetch weather data.");
    }

    const { locationName, weatherData } = forecast;

    const formatted = weatherData
      .map((day) => `📅 ${day.date}\n🌡️ ${day.maxTemp}°C / ${day.minTemp}°C`)
      .join("\n\n");

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`🌤️ Forecast for ${locationName}`)
      .setTimestamp()
      .setFooter({ text: "Powered by WeatherAPI" });

    embed.addFields(
      ...weatherData.map((day) => ({
        name: day.date,
        value: `🌡️ ${day.maxTemp}°C / ${day.minTemp}°C`,
        inline: true,
      })),
    );

    await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    console.error(error);
    await interaction.editReply("❌ Something went wrong.");
  }
}
