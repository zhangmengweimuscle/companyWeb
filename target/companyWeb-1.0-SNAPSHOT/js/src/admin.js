/**
 * admin.js定义主要函数：
 * 
 * 1.选项卡点击事件
 * 
 * 2.图片上传到服务器功能
 * 
 * 3.存储功能
 *      3.1存储企业信息
 *      3.2删除报价信息
 *      3.3存储企业介绍
 *      3.4存储轮播图片和企业文化
 *      3.5删除新闻信息
 *      3.6保存新闻信息(添加 修改)
 *      3.7删除工程案例信息
 *      3.8保存工程案例信息（添加 修改）
 *      3.9删除链接信息
 *      3.10保存链接信息
 * 
 * 4.填充功能
 *      4.1填充企业信息 和企业文化介绍页
 *      4.2填充报价信息
 *      4.3填充企业文化 轮播图片
 *      4.4填充新闻信息
 *      4.5填充工程案例信息
 *      4.6填充友情链接信息
 * 
 * 5.分页按钮事件
 * 
 * 6.去除空格后 字符串非空校验
 * 
 * 7.字符串纯数字校验
 * 
 * 8.字符串和数组的相互转换
 * 
 * 9.a标签跳转到详情页面事件
 * 
 * 10.分页跳转
 * 
 * 11.退出管理员登陆
 * 
 */

//存储查询出来的企业信息的对象
var introductionResult = new Object();
//最大页数
var maxPage = new Object();
$(document).ready(function () {
    /**
     * 选项卡点击事件
     */
    $(".naviTab .box").find("div").mouseover(function () {
        this.style.cursor = "pointer";
        this.style.backgroundColor = "#e83d3d";
        this.style.color = "#fff";
    })
    $(".naviTab .box").find("div").mouseout(function () {
        this.style.backgroundColor = "aliceblue";
        this.style.color = "#666";
    })
    $(".naviTab .box").find("div").click(function (e) {
        $.each($(".workspace .box").find("div"), function (index, element) {
            if ($(element).hasClass("tab")) {
                element.style.display = "none";
            }
        })
        if(e.target.className != "back"){
            $(".workspace .box").find("div[class='" + e.target.className + " tab']")[0].style.display = "block";
            $.each($(".workspace .box ." + e.target.className).find("div"), function (index, element) {
                if ($(element).hasClass("tab")) {
                    element.style.display = "block";
                }
            })
        }
        
    })
    /**
     * 图片上传到服务器功能
     */
    $(".carouselImg").find("input").change(function (e) {
        var fd = new FormData();
        fd.append("imgFile", e.target.files[0]);
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/carouselMap/addCarouselMap.do",
            data: fd,
            dataType: "json",
            processData: false,  // processData和contentType需设置为false
            contentType: false,
            success: function (response) {
                $(e.target.parentNode).css("background-image", "url(" + response.url + ")");
            }
        });
    })
    /*
        存储功能
    */
    /*—————————存储企业信息———————————*/
    $("#informationSubmit").click(function (e) {
        introductionResult.location = $("input[name = location]").val();
        introductionResult.phone = $("input[name = phone]").val();
        introductionResult.logo = $("div[name = logo]").css("background-image").split('(')[1].split(')')[0];
        introductionResult.cover = $("div[name = cover]").css("background-image").split('(')[1].split(')')[0];
        introductionResult.coverword = stringAndArray(true, $("textarea[name = coverWords]").val());
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/introduction/saveIntroduction.do",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(introductionResult),
            dataType: "text",
            success: function (response) {
                if (response == "success") {
                    alert("保存成功");
                }
            }
        });
    })
    /*—————————删除报价信息———————————*/
    $("#formSubmit").click(function () {
        let par = [];
        $.each($("[data-name = 'listulForm']").find(":checkbox"), function (indexInArray, valueOfElement) {
            if ($(valueOfElement).is(":checked")) {
                par.push(parseInt($(valueOfElement).attr("data-id")));
            }
        });
        let conf = confirm("确认删除吗?");
        if (conf) {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/companyWeb/formCollection/deleteForm.do",
                data: JSON.stringify(par),
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                success: function (response) {
                    if (response == "success") {
                        alert("删除成功");
                        menu(1, "Form");
                        $("[data-id = 'page']").val(1);
                    }
                }
            });
        }
    })
    /*—————————存储企业介绍———————————*/
    $("#introductionSubmit").click(function () {
        introductionResult.infocover = $("div[data-name = infocover]").css("background-image").split('(')[1].split(')')[0];
        introductionResult.info = $("textarea[name = info]").val();
        introductionResult.introduction = $("#infocontent").val();
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/introduction/saveIntroduction.do",
            data: JSON.stringify(introductionResult),
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response == "success") {
                    alert("保存成功");
                }
            }
        });
    })
    /*—————————存储轮播图片和企业文化———————————*/
    $("#cultureSubmit").click(function (e) {
        let res = true;
        $.each($("div[ data-id = 'carouselmap']").find("div[class = 'carouselImg']"), function (index, element) {
            let object = new Object();
            object.id = index + 1;
            object.url = element.style.backgroundImage.split('(')[1].split(')')[0];
            $.ajax({
                async: false,//同步请求
                type: "post",
                url: "http://localhost:8080/companyWeb/carouselMap/saveCarouselMap.do",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(object),
                dataType: "text",
                success: function (response) {
                    if (response != "success") {
                        res = false;
                    }
                }
            });
        });
        introductionResult.culture = $("#culcontent").val();
        $.ajax({
            async: false,//同步请求
            type: "post",
            url: "http://localhost:8080/companyWeb/introduction/saveIntroduction.do",
            data: JSON.stringify(introductionResult),
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response != "success") {
                    res = false;
                }
            }
        });
        if (res) {
            alert("保存成功");
        }
    })
    /*—————————删除新闻信息———————————*/
    $("#deleteNews").click(function () {
        let par = [];
        $.each($("[data-name = 'listulNews']").find(":checkbox"), function (indexInArray, valueOfElement) {
            if ($(valueOfElement).is(":checked")) {
                par.push(parseInt($(valueOfElement).attr("data-id")));
            }
        });
        let conf = confirm("确认删除吗?");
        if (conf) {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/companyWeb/news/deleteNews.do",
                data: JSON.stringify(par),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response) {
                        alert("删除成功");
                        menu(1, "News");
                        $("[data-id = 'page']").val(1);
                    }
                }
            });
        }
    })
    /*—————————保存新闻信息(添加 修改)———————————*/
    $("#submitNews").click(function () {
        if ($("[data-id = 'addnews']").attr("data-active") == "true") {
            console.log(2);
            //添加新闻
            let obj = new Object();
            let bool = true;

            obj.title = $("#addnewstitle").val();
            obj.cover = $("div[data-name = addnewscover]").css("background-image").split('(')[1].split(')')[0];
            obj.content = $("#addnewscontent").val();

            if (obj.title == "" || obj.title == null || !checkStr(obj.title)) bool = false;
            if (obj.content == "" || obj.content == null || !checkStr(obj.content)) bool = false;

            if (bool) {
                $.ajax({
                    type: "post",
                    url: "http://localhost:8080/companyWeb/news/insertNews.do",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        if (response == 0) {
                            alert("添加成功");
                            $("[data-value = 'newslist']").get(0).click();
                            menu(1, "News");
                        }
                    }
                });
            } else {
                alert("新闻标题和新闻内容不能为空");
            }
        } else if ($("[data-id = 'news']").attr("data-active") == "true") {
            console.log(1);
            //修改新闻
            let obj = new Object();
            let bool = true;

            obj.id = parseInt($("#newstitle").attr("data-id"));
            obj.title = $("#newstitle").val();
            obj.cover = $("div[data-name = newscover]").css("background-image").split('(')[1].split(')')[0];
            obj.content = $("#newscontent").val();

            if (obj.title == "" || obj.title == null || !checkStr(obj.title)) bool = false;
            if (obj.content == "" || obj.content == null || !checkStr(obj.content)) bool = false;

            if (bool) {
                $.ajax({
                    type: "post",
                    url: "http://localhost:8080/companyWeb/news/updateNews.do",
                    data: JSON.stringify(obj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        if (response) {
                            alert("修改成功");
                            $("[data-value = 'newslist']").get(0).click();
                            menu(1, "News");
                        }
                    }
                });
            } else {
                alert("新闻标题和新闻内容不能为空");
            }
        }
    })
    /*—————————删除工程案例信息———————————*/
    $("#deleteExamples").click(function () {
        let par = [];
        $.each($("[data-name = 'listulExamples']").find(":checkbox"), function (indexInArray, valueOfElement) {
            if ($(valueOfElement).is(":checked")) {
                par.push(parseInt($(valueOfElement).attr("data-id")));
            }
        });
        let conf = confirm("确认删除吗?");
        if (conf) {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/companyWeb/examples/deleteExamples.do",
                data: JSON.stringify(par),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response) {
                        alert("删除成功");
                        menu(1, "Examples");
                        $("[data-id = 'page']").val(1);
                    }
                }
            });
        }
    })
    /*—————————保存工程案例信息（添加 修改）———————————*/
    $("#submitExamples").click(function () {
        if ($("[data-value = 'addexamples']").attr("data-active") == "true") {
            //添加工程案例
            let obj = new Object();
            let bool = true;

            obj.title = $("#addexamplestitle").val();
            obj.type = $("#addexamplestype").val();
            obj.area = $("#addexamplesarea").val();
            obj.location = $("#addexampleslocation").val();
            obj.content = $("#addexamcontent").val();
            obj.cover = $("div[data-name = addexamplescover]").css("background-image").split('(')[1].split(')')[0];

            if (obj.title == "" || obj.title == null || !checkStr(obj.title)) bool = false;
            if (obj.area == "" || obj.area == null || !checkStr(obj.area)) bool = false;
            if (obj.location == "" || obj.location == null || !checkStr(obj.location)) bool = false;
            if (obj.content == "" || obj.content == null || !checkStr(obj.content)) bool = false;

            if (!bool) alert("标题，住房面积和地址不能为空");
            if (!isNumber(obj.area)) {
                bool = false;
                alert("住房面积必须是为正的纯数字");
            }

            if (obj.type == "null") {
                bool = false;
                alert("请选择户型");
            }
            if (bool) {
                $.ajax({
                    type: "post",
                    url: "http://localhost:8080/companyWeb/examples/insertExamples.do",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        if (response) {
                            alert("添加成功");
                            $("[data-value = 'exampleslist']").get(0).click();
                            menu(1, "Examples");
                        }
                    }
                });
            }

        } else if ($("[data-value = 'examples']").attr("data-active") == "true") {
            //修改工程案例
            let obj = new Object();
            let bool = true;

            obj.title = $("#examplestitle").val();
            obj.type = $("#examplestype").val();
            obj.area = $("#examplesarea").val();
            obj.location = $("#exampleslocation").val();
            obj.content = $("#examcontent").val();
            obj.cover = $("div[data-name = examplescover]").css("background-image").split('(')[1].split(')')[0];

            if (obj.title == "" || obj.title == null || !checkStr(obj.title)) bool = false;
            if (obj.area == "" || obj.area == null || !checkStr(obj.area)) bool = false;
            if (obj.location == "" || obj.location == null || !checkStr(obj.location)) bool = false;
            if (obj.content == "" || obj.content == null || !checkStr(obj.content)) bool = false;

            if (!bool) alert("标题，住房面积和地址不能为空");
            if (!isNumber(obj.area)) {
                bool = false;
                alert("住房面积必须是为正的纯数字");
            }

            if (obj.type == "null") {
                bool = false;
                alert("请选择户型");
            }
            if (bool) {
                $.ajax({
                    type: "post",
                    url: "http://localhost:8080/companyWeb/examples/updateExamples.do",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        if (response) {
                            alert("修改成功");
                            $("[data-value = 'exampleslist']").get(0).click();
                            menu(1, "Examples");
                        }
                    }
                });
            }

        }
        
    })
    /*—————————删除链接信息———————————*/
    $("#deleteLinks").click(function () {
        let par = [];
        $.each($("[data-name = 'listulLinks']").find(":checkbox"), function (indexInArray, valueOfElement) {
            if ($(valueOfElement).is(":checked")) {
                par.push(parseInt($(valueOfElement).attr("data-id")));
            }
        });
        let conf = confirm("确认删除吗?");
        if (conf) {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/companyWeb/links/deleteLinks.do",
                data: JSON.stringify(par),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response) {
                        alert("删除成功");
                        menu(1, "Links");
                        $("[data-id = 'page']").val(1);
                    }
                }
            });
        }
    })
    /*—————————保存链接信息———————————*/
    $("#submitLinks").click(function () {
        let obj = new Object();
        let bool = true;

        obj.name = $("#addlinksname").val();
        obj.url = $("#addlinksurl").val();

        if (obj.name == "" || obj.name == null || !checkStr(obj.name)) bool = false;
        if (obj.url == "" || obj.url == null || !checkStr(obj.url)) bool = false;

        if (!bool) alert("名称和链接不能为空");
        console.log(obj);
        if (bool) {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/companyWeb/links/insertLinks.do",
                data: JSON.stringify(obj),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response) {
                        alert("添加成功");
                        $("[data-value = 'linkslist']").get(0).click();
                        menu(1, "Links");
                    }
                }
            });
        }
    })
    /*
        填充功能
    */
    /*—————————填充企业信息 和企业文化介绍页———————————*/
    $.ajax({
        type: "post",
        url: "http://localhost:8080/companyWeb/introduction/selectIntroduction.do",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            introductionResult = response;
            //企业信息
            $("input[name = location]").val(introductionResult.location);
            $("input[name = phone]").val(introductionResult.phone);
            $("div[name = cover]").css("background-image", "url(" + introductionResult.cover + ")");
            $("div[name = logo]").css("background-image", "url(" + introductionResult.logo + ")");
            $("textarea[name = coverWords]").text(stringAndArray(false, introductionResult.coverword));
            //企业简介
            $("div[data-name = infocover]").css("background-image", "url(" + introductionResult.infocover + ")");
            $("textarea[name = info]").text(introductionResult.info);
            editor.introduction.html(introductionResult.introduction);
            //企业文化介绍页
            editor.culture.html(introductionResult.culture);


        }
    });
    /*—————————填充报价信息———————————*/
    menu(1, "Form");
    $("[data-id = 'page']").val(1);

    /*—————————填充企业文化 轮播图片———————————*/
    $.ajax({
        type: "post",
        url: "http://localhost:8080/companyWeb/carouselMap/selectCarouselMap.do",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $.each($("div[ data-id = 'carouselmap']").find("div[class = 'carouselImg']"), function (indexInArray, valueOfElement) {
                valueOfElement.style.backgroundImage = "url(" + response.list[indexInArray].url + ")";
            });
        }
    });
    /*—————————填充新闻信息———————————*/
    menu(1, "News");
    $("[data-id = 'page']").val(1);

    /*—————————填充工程案例信息———————————*/
    menu(1, "Examples")
    $("[data-id = 'page']").val(1);

    /*—————————填充友情链接信息———————————*/
    menu(1, "Links")
    $("[data-id = 'page']").val(1);

    /**
     * 分页按钮事件
     */

    // 下一页
    $("[data-id = 'next']").click(function (e) {
        let pageii = $("[data-id = 'page']").val();
        if (pageii < maxPage[$(e.target.parentNode.parentNode.parentNode).attr("data-name")]) {
            $("[data-id = 'page']").val(++pageii);
        }
        menu(pageii, $(e.target.parentNode.parentNode.parentNode).attr("data-name"));
    })
    //上一页
    $("[data-id = 'up']").click(function (e) {
        let pageii = $("[data-id = 'page']").val();
        if (pageii > 1) {
            $("[data-id = 'page']").val(--pageii);
        };
        menu(pageii, $(e.target.parentNode.parentNode.parentNode).attr("data-name"));
    })
    //最顶页
    $("[data-id = 'first']").click(function (e) {
        $("[data-id = 'page']").val(1);
        menu(1, $(e.target.parentNode.parentNode.parentNode).attr("data-name"));
    })
    //最底页
    $("[data-id = 'last']").click(function (e) {
        $("[data-id = 'page']").val(maxPage[$(e.target.parentNode.parentNode.parentNode).attr("data-name")]);
        menu(maxPage[$(e.target.parentNode.parentNode.parentNode).attr("data-name")], $(e.target.parentNode.parentNode.parentNode).attr("data-name"));
    })
    //输入数字，回车跳转
    $("[data-id = 'page']").keyup(function (event) {
        if (event.keyCode == 13) {
            menu($("[data-id = 'page']").val(), $($("[data-id = 'page']")[0].parentNode.parentNode.parentNode).attr("data-name"));
        }
    })
    /**
     * 搜索按钮
     */
    $(".line.searchDiv").click(function (e) {
        menu(1, $(e.target.parentNode).attr("data-id"));
    })

    /*退出管理员登陆 */
    $(".back").click(function(){
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/session/deleteSession.do",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log(response);
                if(response){
                    // $(location).attr("href","index.html");
                    window.location.reload();
                }
            }
        });
    })

})
//去除空格后 字符串非空校验
function checkStr(str) {
    if (str.replace(/\s*/g, "") != "" && str.replace(/\s*/g, "") != null) {
        return true;
    } else {
        return false;
    }
}
//字符串纯数字校验
function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    // var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val)) {
        return true;
    } else {
        return false;
    }
}
//字符串和数组的相互转换
function stringAndArray(type, string) {
    if (type) { //type == true ,string 的类型为"a\nb\nc\n"换行纯字符串
        let oparray = [];
        string = string.replace(/^\n*/, "");
        string = string.replace(/\n{2,}/g, "\n");
        string = string.replace(/\n*$/, "");
        oparray = string.split("\n");
        let res = "[" + oparray + "]";
        return res;
    } else {//string类型为"[a,b,c]"类数组字符串
        let oparray = string.slice(1, -1).split(",");
        let res = "";
        $.each(oparray, function (indexInArray, valueOfElement) {
            res += valueOfElement + "\n";
        });
        return res;
    }
}
/**
 * a标签跳转到详情页面事件
 * 跳转到详情页面
 */
function goto(tar, str) {
    if (str == "news") {
        $("[data-value = 'news']").get(0).click();//新闻详情跳转
        let obj = new Object();
        obj.id = parseInt($(tar).attr("data-value"));
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/news/selectNewsById.do",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                editor.news.html(response.content);
                $("#newstitle").val(response.title);
                $("#newstitle").attr("data-id", response.id);
                $("div[data-name = newscover]").css("background-image", "url(" + response.cover + ")");
            }
        });
    } else {
        $("[data-value = 'examples']").get(0).click();//工程案例详情跳转
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/examples/selectExamplesById.do",
            data: JSON.stringify({
                "id": parseInt($(tar).attr("data-value"))
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (response) {
                editor.examples.html(response.content);
                $("#examplestitle").val(response.title);
                $("#examplestitle").attr("data-id", response.id);
                $("#examplestype").find("option[value='" + response.type + "']").attr("selected", true);
                $("#examplesarea").val(response.area);
                $("#exampleslocation").val(response.location);
                $("div[data-name = examplescover]").css("background-image", "url(" + response.cover + ")");
            }
        });
    }

}
/**
 * 分页跳转
 */
function menu(numOfPage, type) {
    // console.log(numOfPage);
    if (type == "Form") {
        $("[data-name = 'listulForm']").empty();//清空表内容
        let keywordOfForm = $("[data-name = 'search" + type + "Input']").val();//获取搜索关键字
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/formCollection/selectForm.do",
            data: JSON.stringify({
                "pageNum": numOfPage,
                "keyWords": keywordOfForm
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                maxPage[type] = response.pages;//获取最大页数
                /**
                 * 填充form
                 */
                $.each(response.list, function (indexInArray, valueOfElement) {
                    if (valueOfElement.location.length > 10) {
                        valueOfElement.location = valueOfElement.location.substring(0, 10) + "...";
                    }
                    $("[data-name = 'listulForm']").append(`
                     <li class="listli">
                        <div class="radio">
                        <label>
                            <input type="checkbox" data-id="${valueOfElement.id}">
                        </label>
                            <div class="name">${valueOfElement.name}</div>
                            <div class="phone">${valueOfElement.phone}</div>
                            <div class="location">${valueOfElement.location}</div>
                            <div class="area">${valueOfElement.area}</div>
                        </div>
                    </li>
                     `);
                });
            }
        });
    } else if (type == "News") {
        $("[data-name = 'listulNews']").empty();//清空表内容
        let keywordOfForm = $("[data-name = 'search" + type + "Input']").val();//获取搜索关键字
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/news/selectNews.do",
            data: JSON.stringify({
                "pageNum": numOfPage,
                "keyWords": keywordOfForm
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (response) {
                maxPage[type] = response.pages;//获取最大页数
                /**
                 * 填充news
                 */
                $.each(response.list, function (indexInArray, valueOfElement) {
                    if (valueOfElement.title.length > 10) {
                        valueOfElement.title = valueOfElement.title.substring(0, 10) + "...";
                    }
                    $("[data-name = 'listulNews']").append(`
                        <li class="listli">
                            <div class="radio">
                            <label>
                                <input type="checkbox" data-id="${valueOfElement.id}">
                            </label>
                                <a href = "#" onclick="goto(this,'news');" data-value = "${valueOfElement.id}">
                                    <div class="newsdate">${valueOfElement.date}</div>
                                    <div class="newstitle">${valueOfElement.title}</div>
                                </a>    
                            </div>
                        </li>
                     `);
                });
            }
        });
    } else if (type == "Examples") {
        $("[data-name = 'listulExamples']").empty();//清空表内容
        let keywordOfForm = $("[data-name = 'search" + type + "Input']").val();//获取搜索关键字
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/examples/selectExamples.do",
            data: JSON.stringify({
                "pageNum": numOfPage,
                "keyWords": keywordOfForm
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (response) {
                maxPage[type] = response.pages;//获取最大页数
                // console.log(response);
                /**
                 * 填充工程案例
                 */
                $.each(response.list, function (indexInArray, valueOfElement) {
                    if (valueOfElement.title.length > 10) {
                        valueOfElement.title = valueOfElement.title.substring(0, 10) + "...";
                    }
                    if (valueOfElement.location.length > 10) {
                        valueOfElement.location = valueOfElement.location.substring(0, 10) + "...";
                    }
                    $("[data-name = 'listulExamples']").append(`
                        <li class="listli">
                            <div class="radio">
                            <label>
                                <input type="checkbox" data-id="${valueOfElement.id}">
                            </label>
                                <a href = '#' onclick = "goto(this,'examples');" data-value = "${valueOfElement.id}">
                                    <div class="examplestitle">${valueOfElement.title}</div>
                                    <div class="exampleslocation">${valueOfElement.location}</div>
                                </a>
                            </div>
                        </li>
                    `);
                });
            }
        });
    } else if (type == "Links") {
        $("[data-name = 'listulLinks']").empty();//清空表内容
        let keywordOfForm = $("[data-name = 'search" + type + "Input']").val();//获取搜索关键字
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/links/selectLinks.do",
            data: JSON.stringify({
                "pageNum": numOfPage,
                "keyWords": keywordOfForm
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (response) {
                maxPage[type] = response.pages;//获取最大页数
                /**
                 * 链接填充案例
                 */
                $.each(response.list, function (indexInArray, valueOfElement) {
                    if (valueOfElement.name.length > 10) {
                        valueOfElement.name = valueOfElement.name.substring(0, 10) + "...";
                    }
                    if (valueOfElement.url.length > 30) {
                        valueOfElement.url = valueOfElement.url.substring(0, 30) + "...";
                    }
                    $("[data-name = 'listulLinks']").append(`
                        <li class="listli">
                            <div class="radio">
                                <label>
                                    <input type="checkbox" data-id="${valueOfElement.id}">
                                </label>
                                <a href="#" onclick="goto(this,'links');" data-value="${valueOfElement.id}" style="pointer-events: none;">
                                    <div class="linksname">${valueOfElement.name}</div>
                                    <div class="linksurl">${valueOfElement.url}</div>
                                </a>
                            </div>
                        </li>
                     `);
                });
                }
        });
    }
}
