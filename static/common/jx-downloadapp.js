/**
 * 
 */
window.jx_downloadapp={
	show : function (){
		var htl = [] ;
		htl.push("<div id=\"downloadApp\" class=\"download_mask clearfix\">");
		htl.push("<div class=\"logo fl\">");
		htl.push("     <a href=\"javascript:;\"></a>");
		htl.push(" </div>");
		htl.push(" <div class=\"slogan fl\">");
		htl.push("       <p>下载九休旅行App</p>");
		htl.push("      <p>来云南，选九休</p>");
		htl.push("  </div>");
		htl.push(" <div class=\"download_btn fl\">");
		htl.push("  <a href=\"http://a.app.qq.com/o/simple.jsp?pkgname=com.yimayhd.utravel\"><span></span>免费下载</a>");
		htl.push(" </div>");
	    htl.push("</div>");
	    $("body").append(htl.join(""));
	},
	hide : function(){
		$(".download_mask").remove();
	}
}; 