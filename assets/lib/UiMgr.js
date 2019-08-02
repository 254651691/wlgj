cc.Class({
    extends: cc.Component,

    properties: {
        prefabs: [cc.Prefab],
    },

    onLoad: function () {
        this.manager = {}

        //加载预制
        this.pushPrefab()
    },

    pushPrefab: function () {
        this.prefabs.forEach(prefab => {
            if (prefab.name.indexOf("MsgBox") == -1) {
                this.manager[prefab.name] = cc.instantiate(prefab)
                this.node.addChild(this.manager[prefab.name])
                this.manager[prefab.name].active = false
            }
        });
        this.prefabs.forEach(prefab => {
            if (prefab.name.indexOf("MsgBox") != -1) {
                this.manager[prefab.name] = cc.instantiate(prefab)
                this.node.addChild(this.manager[prefab.name])
                this.manager[prefab.name].active = false
            }
        });
    },

    show: function (name) {
        if (this.manager[name]) {
            this.manager[name].active = true
            this.manager[name].getComponent(name).init(arguments[1])
        } else {
            cc.error(`prefab(${name}) is not exist`)
        }
    },

    hide: function (name) {
        if (this.manager[name]) {
            this.manager[name].active = false
        } else {
            cc.error(`prefab(${name}) is not exist`)
        }
    },

    get: function (name) {
        if (this.manager[name]) {
            return this.manager[name].getComponent(name)
        } else {
            cc.error(`component(${name}) is not exist`)
        }
    },
});
