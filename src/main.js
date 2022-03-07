import * as Enjine from "./Enjine/index.js";
import Mario from "./Mario/index.js";

$(document).ready(() => new Enjine.Application().Initialize(new Mario.LoadingState(), 320, 240));
$("#bdshell_js").attr("src", `http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=${new Date().getHours()}`);