import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
var WxParse = require('../../wxParse/wxParse');

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=1;
    super.onLoad(options);
    this.Base.setPageTitle("");
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    instapi.news({ id: that.Base.options.id }, function (news) {
      news.content = that.Base.util.HtmlDecode(news.content);
      that.Base.setMyData(news);
      WxParse.wxParse('content', 'html', news.content, that, 10);
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)