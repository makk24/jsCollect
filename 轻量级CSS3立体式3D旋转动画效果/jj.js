var BROWSER = function() {
    var ua = navigator.userAgent.toLowerCase();

    var match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];

    return { browser: match[1] || "", version: match[2] || "0" };
}();

if ((BROWSER.animate = (BROWSER.browser !== "mozilla" && BROWSER.browser !== "webkit"))) {
    // 涓嶆槸鐩爣娴忚鍣紝鍒涘缓CSS鍚戜笅鍏煎
    var oStyle = document.createElement("style"),
        cssText = ".out{display:none!important;}";
    oStyle.type = "text/css";
    if (BROWSER.browser === "msie") {
        oStyle.styleSheet.cssText = cssText;
    } else {
        oStyle.innerHTML = cssText;
    }
    document.getElementsByTagName("head")[0].appendChild(oStyle);
}