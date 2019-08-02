cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        this.title = this.node.PathChild("/Bg/Title", "cc.Label")
        this.info = this.node.PathChild("/Bg/Info", "cc.Label")
    },

    init: function (data) {
        this.title.string = data.title
        this.info.string = data.info
    },

    btnClose: function () {
        UiMgr.hide(this.node.name)
    },
});
