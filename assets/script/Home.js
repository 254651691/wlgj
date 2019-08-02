cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        registerGlobal("wlgj", this)

        //prefab管理
        window.UiMgr = this.node.PathChild("/UiPanelRoot", "UiMgr")

        //玩家脚本
        this.playerCtrl = this.node.PathChild("/PlayerRoot", "PlayerCtrl")
        //玩家信息
        this.player = {}
    },

    onEnable: function () {
        //填充信息
        this.playerCtrl.fill()
    },

    onDisable: function () {
        unRegisterGlobal("wlgj")
    },

    btnDetail: function () {
        UiMgr.show("DetailPanel")
    },

    btnPkg: function () {
        UiMgr.show("PkgPanel")
    },

    btnSkill: function () {
        UiMgr.show("MsgBoxPanel", { title: "温馨提示", info: "[技能]正在开发中..." })
    },

    btnEquip: function () {
        UiMgr.show("MsgBoxPanel", { title: "温馨提示", info: "[装备]正在开发中..." })
    },

    btnPromote: function () {
        UiMgr.show("MsgBoxPanel", { title: "温馨提示", info: "[修炼]正在开发中..." })
    },
});
