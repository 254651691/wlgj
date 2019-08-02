cc.Class({
    extends: cc.Component,

    properties: {
    },

    init: function () {
        this.fg = this.node.PathChild("/Fg", "cc.Sprite")
        this.count = this.node.PathChild("/Count", "cc.Label")
        this.i = Number.MAX_VALUE
    },

    fill: function (i) {
        let prop = wlgj.player.pkg[i]
        if (prop) {
            this.i = i
            setSpriteFrame(`${prop.id}.png`, this.fg)
            this.count.string = `X${prop.count}`
        } else {
            this.i = Number.MAX_VALUE
            this.fg.spriteFrame = null
            this.count.string = ``
        }
    },

    btnShowDetail: function () {
        let prop = wlgj.player.pkg[this.i]
        if (prop) {
            UiMgr.show("MsgBoxShowDetailPanel", this.i)
        }
    },
});
