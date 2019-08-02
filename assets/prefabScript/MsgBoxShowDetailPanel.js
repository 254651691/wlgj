cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        this.title = this.node.PathChild("/Bg/Title", "cc.Label")
        this.descrip = this.node.PathChild("/Bg/Descrip", "cc.Label")
        this.other = this.node.PathChild("/Bg/Other", "cc.Label")
        this.useProp = this.node.PathChild("/Bg/UseProp")
        this.prop = null
    },

    init: function (i) {
        let prop = wlgj.player.pkg[i]
        if (!prop) {
            return
        }
        this.i = i
        this.title.string = prop.name
        this.descrip.string = `描述:${prop.descrip}`
        let curr = wlgj.player.equip
        if (prop.id >= 5000) {
            this.other.node.active = true
            this.other.string = `部位:${prop.where}\n攻击:+${prop.gong}   ${(prop.gong > curr[prop.where].gong ? "↑" : "↓") + Math.abs(prop.gong - curr[prop.where].gong)}\n防御:+${prop.fang}\n血量:+${prop.xue}\n暴击率:+${prop.baoL}\n暴击:+${prop.bao}\n闪避率:+${prop.shanL}\n闪避:+${prop.shan}`
        } else {
            this.other.node.active = false
        }
        if (prop && prop.use) {
            this.useProp.active = true
        } else {
            this.useProp.active = false
        }
    },

    btnUseProp: function () {
        //TODO 这里需要抽离出来
        let prop = wlgj.player.pkg[this.i]
        if (prop.count > 1) {
            prop.count--
        } else {
            wlgj.player.pkg.splice(this.i, 1)
        }
        UiMgr.get("PkgPanel").show()
        this.btnClose()
    },

    btnClose: function () {
        UiMgr.hide(this.node.name)
    },
});
