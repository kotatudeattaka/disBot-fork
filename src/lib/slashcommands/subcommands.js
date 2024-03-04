import { forEachAsync } from "../forEachAsync/index.js";
import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import { readdir } from "fs/promises";

/**
 * 
 * @param { SlashCommandBuilder } command 
 */
export const SubCommandManager = async (command) => {
  /** スラッシュコマンドのフォルダー / folder of subslashcommands */
  const subcommandsdir = new URL(`../../commands/${command.name}/`, import.meta.url);

  const fileList = (await readdir(subcommandsdir))
    .filter(x => x.endsWith(".js")); // .jsの拡張子でフィルター / filter file name endsWith: .js

  /**
   * @type { Map<string, (interaction: ChatInputCommandInteraction<import("discord.js").CacheType>) => Promise<any>> }
   */
  const subCommands = new Map();

  /**
   * Array.prototype.forEachで非同期関数(AsyncFunction)callbackがうまく稼働しないことについては、以下を参照してください
   * @link https://qiita.com/tawatawa/items/c458f76ff364bf9f5781
   */
  await forEachAsync(fileList, async (filename) => {
    /**
     * @type { {
     *  data: SlashCommandSubcommandBuilder,
     *  execute: (interaction: ChatInputCommandInteraction<import("discord.js").CacheType>) => Promise<any>
     * } }
     */
    const module = (await import(new URL(filename, subcommandsdir))).default;
    const { data, execute } = module;

    subCommands.set(data.name, execute);
    command.addSubcommand(data);
  });

  return {
    subcommands: subCommands,
    command: command
  };
}