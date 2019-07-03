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
      jsonorder: options.jsonorder
    })
    // var order = JSON.parse(jsonorder);
    
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
      console.log(getgwclist)
      this.Base.setMyData({
        getgwclist: getgwclist
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



}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindqh = content.bindqh;
Page(body)