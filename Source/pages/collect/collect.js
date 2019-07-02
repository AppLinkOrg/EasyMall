// pages/collect/collect.js
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
    this.Base.setMyData({

    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '我的收藏',
    })
  }

  quxiao(e) {
    var id = e.currentTarget.id;
    wx.showModal({
      title: '确认取消收藏吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          var goodsapi = new GoodsApi();
          goodsapi.quxiaofav({
            idlist: id
          }, (quxiaofav) => {
            console.log(quxiaofav);
          });
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindqh = content.bindqh;
body.quxiao = content.quxiao;
Page(body)