// Fortune - 占いサイト JavaScript

// 占い結果のデータ
const fortunes = {
    ja: {
        love: [
            "今日は素敵な出会いがあるかもしれません ❤️",
            "大切な人との絆が深まる日です 💕",
            "恋愛運は絶好調！積極的に行動しましょう ✨",
            "少し慎重に。焦らずゆっくり進みましょう 🌸",
            "思いがけない展開があるかも！？ 💫"
        ],
        money: [
            "金運上昇中！投資のチャンスかも 💰",
            "無駄遣いに注意。計画的に使いましょう 💳",
            "臨時収入の予感！ラッキーな一日です 🍀",
            "節約を心がけると良い日です 🐷",
            "お金の管理を見直す良い機会です 📊"
        ],
        general: [
            "全体的に良い運気！何事も前向きに 🌟",
            "少し休息が必要かも。無理は禁物です 😌",
            "新しいことにチャレンジする絶好の日 🚀",
            "周りの人に感謝の気持ちを伝えましょう 🙏",
            "直感を信じて行動すると良いでしょう 🔮"
        ]
    },
    en: {
        love: [
            "You might meet someone special today ❤️",
            "Your bond with loved ones will deepen 💕",
            "Love luck is excellent! Be proactive ✨",
            "Be cautious. Take it slow 🌸",
            "Unexpected developments may occur! 💫"
        ],
        money: [
            "Financial luck is rising! Investment opportunity 💰",
            "Watch out for wasteful spending 💳",
            "Extra income expected! Lucky day 🍀",
            "Focus on saving today 🐷",
            "Good time to review finances 📊"
        ],
        general: [
            "Overall good luck! Stay positive 🌟",
            "You may need some rest. Don't overdo it 😌",
            "Perfect day to try something new 🚀",
            "Express gratitude to those around you 🙏",
            "Trust your intuition 🔮"
        ]
    },
    th: {
        love: [
            "วันนี้คุณอาจพบคนพิเศษ ❤️",
            "ความสัมพันธ์จะแน่นแฟ้นขึ้น 💕",
            "โชคด้านความรักดีมาก! จงกล้าแสดงออก ✨",
            "ระวังหน่อย ค่อยๆ ไป 🌸",
            "อาจมีเหตุการณ์ไม่คาดคิด! 💫"
        ],
        money: [
            "โชคด้านการเงินกำลังขึ้น! โอกาสลงทุน 💰",
            "ระวังการใช้จ่ายฟุ่มเฟือย 💳",
            "คาดว่าจะมีรายได้พิเศษ! วันโชคดี 🍀",
            "มุ่งเน้นการออม 🐷",
            "เวลาที่ดีในการทบทวนการเงิน 📊"
        ],
        general: [
            "โชคโดยรวมดี! คิดบวก 🌟",
            "คุณอาจต้องการพักผ่อน อย่าทำมากเกินไป 😌",
            "วันที่เหมาะสำหรับการลองสิ่งใหม่ 🚀",
            "แสดงความขอบคุณต่อคนรอบข้าง 🙏",
            "เชื่อสัญชาตญาณของคุณ 🔮"
        ]
    }
};

// 現在の言語
let currentLanguage = 'ja';

// 言語切り替え
function switchLanguage(lang) {
    currentLanguage = lang;

    // ボタンのアクティブ状態を更新
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // 言語に応じてコンテンツを更新（簡易版）
    console.log(`Language switched to: ${lang}`);
}

// 占いを取得
function getFortune(type) {
    const fortuneList = fortunes[currentLanguage][type];
    const randomFortune = fortuneList[Math.floor(Math.random() * fortuneList.length)];

    const fortuneElement = document.getElementById(`${type}-fortune`);
    fortuneElement.style.opacity = '0';

    setTimeout(() => {
        fortuneElement.textContent = randomFortune;
        fortuneElement.style.opacity = '1';
        fortuneElement.style.transition = 'opacity 0.5s';
    }, 200);
}

// 占いセクションにスクロール
function scrollToFortune() {
    document.getElementById('fortune').scrollIntoView({
        behavior: 'smooth'
    });
}

// 今日の運勢ページに移動
function goToTodayFortune() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const fileName = `${year}-${month}-${day}.html`;
    window.location.href = `fortunes/${fileName}`;
}

// フォーム送信
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('お問い合わせありがとうございます！\nThank you for your message!\nขอบคุณสำหรับข้อความของคุณ!');
            form.reset();
        });
    }
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
