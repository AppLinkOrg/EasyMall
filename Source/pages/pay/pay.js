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
  this.Base.setMyData({liuyan:''})

  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '我的订单',
    })
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var orderapi = new OrderApi();
    orderapi.getgwclist({
      status: 'c'
    }, (getgwclist) => {
      var totalPrice = 0;
      getgwclist.map((item) => {
        totalPrice += item.pricestr * item.num;

      })


      this.Base.setMyData({
        getgwclist: getgwclist, totalPrice: totalPrice
      });
    });
    var member_id = this.Base.getMyData().memberinfo.id;
    var addressapi = new AddressApi();
    var select = this.options.select;
    addressapi.addresslist({
      member_id: member_id,
      select: true
    }, (addresslist) => {
      console.log(addresslist);
      that.Base.setMyData({
        addresslist: addresslist
      });
    })

  }
  liuyan(e){

    console.log(e);
    this.Base.setMyData({
 
    liuyan:e.detail.value

    })

  }
  payorder() {
    var that = this;
    var orderapi = new OrderApi();
    var wechatapi = new WechatApi();
    wx.showModal({
      title: '提示',
      content: '是否确认购买',
      confirmText: "确认",
      success: function (qqq) {
        if (qqq.confirm) {
          orderapi.createorder({ amount: that.Base.getMyData().totalPrice, address_id: that.Base.getMyData().addresslist[0].id,liuyan:that.Base.getMyData().liuyan },
            (res) => {
              console.log("牛逼了");
              console.log(res);
              if (res.code == '0') {
                wechatapi.prepay({ id: res.return }, (payret) => {
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
body.liuyan = content.liuyan;
Page(body)