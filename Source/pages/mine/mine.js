import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
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

  }

  todetails(e) {
    var name = e.currentTarget.dataset.name;
    if (name == "all") {
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }
    if (name == "daifk") {
      wx.navigateTo({
        url: '/pages/order/order',
      })
    }


    if (name == "youhuiquan") {
      wx.navigateTo({
        url: '/pages/myorder/myorder',
      })
    }
    if (name == "shoucang") {
      wx.navigateTo({
        url: '/pages/collect/collect',
      })
    }
    if (name == "address") {
      wx.navigateTo({
        url: '/pages/address/address',
      })
    }
    if (name == "sc") {
      wx.navigateTo({
        url: '/pages/mycollect/mycollect',
      })
    }
    if (name == "about") {
      wx.navigateTo({
        url: '/pages/aboutus/aboutus',
      })
    }
    if (name == "jg") {
      wx.navigateTo({
        url: '/pages/addmechanism/addmechanism',
      })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.todetails = content.todetails;
Page(body)