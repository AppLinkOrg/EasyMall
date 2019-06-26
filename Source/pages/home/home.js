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
      var topbanner = [];
      var bottombanner = [];
      var mlbanner = null;
      var mrtbanner = null;
      var mrbbanner = null;
      for (var i = 0; i < indexbanner.length; i++) {
        if (indexbanner[i].position == "top") {
          topbanner.push(indexbanner[i]);
        } else if (indexbanner[i].position == "middleleft") {
          mlbanner = indexbanner[i];
        } else if (indexbanner[i].position == "middlerighttop") {
          mrtbanner = indexbanner[i];
        } else if (indexbanner[i].position == "middlerightbot") {
          mrbbanner = indexbanner[i];
        } else if (indexbanner[i].position == "bottom") {
          bottombanner.push(indexbanner[i]);
        }
      }
      that.Base.setMyData({
        topbanner,
        mlbanner,
        mrtbanner,
        mrbbanner,
        bottombanner
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
    goodsapi.catlist({

    }, (catlist) => {
      that.Base.setMyData({
        catlist: catlist
      });
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
        classifylist: classifylist, cat_id: id
      });
    })

    wx.reLaunch({
      url: '/pages/goodscat/goodscat?type=' + id
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindfenlei = content.bindfenlei;
Page(body)