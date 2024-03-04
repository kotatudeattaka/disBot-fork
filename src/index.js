import { config as dotenvConfig } from "dotenv";

/** 環境変数 */
dotenvConfig();

import {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
  EmbedBuilder,
  Locale,
} from "discord.js";

import { SlashCommandManager, commands } from "./lib/slashcommands/index.js";

const client = new Client({
  intents: Object.values(GatewayIntentBits),
});

let ready = false;

/**
 * Actions for Ready / 起動時のアクション
 */
client.once(Events.ClientReady, async () => {
  const { username, id } = client.user;

  console.log(`logged in ${username}(${id})`);

  client.user.setActivity(`[loading]: slashcommand`, {
    type: ActivityType.Playing
  });

  await SlashCommandManager(client);

  ready = true;

  console.log("ready!")

  /**
   * 遅延情報(ping)
   * ping information
   */
  setInterval(() => {
    /**
     * botのステータス
     * set status of this bot
     * 
     * @example
     *  botが参加してるサーバー数であれば
     *  If the number of servers the bot is participating in is
     * 
     *  client.user.setActivity(`Number of participating servers: ${client.guilds.cache.size()}`, {
     *    type: ActivityType.Watching
     *  });
     */
    client.user.setActivity(`Ping ${client.ws.ping} ms`, {
      type: ActivityType.Watching
    });
  }, 10 * 1000);
});

/**
 * コマンド実行時アクション => 下の関数へ
 */
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  /**
   * まだスラッシュコマンドを読み込めてない場合のため(エラー回避)
   * In case you haven't loaded the slash command yet
   */
  if (!ready) return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("Error:")
        .addFields({
          name: "message",
          value: "> Sorry, we are currently preparing. Please wait until the module has finished loading."
        })
        .setTimestamp()
        .setColor(process.env.EMBED_COLOR_ERROR)
        .toJSON()
    ]
  });

  /**
   * コマンドが存在するかのチェック
   * check for commands that exist
   */
  if (!commands.has(interaction.commandName)) return interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle("Error:")
        .addFields({
          name: "Message",
          value: "> Sorry, but that command may not be implemented or exist yet"
        })
        .setTimestamp()
        .setColor(process.env.EMBED_COLOR_ERROR)
        .toJSON()
    ]
  });

  const { execute } = commands.get(interaction.commandName);

  await interaction.deferReply();

  // execute!
  await execute(interaction);
});

// サーバーにメンバーが参加した場合
client.on(Events.GuildMemberAdd, async member => {

});

/**
 * エラーログ / Error Logs
 */
client.on(Events.Error, async (e) => {
  console.error(e);

  /**
   * 特定のチャンネルにエラー情報を通知する場合
   * If you want to notify error information to a specific channel
   * 
   * @example
   *  edit DEBUG_CHANNEL_ID in file:".env"
   */

  // const channel = client.channels.cache.get(process.env.DEBUG_CHANNEL_ID)
  // if (!channel) return console.error("エラー出力チャンネルが見つかりませんでした。");

  // await channel.send({
  //   embeds: [
  //     new EmbedBuilder()
  //       .setTitle(`[Error] ${e.name}`)
  //       .setDescription(e.message)
  //       .addFields(
  //         {
  //           name: "content",
  //           value: e.stack
  //         }
  //       )
  //       .setColor(syncConfig.color.error)
  //   ]
  // })
})


/**
 * botがサーバーに招待された場合
 * If the bot is invited to the server
 */
client.on(Events.GuildCreate, async guild => {

  /** 
   * コマンド一覧の送信
   * Send command list
   */
  const {
    /**
     * サーバー名
     * Server(Guild) Name
     */
    name: serverName,

    /**
     * 言語
     * Language
     */
    preferredLocale: serverLanguage
  } = guild;

  await guild.publicUpdatesChannel?.send?.({
    embeds: [
      /** 
       * コマンド一覧の送信
       * Send command list
       */
      new EmbedBuilder()
        .setTitle("Command List")
        .addFields(
          /**
           * Array.from() - "Map Object" to "Array(配列) Object"
           * @link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/from
           * 
           * Spread syntax (...Array) / スプレッド構文
           * @link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_syntax
           */
          ...Array.from(commands.values()).map((cmd) => ({
            /** 
             * コマンド名 / command name
             */
            name: cmd.command.name,

            /**
             * 言語化 / Locale to Languages
             */
            value: serverLanguage == Locale.Japanese ? cmd.command.description_localizations["ja"] : cmd.command.description
          }))
        )
        .setFooter({
          /** サーバー名 / set a server name */
          text: `Server: ${serverName}`
        })
        .setColor(syncConfig.color.success)
    ]
  });
});

client.login(process.env.DISCORD_TOKEN);