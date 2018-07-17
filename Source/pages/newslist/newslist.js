// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({ currenttab: 0 });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    instapi.newscat({}, (newscat) => {
      that.Base.setMyData({ newscat: newscat });
      that.loaddata();
    });
  }

  changeCurrentTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.detail.current });
    this.loaddata();
  }
  changeTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.currentTarget.id });
    this.loaddata();
  }
  loaddata() {
    var that = this;
    var currenttab = this.Base.getMyData().currenttab;
    var newscat = this.Base.getMyData().newscat;
    var id=newscat[currenttab].id;

    var instapi = new InstApi();
    instapi.newslist({cat_id:id}, (newslist) => {
      newscat[currenttab]["newslist"] = newslist;
      that.Base.setMyData({ newscat: newscat });
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab;
body.loaddata = content.loaddata;

Page(body)