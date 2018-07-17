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
  }
  onMyShow() {
    var that = this;
    var instapi=new InstApi();
    instapi.indexbanner({},(indexbanner)=>{
      var topbanner = [];
      var bottombanner = [];
      var mlbanner=null;
      var mrtbanner = null;
      var mrbbanner = null;
      for(var i=0;i<indexbanner.length;i++){
        if(indexbanner[i].position=="top"){
          topbanner.push(indexbanner[i]);
        } else if (indexbanner[i].position == "middleleft") {
          mlbanner = indexbanner[i];
        } else if (indexbanner[i].position == "middlerighttop") {
          mrtbanner = indexbanner[i];
        } else if (indexbanner[i].position == "middlerightbot") {
          mrbbanner = indexbanner[i];
        } else if (indexbanner[i].position == "bottom") {
          bottombanner.push(indexbanner[i]);
        }
      }
      that.Base.setMyData({ topbanner, mlbanner, mrtbanner, mrbbanner, bottombanner });
    }); 

    var goodsapi=new GoodsApi();
    goodsapi.catlist({inhome:"Y"},(catlist)=>{
      that.Base.setMyData({ catlist: catlist });
    });
    goodsapi.recommgoodscat({}, (recommgoodscat) => {
      that.Base.setMyData({ recommgoodscat: recommgoodscat });
    });
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)