// pages/content/content.js
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
  GoodsApi
} from "../../apis/goods.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    if (this.Base.options.type == undefined) {
      this.Base.setMyData({
        jiage: 1,
        xiaoliang: 1,
        xinpin: 1,
        shunxu: 0,
        shop: 1,
        cat: this.Base.options.type
      });
    } else {
      this.Base.setMyData({
        jiage: 1,
        xiaoliang: 1,
        xinpin: 1,
        shop: 1,
        shunxu: this.Base.options.type,

      });
    }


    console.log(this.Base.options.type + "删掉了反馈")
  }
  onMyShow() {
    var that = this;
    var catlist = this.Base.getMyData().catlist;
    var goodsapi = new GoodsApi();
    var fenlei = this.Base.options.type;
    // console.log(fenlei + "的考卷返回")
    if (fenlei == undefined) {
      // console.log("啦啦啦啦啦");
      console.log(fenlei);
      goodsapi.catlist({}, (catlist) => {
        console.log(catlist)
        this.Base.setMyData({
          catlist: catlist
        });
      })
    } else {
      goodsapi.catlist({
        cat_id: fenlei
      }, (catlist) => {
        console.log(catlist)
        this.Base.setMyData({
          catlist: catlist
        });
      })
    }


    goodsapi.classifylist({}, (classifylist) => {
      console.log(classifylist)
      this.Base.setMyData({
        classifylist: classifylist
      });
    })
  }

  bindjiage(e) {
    // var name = e.currentTarget.dataset.name;
    var jiage = this.Base.getMyData().jiage;
    var id = e.currentTarget.id;
    if (jiage == 1) {
      var goodsapi = new GoodsApi();
      // goodsapi.catlist({
      //   cat: id,
      //   orderby: "r_main.pricestr"
      // }, (catlist) => {
      //   console.log(catlist)
      //   this.Base.setMyData({
      //     catlist: catlist
      //   });
      // })
      this.Base.setMyData({
        jiage: 2,
        xiaoliang: 1,
        xinpin: 1,
        moren: 1
      })
    }
    if (jiage == 2) {
      var goodsapi = new GoodsApi();
      goodsapi.catlist({
        orderby: "r_main.pricestr desc"
      }, (catlist) => {
        console.log(catlist)
        this.Base.setMyData({
          catlist: catlist
        });
      })
      this.Base.setMyData({
        jiage: 3,
        xiaoliang: 1,
        xinpin: 1,
        moren: 1
      })
    }
    if (jiage == 3) {
      var goodsapi = new GoodsApi();

      goodsapi.catlist({
        orderby: "r_main.pricestr "
      }, (catlist) => {
        console.log(catlist)
        this.Base.setMyData({
          catlist: catlist
        });
      })
      this.Base.setMyData({
        jiage: 2,
        xiaoliang: 1,
        xinpin: 1,
        moren: 1
      })
    }
  }

  bindxiaoliang(e) {
    // var name = e.currentTarget.dataset.name;
    var xiaoliang = this.Base.getMyData().xiaoliang;
    if (xiaoliang == 1) {
      this.Base.setMyData({
        xiaoliang: 2,
        jiage: 1,
        xinpin: 1,
        moren: 1
      })
    }
    if (xiaoliang == 2) {
      this.Base.setMyData({
        xiaoliang: 3,
        jiage: 1,
        xinpin: 1,
        moren: 1
      })
    }
    if (xiaoliang == 3) {
      var goodsapi = new GoodsApi();
      goodsapi.catlist({
        orderby: "r_main.pricestr desc"
      }, (catlist) => {
        console.log(catlist)
        this.Base.setMyData({
          catlist: catlist
        });
      })
      this.Base.setMyData({
        xiaoliang: 2,
        jiage: 1,
        xinpin: 1,
        moren: 1
      })
    }
  }

  bindxinpin(e) {
    // var name = e.currentTarget.dataset.name;
    var xinpin = this.Base.getMyData().xinpin;
    if (xinpin == 1) {
      var goodsapi = new GoodsApi();
      goodsapi.catlist({
        orderby: "r_main.created_date"
      }, (catlist) => {
        console.log(catlist)
        this.Base.setMyData({
          catlist: catlist
        });
      })
      this.Base.setMyData({
        xinpin: 2,
        jiage: 1,
        xiaoliang: 1,
        moren: 1
      })
    }
    if (xinpin == 2) {
      var goodsapi = new GoodsApi();
      goodsapi.catlist({
        orderby: "r_main.created_date"
      }, (catlist) => {
        console.log(catlist)
        this.Base.setMyData({
          catlist: catlist
        });
      })
      this.Base.setMyData({
        xinpin: 3,
        jiage: 1,
        xiaoliang: 1,
        moren: 1
      })
    }
    if (xinpin == 3) {
      var goodsapi = new GoodsApi();
      goodsapi.catlist({
        orderby: "r_main.created_date desc"
      }, (catlist) => {
        console.log(catlist)
        this.Base.setMyData({
          catlist: catlist
        });
      })
      this.Base.setMyData({
        xinpin: 2,
        jiage: 1,
        xiaoliang: 1,
        moren: 1
      })
    }
  }

  bindmoren(e) {
    var goodsapi = new GoodsApi;
    goodsapi.catlist({}, (catlist) => {
      console.log(catlist)
      this.Base.setMyData({
        catlist: catlist,
        xinpin: 1,
        jiage: 1,
        xiaoliang: 1,
        moren: 0
      });
    })
  }

  catclick(e) {
    var that = this;
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.id;
    // var idx = e.currentTarget.dataset.idx; 
    var goodsapi = new GoodsApi;
    if (name == 'all') {
      goodsapi.catlist({}, (catlist) => {
        console.log(catlist)
        this.Base.setMyData({
          catlist: catlist,
          shunxu: 0
        });
      })
    } else {
      goodsapi.catlist({
        cat_id: id
      }, (catlist) => {
        console.log(catlist)
        this.Base.setMyData({
          catlist: catlist
        });
      })
    }

    this.Base.setMyData({
      shunxu: id
    })


  }

  todetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/goodsdetail/goodsdetail?id=' + id,
    })
  }

  bindimg(e) {
    var shop = this.Base.getMyData().shop;
    if (shop == 1) {
      this.Base.setMyData({
        shop: 2
      })
    }
    if (shop == 2) {
      this.Base.setMyData({
        shop: 1
      })
    }
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.catclick = content.catclick;
body.bindjiage = content.bindjiage;
body.bindxiaoliang = content.bindxiaoliang;
body.bindxinpin = content.bindxinpin;
body.catclick = content.catclick;
body.bindmoren = content.bindmoren;
body.bindimg = content.bindimg;
body.todetails = content.todetails;
Page(body)