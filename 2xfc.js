var yijianxue = require('1dm.js');

var xlk = "APP|挑战|自双争|单双争|双争不点|每日|退出";

var window = floaty.window(
    <vertical>
        
        
        <horizontal>
            <button id="action" text="start" w="50" h="40" bg="#77ffffff"/>
            <spinner id="sp1" entries="{{xlk}}" w="100" textColor="red" bg="#eeffeeee"/>
            {/*  <button id="kzt" text="控制台开" w="90" h="40" bg="#77ffffff"/>*/}
        </horizontal>
        
    </vertical>
);

setInterval(() => {}, 1000);
window.setPosition(700, 1200);
var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 3000) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});

function onClick() {
    if (window.action.getText() == 'start') {
        //  execution = engines.execScriptFile(path);
        window.action.setText('stop');
        var i = window.sp1.getSelectedItemPosition();
        //  toastLog(i);
        switch (i) {
            case 0:
                // code
                threads.start(function() {
                    toastLog("启动学习强国");
                    launchApp("学习强国");
                })
                break;

            case 1:
                // code
                threads.start(function() {
                    for (var i = 0; i < 5; i++) {
                        yijianxue.挑单答();
                        sleep(2000);
                    }

                })
                break;
            case 2:
                // code
                threads.start(function() {
                    yijianxue.多答();

                })
                break;
            case 3:
                // code
                threads.start(function() {
                    yijianxue.单答s();
                })
                break;
            case 4:
                // code
                threads.start(function() {
                    yijianxue.单答不点2();
                })
                break;
            case 5:
                // code
                threads.start(function() {
                    for (var i = 0; i < 5; i++) {
                        if (text("多选题").exists() || text("单选题").exists()) {
                            toastLog(">>选择题")
                            yijianxue.xuanxiang();
                        } else {
                            toastLog(">>填空题")
                            yijianxue.tkt();
                        }
                        sleep(2000);
                    }

                })
                break;
            case 6:
                // code
                //   threads.start(function() {
                engines.stopAllAndToast();
                //   })
                break;
            default:
                // code
                toastLog("无");
        }
    } else {
        // if (execution) {
        //     execution.getEngine().forceStop();
        //   }
        threads.shutDownAll();
        window.action.setText('start');
    }
}
/*
window.kzt.click(function() {
    threads.start(function() {
        if (window.kzt.getText() == '控制台开') {

            console.show();
            sleep(200);
            console.setSize(device.width, 500);

            window.kzt.setText('控制台关');
        } else {
            console.hide();
            window.kzt.setText('控制台开');
        }

    })
})
*/
//截图请求
//请求截图
threads.start(function() {
    try {
        if (!requestScreenCapture()) {
            toast("请求截图失败");
            // exit();
        } else {
            toastLog("已获取")
        }
    } catch (e) {
        log("已获取!")
    }
});