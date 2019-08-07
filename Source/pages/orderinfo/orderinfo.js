// pages/orderinfo/orderinfo.js


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
  AddressApi
} from "../../apis/address.api.js";
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
    var addressapi=new AddressApi();
    orderapi.orderinfo({id:this.Base.options.id},(res)=>{
         
      addressapi.addressinfo({ id: res.address_id},(addres)=>{

        this.Base.setMyData({ orderinfo: res, addres: addres})

      })
         

    


    })

  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '订单详情',
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
  payorder(e) {
    var that=this;
    var wechatapi = new WechatApi();
    wx.showModal({
      title: '提示',
      content: '是否确认购买',
      confirmText: "确认",
      success: function (qqq) {
        if (qqq.confirm) {
        wechatapi.prepay({ id: that.Base.options.id}, (payret) => {
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
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindqh = content.bindqh;
body.payorder = content.payorder;
Page(body)