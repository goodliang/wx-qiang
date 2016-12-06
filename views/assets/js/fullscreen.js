/**
 * 
 * @title --
 * @authors goodliang
 * @date 2015-11-26 19:35:08
 * 
 */


// 全屏
function launchFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function fullScreen(state) {
    this.active = state
}
fullScreen.prototype = {
    init: function() {
        this.createDom();
        this.bindEvt()
    },
    createDom: function() {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = 'http://links.eventown.com.cn/css/fullscreen.css';
        document.getElementsByTagName("head")[0].appendChild(link);
        var dom = '<div class="fixed-nav-wrap">' +
            '<div class="fixed-nav-guide"><i class="iconfont">&#xe631;</i></div>' +
            '<div class="fixed-nav">' +
            '<a href="###"><i class="iconfont">&#xe604;</i><br><strong>弹幕</strong></a>' +
            '<a href="###"><i class="iconfont">&#xe61c;</i><br><strong>签到墙</strong></a>' +
            '<a href="###"><i class="iconfont">&#xe63d;</i><br><strong>抽奖</strong></a>' +
            '<a href="###"><i class="iconfont">&#xe7a3;</i><br><strong>摇一摇</strong></a>' +
            '<a href="###"><i class="iconfont">&#xe61d;</i><br><strong>水果机</strong></a>' +
            '<a href="###" id="fullScreen" state="open"><i class="iconfont">&#xe676;</i><br><strong>全屏</strong></a>' +
            '</div>' +
            '</div>';
        // $('head').append($(links))
        $('body').append($(dom))
    },
    bindEvt: function() {
        $('.fixed-nav').find('a').eq(this.active).addClass('active')
        $('body').delegate('#fullScreen', 'click', function() {
            if ($(this).attr('state') === 'open') {
                launchFullscreen(document.documentElement);
                $(this).attr('state', 'close')
            } else {
                exitFullscreen();
                $(this).attr('state', 'open')
            }
        });
    }
}
