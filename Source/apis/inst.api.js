
        /****使用方法，下面两句复制到page的js文件的头部
		
import { ApiConfig } from '../../apis/apiconfig';
import { InstApi } from '../../apis/inst.api';

var instApi=new InstApi();
        *******/
import { ApiConfig } from 'apiconfig';
export class InstApi
{
			//获取机构的基础信息
				info(json, callback, showLoading = true) {

					if (showLoading)
					ApiConfig.ShowLoading();
    
					var header=ApiConfig.GetHeader();
					console.log(header);
					wx.request({
					  url: ApiConfig.GetApiUrl() + 'inst/info',
					  data: json,
					  method: 'POST',
					  dataType: 'json',
					  header: header,
					  success: function (res) {
						if (callback != null) {
						  callback(res.data);
						}
					  },
					  fail: function (res) {
						console.log(res);
						callback(false);
					  },
					  complete: function (res) {
						console.log(res);

						if (showLoading)
						ApiConfig.CloseLoading();
					  }
					})
				  }
                

        //获取机构的基础信息
        indexbanner(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/indexbanner',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }

        //获取机构的基础信息
        aboutus(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/aboutus',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }


        //获取机构的基础信息
        aboutuslist(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/aboutuslist',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }

        //获取机构的基础信息
        newslist(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/newslist',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }

        //获取机构的基础信息
        newscat(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/newscat',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }

        //获取机构的基础信息
        news(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/news',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }


        //获取机构的基础信息
        servicelist(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/servicelist',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }

        //获取机构的基础信息
        service(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/service',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }
        //获取机构的基础信息
        productcatlist(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/productcatlist',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }
        //获取机构的基础信息
        productlist(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/productlist',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }
        //获取机构的基础信息
        product(json, callback, showLoading = true) {

          if (showLoading)
            ApiConfig.ShowLoading();

          var header = ApiConfig.GetHeader();
          console.log(header);
          wx.request({
            url: ApiConfig.GetApiUrl() + 'inst/product',
            data: json,
            method: 'POST',
            dataType: 'json',
            header: header,
            success: function (res) {
              if (callback != null) {
                callback(res.data);
              }
            },
            fail: function (res) {
              console.log(res);
              callback(false);
            },
            complete: function (res) {
              console.log(res);

              if (showLoading)
                ApiConfig.CloseLoading();
            }
          })
        }
}

