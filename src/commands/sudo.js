/**
 * sudo: SuperUser(Bot Admin) do
 * 
 * @example
 *  edit BOT_ADMINS in file:".env"
 */

import { SubCommandManager } from "../lib/slashcommands/subcommands.js";
import {
  EmbedBuilder,
  SlashCommandBuilder,
  ChatInputCommandInteraction
} from "discord.js";

const { command, subcommands } = await SubCommandManager(
  new SlashCommandBuilder()
    .setName("sudo")
    .setDescription("Sync: SuperUser Mode - Requires bot administrator privileges.")
    .setDescriptionLocalization("ja", "スーパーユーザーモード: bot管理者権限が必要です。")
    .setDMPermission(false)
);

const botAdmins = process.env.BOT_ADMINS.split(",");

export default {
  data: command,

  /**
   * @param { ChatInputCommandInteraction<CacheType> } interaction 
   */
  execute: async (interaction) => {
    /**
     * If you are not a bot administrator
     * bot管理者ではない場合
     */
    if (!botAdmins.includes(interaction.member.id)) return await interaction.editReply({
      content: interaction.locale == Locale.Japanese ? "あなたは、このbotの管理者ではありません" : "You are not the administrator of this bot"
    });

    /**
     * subcommand name
     * サブコマンド名
     * @type { string }
     */
    const subcommandName = interaction.options.getSubcommand();

    if (!subcommands.has(subcommandName)) return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setTitle("[Not Found] SuperUser Mode:")
          .addFields({
            name: "Message",
            value: `> ${interaction.locale == Locale.Japanese ? "すみませんが、まだそのコマンドが実装されていないか、存在しない可能性があります" : "Sorry, but that command may not be implemented or exist yet."}`
          })
          .setFooter({
            text: "[mode: SuperUser]",
          })
          .setColor(process.env.EMBED_COLOR_ERROR)
          .toJSON()
      ]
    });

    const execute = subcommands.get(subcommandName);

    await execute(interaction);
  }
}