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
      totalPrice: 0,
      selectAllStatus: true
    })

  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '购物车',
    })
  }

  onMyShow() {
    // wx.showToast({
    //   title: '加载中',
    //   icon: "loading",
    //   duration: 1000
    // })
    var that = this;
    var orderapi = new OrderApi();
    orderapi.getgwclist({
      status: 'c'
    }, (getgwclist) => {
      console.log(getgwclist)
      this.Base.setMyData({
        getgwclist: getgwclist
      });
      this.getTotalPrice();
    });
  }

  todetails(e) {
    var name = e.currentTarget.dataset.name;
    if (name == "guan") {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  }

  getTotalPrice(e) {
    var carts = this.Base.getMyData().getgwclist; // 获取购物车列表
    var total = 0;
    for (var i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total += carts[i].num * carts[i].pricestr; // 所有价格加起来
      }
    }
    this.Base.setMyData({ // 最后赋值到data中渲染到页面
      getgwclist: carts,
      totalPrice: total.toFixed(2)
    });
  }

  selectList(e) {
    var index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    var carts = this.Base.getMyData().getgwclist; // 获取购物车列表
    var selected = carts[index].selected; // 获取当前商品的选中状态
    console.log(selected + "的对的");
    // return;
    carts[index].selected = !selected; // 改变状态
    console.log(carts[index].selected);
    this.Base.setMyData({
      getgwclist: carts,
    });
    // if(selected.length == carts.length){
    //   console.log(selected.length);
    //   console.log(carts.length); 
    // }
    this.getTotalPrice(); // 重新获取总价
  }

  selectAll(e) {
    var selectAllStatus = this.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    var carts = this.Base.getMyData().getgwclist;
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus; // 改变所有商品状态
    }
    this.Base.setMyData({
      selectAllStatus: selectAllStatus,
      getgwclist: carts
    });
    this.getTotalPrice(); // 重新获取总价
  }

  // 增加数量
  addCount(e) {
    var index = e.currentTarget.dataset.index;
    var carts = this.Base.getMyData().getgwclist;
    var num = carts[index].num;
    carts[index].num++;
    this.Base.setMyData({
      getgwclist: carts,
    });
    this.getTotalPrice();
  }

  // 减少数量
  minusCount(e) {
    var index = e.currentTarget.dataset.index;
    var carts = this.Base.getMyData().getgwclist;
    var num = carts[index].num;
    if (num <= 1) {
      return false;
    } else {
      carts[index].num--;
      this.Base.setMyData({
        getgwclist: carts,
      });
      this.getTotalPrice();
    }
  }

  jiesuan(e) {
    var id = this.Base.getMyData().getgwclist.id;
    var fgf = this.Base.getMyData().getgwclist;
    var order_id = [];
    for (var i = 0; i < fgf.length; i++) {
      if (fgf[i].selected == true) {
        order_id.push(fgf[i])
      }
    }
    var jsonorder = JSON.stringify(order_id)

    console.log(jsonorder);
    // return;
    wx.navigateTo({
      url: '/pages/pay/pay?jsonorder=' + jsonorder,
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.todetails = content.todetails;
body.getTotalPrice = content.getTotalPrice;
body.selectList = content.selectList;
body.selectAll = content.selectAll;
body.addCount = content.addCount;
body.minusCount = content.minusCount;
body.jiesuan = content.jiesuan;
Page(body)