cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        this.info = this.node.PathChild("/Bg/Info", "cc.Label")
    },

    init: function (info) {
        this.info.string = info
        //停止所有动画
        this.node.stopAllActions()
        //重置透明度
        this.node.opacity = 255
        this.node.runAction(new cc.Sequence(
            cc.delayTime(1),
            cc.fadeOut(0.5),
            cc.callFunc(() => { UiMgr.hide(this.node.name) }),
        ))
    },
});
