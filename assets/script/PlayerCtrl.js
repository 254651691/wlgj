cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        this.model = {}

        let player = null
        let p = getLocalStorage("wlgj_player")
        if (p) {
            player = JSON.parse(p)
        } else {
            player = this.createPlayer()
        }

        this.model.player = player
        wlgj.player = this.model.player

        this.head = this.node.PathChild("/Player/Head").getComponent("cc.Sprite")
        this.nickName = this.node.PathChild("/Player/NickName").getComponent("cc.Label")
        this.coin = this.node.PathChild("/Player/Coin").getComponent("cc.Label")
        this.level = this.node.PathChild("/Player/Level").getComponent("cc.Label")
        this.exp = this.node.PathChild("/Player/Exp").getComponent("cc.Label")
    },

    createPlayer: function () {
        return {
            head: 1,
            nickName: "乱世枭雄",
            coin: 30000,
            level: 0,
            exp: 0,
            pkgCellCount: 7,
            pkg: [
                /*
                    普通类(1000 --- 1999):   名称   描述   数量   能否直接使用   ID编号

                    装备类(5000 --- 5999):   名称   描述   数量   能否直接使用   ID编号   攻击力   防御力   血量   暴击率   暴击   闪避率   闪避
                */
                { name: "生命药水", descrip: "可以回复角色的生命值.", count: 50, use: true, id: 1000 },
                { name: "精铁", descrip: "一种高纯度的铁.", count: 3, use: false, id: 1001 },
                { name: "青铜剑", descrip: "使用青铜铸造武器,有一定的杀伤力.", count: 1, use: true, id: 5001, where: "武器", gong: 10, fang: 10, xue: 100, baoL: 0.1, bao: 5, shanL: 0.1, shan: 5 },
            ],
            equip: {
                "武器": { name: "铁剑", descrip: "普通废铁打造的剑,攻击较弱.", count: 1, use: true, id: 5000, where: "武器", gong: 5, fang: 5, xue: 50, baoL: 0.05, bao: 3, shanL: 0.05, shan: 3 },
                "衣服": {},
                "头盔": {},
                "项链": {},
                "戒子": {},
                "手镯": {},
                "腰带": {},
                "鞋子": {},
            }
        }
    },

    fill: function () {
        this.nickName.string = `姓名:${this.model.player.nickName}`
        this.coin.string = `黄金:${this.model.player.coin}两`
        this.level.string = `等级:${this.model.player.level}级`
        this.exp.string = `经验:${this.model.player.exp}%`
    },
});
