import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";

/**
 * スラッシュコマンドをdiscordのAPI通して登録
 * @param { Client<true> } client
 * @param { Map<string, {command: SlashCommandBuilder, execute: (interaction: ChatInputCommandInteraction<import("discord.js").CacheType>) => Promise<any>}> } commands
 */
export const SlashCommandsRegister = async (client, commands) => {
  await client.application.commands.set(Array.from(commands.values()).map(x => x.command.toJSON()));
}