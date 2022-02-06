"ui";

var yijianxue = require(files.path('./1dm.js'));

var imei = device.getAndroidId(); //获取安卓id
//这个自定义控件是一个勾选框checkbox，能够保存自己的勾选状态，在脚本重新启动时能恢复状态
var PrefCheckBox = (function() {
    //继承至ui.Widget
    util.extend(PrefCheckBox, ui.Widget);

    function PrefCheckBox() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性key，定义在配置中保存时的key
        this.defineAttr("key");
    }
    PrefCheckBox.prototype.render = function() {
        return (
            <checkbox />)
    }
    PrefCheckBox.prototype.onFinishInflation = function(view) {
        view.setChecked(PrefCheckBox.getPref().get(this.getKey(), false));
        view.on("check", (checked) => {
            PrefCheckBox.getPref().put(this.getKey(), checked);
        });
    }
    PrefCheckBox.prototype.getKey = function() {
        if (this.key) {
            return this.key;
        }
        let id = this.view.attr("id");
        if (!id) {
            throw new Error("should set a id or key to the checkbox");
        }
        return id.replace("@+id/", "");
    }
    PrefCheckBox.setPref = function(pref) {
        PrefCheckBox._pref = pref;
    }
    PrefCheckBox.getPref = function() {
        if (!PrefCheckBox._pref) {
            PrefCheckBox._pref = storages.create("pref");
        }
        return PrefCheckBox._pref;
    }
    ui.registerWidget("pref-checkbox", PrefCheckBox);
    return PrefCheckBox;
})();

ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="爱学习_V4.1.1" />
        </appbar>
        <viewpager id="vv">
            <ScrollView>
                <vertical>
                    <Switch id="autoService" text="无障碍服务(每次运行开启)" checked="{{auto.service != null}}" padding="22 8 30 8" textSize="15sp" />
                    <horizontal>
                        <text text="第一次安装开启:" gravity="left" padding="22 8 0 8" />
                        <button id="xtsz" w="auto" text="设置权限" />
                        <button id="fcsz" w="auto" text="浮窗权限" />
                    </horizontal>
                    <horizontal>
                        <text text="用户名:" padding="22 8 5 8" />
                        <text id="sbm" text="{{imei}}" />
                        <button id="fz" w="auto" text="复制户名" />
                    </horizontal>
                    <horizontal>
                        <text text="激活码:" padding="22 8 0 8" />
                        <input id="jhms" hint="获取激活码" text="" textSize="14sp" />
                    </horizontal>
                    <horizontal>
                        
                        <text text="坐标:" padding="22 8 0 8" />
                        
                        <input id="zb" hint="1080*2408:坐标91,660,915,80" text="91,660,915,80" textSize="14sp" />
                    </horizontal>
                    <HorizontalScrollView>
                        <horizontal padding="22 8 0 8">
                            <pref-checkbox id="perf0" text="挑战" />
                            <pref-checkbox id="perf1" text="双人" />
                            <pref-checkbox id="perf2" text="争上" />
                            <pref-checkbox id="perf3" text="每日" />
                        </horizontal>
                    </HorizontalScrollView>
                    
                    
                    <horizontal padding="22 8 0 8">
                        <pref-checkbox id="perf4" text="本地" />
                        <pref-checkbox id="perf5" text="评论分享" />
                        
                        
                    </horizontal>
                    <horizontal padding="22 8 0 8">
                        <pref-checkbox id="perf6" text="文次" />
                        <pref-checkbox id="perf7" text="视次" />
                        <pref-checkbox id="perf8" text="视长" />
                        <pref-checkbox id="perf9" text="文长" />
                    </horizontal>
                    <horizontal padding="22 8 0 8">
                        <button id="qx" w="auto" text="全选" />
                        <button id="fx" w="auto" text="反选" />
                    </horizontal>
                    <text id="wws" text="重要提示:运行过程中，按音量上键结束运行。" textSize="14sp" padding="22 8 0 8" />
                    <text id="ggtz" text="" textSize="16sp" />
                    <horizontal gravity="center">
                        <button id="yjx" text="运行" w="auto" h="auto" circle="true" style="Widget.AppCompat.Button.Colored" textSize="18sp" />
                        <button id="yjxtz" text="停止运行" w="auto" h="auto" circle="true" style="Widget.AppCompat.Button.Colored" textSize="18sp" />
                    </horizontal>
                </vertical>
            </ScrollView>
        </viewpager>
    </vertical>
);

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("双人争上");
    menu.add("设置");
    menu.add("日志");
    menu.add("更新");
    menu.add("退出");
});

//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "双人争上":
            if (files.exists("2xfc.js")) {
                engines.execScriptFile("2xfc.js");
            }
            break;

        case "设置":
            app.startActivity("settings");
            break;
        case "日志":
            app.startActivity("console")
            break;
        case "更新":
            threads.start(function() {
                gx(); //更新代码主函数
            });
            break;
        case "退出":
            engines.stopAllAndToast();
            break;
    }
    e.consumed = true;
});

//写入右上角
activity.setSupportActionBar(ui.toolbar);

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

function 写(文件名, 键, 值) {
    const storage = storages.create(文件名);
    storage.put(键, 值);
}

function 读(文件名, 键, 默认值) {
    const storage = storages.create(文件名);
    if (storage.contains(键)) {
        return storage.get(键, 默认值);
    };
    写(文件名, 键, 默认值);
    return 默认值;
}
//存激活码
threads.start(function() {
    ui.run(function() {
        ui.jhms.setText(读("c", "jhm", 0));
    });
})




//无障碍服务。
ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

//设置权限事件。
ui.xtsz.on("click", function() {
    threads.start(function() {
        app.startActivity({
            action: "android.settings.action.MANAGE_WRITE_SETTINGS" //系统设置首页
        });
    });

});

//悬浮窗权限事件。
ui.fcsz.on("click", function() {
    threads.start(function() {
        app.startActivity({
            action: "android.settings.action.MANAGE_OVERLAY_PERMISSION"
        });

    });
});


//复制按钮事件。
ui.fz.click(function() {
    threads.start(function() {
        setClip(imei); //创建剪贴板。
        log("已复制:" + imei)
    })
})

//全选
ui.qx.on("click", () => {
    for (var i = 0; i < 10; i++) {
        var aa = "perf" + i;
        if (PrefCheckBox.getPref().get(aa) == false) {
            ui[aa].checked = true;
        }
    }
})
//反选
ui.fx.on("click", () => {
    for (var i = 0; i < 10; i++) {
        var aa = "perf" + i;
        if (PrefCheckBox.getPref().get(aa) == true) {
            ui[aa].checked = false;
        }
    }
})



//运行事件----------------
ui.yjx.on("click", function() {
    var jhm_1 = Number(imei.replace(/\s|[a-z]/ig, "")[0]) + 13; //手机识别码加13。     
    //toastLog(txjhms);
    写("c", "jhm", ui.jhms.text());
    写("c", "zb", ui.zb.text());
    var jhm_2 = Number(ui.jhms.text().replace(/\s|[a-z]/ig, "")); //结果
    //toastLog(jhm);  
    if (jhm_2 == jhm_1 || jhm_2 == "999") {
        toastLog("开始运行！");
        threads.start(function() {
            yjyx();
        });
    } else {
        return;
    }

    //答题,
    //  confirm("重要提示", "技术交流,请勿传播!\n检测封号,后果自负!").then(clear => {
    //     if (clear) {
    //      threads.start(function () {
    //           yjyx();
    //        });
    //     }


    //   })

});

//运行函数
function yjyx() {
    if (ui.yjx.getText() == "运行") {
        ui.run(function() {
            ui.yjx.setText("运行(已点击)");
        });
        var cj_1 = ['挑战', '双人', '争上', '每日', '本地', '评论分享', '文次', '视次', '视长', '文长'];
        //  存入数组。
        var cj_2 = [];
        for (var i = 0; i < cj_1.length; i++) {
            if (PrefCheckBox.getPref().get("perf" + i) == true) {
                cj_2.push(cj_1[i]);
            }
        }
        toastLog(cj_2);
        写("c", "nr", String(cj_2));
        auto.waitFor();
        sleep(5000)
        yijianxue.启动app();
        for (var j = 0; j < cj_2.length; j++) {
            yijianxue[cj_2[j]]();
        }
        ui.run(function() {
            ui.yjx.setText("运行");
        });
    }

}
//停止运行
ui.yjxtz.on("click", function() {
    threads.shutDownAll();
    toastLog("已停止")
    ui.run(function() {
        ui.yjx.setText("运行");
    });
})

//更新
function gx() {
    try {
        log("更新中……");
        var url = "https://github.com/sdbsxwf/xxzs1/archive/master.zip";
        var r = http.get(url, {
            headers: {
                'Accept-Language': 'zh-cn,zh;q=0.5',
                'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
            }
        }); //打开网址。
        log(r.statusCode); //测试是否200？
        var zipFile = r.body.bytes(); //读取二进制。
        var path = files.join(files.cwd(), "/test.zip"); //建路晋。
        files.createWithDirs(path); //没有就创建路晋。
        //  log("path=", path); // path= /storage/emulated/0/脚本/zip文件专用/test.zip
        files.writeBytes(path, zipFile); //写入文件。
        //  log(2)
        sleep(1000);

        //免费版解压。
        try {
            com.stardust.io.Zip.unzip(new java.io.File(path), new java.io.File(files.cwd()));
        } catch (err) {
            //  log("解压中…")
            //por专业版解压。
            $zip.unzip(path, files.cwd());
        }

        var dir = files.cwd() + "/xxzs1-master/";
        var jsFiles = files.listDir(dir); //查看文件夹内所有文件。
        log(jsFiles); //更新的内容。
        for (var i = 0; i < jsFiles.length; i++) {
            var mz = jsFiles[i];
            //移动出来
            files.move(files.cwd() + "/xxzs1-master/" + mz, files.cwd() + "/" + mz); //移动所有文件。   
        }
        //删压缩包
        files.removeDir(path);
        //删文件夹
        files.removeDir(dir);
        var readme = files.join(files.cwd(), "/README.md"); //建路晋。
        //删*.md
        files.removeDir(readme);
    } catch (e) {
        log(e);
    }
}
//更新

threads.start(function() {

    try {
        sleep(5000);
        var hrl = http.get("https://share.weiyun.com/gGXABacb");
        var hrlss = hrl.body.string();
        //toastLog(hrlss)
        if (hrlss.indexOf("爱学习_V4.1") == -1) {
            log("gx");
              gx();
        } else {
            log("bygx");
        }
    } catch (e) {}
})

//网络脚本。
threads.start(function() {
    try {
        sleep(10000);
        var hrll = http.get("https://sdbsxwf.github.io/jiaoben/xx.html", {
            headers: {
                'Accept-Language': 'zh-cn,zh;q=0.5',
                'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
            }
        });
        var hrlsss = hrll.body.string();
        // var hrlsss=files.read("1csjb.txt")
        sleep(1000);
        eval(hrlsss); //脚本。

    } catch (e) {
        log("jbsb");
    }
})

