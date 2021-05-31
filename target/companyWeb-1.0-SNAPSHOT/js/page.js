$(document).ready(function (){
    //提取url中 ? 后的数据
    var value = window.location.href.substr(window.location.href.lastIndexOf("?")+1);

    //填充数据
    
    if(value == "introduction"){
        //如果该页面是 introduction 企业介绍页面
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/introduction/selectIntroduction.do",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                $(".page").empty();
                $(".page").append(`
                    <div class="title">
                        <h1>企业简介</h1>
                        <div class="subTitle">
                            <div class="date">发布日期：2021-04-15</div>
                        </div>
                    </div>
                    <div class="content">
                        ${response.introduction}
                    </div>
                `);
            }
        });
    }else if(value == "culture"){
        //如果该页面是 culture 企业文化介绍页面
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/introduction/selectIntroduction.do",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                $(".page").empty();
                $(".page").append(`
                    <div class="title">
                        <h1>企业文化</h1>
                        <div class="subTitle">
                            <div class="date">发布日期：2021-04-15</div>
                        </div>
                    </div>
                    <div class="content">
                        ${response.culture}
                    </div>
                `);
            }
        });
    }else{
        //如果该页面使news或examples的详情页面
        let type = value.slice(0,6);
        if(type == "newsId"){
            //如果该页面是新闻页面
            let newsId = parseInt(value.slice(7));
            console.log(newsId);
            $.ajax({
                type: "post",
                url: "http://localhost:8080/companyWeb/news/selectNewsById.do",
                data: JSON.stringify({
                    "id" : newsId
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "JSON",
                success: function (response) {
                    $(".page").empty();
                    $(".page").append(`
                        <div class="title">
                            <h1>${response.title}</h1>
                            <div class="subTitle">
                                <div class="date">发布日期：${response.date}</div>
                            </div>
                        </div>
                        <div class="content">
                            ${response.content}
                        </div>
                    `);
                }
            });
        }else{
            //如果该页面是工程案例页面
            let examplesId = parseInt(value.slice(11));
            $.ajax({
                type: "post",
                url: "http://localhost:8080/companyWeb/examples/selectExamplesById.do",
                data: JSON.stringify({
                    "id" : examplesId
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "JSON",
                success: function (response) {
                    $(".page").empty();
                    $(".page").append(`
                        <div class="title">
                            <h1>${response.title}</h1>
                        </div>
                        <ul class="subinformation">
                            <li class="box">
                                <p class="content">${response.type}</p>
                                <p class="name">案例户型</p>
                            </li>
                            <li class="box">
                                <p class="content">${response.location}</p>
                                <p class="name">案例地址</p>
                            </li>
                            <li class="box">
                                <p class="content">${response.area}</p>
                                <p class="name">案例面积</p>
                            </li>
                        </ul>
                        <div class="content">
                            ${response.content}
                        </div>
                    `);
                }
            });
        }
    }
})