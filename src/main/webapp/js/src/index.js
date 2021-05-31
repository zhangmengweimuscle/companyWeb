var swiperConfig = {
    width: 1200,                     // 容器宽度（最小300, 默认800）这里没用了，width具体修改在js中
    height: 538,                    // 容器高度（最小120, 默认300）
    speed: 3000,                    // 切换速度
    needPrevAndNextBtnGroup: true, // 是否需要前进后退按钮组
    needPagination: true           // 是否需要分页器
}
var phrases = Array();
window.onload = function () {
    /**
     * 获取封面，logo和动画字符
     */
    //ajax 请求公司信息
	$.ajax({
        type: "post",
        url: "http://localhost:8080/companyWeb/introduction/selectIntroduction.do",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            introductionResult = response;
            //封面和logo
            $("#indexcover").css("background-image", "url(" + introductionResult.cover + ")");
            $("#indexlogo").attr("src",introductionResult.logo.slice(1,-1));
            //字符动画
            phrases = introductionResult.coverword.slice(1,-1).split(",");
            next();
            //公司简介
            $("#infocover").attr("src",introductionResult.infocover.slice(1,-1));
            $("#info").html(introductionResult.info);
        }
    });
    //获取报价人数
    $.ajax({
        type: "post",
        url: "http://localhost:8080/companyWeb/formCollection/countForm.do",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            console.log(response);
            $(".textPrimary").html("["+response+"]");
        }
    });
    /**
     * 
     * 点击事件
     */
    // 提交表单点击事件
    $("#formSubmit").click(function(e){
        let formObject = new Object();
        formObject.name = $("[name = 'name']").val();
        formObject.phone = $("[name = 'phone']").val();
        formObject.location = $("[name = 'loupan']").val();
        formObject.area = Math.floor($("[name = 'acreage']").val());

        if(checkStr(formObject.name) && checkStr(formObject.location) && vailPhone(formObject.phone) && checkInt(formObject.area)){
            $.ajax({
                type: "post",
                url: "http://localhost:8080/companyWeb/formCollection/insertForm.do",
                data: JSON.stringify(formObject),
                contentType: "application/json; charset=utf-8",
                dataType: "JSON",
                success: function (response) {
                    alert("报价成功");
                    $(".textPrimary").html("["+(parseInt($(".textPrimary").text().slice(1,-1))+1)+"]");//修改页面的报价人数 +1
                }
            });
        }
    })
    //企业简介下方的四个图标 点击跳转到企业简介
    $(".img").click(function(){
        $(location).attr('href', 'page.html?introduction');
    })
    //填充轮播图
    $.ajax({
        type: "post",
        url: "http://localhost:8080/companyWeb/carouselMap/selectCarouselMap.do",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            console.log(response);
            $.each($(".swiper-wrapper").find("img"), function (indexInArray, valueOfElement) { 
                 $(valueOfElement).attr("src",response.list[indexInArray].url.slice(1,-1));
            });
        }
    });
    //轮播图 点击跳转到企业简介
    $(".swiper-btn-group").click(function(){
        $(location).attr('href', 'page.html?culture');
    })
    //新闻资讯
    $.ajax({
        type: "post",
        url: "http://localhost:8080/companyWeb/news/selectNews.do",
        data: JSON.stringify({
            "pageNum" : 1, 
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            console.log(response);
            $.each(response.list, function (indexInArray, valueOfElement) {
                let titl = valueOfElement.title.substring(0,15) + "...";
                let desc = htmlToStr(valueOfElement.content); 
                 if(indexInArray == 0){
                    desc = desc.substring(0,80) + "...";
                     $("[data-id = 'left']").append(`
                        <a href = "page.html?newsId=${valueOfElement.id}" data-id = '${valueOfElement.id}'>
                            <div class="cover"><img src=${valueOfElement.cover}></div>
                            <div class="content">
                                <div class="top">
                                    <div class="title">${titl}</div>
                                    <div class="date">${valueOfElement.date}</div>
                                </div>
                                <div class="bottom">
                                    <div class="desc">${desc}</div>
                                </div>
                            </div>
                        </a>
                     `);
                 }else if(0 < indexInArray && indexInArray < 4){
                    desc = desc.substring(0,57) + "...";
                     $("[data-id = 'right']").append(`
                        <a href = "page.html?newsId=${valueOfElement.id}" data-id = '${valueOfElement.id}'>
                            <div style="display: flex; justify-content: space-between;">
                                <div class="cover"><img src=${valueOfElement.cover}></div>
                                <div class="content">
                                    <div class="top">
                                        <div class="title">${titl}</div>
                                        <div class="date">${valueOfElement.date}</div>
                                    </div>
                                    <div class="bottom">
                                        <div class="desc">${desc}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                     `);
                 }
            });
        }
    });

    //工程案例
    $.ajax({
        type: "post",
        url: "http://localhost:8080/companyWeb/examples/selectExamples.do",
        data: JSON.stringify({
            "pageNum" : 1
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $.each(response.list, function (indexInArray, valueOfElement) {
                if(indexInArray < 6){
                    if(valueOfElement.title.length > 7){
                        valueOfElement.title = valueOfElement.title.substring(0,7) + "...";
                    } 
                     $(".row").append(`
                        <div class="col-md-4 col-sm-6">
                            <div class="box">
                                <img src=${valueOfElement.cover}>
                                <div class="box-content">
                                    <h3 class="title">${valueOfElement.title}</h3>
                                    <span class="post">${valueOfElement.type} <b>${valueOfElement.area}平</b></span>
                                    <ul class="icon">
                                        <li><a href="page.html?examplesId=${valueOfElement.id}"><i class="fa fa-search"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                     `);
                }
            });
        }
    });

    //友情链接
    $.ajax({
        type: "post",
        url: "http://localhost:8080/companyWeb/links/selectAllLinks.do",
        data: JSON.stringify({
            "pageNum" : 1
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $.each(response.list, function (indexInArray, valueOfElement) { 
                $(".alinks").append(`
                <a href="${valueOfElement.url}" target="_blank">${valueOfElement.name}</a>
            `);
            });
        }
    });
}

// ——————————————————————————————————————————————————
// 字符动画
// ——————————————————————————————————————————————————
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

var TextScramble = function() {
    function TextScramble(el) {
        _classCallCheck(this, TextScramble);

        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    TextScramble.prototype.setText = function setText(newText) {
        var _this = this;

        var oldText = this.el.innerText;
        var length = Math.max(oldText.length, newText.length);
        var promise = new Promise(function(resolve) {
            return _this.resolve = resolve;
        });
        this.queue = [];
        for (var i = 0; i < length; i++) {
            var from = oldText[i] || '';
            var to = newText[i] || '';
            var start = Math.floor(Math.random() * 40);
            var end = start + Math.floor(Math.random() * 40);
            this.queue.push({
                from: from,
                to: to,
                start: start,
                end: end
            });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    };

    TextScramble.prototype.update = function update() {
        var output = '';
        var complete = 0;
        for (var i = 0, n = this.queue.length; i < n; i++) {
            var _queue$i = this.queue[i];
            var from = _queue$i.from;
            var to = _queue$i.to;
            var start = _queue$i.start;
            var end = _queue$i.end;
            var char = _queue$i.char;

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += '<span class="dud">' + char + '</span>';
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    };

    TextScramble.prototype.randomChar = function randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    };

    return TextScramble;
}();

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

// var phrases = ['展鸿装饰', '匠心独造', '久经考验十九载','精雕细琢万千家'];

var el = document.querySelector('.text');
var fx = new TextScramble(el);

var counter = 0;
var next = function next() {
    fx.setText(phrases[counter]).then(function() {
        setTimeout(next, 1600);
    });
    counter = (counter + 1) % phrases.length;
};

// 手机号码验证
//验证手机号
function vailPhone(phone){
    var flag = false;
    var message = "";
    var myreg = /^1[3456789]\d{9}$/;             
    if(phone == ''){
        message = "手机号码不能为空！";
        alert(message);
    }else if(phone.length !=11){
        message = "请输入有效的手机号码长度！";
        alert(message);
    }else if(!myreg.test(phone)){
        message = "请输入有效的手机号码！";
        alert(message);
    }else{
            flag = true;
    }
    return flag;
 }
// 正数验证
function checkInt(area){
    if (area == null || area == "") {
        alert("房屋面积不能为空");
        return false;
    }
    else if (!isNumber(area)) {
        alert("房屋面积必须是为正的纯数字");
        return false;
    }else{
        return true;
    }
}
//字符串是否为纯正数验证
function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    // var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val)) {
        return true;
    } else {
        return false;
    }
}
//去除字符串的所有空格，验证是否为空
function checkStr(str){
    if(str.replace(/\s*/g,"") != "" && str.replace(/\s*/g,"") != null){
        return true;
    }else{
        alert("请填写正确的姓名和楼盘名称");
        return false;
    }
}
//html转纯字符串
function htmlToStr(str){
    return str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
}

