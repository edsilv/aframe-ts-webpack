// https://stackoverflow.com/a/17907562
/**
 * Check if using IE11
 */
function getInternetExplorerVersion() {
  var version = -1;
  var userAgent = navigator.userAgent;
  var re;
  if (navigator.appName === "Microsoft Internet Explorer") {
    re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
    if (re.exec(userAgent) != null) {
      version = parseFloat(RegExp.$1);
    }
  } else if (navigator.appName === "Netscape") {
    re = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})");
    if (re.exec(userAgent) != null) {
      version = parseFloat(RegExp.$1);
    }
  }
  return version;
}

export const isIE11 = getInternetExplorerVersion() === 11;
