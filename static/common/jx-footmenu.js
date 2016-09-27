/**
* footer-menu
* 首先要引入jQuery.js
* author:zhangjianfeng
* date:2016-05-07
*/
window.jx_footMenu = {
	show : function(type){
		$(".foot-menu").remove();
		var menuHtlArr =[];
		menuHtlArr.push("<div class=\"foot-menu\">");
		menuHtlArr.push(" <ul>");
		menuHtlArr.push("	<li>");
		menuHtlArr.push("		<a href=\"../../index.html\" class=\"menu-tab\">");
		menuHtlArr.push("			<div class=\"index_img\"></div>");
		menuHtlArr.push("			<span class=\"infor\">首页</span>");
		menuHtlArr.push("		</a>")
		menuHtlArr.push("	</li>");
		menuHtlArr.push("	<li>");
		menuHtlArr.push("		<a href=\"../../view/acount/my.html\" class=\"menu-tab\">");
		menuHtlArr.push("			<div class=\"index_acount\"></div>");
		menuHtlArr.push("			<span class=\"infor\">我的</span>");
		menuHtlArr.push("		</a>")
		menuHtlArr.push("	</li>");
		menuHtlArr.push("	<li>");
		menuHtlArr.push("		<a href=\"javascript:jx_common.downloadApp();\" class=\"menu-tab\">");
		menuHtlArr.push("			<div class=\"index_app\"></div>");
		menuHtlArr.push("			<span class=\"infor\">APP</span>");
		menuHtlArr.push("		</a>");
		menuHtlArr.push("	</li>");
		menuHtlArr.push(" </ul>");
		menuHtlArr.push("</div>");
		$("body").append(menuHtlArr.join(""));
		if(!type){
			return ;
		}
		if(type == "index"){
			var infor_img=$(".index_img").parent().find('.infor');
			$(".index_img").addClass("index_img_choose");
			$(".index_img").removeClass("index_img");
			infor_img.addClass('choose').siblings().removeClass('choose');
		}
		if(type == "my"){
			var infor_account=$(".index_acount").parent().find('.infor');
			$(".index_acount").addClass("index_acount_choose");
			$(".index_acount").removeClass("index_acount");
			infor_account.addClass('choose').siblings().removeClass('choose');
		}
		if(type == "app"){
			var infor_app=$(".index_app").parent().find('.infor');
			$(".index_app").addClass("index_app_choose");
			$(".index_app").removeClass("index_app");
			infor_app.addClass('choose').siblings().removeClass('choose');
		}

	},

	hide : function(){
		$(".foot-menu").hide();
	}

};
