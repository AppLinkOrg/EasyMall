// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  GoodsApi
} from "../../apis/goods.api.js";
var WxParse = require('../../wxParse/wxParse');

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.id=1;
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({
      // currenttab: 0
    });
  }
  onMyShow() {
    var that = this;
    var idd = this.Base.options.id;
    var goodsapi = new GoodsApi();
    var instapi = new InstApi();
    instapi.productlist({}, (productlist) => {
      console.log(productlist)
      this.Base.setMyData({
        productlist: productlist
      });
    });
    goodsapi.info({
      id: idd
    }, (info) => {
      console.log(info)
      this.Base.setMyData({
        info: info
      });
    });




  }

  // changeCurrentTab(e) {
  //   console.log(e);
  //   this.Base.setMyData({
  //     currenttab: e.detail.current
  //   });
  // }
  // changeTab(e) {
  //   console.log(e);
  //   this.Base.setMyData({
  //     currenttab: e.currentTarget.id
  //   });
  // }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab;
Page(body)