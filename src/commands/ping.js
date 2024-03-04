import {
  SlashCommandBuilder,
  ChatInputCommandInteraction
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong!")
    .setDescriptionLocalization("ja", "遅延状態") // 多言語対応 / Multilingual: ja => Japanese
  ,
  /**
   * @param { ChatInputCommandInteraction<import("discord.js").CacheType> } interaction 
   */
  execute: async (interaction) => {
    await interaction.editReply(`WebSocket Ping: ${interaction.client.ws.ping}`);
  }
}