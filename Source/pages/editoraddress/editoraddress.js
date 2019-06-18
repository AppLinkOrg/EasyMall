// pages/editoraddress/editoraddress.js

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
      title: '编辑地址',
    })
  }
  bindRegionChange(e) {
    this.Base.setMyData({
      city: e.detail.value
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindRegionChange = content.bindRegionChange;

Page(body)