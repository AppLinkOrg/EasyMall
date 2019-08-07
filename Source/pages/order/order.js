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
import {
  WechatApi
} from "../../apis/wechat.api.js";
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

    }, (orderlist) => {
      console.log(orderlist)
      var dfk = [];
      var dfh = [];
      var dsh = [];
      var dpj = [];

      orderlist.map((item) => {
        if (item.status == 'A') {
          dfk.push(item);
        }
        if (item.status == 'B') {
          dfh.push(item);
        }
        if (item.status == 'C') {
          dsh.push(item);
        }
        if (item.status == 'E') {
          dpj.push(item);
        }



      })


      this.Base.setMyData({
        orderlist: orderlist, dfk, dfh, dsh, dpj
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


  deleteorder(e) {
    var that = this;
    var orderapi = new OrderApi();
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      confirmText: "确认",
      success: function (qqq) {
        
       if( qqq.confirm){
        orderapi.delteorder({ id: e.currentTarget.id }, (res) => {

          that.onMyShow();


        })
       }







      }
    })
  }
  payorder(e) {
    var wechatapi = new WechatApi();
    wx.showModal({
      title: '提示',
      content: '是否确认购买',
      confirmText: "确认",
      success: function (qqq) {



        if (qqq.confirm) {
        wechatapi.prepay({ id: e.currentTarget.id }, (payret) => {
          payret.complete = function (e) {
            console.log(e);
            console.log("嚯嚯嚯嚯嚯嚯");

            if (e.errMsg == "requestPayment:ok") {

              wx.reLaunch({
                url: '/pages/orderinfo/orderinfo'
              })
            }
            else {


              console.log("支付失败");

            }

          }



          console.log(payret);
          wx.requestPayment(payret)

        })

        }



      }
    })
  }
  orderinfo(e) {
    wx.navigateTo({
      url: '/pages/orderinfo/orderinfo?id=' + e.currentTarget.id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindqh = content.bindqh;
body.todetail = content.todetail;
body.deleteorder = content.deleteorder;
body.payorder = content.payorder;
body.orderinfo = content.orderinfo;
Page(body)