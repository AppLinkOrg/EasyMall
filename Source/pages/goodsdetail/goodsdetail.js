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
      status: false,
      color:0
      // currenttab: 0
    });
  }
  onMyShow() {
    var that = this;
    var idd = this.Base.options.id;
    var goodsapi = new GoodsApi();
    var instapi = new InstApi();
    goodsapi.photos({
      goods_id: idd
    }, (photos) => {
      console.log(photos)
      this.Base.setMyData({
        photos: photos
      });
    });

    goodsapi.info({
      id: idd,
    }, (info) => {
      console.log(info)
      this.Base.setMyData({
        info: info
      });
    });

    goodsapi.goodscolorlist({
      goods_id: idd
    }, (goodscolorlist) => {
      console.log(goodscolorlist)
      this.Base.setMyData({
        goodscolorlist: goodscolorlist
      });
    });

    goodsapi.goodssizelist({
      goods_id: idd
    }, (goodssizelist) => {
      console.log(goodssizelist)
      this.Base.setMyData({
        goodssizelist: goodssizelist
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

  addgwc(e) {
    this.Base.setMyData({
      status:true
    })
  }

  buybuybuy(e) {
    this.Base.setMyData({
      status: true
    })
  }

  close(e) {
    this.Base.setMyData({
      status: false
    })
  }

  clickcolor(e) {
    var id = e.currentTarget.id;
    console.log(id);
  }

  clicksize(e){
    var seq = e.currentTarget.id;
    console.log(seq);
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab;
body.addgwc = content.addgwc;
body.close = content.close;
body.buybuybuy = content.buybuybuy;
body.clicksize = content.clicksize;
body.clickcolor = content.clickcolor;
Page(body)