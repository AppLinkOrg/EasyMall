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
  OrderApi
} from "../../apis/order.api.js";

var WxParse = require('../../wxParse/wxParse');

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=1;
    super.onLoad(options);
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '购物车',
    })
  }

  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    orderapi.getgwclist({
      status:'c'
    }, (getgwclist) => {
      console.log(getgwclist)
      this.Base.setMyData({
        getgwclist: getgwclist
      });
    });
  }



  todetails(e) {
    var name = e.currentTarget.dataset.name;
    if (name == "guan") {
      wx.switchTab({
        url: '/pages/home/home',
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