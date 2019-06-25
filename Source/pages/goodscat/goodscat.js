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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      jiage: 1,
      xiaoliang: 1,
      xinpin: 1
    });
  }
  onMyShow() {
    var that = this;
    var catlist = this.Base.getMyData().catlist;
    var goodsapi = new GoodsApi();
    goodsapi.catlist({}, (catlist) => {
      console.log(catlist)
      this.Base.setMyData({
        catlist: catlist
      });
    })
    goodsapi.classifylist({}, (classifylist) => {
      console.log(classifylist)
      this.Base.setMyData({
        classifylist: classifylist
      });
    })
  }

  bindjiage(e) {
    // var name = e.currentTarget.dataset.name;
    var jiage = this.Base.getMyData().jiage;
    if (jiage == 1) {
      this.Base.setMyData({
        jiage: 2
      })
      this.Base.setMyData({
        xiaoliang: 1
      });
    }
    if (jiage == 2) {
      this.Base.setMyData({
        jiage: 3
      })
      this.Base.setMyData({
        xiaoliang: 1
      });
    }
    if (jiage == 3) {
      this.Base.setMyData({
        jiage: 1
      })
      this.onMyShow();
    }
  }

  bindxiaoliang(e) {
    // var name = e.currentTarget.dataset.name;
    var xiaoliang = this.Base.getMyData().xiaoliang;
    if (xiaoliang == 1) {
      this.Base.setMyData({
        xiaoliang: 2
      })
      this.onMyShow();
    }
    if (xiaoliang == 2) {
      this.Base.setMyData({
        xiaoliang: 3
      })
      this.onMyShow();
    }
    if (xiaoliang == 3) {
      this.Base.setMyData({
        xiaoliang: 1
      })
      this.onMyShow();
    }
  }

  bindxinpin(e) {
    // var name = e.currentTarget.dataset.name;
    var xinpin = this.Base.getMyData().xinpin;
    if (xinpin == 1) {
      this.Base.setMyData({
        xinpin: 2
      })

    }
    if (xinpin == 2) {
      this.Base.setMyData({
        xinpin: 3
      })
    }
    if (xinpin == 3) {
      this.Base.setMyData({
        xinpin: 1
      })
    }
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.catclick = content.catclick;
body.bindjiage = content.bindjiage;
body.bindxiaoliang = content.bindxiaoliang;
body.bindxinpin = content.bindxinpin;
Page(body)