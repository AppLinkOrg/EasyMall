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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({
      show: 1
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var orderapi = new OrderApi();
    orderapi.orderlist({
      status: 'C'
    }, (orderlist) => {
      console.log(orderlist)
      this.Base.setMyData({
        orderlist: orderlist
      });
    });
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
      var orderapi = new OrderApi();
      orderapi.orderlist({
        status: 'A'
      }, (orderlist) => {
        console.log(orderlist)
        this.Base.setMyData({
          orderlist: orderlist
        });
      });
      this.Base.setMyData({
        show: 2
      })
    }
    if (type == "3") {
      var orderapi = new OrderApi();
      orderapi.orderlist({
        status: 'B'
      }, (orderlist) => {
        console.log(orderlist)
        this.Base.setMyData({
          orderlist: orderlist
        });
      });
      this.Base.setMyData({
        show: 3
      })
    }
    if (type == "4") {
      var orderapi = new OrderApi();
      orderapi.orderlist({
        status: 'C'
      }, (orderlist) => {
        console.log(orderlist)
        this.Base.setMyData({
          orderlist: orderlist
        });
      });
      this.Base.setMyData({
        show: 4
      })
    }
    if (type == "5") {
      var orderapi = new OrderApi();
      orderapi.orderlist({
        status: 'E'
      }, (orderlist) => {
        console.log(orderlist)
        this.Base.setMyData({
          orderlist: orderlist
        });
      });
      this.Base.setMyData({
        show: 5
      })
    }
  }

  todetail(e) {
    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo',
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindqh = content.bindqh;
body.todetail = content.todetail;
Page(body)