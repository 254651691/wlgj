cc.Class({
    extends: cc.Component,

    onLoad: function () {
        window.setSpriteFrame = function (path, sprite) {
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    console.log(err)
                    return
                }
                sprite.spriteFrame = spriteFrame
            })
        }

        window.setLocalStorage = function (key, data) {
            cc.sys.localStorage.setItem(key, JSON.stringify(data))
        }

        window.getLocalStorage = function (key) {
            let data = cc.sys.localStorage.getItem(key)
            if (data) {
                return JSON.parse(data)
            }
            return null
        }

        window.clone = function (obj) {
            return JSON.parse(JSON.stringify(obj))
        }

        window.registerGlobal = function (k, v) {
            if (window[k]) {
                return
            }
            window[k] = v
        }

        window.unRegisterGlobal = function (k) {
            if (!window[k]) {
                return
            }
            window[k] = null
        }


        /*--------------------------------------------------分割线-------------------------------------------------*/
        /*
                                                       分割线以上是常用方法
                                                       分割线以下是扩展方法
        */
        /*--------------------------------------------------分割线-------------------------------------------------*/


        cc.Node.prototype.PathChild = function (path, componentName) {
            let names = path.split('/')
            let nd = null

            for (let i = 0; i < names.length; i++) {
                if (nd) {
                    nd = nd.getChildByName(names[i])
                } else {
                    nd = this.getChildByName(names[i])
                }
            }

            if (componentName) {
                return nd.getComponent(componentName)
            } else {
                return nd
            }
        }
    },
});
