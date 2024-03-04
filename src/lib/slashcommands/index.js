import { forEachAsync } from "../forEachAsync/index.js";

import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";
import { readdir } from "fs/promises";
import { SlashCommandsRegister } from "./register.js";

/**
 * コマンドデータマップ
 * commands data map
 * @type {Map<string, {command: SlashCommandBuilder, execute: (interaction: ChatInputCommandInteraction<import("discord.js").CacheType>) => Promise<any>}>}
 */
export const commands = new Map();

/** スラッシュコマンドのフォルダー / folder of slashcommands */
const commandsdir = new URL("../../commands/", import.meta.url);

/**
 * スラッシュコマンド管理
 * @param { Client<true> } client 
 */
export const SlashCommandManager = async (client) => {
  const fileList = (await readdir(commandsdir))
    .filter(x => x.endsWith(".js")); // .jsの拡張子でフィルター

  if (!fileList[0]) throw new Error("Error: not-found-slash-commands");

  /**
   * Array.prototype.forEachで非同期関数(AsyncFunction)callbackがうまく稼働しないことについては、以下を参照してください
   * @link https://qiita.com/tawatawa/items/c458f76ff364bf9f5781
   */
  await forEachAsync(fileList, async (filename) => {
    /**
     * @type { {
     *  data: SlashCommandBuilder,
     *  execute: (interaction: ChatInputCommandInteraction<import("discord.js").CacheType>) => Promise<any>
     * } }
     */
    const module = (await import(new URL(filename, commandsdir))).default;
    const { data, execute } = module;

    commands.set(data.name, {
      command: data,
      execute: execute
    })
  });

  await SlashCommandsRegister(client, commands);
}