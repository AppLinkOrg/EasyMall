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
       
       for(var i=0;i<getgwclist.length;i++)
       {
          if(getgwclist[i].selected=='false')
          {
         
            getgwclist[i].selected=false;
          }
          else{

            getgwclist[i].selected = true;;
          }

       }
      

      this.Base.setMyData({
        getgwclist: getgwclist
      });
      this.getTotalPrice();
    });
  }

  todetails(e) {
    var name = e.currentTarget.dataset.name;
    if (name == "guang") {
      wx.switchTab({
        url: '/pages/goodscat/goodscat',
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

    var orderapi = new OrderApi();
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

    var data = {
      member_id: this.Base.getMyData().memberinfo.id,
      goods_id: carts[index].goods_id,
      pricestr: carts[index].pricestr,
      img: carts[index].img,
      color_id: carts[index].color_id,
      size_id: carts[index].size_id,
      num: 0,
      status: "C",
      selected: carts[index].selected==true?'Y':'N',
    }


    orderapi.gouwuche(data, (res) => {
      console.log(res);
    }, false)


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

    var orderapi = new OrderApi(); 
    orderapi.allxuan({all:selectAllStatus==true?'Y':'N'},(res)=>{

      console.log(res);

    })
      
    console.log(selectAllStatus);




  }

  // 增加数量
  addCount(e) {
    var orderapi=new OrderApi();
    var index = e.currentTarget.dataset.index;
    var carts = this.Base.getMyData().getgwclist;
    console.log(carts);
    var num = carts[index].num;
    carts[index].num++;
    this.Base.setMyData({
      getgwclist: carts,
    });
    this.getTotalPrice();

    var data = {
      member_id: this.Base.getMyData().memberinfo.id,
      goods_id: carts[index].goods_id,
      pricestr: carts[index].pricestr,
      img: carts[index].img,
      color_id: carts[index].color_id,
      size_id: carts[index].size_id,
      num: 1,
      status: "C",
      selected: carts[index].selected == true ? 'Y' : 'N',
    }


    orderapi.gouwuche(data, (res) => {
      console.log(res);
    },false)


  }

  // 减少数量
  minusCount(e) {
    var orderapi = new OrderApi();
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
      var data = {
        member_id: this.Base.getMyData().memberinfo.id,
        goods_id: carts[index].goods_id,
        pricestr: carts[index].pricestr,
        img: carts[index].img,
        color_id: carts[index].color_id,
        size_id: carts[index].size_id,
        num: -1,
        status: "C",
        selected: carts[index].selected == true ? 'Y' : 'N',
      }


      orderapi.gouwuche(data, (res) => {
        console.log(res);
      },false)
    }
  }

  jiesuan(e) {
   
   
    // return;
    wx.navigateTo({
      url: '/pages/pay/pay',
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