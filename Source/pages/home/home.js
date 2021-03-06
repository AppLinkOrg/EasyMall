
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

    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner,
      });

      instapi.productlist({}, (productlist) => {
        that.Base.setMyData({
          productlist: productlist
        });
      });
    });

    var goodsapi = new GoodsApi();
    goodsapi.classifylist({}, (classifylist) => {
      console.log(classifylist)
      this.Base.setMyData({
        classifylist: classifylist
      });
    })

    goodsapi.catlist({}, (catlist) => {
      console.log(catlist)
      that.Base.setMyData({
        catlist: catlist
      });
      var qiansi = catlist.filter((item, idx) => {
        return idx < 4
      })
      console.log(qiansi);
      this.Base.setMyData({
        qiansi: qiansi
      })
    });

    goodsapi.recommgoodscat({}, (recommgoodscat) => {
      that.Base.setMyData({
        recommgoodscat: recommgoodscat
      });
    });
  }

  bindfenlei(e) {
    var id = e.currentTarget.id;
    console.log(id);
    // return;
    var goodsapi = new GoodsApi();
    goodsapi.classifylist({
      cat_id: id
    }, (classifylist) => {
      console.log(classifylist)
      this.Base.setMyData({
        classifylist: classifylist,
        cat_id: id
      });
    })

    wx.reLaunch({
      url: '/pages/goodscat/goodscat?type=' + id
    })
  }

  todetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/goodsdetail/goodsdetail?id=' + id,
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindfenlei = content.bindfenlei;
body.todetails = content.todetails;
Page(body)