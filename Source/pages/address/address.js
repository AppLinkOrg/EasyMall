// pages/address/address.js
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
  AddressApi
} from "../../apis/address.api.js";

var WxParse = require('../../wxParse/wxParse');

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=1;
    super.onLoad(options);
    this.Base.setPageTitle("");
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var member_id = this.Base.getMyData().memberinfo.id;
    var addressapi = new AddressApi();
    addressapi.addresslist({
      member_id: member_id
    }, (addresslist) => {
      console.log(addresslist);
      that.Base.setMyData({
        addresslist: addresslist
      });
    })
  }

  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '收货地址',
    })
  }

  address(e) {
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    console.log(name);
    console.log(id);
    // return;
    wx.navigateTo({
      url: '/pages/addaddress/addaddress?name=' + name+"&&id="+id,
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.address = content.address;

Page(body)