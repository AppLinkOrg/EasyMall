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
  
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
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
    if (name == "myshoucang") {
      wx.navigateTo({
        url: '/pages/collect/collect',
      })
    }
    if (name == "myaddress") {
      wx.navigateTo({
        url: '/pages/address/address',
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