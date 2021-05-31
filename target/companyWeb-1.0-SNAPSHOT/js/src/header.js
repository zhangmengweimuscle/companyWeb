const nav = document.querySelector("nav");
const navLinksContainer = document.querySelector(".nav-links");
const navLinks = [...document.querySelectorAll(".link")];
const menuBtn = document.querySelector(".menu-btn");
const subMenuBtn = document.querySelector(".sub-menu-btn");

function createHoverEl() {
	let hoverEl = document.createElement("div");
	hoverEl.className = "hover-el";
	hoverEl.style.setProperty("--y", "0px");
	hoverEl.style.setProperty("--mousex", "0px");
	hoverEl.style.setProperty("--mousey", "0px");
    console.log(hoverEl);
	navLinksContainer.appendChild(hoverEl);
}
createHoverEl();
$.each($(".nav-links").find("a"),function(index,element){//解决在一开始加载导航的时候字体会变黑的问题
	element.style.color = "#fff";
})
navLinks.forEach((link, index) => {
	let hoverEl = navLinksContainer.querySelector(".hover-el");
	link.style.setProperty("--delay", `${index * 50}ms`);
	link.addEventListener("mousemove", function(e) {
		hoverEl.style.setProperty("--y", `${index * 60}px`);
		hoverEl.style.setProperty("opacity", "1");
		hoverEl.style.setProperty("--mousex", `${e.pageX - hoverEl.offsetLeft}px`);
		hoverEl.style.setProperty("--mousey", `${e.pageY - hoverEl.offsetTop}px`);
	});
	navLinksContainer.addEventListener("mouseout", function() {
		hoverEl.style.setProperty("opacity", "0");
	});
	link.addEventListener("click", function() {
		let hoverEl = navLinksContainer.querySelector(".hover-el");
		hoverEl.style.opacity = '0';
		toggleSubmenu(link);
	});
});

menuBtn.addEventListener("click", function() {
	nav.classList.toggle("nav-open");
	menuBtn.classList.toggle("close");
});
subMenuBtn.addEventListener("click", function() {
	nav.classList.toggle("sub-menu-open");
	removeSubmenu();
});

function toggleSubmenu(el) {
	let subMenu = nav.querySelector(".sub-menu");
	if (el.children[1]) {
		createSubmenu(el);
	} else if (nav.contains(subMenu)) {
		removeSubmenu();
	} else {
		return;
	}
}

function createSubmenu(el) {
	let subMenuContainer = document.createElement("div");
	subMenuContainer.className = "sub-menu";
	let subMenuItem = el.children[1].cloneNode(true);
	let subMenuItemList = [...subMenuItem.children];
	subMenuItemList.forEach((item, index) => {
		item.classList.add("off-menu");
		item.style.setProperty("--delay", `${index * 40}ms`);
	});
	nav.classList.toggle("sub-menu-open");
	nav.appendChild(subMenuContainer);
	subMenuContainer.appendChild(subMenuItem);
	setTimeout(function() {
		subMenuItemList.forEach(item => {
			item.classList.remove("off-menu");
			item.classList.add("on-menu");
		});
	}, 200);
}
function removeSubmenu() {
	let subMenu = nav.querySelector(".sub-menu");
	let subMenuItemList = [...subMenu.children[0].children];
	if (nav.contains(subMenu)) {
		subMenuItemList.forEach(item => {
			item.classList.add("off-menu");
			item.classList.remove("on-menu");
		});
		setTimeout(function() {
			nav.removeChild(subMenu);
		}, 500);
	}
}
var introductionResult = new Object();
$(function(){
    // 锚点动画
    $("a").click(function(){
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
            $('html,body').animate({scrollTop: targetOffset},800);
            return false;
            }
        }
    })
	//ajax 请求公司信息
	$.ajax({
        type: "post",
        url: "http://localhost:8080/companyWeb/introduction/selectIntroduction.do",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            introductionResult = response;
			$("#headerlocation").html(introductionResult.location);
			$("#headerphone").html(introductionResult.phone);
			$("[data-id = 'headerlocation']").html(introductionResult.location);
			$("[data-id = 'headerphone']").html(introductionResult.phone);
			$("#footerPhone").text("咨询热线："+introductionResult.phone);
            $("#footerLocation").text("公司地址："+introductionResult.location);
        }
    });
 });