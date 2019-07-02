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
      isdefault: "N",
      name: this.Base.options.name,
      id: this.Base.options.id,
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
    var name = this.Base.options.name;
    var member_id = this.Base.getMyData().memberinfo.id;
    var id = this.Base.options.id;
    var addressapi = new AddressApi();
    if (name == "bianji") {
      addressapi.addressinfo({
        member_id: member_id,
        id: id
      }, (addressinfo) => {
        console.log(addressinfo);
        that.Base.setMyData({
          addressinfo: addressinfo
        });
      })
    }
  }

  bindname(e) {
    // console.log(e)
    this.Base.setMyData({
      name: e.detail.value
    });
  }

  bindmobile(e) {
    // console.log(e)
    this.Base.setMyData({
      mobile: e.detail.value
    });
  }

  bindaddress(e) {
    // console.log(e)
    this.Base.setMyData({
      address: e.detail.value
    });
  }

  bindRegionChange(e) {
    // console.log(e)
    this.Base.setMyData({
      city: e.detail.value
    })
  }

  bindswitch(e) {
    // console.log(e)
    var isdefault = this.Base.getMyData().isdefault;
    if (isdefault == "N")
      this.Base.setMyData({
        isdefault: "Y"
      })
    if (isdefault == "Y")
      this.Base.setMyData({
        isdefault: "N"
      })

  }

  baocun(e) {
    var that = this;
    var data = this.Base.getMyData();
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
    console.log(data);

    var member_id = this.Base.getMyData().memberinfo.id;

    wx.showModal({
      title: '确认保存吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          var addressapi = new AddressApi();
          addressapi.addaddress({
            member_id: member_id,
            name: data.name,
            mobile: data.mobile,
            area: data.city,
            address: data.address,
            isdefault: data.isdefault,
            status: "A"
          }, (addaddress) => {
            console.log(addaddress);
          });
          // wx.showToast({
          //   title: '保存成功',
          //   icon: 'success',
          //   duration: 1000
          // })
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  }

  addressdelete(e) {
    var id = this.Base.options.id;
    wx.showModal({
      title: '确认删除吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          var addressapi = new AddressApi();
          addressapi.addressdel({
            idlist: id
          }, (addressdel) => {
            console.log(addressdel);
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000
          })
          wx.navigateBack({
            delta: 1,
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
body.bindRegionChange = content.bindRegionChange;
body.bindname = content.bindname;
body.bindmobile = content.bindmobile;
body.baocun = content.baocun;
body.bindswitch = content.bindswitch;
body.bindaddress = content.bindaddress;
body.addressdelete = content.addressdelete;
Page(body)