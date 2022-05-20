var yijianxue = require('1dm.js');

//截图立即开始
threads.start(function() {
    text("立即开始").findOne().click();

});
//截图请求
//请求截图
threads.start(function() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        // exit();
    }
});

var window = floaty.window(
    <vertical>
        <button id="tzd" text="挑战答" w="90" h="40" bg="#77ffffff"/>
        <button id="action" text="移动" w="90" h="40" bg="#77ffffff"/>
        <button id="kzt" text="控制台开" w="90" h="40" bg="#77ffffff"/>
        <button id="app" text="app" w="90" h="40" bg="#77ffffff"/>
        <button id="dt" text="自动答题" w="90" h="40" bg="#77ffffff"/>
        <button id="dgdt" text="单个答题" w="90" h="40" bg="#77ffffff"/>
        <button id="dgbd" text="单答不点" w="90" h="40" bg="#77ffffff"/>
        
        <button id="tz" text="停止" w="90" h="40" bg="#77ffffff"/>
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
            if (new Date().getTime() - downTime > 1500) {
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
    if (window.action.getText() == '移动') {
        //  execution = engines.execScriptFile(path);
        window.action.setText('停止运行');
    } else {
        //  if (execution) {
        //       execution.getEngine().forceStop();
        //   }
        threads.shutDownAll();
        window.action.setText('移动');
    }
}
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

window.app.click(function() {
    threads.start(function() {
        launchApp("学习强国");
    })
})


window.dt.click(function() {
    threads.start(function() {
        //  threads.shutDownAll();
        yijianxue.多答();

    })
})

window.dgdt.click(function() {
    threads.start(function() {
        //  threads.shutDownAll();
        yijianxue.单答s();
    })
})
window.dgbd.click(function() {
    threads.start(function() {
        //  threads.shutDownAll();
        yijianxue.单答不点();
    })
})

window.tzd.click(function() {
    threads.start(function() {
        //  threads.shutDownAll();
        yijianxue.挑单答();
    })
})

window.tz.click(function() {
    threads.start(function() {
        threads.shutDownAll();
        toastLog("已停止")
    })
})