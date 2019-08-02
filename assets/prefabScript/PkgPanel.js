cc.Class({
    extends: cc.Component,

    properties: {
        pkgCell: cc.Prefab,
    },

    onLoad: function () {
        //购买背包格子的黄金消耗公式
        this.buyPkgCellConsume = 5000 * Math.pow(2, wlgj.player.pkgCellCount / 7 - 1)

        //获取节点(组件)
        this.pkgRoot = this.node.PathChild("/PkgRoot")
        this.consume = this.node.PathChild("/Consume", "cc.Label")
        this.btn = this.node.PathChild("/BuyPkgCell", "cc.Button")
        //数据
        this.model = { components: [], }

        //创建背包格子
        this.createRowPkgCell(wlgj.player.pkgCellCount / 7)
    },

    onEnable: function () {
        this.updateBtn()
    },

    onDisable: function () {
        this.updateBtn()
    },

    init: function () {
        this.show()
    },

    createRowPkgCell: function (count) {
        for (var row = 0; row < count; row++) {
            for (var i = 0; i < 7; i++) {
                let prefab = cc.instantiate(this.pkgCell)
                this.pkgRoot.addChild(prefab)
                this.model.components.push(prefab.getComponent("PkgCell"))
                prefab.getComponent("PkgCell").init()
            }
        }
        //显示消耗的黄金
        this.consume.string = `(消耗${this.buyPkgCellConsume}两黄金)`
    },

    show: function () {
        for (var i = 0; i < this.pkgRoot.children.length; i++) {
            this.model.components[i].fill(i)
        }
    },

    check: function () {
        if (wlgj.player.pkgCellCount >= 63) {
            UiMgr.show("MsgBoxAutoHidePanel", "已扩张至上限")
            return false
        }
        if (wlgj.player.coin - this.buyPkgCellConsume < 0) {
            UiMgr.show("MsgBoxAutoHidePanel", "您的黄金不够了")
            return false
        }
        return true
    },

    updateBtn: function () {
        if (wlgj.player.coin - this.buyPkgCellConsume < 0) {
            this.btn.node.stopAllActions()
            this.btn.interactabel = false
            this.btn.enableAutoGrayEffect = true
        } else {
            this.btn.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.05), cc.scaleTo(0.5, 0.95))))
            this.btn.interactabel = true
            this.btn.enableAutoGrayEffect = false
        }
    },

    btnBuyPkgCell: function () {
        if (this.check()) {
            wlgj.player.pkgCellCount += 7;
            wlgj.player.coin -= this.buyPkgCellConsume
            this.buyPkgCellConsume = 5000 * Math.pow(2, wlgj.player.pkgCellCount / 7 - 1)
            this.createRowPkgCell(1)
            this.updateBtn()
            wlgj.playerCtrl.fill()
            UiMgr.show("MsgBoxAutoHidePanel", "购买成功")
        }
    },

    btnClose: function () {
        UiMgr.hide(this.node.name)
    },
});
