// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { GoodsApi } from "../../apis/goods.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ catlist: [] });
  }
  onMyShow() {
    var that = this;
    var catlist = this.Base.getMyData().catlist;
    if(catlist.length==0){
      var goodsapi = new GoodsApi();
      goodsapi.catlist({ needsgoods: "Y" }, (catlist) => {
        catlist[0].active="Y";
        that.Base.setMyData({ catlist: catlist });
      });
    }
  }
  
  onPullDownRefresh() {
    var that = this;
    that.Base.setMyData({ catlist: [] });
    this.onMyShow();
  }
  catclick(e){
    var that=this;
    var seq=e.currentTarget.id;
    var catlist=this.Base.getMyData().catlist;
    var scat_id=0;
    for(var i=0;i<catlist.length;i++){
      catlist[i].active=seq==i?"Y":"N";
    }
    that.Base.setMyData({ catlist, scidx: seq});
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.onPullDownRefresh = content.onPullDownRefresh;
body.catclick = content.catclick;
Page(body)