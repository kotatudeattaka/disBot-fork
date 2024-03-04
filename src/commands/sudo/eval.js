/**
 * VM (executing JavaScript)
 * 
 * @link https://nodejs.org/api/vm.html
 * 
 * @description Error Cases / エラー事例
 * 
 *  - const fs = require('fs'); => ReferenceError: require is not defined
 *  - process.exit();           => ReferenceError: process is not defined
 * 
 * @warn Attention! / 注意！
 * 
 *  !! The node:vm module is not a security mechanism. Do not use it to run untrusted code. !!
 *  !! vmモジュールはセキュリティメカニズムではありません。信頼できないコードの実行には使用しないでください。   !!
 * 
 */

import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandSubcommandBuilder } from "discord.js";
// import vm from "node:vm";

export default {
  data: new SlashCommandSubcommandBuilder()
    .setName("eval")
    .setDescription("execute code (JavaScript)")
    .setDescriptionLocalization("ja", "コードを実行します (JavaScript)")
    .addStringOption(option => 
      option
        .setName("code")
        .setNameLocalization("ja", "コード")
        .setDescription("Enter the code you want to run")
        .setDescriptionLocalization("ja", "実行したいコードを入力")
        .setRequired(true)
    )
  ,
  /**
   * @param { ChatInputCommandInteraction<import("discord.js").CacheType> } interaction 
   */
  execute: async (interaction) => {
    const code = interaction.options.getString("code");

    try {
      /**
       * Executing the code
       * コードの実行
       */
      // const result = vm.runInContext("'use strict'" + code , vm.createContext());

      const result = Function(code)();

      /**
       * Send results
       * 結果の送信
       */
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Script Evaluate")
            .addFields({
              name: "executed response:",
              value: `\`\`\`${String(typeof result == "object" ? JSON.stringify(result, null, 2) : result)}\`\`\``
            })
            .setFooter({
              text: "[mode: SuperUser]",
            })
            .setColor(process.env.EMBED_COLOR_SUCCESS)
            .toJSON()
        ]
      });
    } catch(e) {
      /**
       * If an error occurs
       * エラーが起こった場合
       */
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Script Evaluate")
            .addFields({
              name: "Error",
              value: e?.message
            })
            .setFooter({
              text: "[mode: SuperUser]",
            })
            .setColor(process.env.EMBED_COLOR_ERROR)
            .toJSON()
        ]
      });
    }
  } 
}