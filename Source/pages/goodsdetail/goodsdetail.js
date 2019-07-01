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
import {
  OrderApi
} from "../../apis/order.api.js";

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
      select: false
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
    var type = e.currentTarget.dataset.type;
    this.Base.setMyData({
      status: true,
      type: type
    })
  }

  buybuybuy(e) {
    var type = e.currentTarget.dataset.type;
    this.Base.setMyData({
      status: true,
      type: type
    })
  }

  select(e) {
    this.Base.setMyData({
      select: true
    })
  }

  close(e) {
    this.Base.setMyData({
      status: false,
      select: false
    })
  }

  clickcolor(e) {
    var id = e.currentTarget.id;
    this.Base.setMyData({
      color: id
    })
  }

  clicksize(e) {
    var id = e.currentTarget.id;
    this.Base.setMyData({
      size: id
    })
  }

  confirm(e) {
    var that = this;
    var orderapi = new OrderApi();
    var shop = this.Base.getMyData().info;
    var data = {
      member_id: 25,
      goods_id: shop.id,
      pricestr: shop.pricestr,
      img: shop.cover,
      color_id: this.Base.getMyData().color,
      size_id: this.Base.getMyData().size,
      num: 1,
      status: "C"
    }
    console.log(data);
    if (this.Base.getMyData().color == undefined) {
      this.Base.info("请选择商品颜色");
      return;
    }
    if (this.Base.getMyData().size == undefined) {
      this.Base.info("请选择商品尺码");
      return;
    }
    var type = this.Base.getMyData().type;
    console.log(type);
    if (type == "gouwuche") {
      orderapi.gouwuche(data, (res) => {
        console.log(res);
        wx.showToast({
          title: '添加购物车成功',
          icon: 'success',
          duration: 1000
        })
        that.close();
        this.Base.setMyData({
          color: 0,
          size: 0
        })
      })
    }
    // if (type == "buybuybuy") {

    // }

  }

  toshopcart(e) {
    console.log(e+"lalalall");
    wx.reLaunch({
      url: '/pages/shopcart/shopcart',
    })
  
  }

  addgouwuche(e) {
    var that = this;
    var orderapi = new OrderApi();
    var shop = this.Base.getMyData().info;
    var data = {
      member_id: 25,
      goods_id: shop.id,
      pricestr: shop.pricestr,
      img: shop.cover,
      color_id: this.Base.getMyData().color,
      size_id: this.Base.getMyData().size,
      num: 1,
      status: "C"
    }
    orderapi.gouwuche(data, (res) => {
      console.log(res);
      wx.showToast({
        title: '添加购物车成功',
        icon: 'success',
        duration: 1000
      })
      that.close();
      this.Base.setMyData({
        color: 0,
        size: 0
      })
    })
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
body.confirm = content.confirm;
body.toshopcart = content.toshopcart;
body.select = content.select; 
body.addgouwuche = content.addgouwuche;
Page(body)