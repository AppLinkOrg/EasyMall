import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=1;
    super.onLoad(options);
    // this.Base.setPageTitle("");
    this.Base.setMyData({
      show: 1
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '我的订单',
    })
  }

  bindqh(e) {
    var type = e.currentTarget.dataset.type;
    if (type == "1") {
      this.Base.setMyData({
        show: 1
      })
    }
    if (type == "2") {
      this.Base.setMyData({
        show: 2
      })
    }
    if (type == "3") {
      this.Base.setMyData({
        show: 3
      })
    }
    if (type == "4") {
      this.Base.setMyData({
        show: 4
      })
    }
    if (type == "5") {
      this.Base.setMyData({
        show: 5
      })
    }
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindqh = content.bindqh;
Page(body)