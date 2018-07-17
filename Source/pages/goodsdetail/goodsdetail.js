// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { GoodsApi } from "../../apis/goods.api.js";
var WxParse = require('../../wxParse/wxParse');

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.id=1;
    this.Base.Page = this;
    this.Base.pagetitle = "";
    super.onLoad(options);
    this.Base.setMyData({ currenttab: 0 });
  }
  onMyShow() {
    var that = this;
    var api = new GoodsApi();
    api.info({ id: this.Base.options.id }, (info) => {
      that.Base.setMyData(info);
      wx.setNavigationBarTitle({
        title: info.name,
      });
      var content = that.Base.util.HtmlDecode(info.content);
      WxParse.wxParse('content', 'html', content, that, 10);


      var detail = that.Base.util.HtmlDecode(info.detail);
      WxParse.wxParse('detail', 'html', detail, that, 10);

    });
  }

  changeCurrentTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.detail.current });
  }
  changeTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.currentTarget.id });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab;

Page(body)