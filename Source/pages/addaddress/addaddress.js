// pages/addaddress/addaddress.js

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
    this.Base.setMyData({
      isdefault: false
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '添加收货地址',
    })
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
  }

  bindname(e) {
    console.log(e)
    this.Base.setMyData({
      name: e.detail.value
    });
  }

  bindmobile(e) {
    console.log(e)
    this.Base.setMyData({
      mobile: e.detail.value
    });
  }

  bindaddress(e) {
    console.log(e)
    this.Base.setMyData({
      address: e.detail.value
    });
  }

  bindRegionChange(e) {
    console.log(e)
    this.Base.setMyData({
      city: e.detail.value
    })
  }

  bindswitch(e) {
    console.log(e)
    this.Base.setMyData({
      isdefault: e.detail.value
    })
  }

  baocun(e) {
    var that = this;
    var data = this.Base.getMyData();
    var name = this.Base.getMyData().name;
    var mobile = this.Base.getMyData().mobile;
    var area = this.Base.getMyData().city;
    var address = this.Base.getMyData().address;
    var isdefault = this.Base.getMyData().isdefault;

    if (data.name == undefined) {
      this.Base.info("请输入收货人姓名");
      return;
    }
    if (data.mobile == undefined) {
      this.Base.info("请输入手机号码");
      return;
    }
    if (data.city == undefined) {
      this.Base.info("请选择所在地区");
      return;
    }
    if (data.address == undefined) {
      this.Base.info("请输入详细地址");
      return;
    }


    var addressapi = new AddressApi();
    addressapi.addaddress({
      member_id: "25",
      name: name,
      mobile: mobile,
      area: area,
      address: address,
      isdefault: isdefault,
      status: "A"
    }, (addaddress) => {
      console.log(addaddress);
      wx.showModal({
        title: '确认保存吗？',
        content: '',
        success: function(res) {
          if (res.confirm) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })

    });
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindRegionChange = content.bindRegionChange;
body.bindname = content.bindname;
body.bindmobile = content.bindmobile;
body.baocun = content.baocun;
body.bindswitch = content.bindswitch;
body.bindaddress = content.bindaddress;
Page(body)