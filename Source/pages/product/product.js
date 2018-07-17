// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
var WxParse = require('../../wxParse/wxParse');

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.id=20;
    this.Base.Page = this;
    this.Base.pagetitle = "";
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    instapi.product({id:this.Base.options.id}, (product) => {
      that.Base.setMyData(product);
      that.Base.pagetitle = product.name;
      wx.setNavigationBarTitle({
        title: product.name,
      })
      product.content = that.Base.util.HtmlDecode(product.content);
      WxParse.wxParse('content', 'html', product.content, that, 10);

    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

Page(body)