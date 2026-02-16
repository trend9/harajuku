/**
 * 原宿ネオ占い - 共通ロジックエンジン
 * 日付や週番号、星座をシードにして一貫性のある結果を生成します。
 */

const FortuneEngine = {
    // シンプルなシード付き乱数生成器 (Mulberry32)
    seededRandom(seed) {
        return function () {
            let t = seed += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    },

    // 日付をシード（数値）に変換
    getDateSeed(date = new Date()) {
        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();
        return y * 10000 + m * 100 + d;
    },

    // 週番号を取得 (ISO 8601)
    getWeekNumber(date = new Date()) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    },

    // 週ベースのシード生成
    getWeekSeed(date = new Date()) {
        const y = date.getFullYear();
        const w = this.getWeekNumber(date);
        return y * 100 + w;
    },

    // 星座のリスト
    zodiacSigns: [
        { name: "おひつじ座", symbol: "♈", dates: "3/21 - 4/19" },
        { name: "おうし座", symbol: "♉", dates: "4/20 - 5/20" },
        { name: "ふたご座", symbol: "♊", dates: "5/21 - 6/21" },
        { name: "かに座", symbol: "♋", dates: "6/22 - 7/22" },
        { name: "しし座", symbol: "♌", dates: "7/23 - 8/22" },
        { name: "おとめ座", symbol: "♍", dates: "8/23 - 9/22" },
        { name: "てんびん座", symbol: "♎", dates: "9/23 - 10/23" },
        { name: "さそり座", symbol: "♏", dates: "10/24 - 11/22" },
        { name: "いて座", symbol: "♐", dates: "11/23 - 12/21" },
        { name: "やぎ座", symbol: "♑", dates: "12/22 - 1/19" },
        { name: "みずがめ座", symbol: "♒", dates: "1/20 - 2/18" },
        { name: "うお座", symbol: "♓", dates: "2/19 - 3/20" }
    ],

    // タロットカードのリスト (大アルカナ)
    tarotCards: [
        { name: "愚者", symbol: "0", meaning: "自由、冒険、未知への一歩。今日は型にハマらない行動が吉。" },
        { name: "魔術師", symbol: "I", meaning: "才能、創造、スタート。あなたのスキルを最大限に活かせる日です。" },
        { name: "女教皇", symbol: "II", meaning: "直感、知恵、静寂。心の声に耳を傾けることで正解が見つかります。" },
        { name: "女帝", symbol: "III", meaning: "豊穣、母性、愛。物質的・精神的な豊かさを享受できるでしょう。" },
        { name: "皇帝", symbol: "IV", meaning: "権威、統率、安定。責任ある行動が周囲からの信頼を集めます。" },
        { name: "教皇", symbol: "V", meaning: "伝統、慈悲、連帯。他者のアドバイスに耳を傾けると道が開けます。" },
        { name: "恋人", symbol: "VI", meaning: "選択、調和、情熱。自分に正直な選択をすることで幸せが訪れます。" },
        { name: "戦車", symbol: "VII", meaning: "勝利、前進、意志。目標に向かって突き進むエネルギーが溢れています。" },
        { name: "力", symbol: "VIII", meaning: "忍耐、勇気、自制。困難を優しさと強さで乗り越えられる日です。" },
        { name: "隠者", symbol: "IX", meaning: "内省、真理、孤独。自分自身を見つめ直す時間が新たな発見を生みます。" },
        { name: "運命の輪", symbol: "X", meaning: "変化、好機、回転。大きな運命の波があなたを良い方向へ運びます。" },
        { name: "正義", symbol: "XI", meaning: "公正、均衡、決断。客観的な判断が最良の結果をもたらします。" },
        { name: "吊るされた男", symbol: "XII", meaning: "試練、献身、視点の変化。一見停滞していても、それは充電期間です。" },
        { name: "死神", symbol: "XIII", meaning: "終焉、再生、リセット。古い自分を捨て、新しい何かが始まります。" },
        { name: "節制", symbol: "XIV", meaning: "調和、自制、節度。異なる要素をうまく融合させることで安定します。" },
        { name: "悪魔", symbol: "XV", meaning: "誘惑、束縛、執着。自分の弱さを知り、欲望をコントロールすべき時です。" },
        { name: "塔", symbol: "XVI", meaning: "崩壊、衝撃、目覚め。突然の変化は、より良い未来への土台となります。" },
        { name: "星", symbol: "XVII", meaning: "希望、インスピレーション、願い。あなたの夢が叶う兆しが見えています。" },
        { name: "月", symbol: "XVIII", meaning: "不安、幻想、予感。不明瞭な状況ですが、直感を信じて進みましょう。" },
        { name: "太陽", symbol: "XIX", meaning: "成功、祝福、活力。すべてが明るく照らされ、幸福に満ちた日です。" },
        { name: "審判", symbol: "XX", meaning: "復活、再評価、決断。過去の努力が報われ、新たな道が示されます。" },
        { name: "世界", symbol: "XXI", meaning: "成就、完成、調和。ひとつのサイクルが最高の結果で終わります。" }
    ],

    // 水晶占いのメッセージ
    crystalMessages: [
        "水晶の中にまばゆい光が見えます。あなたの願いは間もなく届くでしょう。",
        "深い蒼い色が広がっています。今は冷静に状況を見守ることが大切です。",
        "炎のような紅い光が揺らめています。情熱的な行動がチャンスを掴みます。",
        "緑色の優しい輝きが見えます。健康と安らぎがあなたを包み込むでしょう。",
        "黄金のしずくが水晶を満たしています。思わぬ豊かさが舞い込む予感です。",
        "紫色の神秘的な霧が漂っています。あなたの直感は今、非常に冴えています。",
        "透明で澄み切った輝きです。進むべき道がはっきりと見えてくるはずです。",
        "虹色の光が四方に散らばっています。多くの人々との関わりが幸運を呼びます。"
    ],

    // 週ごとのメッセージプール
    weeklyFortunes: [
        "今週は積み重ねてきた努力が形になる時。一歩ずつ着実に進んでください。",
        "周囲との調和がキーワード。優しさを持って接すれば、大きな助けが得られます。",
        "新しいプロジェクトや挑戦に最適な週。あなたのリーダーシップが光ります。",
        "感性が豊かになる時期。アートや音楽に触れることで運気がアップします。",
        "整理整頓が運気を呼び込みます。身の回りの不要なものを手放してみましょう。",
        "変化の激しい週になりそう。柔軟な対応力があなたの身を助けます。",
        "自分への投資を惜しまないで。学びや美容など、自分を磨くことが吉。",
        "思わぬところからチャンスが舞い込みます。フットワークを軽くしておきましょう。"
    ],

    // 指定されたシードと配列から1つ選択
    pick(array, seed) {
        const rand = this.seededRandom(seed);
        return array[Math.floor(rand() * array.length)];
    },

    // 総合的な運勢の方向性を決定 (1: 大吉, 2: 中吉, 3: 小吉, 4: 吉, 5: 末吉, 6: 凶)
    getGeneralLuck(dateSeed) {
        const rand = this.seededRandom(dateSeed);
        const val = rand();
        if (val < 0.1) return "大吉";
        if (val < 0.3) return "中吉";
        if (val < 0.5) return "吉";
        if (val < 0.7) return "小吉";
        if (val < 0.9) return "末吉";
        return "吉"; // バランス調整
    },

    // 今週の運勢を取得
    getWeeklyFortune(signIndex, date = new Date()) {
        const weekSeed = this.getWeekSeed(date) + signIndex;
        const result = this.pick(this.weeklyFortunes, weekSeed);
        const luck = this.getGeneralLuck(weekSeed);
        return { message: result, luck: luck };
    },

    // 今日のタロットを取得
    getDailyTarot(date = new Date()) {
        const dateSeed = this.getDateSeed(date);
        return this.pick(this.tarotCards, dateSeed);
    },

    // 水晶占いの結果を取得
    getCrystalResult(date = new Date()) {
        const dateSeed = this.getDateSeed(date) + 999; // 他の結果と被らないようにずらす
        return this.pick(this.crystalMessages, dateSeed);
    }
};

// ブラウザとNode両方で使えるように出力
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FortuneEngine;
} else {
    window.FortuneEngine = FortuneEngine;
}
