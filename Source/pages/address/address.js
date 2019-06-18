// pages/address/address.js
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

  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '收货地址',
    })
  }

  address(e) {
    var type = e.currentTarget.dataset.name;
    if (type == 'add') {
      wx.navigateTo({
        url: '/pages/addaddress/addaddress',
      })
    }
    if (type == 'bianji') {
      wx.navigateTo({
        url: '/pages/editoraddress/editoraddress',
      })
    }

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.address = content.address;

Page(body)