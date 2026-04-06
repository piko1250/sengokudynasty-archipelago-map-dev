// ==========================================
// 1. 画像リソース定義 (availableImages)
// ==========================================
let availableImages = [
    "./images/icon_amaterasu.png",
    "./images/icon_boat.png",
    "./images/icon_ebisu.png",
    "./images/icon_enemycamp.png",
    "./images/icon_hachiman.png",
    "./images/icon_inari.png",
    "./images/icon_ironprocessingstation.png",
    "./images/icon_jizo.png",
    "./images/icon_kannon.png",
    "./images/icon_lighthouse.png",
    "./images/icon_minorenemycamp.png",
    "./images/icon_ropebridge.png",
    "./images/icon_ryujin.png",
    "./images/icon_smallbridge.png",
    "./images/icon_tenjin.png",
    "./images/icon_unknown.png",
    "./images/icon_watchtower.png"
];

// ==========================================
// 2. カテゴリマスター (Category Master)
// ==========================================
let categoryMaster = {
    "special_project": {
        ja: "特殊建造物",
        en: "Special Projects",
        color: "#2E7D32"
    },
    "shrine": {
        ja: "神社",
        en: "Shrines",
        color: "#D81B60"
    },
    "ft": {
        ja: "ファストトラベル",
        en: "FastTravel",
        color: "#0288D1"
    },
    "enemy": {
        ja: "敵陣",
        en: "Enemy Camp",
        color: "#B71C1C"
    },
    "other": {
        ja: "その他",
        en: "Other",
        color: "#546E7A"
    }
};

let typeList = [
    "ropebridge",
    "smallbridge",
    "watchtower",
    "lighthouse",
    "tenjin",
    "hachiman",
    "kannon",
    "amaterasu",
    "inari",
    "ryujin",
    "ebisu",
    "boat",
    "enemycamp",
    "unknown"
];

// ==========================================
// 3. 座標・属性データ (Location Data)
// ==========================================
let locations = [
    {
        "category": "special_project",
        "type": "ropebridge",
        "x": 933,
        "y": 595,
        "name": { "ja": "吊り橋", "en": "Rope Bridge" },
        "desc": { "ja": "必要資源:\n- 縄 x15\n- 竹 x60\n- 板 x48\n必要人員: 4", "en": "Resources:\n- Rope x15\n- Bamboo x60\n- Plank x48\nWorkers: 4" }
    },
    {
        "category": "special_project",
        "type": "watchtower",
        "x": 898,
        "y": 616,
        "name": { "ja": "マングローブの物見やぐら", "en": "Mangrove Watchtower" },
        "desc": { "ja": "必要資源:\n- 竹 x25\n- 藁 x25\n- 丸太 x20\n- 板 x30\n必要人員: 5", "en": "Resources:\n- Bamboo x25\n- Straw x25\n- Log x20\n- Plank x30\nWorkers: 5" }
    },
    {
        "category": "special_project",
        "type": "ropebridge",
        "x": 918,
        "y": 641,
        "name": { "ja": "吊り橋", "en": "Rope Bridge" },
        "desc": { "ja": "必要資源:\n- 縄 x15\n- 竹 x60\n- 板 x48\n必要人員: 4", "en": "Resources:\n- Rope x15\n- Bamboo x60\n- Plank x48\nWorkers: 4" }
    },
    {
        "category": "special_project",
        "type": "lighthouse",
        "x": 928,
        "y": 729,
        "name": { "ja": "灯台", "en": "Lighthouse" },
        "desc": { "ja": "必要資源:\n- 彫刻した石 x50\n- 薪 x15\n- 油 x15\n必要人員: 8", "en": "Resources:\n- Chiseled Stone x50\n- Firewood x15\n- Oil x15\nWorkers: 8" }
    },
    {
        "category": "shrine",
        "type": "tenjin",
        "x": 661,
        "y": 818,
        "name": { "ja": "天神社", "en": "Medium Tenjin Shrine" },
        "desc": { "ja": "必要資源:\n- 上質な落葉樹の丸太 x8\n- 上質な落葉樹の板 x12\n- 樹皮 x12\n- 天神像 x1\n必要人員: 5\n\nお供え: 紙 x8", "en": "Resources:\n- Any Premium Log x8\n- Any Premium Plank x12\n- Bark x12\n- Tenjin Statue x1\nWorkers: 5\n\nOffering: Paper x8" }
    },
    {
        "category": "ft",
        "type": "boat",
        "x": 974,
        "y": 534,
        "name": { "ja": "群島の桟橋", "en": "Archipelago Pier" },
        "desc": { "ja": "最初に上陸する地点", "en": "Initial landing point" }
    },
    {
        "category": "special_project",
        "type": "watchtower",
        "x": 217,
        "y": 535,
        "name": { "ja": "物見やぐら", "en": "Watchtower" },
        "desc": { "ja": "必要資源:\n- 竹 x75\n- 藁 x50\n- 丸太 x40\n- 板 x60\n必要人員: 10", "en": "Resources:\n- Bamboo x75\n- Plank x60\n- Log x40\n- Straw x50\nWorkers: 10" }
    },
    {
        "category": "special_project",
        "type": "watchtower",
        "x": 417,
        "y": 737,
        "name": { "ja": "物見やぐら", "en": "Watchtower" },
        "desc": { "ja": "必要資源:\n- 竹 x75\n- 藁 x50\n- 丸太 x40\n- 板 x60\n必要人員: 10", "en": "Resources:\n- Bamboo x75\n- Plank x60\n- Log x40\n- Straw x50\nWorkers: 10" }
    },
    {
        "category": "special_project",
        "type": "watchtower",
        "x": 234,
        "y": 900,
        "name": { "ja": "物見やぐら", "en": "Watchtower" },
        "desc": { "ja": "必要資源:\n- 竹 x75\n- 藁 x50\n- 丸太 x40\n- 板 x60\n必要人員: 10", "en": "Resources:\n- Bamboo x75\n- Plank x60\n- Log x40\n- Straw x50\nWorkers: 10" }
    },
    {
        "category": "special_project",
        "type": "ropebridge",
        "x": 472,
        "y": 527,
        "name": { "ja": "吊り橋", "en": "Rope Bridge" },
        "desc": { "ja": "必要資源:\n- 縄 x20\n- 竹 x80\n- 板 x48\n必要人員: 6", "en": "Resources:\n- Rope x20\n- Bamboo x80\n- Plank x48\nWorkers: 6" }
    },
    {
        "category": "special_project",
        "type": "ropebridge",
        "x": 412,
        "y": 634,
        "name": { "ja": "吊り橋", "en": "Rope Bridge" },
        "desc": { "ja": "必要資源:\n- 縄 x20\n- 竹 x80\n- 板 x48\n必要人員: 6", "en": "Resources:\n- Rope x20\n- Bamboo x80\n- Plank x48\nWorkers: 6" }
    },
    {
        "category": "special_project",
        "type": "ropebridge",
        "x": 355,
        "y": 728,
        "name": { "ja": "吊り橋", "en": "Rope Bridge" },
        "desc": { "ja": "必要資源:\n- 縄 x20\n- 竹 x80\n- 板 x48\n必要人員: 6", "en": "Resources:\n- Rope x20\n- Bamboo x80\n- Plank x48\nWorkers: 6" }
    },
    {
        "category": "special_project",
        "type": "ropebridge",
        "x": 383,
        "y": 756,
        "name": { "ja": "吊り橋", "en": "Rope Bridge" },
        "desc": { "ja": "必要資源:\n- 縄 x20\n- 竹 x80\n- 板 x48\n必要人員: 6", "en": "Resources:\n- Rope x20\n- Bamboo x80\n- Plank x48\nWorkers: 6" }
    },
    {
        "category": "shrine",
        "type": "hachiman",
        "x": 534,
        "y": 508,
        "name": { "ja": "八幡神社", "en": "Medium Hachiman Shrine" },
        "desc": { "ja": "必要資源:\n- 上質な丸太全般 x8\n- 上質な板全般 x12\n- 樹皮 x12\n- 八幡像 x1\n必要人員: 5\n\nお供え: 鉄の矢 x5", "en": "Resources:\n- Any Premium Log x8\n- Any Premium Plank x12\n- Bark x12\n- Hachiman Statue x1\nWorkers: 5\n\nOffering: Iron Arrow x5" }
    },
    {
        "category": "shrine",
        "type": "tenjin",
        "x": 295,
        "y": 663,
        "name": { "ja": "大きな天神社", "en": "Large Tenjin Shrine" },
        "desc": { "ja": "必要資源:\n- 丸太 x10\n- 上質な落葉樹の丸太 x20\n- 樹皮 x15\n- 彫刻した石 x15\n- 天神像 x1\n必要人員: 8\n\nお供え: 紙 x15", "en": "Resources:\n- Premium Deciduous Log x10\n- Premium Deciduous Plank x20\n- Chiseled Stone x15\n- Bark x15\n- Tenjin Statue x1\nWorkers: 8\n\nOffering: Paper x15" }
    },
    {
        "category": "shrine",
        "type": "kannon",
        "x": 478,
        "y": 659,
        "name": { "ja": "大きな観音神社", "en": "Large Kannon Shrine" },
        "desc": { "ja": "(再建不要)\n\nお供え: ろうそく x5", "en": "(No reconstruction required)\n\nOffering: Candle x5" }
    },
    {
        "category": "shrine",
        "type": "kannon",
        "x": 260,
        "y": 760,
        "name": { "ja": "観音神社", "en": "Kannon Shrine" },
        "desc": { "ja": "(再建不要)\n\nお供え: 竹のろうそく x3", "en": "(No reconstruction required)\n\nOffering: Bamboo Candle x3" }
    },
    {
        "category": "shrine",
        "type": "amaterasu",
        "x": 262,
        "y": 820,
        "name": { "ja": "小さな天照神社", "en": "Small Amaterasu Shrine" },
        "desc": { "ja": "(再建不要)\n\nお供え: どぶろく x1", "en": "(No reconstruction required)\n\nOffering: Doburoku x1" }
    },
    {
        "category": "special_project",
        "type": "smallbridge",
        "x": 165,
        "y": 873,
        "name": { "ja": "密林の小さな橋", "en": "Jungle Small Bridge" },
        "desc": { "ja": "必要資源:\n- 丸太 x20\n- 板 x40\n必要人員: 3", "en": "Resources:\n- Log x20\n- Plank x40\nWorkers: 3" }
    },
    {
        "category": "shrine",
        "type": "inari",
        "x": 99,
        "y": 763,
        "name": { "ja": "稲荷神社", "en": "Inari Shrine" },
        "desc": { "ja": "(再建不要)\n\nお供え: 調理した卵 x3", "en": "(No reconstruction required)\n\nOffering: Cooked Egg x3" }
    },
    {
        "category": "special_project",
        "type": "lighthouse",
        "x": 87,
        "y": 925,
        "name": { "ja": "密林の灯台 I", "en": "Jungle Lighthouse I" },
        "desc": { "ja": "必要資源:\n- 彫刻した石 x50\n- 薪 x15\n- 油 x15\n必要人員: 8", "en": "Resources:\n- Chiseled Stone x50\n- Firewood x15\n- Oil x15\nWorkers: 8" }
    },
    {
        "category": "special_project",
        "type": "lighthouse",
        "x": 200,
        "y": 362,
        "name": { "ja": "密林の灯台 II", "en": "Jungle Lighthouse II" },
        "desc": { "ja": "必要資源:\n- 彫刻した石 x50\n- 薪 x15\n- 油 x15\n必要人員: 8", "en": "Resources:\n- Chiseled Stone x50\n- Firewood x15\n- Oil x15\nWorkers: 8" }
    },
    {
        "category": "shrine",
        "type": "ryujin",
        "x": 122,
        "y": 437,
        "name": { "ja": "小さな龍神社", "en": "Small Ryujin Shrine" },
        "desc": { "ja": "必要資源:\n- 彫刻した石 x15\n- 上質な針葉樹の丸太 x10\n- 樹皮 x10\n- 龍神像 x1\n必要人員: 3\n\nお供え: 貝殻 x1", "en": "Resources:\n- Chiseled Stone x15\n- Premium Conifer Plank x10\n- Bark x10\n- Ryujin Statue x1\nWorkers: 3\n\nOffering: Seashell x1" }
    },
    {
        "category": "enemy",
        "type": "enemycamp",
        "x": 457,
        "y": 670,
        "name": { "ja": "海賊の野営地", "en": "Pirate Camp" },
        "desc": { "ja": "海賊の長、中尸\n敵陣解体/必要資源:\n- 鋤  x6\n- つるはし  x5\n- 斧  x5\n必要人員: 8", "en": "Pirate Leader Chūshi\nDemolish/Resources:\n- Shovel x6\n- Pickaxe x5\n- Axe x5\nWorkers: 8" }
    },
    {
        "category": "enemy",
        "type": "enemycamp",
        "x": 871,
        "y": 705,
        "name": { "ja": "盗賊の野営地", "en": "Bandit Camp" },
        "desc": { "ja": "盗賊の長、上尸\n敵陣解体/必要資源:\n- 鋤  x3\n- つるはし  x3\n- 斧  x3\n必要人員: 2", "en": "Bandit Leader Jōshi\nDemolish/Resources:\n- Shovel x3\n- Pickaxe x3\n- Axe x3\nWorkers: 2" }
    },
    {
        "category": "special_project",
        "type": "lighthouse",
        "x": 419,
        "y": 58,
        "name": { "ja": "休火山の灯台 II", "en": "Dormant Volcano Lighthouse II" },
        "desc": { "ja": "必要資源:\n- 彫刻した石 x50\n- 薪 x15\n- 油 x15\n必要人員: 8", "en": "Resources:\n- Chiseled Stone x50\n- Firewood x15\n- Oil x15\nWorkers: 8" }
    },
    {
        "category": "special_project",
        "type": "lighthouse",
        "x": 812,
        "y": 157,
        "name": { "ja": "休火山の灯台 I", "en": "Dormant Volcano Lighthouse I" },
        "desc": { "ja": "必要資源:\n- 彫刻した石 x50\n- 薪 x25\n- 油 x25\n必要人員: 10", "en": "Resources:\n- Chiseled Stone x50\n- Firewood x25\n- Oil x25\nWorkers: 10" }
    },
    {
        "category": "special_project",
        "type": "ropebridge",
        "x": 492,
        "y": 98,
        "name": { "ja": "吊り橋", "en": "Rope Bridge" },
        "desc": { "ja": "必要資源:\n- 縄 x20\n- 竹 x80\n- 板 x48\n必要人員: 6", "en": "Resources:\n- Rope x20\n- Bamboo x80\n- Plank x48\nWorkers: 6" }
    },
    {
        "category": "special_project",
        "type": "ropebridge",
        "x": 556,
        "y": 129,
        "name": { "ja": "吊り橋", "en": "Rope Bridge" },
        "desc": { "ja": "必要資源:\n- 縄 x20\n- 竹 x80\n- 板 x48\n必要人員: 6", "en": "Resources:\n- Rope x20\n- Bamboo x80\n- Plank x48\nWorkers: 6" }
    },
    {
        "category": "shrine",
        "type": "hachiman",
        "x": 402,
        "y": 144,
        "name": { "ja": "大きな八幡神社", "en": "Large Hachiman Shrine" },
        "desc": { "ja": "必要資源:\n- 上質な落葉樹の丸太 x10\n- 上質な落葉樹の板 x20\n- 樹皮 x20\n- 彫刻した石 x15\n- 八幡像 x1\n必要人員: 8\n\nお供え: 鋼の矢 x5", "en": "Resources:\n- Premium Deciduous Log x10\n- Premium Deciduous Plank x20\n- Chiseled Stone x15\n- Bark x20\n- Hachiman Statue x1\nWorkers: 8\n\nOffering: Steel Arrow x5" }
    },
    {
        "category": "shrine",
        "type": "ebisu",
        "x": 666,
        "y": 160,
        "name": { "ja": "恵比寿神社", "en": "Ebisu Shrine" },
        "desc": { "ja": "(再建不要)\n\nお供え: 質素な魚料理 x1", "en": "(No reconstruction required)\n\nOffering: Simple Fish Meal x1" }
    },
    {
        "category": "shrine",
        "type": "ryujin",
        "x": 643,
        "y": 295,
        "name": { "ja": "龍神社", "en": "Medium Ryujin Shrine" },
        "desc": { "ja": "必要資源:\n- 上質な丸太全般 x8\n- 上質な板全般 x12\n- 樹皮 x12\n- 龍神像 x1\n必要人員: 5\n\nお供え: 貝殻 x3", "en": "Resources:\n- Any Premium Log x8\n- Any Premium Plank x12\n- Bark x12\n- Ryujin Statue x1\nWorkers: 5\n\nOffering: Seashell x3" }
    },
    {
        "category": "special_project",
        "type": "watchtower",
        "x": 527, "y": 285,
        "name": { "ja": "休火山の物見やぐら", "en": "Dormant Volcano Watchtower" },
        "desc": { "ja": "必要資源:\n- 竹 x50\n- 藁 x50\n- 丸太 x30\n- 板 x45\n必要人員: 5", "en": "Resources:\n- Bamboo x50\n- Plank x45\n- Log x30\n- Straw x50\nWorkers: 5" }
    },
    {
        "category": "enemy",
        "type": "enemycamp",
        "x": 515,
        "y": 223,
        "name": { "ja": "浪人の野営地", "en": "Ronin Camp" },
        "desc": { "ja": "浪人の長、下尸\n敵陣解体/必要資源:\n- 鋤  x7\n- つるはし  x7\n- 斧  x7\n必要人員: 10", "en": "Ronin Leader Geshi\nDemolish/Resources:\n- Shovel x7\n- Pickaxe x7\n- Axe x7\nWorkers: 10" }
    },
    {
        "category": "other",
        "type": "unknown",
        "x": 879,
        "y": 855,
        "name": { "ja": "商人の天秤棒", "en": "Trader Carrying Pole" },
        "desc": { "ja": "オブジェクトが設置されている", "en": "An object is placed" }
    }
];