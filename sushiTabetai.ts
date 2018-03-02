import { OdnTweetData, OdnTweets } from "../../../odnTweets"
import { OdnPlugins, OdnPluginResultData } from "../../../odnPlugins";
import {Log, OdnUtils} from "../../../odnUtils";

export class SushiTabetai {
  constructor(private tweetData: OdnTweetData, private fullName: string) {}

  /**
   * プラグインのメイン処理を実行
   *
   * @param {(isProcessed?: boolean) => void} finish
   */
  run(finish: (isProcessed?: boolean) => void) {
    const tweets = new OdnTweets(this.tweetData.accountData);
    const neta = Resouces.getSushiNeta();
    tweets.text = "🍣" + neta + "🍣食べたい";
    tweets.targetTweetId = this.tweetData.idStr;

    // ツイートを投稿
    tweets.postTweet((isSuccess) => {
      tweets.likeTweet();
      finish();
    });
  }

  /**
   * プラグインを実行するかどうか判定
   *
   * @param {OdnTweetData} tweetData
   * @returns {boolean}
   */
  static isValid(tweetData: OdnTweetData): boolean {
    return false === tweetData.isRetweet && tweetData.text.match(/^[他]?人の[お]?(金|かね|財布)で(寿司|スシ|すし)(が|を)?(食べたい|たべたい)$/gi) ? true : false;
  }
}

class Resouces {
  private static netaList: Array<string> = [
    "アカガイ",
    "アジ",
    "アナゴ",
    "イカ",
    "イクラ",
    "イワシ",
    "ウニ",
    "甘エビ",
    "カキ",
    "カジキマグロ",
    "カツオ",
    "カニ",
    "カリフォルニアロール",
    "カレイ",
    "カンパチ",
    "キンメダイ",
    "コハダ",
    "サーモン",
    "サバ",
    "サンマ",
    "シラウオ",
    "おいなり",
    "たまご",
    "タイ",
    "タチウオ",
    "つぶ貝",
    "とびっこ",
    "トロ",
    "ニシン",
    "ハマチ",
    "ブリ",
    "ホタテ",
    "マグロ",
    "中トロ",
    "数の子",
    "大トロ",
    "茶碗蒸し",
    "蒸しエビ",
    "エンガワ",
    "ネギトロ",
    "ハンバーグ",
    "かずのこ",
    "納豆巻",
    "鉄火巻",
    "たこわさび"
  ];

  /**
   * 寿司ネタをランダムで取得
   *
   * @returns {string}
   */
  static getSushiNeta(): string {
    const index = OdnUtils.rand(0, this.netaList.length - 1);
    return this.netaList[index];
  }
}