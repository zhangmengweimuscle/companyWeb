$(function(){
    var maxxPage = 1;
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
        $(".newsList").empty();
        //填充
        $.ajax({
            type: "post",
            url: "http://localhost:8080/companyWeb/news/selectNews.do",
            data: JSON.stringify({
                "pageNum" : pageNum,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                maxxPage = response.pages;//获取最大页数
                $.each(response.list, function (indexInArray, valueOfElement) {
                    if(valueOfElement.title.length > 15){
                        valueOfElement.title = valueOfElement.title.substring(0,15) + "...";
                    }   
                    let desc = htmlToStr(valueOfElement.content).substring(0,100) + "...";
                    $(".newsList").append(`
                        <div class="box">
                            <a href="page.html?newsId=${valueOfElement.id}">
                                <div class="cover"><img src=${valueOfElement.cover} alt=""></div>
                                <div class="content">
                                    <div class="title"><h3>${valueOfElement.title}</h3></div>
                                    <div class="newscontent">${desc}</div>
                                    <div class="date">${valueOfElement.date}</div>
                                </div>
                            </a>
                        </div>
                    `);
                });
            }
        });
    }
})
//html转纯字符串
function htmlToStr(str){
    return str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
}