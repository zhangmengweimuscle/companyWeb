var maxxPage = 1;
    var selectType = "";
    var selectArea = "";
    var arrayType = ["allType","two","three","villa","duplex","selfBuild"];
    var arrayArea = ["allArea","small","middle","large"];
    //提取url中的value到selectType和selectArea中
    var value = window.location.href.substr(window.location.href.lastIndexOf("?")+1,window.location.href.lastIndexOf(".html")+16);
    if(value.length != 51){
        selectType = value.substring(0,value.lastIndexOf("&"));
        selectArea = value.substring(value.lastIndexOf("&")+1,value.lastIndexOf("&")+9);
    }
$(document).ready(function(){
    //根据url的value设定哪个span是被选中的，默认就是allType和allArea
    $.each($(".content .content").find("span[class='active']"),function(index,element){
        $("#"+element.id).removeClass("active");
    })
    if(selectType != "" && selectArea !=""){
        $("#"+selectType).addClass("active");
        $("#"+selectArea).addClass("active");
    }else{
        $("#allType").addClass("active");
        $("#allArea").addClass("active");
    }

    $(".content .content").find("span[class!='active']").mouseover(function(){
        this.style.cursor = "pointer";
        this.style.backgroundColor = "#e74c3c";
        this.style.color = "#fff";
    })
    $(".content .content").find("span[class!='active']").mouseout(function(){
        this.style.backgroundColor = "#fff";
        this.style.color = "#333";
    })
    //设定点击事件
    $(".content .content").find("span").click(function(e){                                  //e是点击span
        $.each($(".content .content").find("span[class='active']"),function(index,element){ //element是之前被选中的span
            if($.inArray(element.id,arrayType) == -1){                                      //如果之前选中的span的id在arrayArea中
                selectArea = element.id;
            }else{
                selectType = element.id;
            }
        })
        if($.inArray(e.target.id,arrayArea) == -1){                                         //如果选中的span的id在arrayType中
            selectType = e.target.id;
        }else{
            selectArea = e.target.id;
        }
        //跳转页面
        var str = window.location.href.substr(0,window.location.href.lastIndexOf(".html")+5);
        $(location).attr("href",str+"?"+selectType+"&"+selectArea);
    })

    //首页填充
    menu(1);
    $("[data-id = 'page']").val(1);
    /**
     * 换页按钮
     */
    // 下一页
    $("[data-id = 'next']").click(function (e) {
        let pageii = $("[data-id = 'page']").val();
        if(pageii < maxxPage){
            $("[data-id = 'page']").val(++pageii);
            menu(pageii);
        } 
    })
    //上一页
    $("[data-id = 'up']").click(function (e) {
        let pageii = $("[data-id = 'page']").val();
        if(pageii > 1){
            $("[data-id = 'page']").val(--pageii);
            menu(pageii);
        }
    })
    //最顶页
    $("[data-id = 'first']").click(function (e) {
        $("[data-id = 'page']").val(1);
        menu(1);
    })
    //最底页
    $("[data-id = 'last']").click(function (e) {
        $("[data-id = 'page']").val(maxxPage);
        menu(maxxPage);
    })
    //输入数字，回车跳转
    $("[data-id = 'page']").keyup(function (event) {
        if (event.keyCode == 13) {
            menu($("[data-id = 'page']").val());
        }
    })
    function menu(pageNum){
        let type = "";
        if(selectType == "two") type = "二居";
        if(selectType == "three") type = "三居";
        if(selectType == "villa") type = "别墅";
        if(selectType == "duplex") type = "复式";
        if(selectType == "selfBuild") type = "自建";
    
        let area = 0;
        if(selectArea == "small") area = 100;
        if(selectArea == "middle") area = 101;
        if(selectArea == "large") area = 102;
    
        $(".row").empty();
        //填充
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/examples/selectExamplesByTypeAndArea.do",
            data: JSON.stringify({
                "pageNum" : pageNum,
                "type" : type,
                "area" : area
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                maxxPage = response.pages;//获取最大页数
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
    }
})

