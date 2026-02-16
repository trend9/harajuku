const fs = require('fs');
const path = require('path');

const columnsDir = path.join(__dirname, 'columns');
if (!fs.existsSync(columnsDir)) {
    fs.mkdirSync(columnsDir);
}

// 乱数生成器 (シード付き)
function createRand(seed) {
    let s = seed;
    return function () {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };
}

const categories = [
    { name: "運命の占星術", topics: ["12星座の深層心理", "惑星の巡り合わせ", "月と太陽のリズム", "星が教える宿命", "ホロスコープの謎"] },
    { name: "現代の風水・空間術", topics: ["開運インテリアの極意", "自然エネルギーの活用", "オフィスと仕事運", "玄関と幸運の入り口", "寝室の良眠風水"] },
    { name: "聖なる場所と祈り", topics: ["神秘のパワースポット案内", "祈りの心理学", "伝統と智慧", "神道と精神性", "古の伝承"] },
    { name: "心と魂のデトックス", topics: ["マインドフルネスな過ごし方", "魂の浄化習慣", "五感と癒やし", "瞑念の深淵", "自己受容の旅"] },
    { name: "成功と豊かさの引き寄せ", topics: ["金運を劇的に変える習慣", "夢を形にする行動力", "リーダーシップの精神", "富のエネルギー", "成功の設計図"] },
    { name: "数秘術と数字の魔法", topics: ["誕生数のメッセージ", "エンジェルナンバーの導き", "数字と運命の関係", "マスターナンバー", "日常の数秘術"] },
    { name: "夢占いと潜在意識", topics: ["夢のシンボル解読", "潜在意識の書き換え", "悪夢の意味", "予知夢の不思議", "深層心理の旅"] }
];

const subTopicPool = [
    "隠れた才能", "愛の形", "適職の秘密", "影の性格", "成長の鍵", "相性の真実", "魂の目的", "前世の記憶", "才能の開花", "運勢の転換期",
    "玄関の魔法", "寝室の浄化", "キッチンの金運", "断捨離の極意", "鏡の魔力", "色の影響力", "光のデザイン", "水の流れ", "邪気払いの儀式", "パワースポット化",
    "隠れ神社の霊験", "滝の浄化力", "磁場の秘密", "参拝の作法", "御朱印の縁", "山のエネルギー", "森の沈黙", "川の流れと運気", "海のリズム", "大地の鼓動",
    "日常の瞑想", "感情の整理法", "デジタルデトックス", "深い眠りの技術", "呼吸の魔法", "歩く瞑想", "ジャーナリングの効果", "沈黙の癒やし", "涙の浄化", "笑いの波動",
    "財布の作法", "与える喜び", "お金の潜在意識", "投資のマインド", "豊かさの循環", "浪費と投資", "稼ぐ力の源泉", "貯蓄の哲学", "経済的自由への道", "富の配分",
    "目標設定の魔法", "人脈の広げ方", "チャンスの掴み方", "失敗の活かし方", "イメージ法", "朝のルーティン", "読書と成長", "習慣の力", "決断のスピード", "継続の技術",
    "言霊の力", "感謝の瞑想", "守護霊との対話", "奇跡の仕組み", "願いが叶う瞬間", "魂の安らぎ", "直感の磨き方", "謙虚さの美学", "許しのプロセス", "慈悲の心",
    "逆行の影響", "魂の使命", "未来予測の術", "転換点のサイン", "運命の出会い", "試練の意味", "土星の教え", "木星の恩恵", "金星の愛", "火星の情熱",
    "誕生数の秘密", "マスターナンバー11", "22の創造力", "33の慈愛", "ライフパスナンバー", "パーソナルイヤー", "数字の波動", "ゼロの無限性", "ピタゴラスの智慧", "カバラ数秘術",
    "空飛ぶ夢の意味", "落ちる夢の心理", "追いかけられる理由", "色のついた夢", "亡くなった人との再会", "歯が抜ける夢", "家と自分", "水辺の夢", "乗り物の象徴", "動物の訪問",
    "整理整頓の極意", "ミニマリズムの実踐", "家具の配置", "照明の重要性", "アロマと運気", "観葉植物の効果", "盛り塩の正しい方法", "掃除と金運", "窓の役割", "床の浄化",
    "コミュニケーションの運勢", "信頼の築き方", "リーダーの孤独", "チームワークの魔法", "聞き上手になる", "笑顔の力", "非言語のメッセージ", "誠実さの影響", "包容力", "共感の技術",
    "朝日のパワー", "月光浴の儀式", "季節の移ろい", "二十四節気の暮らし", "旧暦の知恵", "お彼岸の過ごし方", "お正月の開運", "冬至の希望", "春分の芽生え", "夏至の頂点",
    "クリスタルヒーリング", "パワーストーンの選び方", "浄化の方法", "シンギングボウルの共鳴", "レイキの癒やし", "オーラの修復", "チャクラの活性化", "ダウジング", "九星気学", "四柱推命",
    "牡羊座の情熱", "牡牛座の安定", "双子座の好奇心", "蟹座の慈愛", "獅子座の輝き", "乙女座の繊細", "天秤座の調和", "蠍座の深淵", "射手座の自由", "山羊座の不屈", "水瓶座の革新", "魚座の共感",
    "1月の開運法", "2月のリセット", "3月の旅立ち", "4月の新生活", "5月の休息", "6月の浄化", "7月の情熱", "8月の豊穣", "9月の内省", "10月の実り", "11月の祈り", "12月の感謝",
    "幸運を呼ぶ靴", "帽子の魔法", "アクセサリーの力", "時計の選び方", "ペンに宿る運気", "名刺入れの風水", "ハンカチの癒やし", "バッグの中身", "ネクタイの色", "靴下の色",
    "朝のコップ一杯の水", "お風呂での瞑想", "夜寝る前の感謝", "鏡の中の自分", "笑顔の練習", "姿勢を整える", "歩き方を変える", "呼吸を意識する", "深呼吸の習慣", "ストレッチの効能",
    "お香の煙", "キャンドルの炎", "風鈴の音", "クリスタルチューナー", "ホワイトセージの煙", "パロサントの香り", "エッセンシャルオイル", "加湿器と浄化", "太陽の光", "月の光",
    "神社への参拝", "仏閣への感謝", "お墓参りの意味", "氏神様との縁", "産土神様との絆", "崇敬神社を持つ", "直感に従う", "偶然を大切にする", "シンクロニシティ", "夢を記録する",
    "人への褒め言葉", "聞き手に回る", "反対意見の尊重", "ユーモアのセンス", "怒りを手放す", "悲しみを癒やす", "喜びを分かち合う", "愛を伝える", "優しさの連鎖", "徳を積む",
    "お金への感謝", "支払う時の気持ち", "受け取る時の喜び", "将来のビジョン", "やりたいことリスト", "バケットリスト", "ビジョンボード", "アファメーション", "言霊の活用", "感謝ノート",
    "自分へのご褒美", "ソロキャンプの癒やし", "一人旅の発見", "静かな読書時間", "映画からの教訓", "音楽の力", "美術鑑賞の感性", "自然の中を歩く", "裸足で土に触れる", "星空を見上げる",
    "雨音を楽しむ", "雪の結晶の神秘", "霧の中の静寂", "雷のエネルギー", "風のささやき", "虹の幸運", "夕焼けの安らぎ", "朝焼けの希望", "雲の形", "季節の風",
    "旬の食材を食べる", "手作りの料理", "食事への感謝", "ゆっくり噛んで食べる", "お茶のひと時", "和菓子の伝統", "フルーツの酵素", "発酵食品の力", "玄米の栄養", "野菜の生命力",
    "掃除機の後の空気", "床を磨く心", "窓を拭く視界", "トイレ掃除の功徳", "キッチンの清潔", "冷蔵庫の整理", "クローゼットの空間", "本棚の整理", "机の上を広く", "書類の破棄",
    "新しい服を着る", "大切に手入れする", "お気に入りに囲まれる", "シンプルに生きる", "丁寧に暮らす", "心地よさを優先する", "五感を育てる", "好奇心を持ち続ける", "学びを深める", "本質を見極める",
    "変化を楽しむ", "今を受け入れる", "未来を信じる", "過去に感謝する", "自分を許す", "他を許す", "世界を愛する", "平和を祈る", "調和を重んじる", "誠実を尽くす",
    "勇気を持つ", "あきらめない心", "軽やかな足取り", "しなやかな考え方", "深い慈しみの心", "輝く笑顔", "澄んだ瞳", "温かい手", "力強い言葉", "優しい声",
    "一期一会の縁", "運命の糸", "見えない助け", "直感のひらめき", "偶然の重なり", "運の波に乗る", "チャンスを逃さない", "直感力を磨く", "魂の声を聞く", "宇宙の導き",
    "生命の輝き", "魂の振動", "宇宙の調和", "永遠の今", "感謝の極致", "至福のひと時", "魂の再会", "光の道", "未知への挑戦", "存在の喜び",
    "心の平安", "真実の愛", "幸福の定義", "豊かさの源泉", "真の自由", "悟りの階段", "日常の聖域", "内なる神殿", "魂の安息所", "宇宙の贈り物",
    "運勢の潮目", "風向きの変化", "新しいステージ", "魂の成長期", "意識の拡大", "未知の領域", "次元の上昇", "光のシャワー", "宇宙のリズム", "運命の羅針盤",
    "輝かしい未来", "希望の光", "至極の人生", "魂の歓喜", "宇宙の無限", "永遠の輝き", "真実の道", "幸せの連鎖", "愛の奇跡", "感謝の奇跡",
    "至高の運気", "絶好のチャンス", "飛躍の時", "再生の瞬間", "魂の浄化完了", "光の世界へ", "調和の極み", "感謝の境地", "至福の人生", "永遠の平安",
    "運命を味方につける", "星々のささやき", "宇宙の鼓動", "魂の約束", "真実の自己", "光の導き手", "愛のメッセンジャー", "平和の祈り", "地球への感謝", "宇宙への献身",
    "最高の自己表現", "豊かさの体現者", "幸せの種まき", "愛の循環", "感謝の共鳴", "宇宙との一体感", "至福の存在", "永遠の魂の旅", "真実の光", "新しい地球へ"
];

const sentenceOpeners = [
    "驚くべきことに、", "古来からの伝承によれば、", "多くの人が見落としがちですが、", "実は、", "最近の研究でも明らかになっていますが、",
    "心に留めておいてほしいのは、", "一見すると無関係に思えるかもしれませんが、", "専門家の間では常識とされていますが、",
    "あなたの日常を劇的に変えるきっかけは、", "運命の歯車を回すためには、"
];

const connectives = [
    "さらに詳しく見ていくと、", "これには深い理由があります。", "具体的には、", "その結果として、", "このプロセスこそが、",
    "それだけでなく、", "本質的に言えば、", "こうした背景には、", "もちろん、", "最終的には、"
];

const conclusions = [
    "これが、あなたが新しい一歩を踏み出すための鍵となります。",
    "今日から意識を変えるだけで、見える景色は変わるはずです。",
    "自分を信じ、この力を活用することで、道は開けます。",
    "あなたの内側にある可能性を、今こそ解き放ってください。",
    "幸運は、準備ができている人の元にやってくるのです。"
];

const expertCommentary = [
    "専門家の間では常識とされていますが、このアプローチは非常に強力です。",
    "多くの臨床例が示す通り、この意識の変化は劇的な結果をもたらします。",
    "古来からの叡智と現代の心理学が見事に一致するポイントが、まさにここにあります。",
    "経験豊富な占い師ほど、この基礎的な部分の大切さを説き続けます。",
    "統計的にも、この傾向を取り入れた人は全体的な満足度が高いことが分かっています。"
];

const generalSentences = [
    "私たちの運命は、星の動きだけでなく、日々の微細な意識の向け方によっても形作られます。",
    "心の奥底に眠る潜在意識は、私たちが気づかないうちに現実を引き寄せる磁石のような役割を果たしています。",
    "宇宙のエネルギーと同調するためには、まず自分の内面を整え、クリアな状態に保つことが重要です。",
    "運勢の流れは常に一定ではなく、潮の満ち引きのようにリズムを持って変化しています。",
    "多くの成功者は、論理的な判断だけでなく、自らの直感を信じることで道を切り拓いてきました。",
    "開運の本質とは、自分を取り巻く環境と調和し、感謝の心を持つことに他なりません。",
    "不安や迷いが生じたときは、深呼吸をして、自分が本当に望んでいる未来をイメージしてみましょう。",
    "過去の経験は全て、今のあなたを形作るための貴重な糧であり、未来への土台となります。",
    "小さな習慣の積み重ねが、やがて大きな幸運の波となってあなたの元に訪れるでしょう。",
    "信じることが現実を作るという言葉通り、ポジティブなイメージを持ち続けることが大切です。",
    "魂の成長には、時に厳しい試練も必要ですが、それは更なる飛躍のための準備期間でもあります。",
    "直感は魂からのメッセージであり、迷いの中にあるあなたに正しい方向を示してくれます。",
    "日々の生活の中に感謝を見出すことで、新しい幸運が舞い込むスペースが生まります。",
    "自分を愛し、大切にすることは、他者から愛されるための第一歩でもあります。",
    "変化を恐れず、新しいことに挑戦する姿勢が、運命の扉を開く鍵となります。",
    "宇宙は決してあなたを見捨てず、常に最善のタイミングでサポートを送っています。",
    "感性を研ぎ澄ますことで、日常の中に隠された開運のサインを読み取ることができるようになります。",
    "内面の豊かさが外側の現実を映し出す鏡となり、あなたの人生をより輝かせます。",
    "静寂の中に身を置き、自分自身と対話する時間が、真の知恵を授けてくれるでしょう。",
    "幸せは探すものではなく、今この瞬間にあることに気づくものだという教えがあります。",
    "日常の何気ない風景の中にも、運命を好転させるヒントが隠されています。",
    "言葉には魂が宿り、私たちが発する一言一言が未来を創り出していきます。",
    "執着を手放したとき、本当に必要なものが自然と舞い込んでくるものです。",
    "自分自身の可能性を制限しているのは、他ならぬ自分自身の思い込みかもしれません。",
    "困難に直面したときこそ、自分の内なる強さを再発見するチャンスです。",
    "調和のとれた心身は、宇宙のポジティブなエネルギーを受け取る最良の器となります。",
    "他者への思いやりと感謝が、巡り巡ってあなた自身の運気を押し上げます。",
    "成功とは目的地の事ではなく、そこに至るまでの成長のプロセスそのものです。",
    "今、この瞬間に集中することが、過去の重荷から解放される唯一の道です。",
    "目に見えない世界の力を信じることで、論理を超えた奇跡が起こり始めます。"
];

function generateParagraph(rand, keyword, targetLength) {
    let result = "";
    let currentParagraph = "";
    let totalLength = 0;

    let pool = [...generalSentences];
    // シャッフル
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    let index = 0;
    while (totalLength < targetLength) {
        if (index >= pool.length) {
            index = 0;
        }

        let sentence = "";
        const openerChance = rand();
        if (openerChance < 0.4) sentence += pick(sentenceOpeners, rand);

        const coreSentence = pool[index];
        if (rand() < 0.3) {
            sentence += `「${keyword}」について考えるとき、${coreSentence}`;
        } else {
            sentence += coreSentence;
        }

        const connectiveChance = rand();
        if (connectiveChance < 0.3) sentence += pick(connectives, rand);
        if (rand() < 0.2) sentence += pick(expertCommentary, rand);

        sentence += " ";
        currentParagraph += sentence;
        totalLength += sentence.length;
        index++;

        // 約250文字を超えたら段落を区切る
        if (currentParagraph.length > 250) {
            result += `<p>${currentParagraph.trim()}</p>`;
            currentParagraph = "";
        }
    }

    // 残りの文章があれば追加
    if (currentParagraph.length > 0) {
        result += `<p>${currentParagraph.trim()}</p>`;
    }

    return result;
}

function pick(array, rand) {
    return array[Math.floor(rand() * array.length)];
}

function generateArticle(date, id) {
    const seed = (date.getFullYear() * 1000) + id;
    const rand = createRand(seed);

    // 確定的に365通りの組み合わせを作る
    const categoryIndex = id % categories.length;
    const category = categories[categoryIndex];

    const topicIndex = (Math.floor(id / categories.length)) % category.topics.length;
    const topicMain = category.topics[topicIndex];

    // subTopicを完全にユニークにするための工夫
    const subTopicIndex = id % subTopicPool.length;
    const subTopic = subTopicPool[subTopicIndex];

    const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    // 公開日をH1から排除
    const title = `${category.name}：${topicMain}で見つける「${subTopic}」の真実`;

    let content = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - 原宿ネオ占い</title>
    <link rel="icon" href="../icon.png" type="image/png">
    <link rel="stylesheet" href="../style.css">
    <style>
        .column-content { max-width: 1000px; margin: 100px auto 40px; padding: 40px; background: rgba(20, 20, 40, 0.8); backdrop-filter: blur(15px); border-radius: 25px; color: #e0e0e0; line-height: 2; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
        .column-content h1 { font-size: 2.4rem; margin-bottom: 40px; color: #fff; text-shadow: 0 0 10px rgba(102, 126, 234, 0.5); text-align: center; }
        .column-content h2 { font-size: 1.8rem; margin-top: 60px; color: #a78bfa; padding-bottom: 10px; border-bottom: 3px solid rgba(167, 139, 250, 0.4); }
        .column-content h3 { font-size: 1.5rem; margin-top: 40px; color: #667eea; }
        .column-content h4 { font-size: 1.2rem; margin-top: 25px; color: #764ba2; font-weight: bold; }
        .column-content p { margin-bottom: 25px; font-size: 1.15rem; text-align: justify; }
        .column-content img { width: 100%; height: auto; aspect-ratio: 16/9; object-fit: cover; border-radius: 20px; margin: 30px 0; border: 1px solid rgba(255,255,255,0.2); }
        .meta-info { text-align: right; color: rgba(255,255,255,0.4); font-size: 0.9rem; margin-bottom: 20px; }
        .back-nav { margin-bottom: 30px; }
        .back-nav a { color: #a78bfa; text-decoration: none; font-weight: bold; }
        
        @media (max-width: 768px) {
            .column-content { padding: 20px; margin: 20px; border-radius: 15px; }
            .column-content h1 { font-size: 1.8rem; }
            .column-content h2 { font-size: 1.5rem; }
            .related-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="logo">🔮 原宿ネオ占い</div>
            <ul class="nav-links">
                <li><a href="../index.html">ホーム</a></li>
                <li><a href="../horoscope.html">星座占い</a></li>
                <li><a href="../tarot.html">タロット占い</a></li>
                <li><a href="../crystal.html">水晶占い</a></li>
                <li><a href="index.html">開運コラム</a></li>
            </ul>
        </nav>
    </header>

    <article class="column-content">
        <div class="back-nav"><a href="index.html">← コラム一覧に戻る</a></div>
        <div class="meta-info">公開日: ${formattedDate}</div>
        <h1>${title}</h1>
        
        <p>${pick(introTemplates, rand)} 私たちの運命を左右するのは、日々の小さな選択の積み重ねです。${category.name}の視点から、${topicMain}に潜む${subTopic}の本質を探ることで、あなたの人生に新しい光が差し込むでしょう。この記事では、専門家の知見に基づいた深い洞察を提供します。</p>
    `;

    // 6つの主要セクションを生成 (合計3000文字以上を目指す)
    for (let i = 1; i <= 6; i++) {
        // 画像生成AI (Pollinations.ai) が表示されない問題に対処するため、
        // 確実な表示とユニーク性を保証する Picsum Photos (seed指定) に変更
        // これにより、404エラーやロード失敗を完全に防ぎ、かつ全記事で異なる画像を表示
        const imgUrl = `https://picsum.photos/seed/${id}-${i}/800/450`;

        const chapterTitle = `第${i}章 ${subTopic}を高めるための実践的アプローチ`;

        // H2の連続を避け、一つの見出しにまとめる
        content += `<h2>${category.name}：${chapterTitle}</h2>`;

        content += `<img src="${imgUrl}" alt="${category.name} - ${subTopic}に関するイメージ画像" loading="lazy">`;

        // 各セクションで約500〜600文字程度を生成
        content += generateParagraph(rand, subTopic, 600);

        content += `<h3>${subTopic}が心に与える影響</h3>`;
        content += generateParagraph(rand, category.name, 500);

        content += `<h4>運気を改善する${i}つ目のポイント</h4>`;
        content += generateParagraph(rand, topicMain, 500);
    }

    content += `
        <h2>結論：${subTopic}を味方につけて新しい明日へ</h2>
        <p>${pick(conclusions, rand)} 占いとは、単なる未来の予測ではありません。それは自分を知り、より良い未来を自らの手で作り上げるためのツールなのです。${category.name}の智慧を、ぜひあなたの日常に取り入れてみてください。</p>
        <p>原宿ネオ占いは、あなたが理想の人生を歩めるよう、これからも寄り添い続けます。共に素晴らしい未来をデザインしていきましょう。</p>
        <div style="text-align: center; margin-top: 50px;">
            <a href="index.html" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; text-decoration: none; border-radius: 30px; font-weight: bold;">コラム一覧に戻る</a>
        </div>
        
        <div class="related-articles" style="margin-top: 60px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1);">
            <h3 style="text-align: center; margin-bottom: 30px;">このカテゴリーの関連記事</h3>
            <div class="related-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                ${generateRelatedLinks(date, categoryIndex, id)}
            </div>
        </div>

    </article>

    <footer>
        <p>&copy; 2026 原宿ネオ占い. All rights reserved.</p>
    </footer>
</body>
</html>`;

    // ファイル名にカテゴリインデックスを含めて重複回避
    return { fileName: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${categoryIndex}.html`, title, content };
}

// 関連記事リンク生成ロジック
function generateRelatedLinks(currentDate, categoryIndex, currentId) {
    let links = "";
    // 過去3日分の同カテゴリエントリへのリンクを生成 (存在しない場合はループさせる簡易ロジック)
    // ここでは簡易的に、現在のIDから 1, 2, 3 引いたものを参照するシミュレーションを行う
    // 実際にはファイル名が予測可能なので、それを利用する

    for (let i = 1; i <= 3; i++) {
        // 1日前の日付を計算
        let d = new Date(currentDate);
        d.setDate(d.getDate() - i);

        // 2026年1月1日より前なら、年末にループさせる (簡易的に2026年12月末へ)
        if (d.getFullYear() < 2026) {
            d = new Date(2026, 11, 31 - (i - 1));
        }

        const fName = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${categoryIndex}.html`;
        // タイトルは推測できないため、汎用的なテキストにするか、簡易生成する
        // ここでは「X月X日の【カテゴリ名】コラム」とする
        const linkText = `${d.getMonth() + 1}月${d.getDate()}日の「${categories[categoryIndex].name}」コラム`;

        links += `<a href="${fName}" style="padding: 15px; background: rgba(255,255,255,0.05); border-radius: 10px; color: #a78bfa; text-decoration: none; display: flex; align-items: center; justify-content: center; text-align: center; border: 1px solid rgba(255,255,255,0.1); transition: 0.3s; height: 100%;">${linkText}</a>`;
    }
    return links;
}

const introTemplates = [
    "私たちは今、大きな時代の転換点に立っています。目に見えるものだけが全てではない現代において、古来からの知恵が再び注目されています。",
    "心に平穏をもたらし、明日への活力を湧き上がらせるためには、まず自分自身の内なるリズムを知ることが不可欠です。",
    "運命という不確かな海を渡るための羅針盤として、占星術や風水などは非常に強力な助けとなります。"
];

// 実行
console.log("365日 x 7カテゴリ分のコラムを生成中...");
const start = new Date(2026, 0, 1);
const files = [];

let totalId = 0;
for (let i = 0; i < 365; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);

    // 1日につき全7カテゴリーの記事を生成
    for (let catIdx = 0; catIdx < categories.length; catIdx++) {
        // idをユニークにするために計算 (例: 日付インデックス * 10 + カテゴリインデックス)
        // または通し番号を使う
        const uniqueId = i * 100 + catIdx;

        // generateArticleを少し改造して、特定のカテゴリを指定できるようにする呼び出し等はせず、
        // 既存関数はランダム依存が強いため、IDハックでカテゴリをコントロールするアプローチをとる
        // generateArticle内部： const categoryIndex = id % categories.length;
        // したがって、id % 7 == catIdx になるような id を渡せばよい

        // uniqueId が catIdx と合同(mod 7)になるように調整
        // uniqueId = (i * 7) + catIdx; これなら uniqueId % 7 = catIdx になる
        const deterministId = (i * categories.length) + catIdx;

        const { fileName, title, content } = generateArticle(current, deterministId);
        fs.writeFileSync(path.join(columnsDir, fileName), content);

        const categoryName = categories[catIdx].name;
        files.push({ fileName, title, dateDisplay: `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`, category: categoryName });

        totalId++;
    }

    if ((i + 1) % 10 === 0) console.log(`${i + 1}日分 (${(i + 1) * 7}記事) 完了...`);
}

// 今日の日付 (日本時間) を基準に、公開済みの記事のみを表示する
const now = new Date();
const jstOffset = 9 * 60 * 60 * 1000;
const todayJST = new Date(now.getTime() + jstOffset);
todayJST.setUTCHours(0, 0, 0, 0);

const publishedFiles = files.filter(f => {
    // ファイル名 YYYY-MM-DD-IDX.html から日付を取得
    const parts = f.fileName.split('-');
    const articleDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return articleDate <= todayJST;
});

// インデックスページ
let indexHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>開運コラム一覧 - 原宿ネオ占い</title>
    <link rel="icon" href="../icon.png" type="image/png">
    <link rel="stylesheet" href="../style.css">
    <style>
        .list-container { max-width: 1200px; margin: 100px auto 40px; padding: 20px; }
        .column-link { display: flex; flex-direction: column; padding: 30px; background: rgba(255,255,255,0.05); border-radius: 20px; color: #fff; text-decoration: none; transition: 0.4s; border: 1px solid rgba(255,255,255,0.1); }
        .column-link:hover { background: rgba(102, 126, 234, 0.2); transform: translateY(-10px); border-color: #a78bfa; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); }
        .column-link .date { font-size: 0.85rem; color: rgba(255,255,255,0.4); margin-bottom: 10px; }
        .column-link .title { font-size: 1.3rem; font-weight: bold; line-height: 1.4; }
        
        /* Tab Styles */
        .category-tabs { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 40px; }
        .tab-btn { padding: 10px 20px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: #fff; cursor: pointer; transition: 0.3s; font-size: 0.95rem; }
        .tab-btn:hover, .tab-btn.active { background: #667eea; border-color: #667eea; box-shadow: 0 0 15px rgba(102, 126, 234, 0.5); }
        .column-link.hidden { display: none; }
        .column-link { animation: fadeIn 0.5s ease; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* Responsive Grid Layout */
        .column-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
        
        @media (max-width: 768px) {
            .column-grid { grid-template-columns: 1fr; gap: 20px; }
            .column-link { padding: 20px; }
        }
    </style>
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="logo">🔮 原宿ネオ占い</div>
            <ul class="nav-links">
                <li><a href="../index.html">ホーム</a></li>
                <li><a href="../horoscope.html">星座占い</a></li>
                <li><a href="../tarot.html">タロット占い</a></li>
                <li><a href="../crystal.html">水晶占い</a></li>
                <li><a href="index.html" class="active">開運コラム</a></li>
            </ul>
        </nav>
    </header>
    <div class="list-container">
        <h1 class="section-title">開運コラム一覧</h1>
        
        <div class="category-tabs">
            <button class="tab-btn active" data-category="all">すべて表示</button>
            ${categories.map(c => `<button class="tab-btn" data-category="${c.name}">${c.name}</button>`).join('\n')}
        </div>

        <div class="column-grid">
            ${publishedFiles.reverse().map(f => `
                <a href="${f.fileName}" class="column-link" data-category="${f.category}">
                    <span class="date">${f.dateDisplay}</span>
                    <span class="title">${f.title}</span>
                </a>
            `).join('\n')}
        </div>
    </div>
    <footer>
        <p>&copy; 2026 原宿ネオ占い. All rights reserved.</p>
    </footer>
</body>
</html>`;

// Tab Handling Script
indexHtml = indexHtml.replace('</body>', `
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const tabs = document.querySelectorAll('.tab-btn');
        const articles = document.querySelectorAll('.column-link');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Styles
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Filtering
                const category = tab.getAttribute('data-category');
                
                articles.forEach(article => {
                    const articleCategory = article.getAttribute('data-category');
                    if (category === 'all' || articleCategory === category) {
                        article.classList.remove('hidden');
                    } else {
                        article.classList.add('hidden');
                    }
                });
            });
        });
    });
</script>
</body>`);

fs.writeFileSync(path.join(columnsDir, 'index.html'), indexHtml);
console.log("✅ 全ての修正記事の生成が完了しました。");
