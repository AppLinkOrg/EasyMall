import {
  ApiConfig
} from 'apiconfig';
export class AddressApi {
  //传参数，获取我的名字，请注意这个范例
  addaddress(json, callback, showLoading = true) {

    if (showLoading)
      ApiConfig.ShowLoading();

    var header = ApiConfig.GetHeader();
    console.log(header);
    wx.request({
      url: ApiConfig.GetApiUrl() + 'address/addaddress',
      data: json,
      method: 'POST',
      dataType: 'json',
      header: header,
      success: function(res) {
        if (callback != null) {
          callback(res.data);
        }
      },
      fail: function(res) {
        console.log(res);
        callback(false);
      },
      complete: function(res) {
        console.log(res);

        if (showLoading)
          ApiConfig.CloseLoading();
      }
    })
  }

  addresslist(json, callback, showLoading = true) {

    if (showLoading)
      ApiConfig.ShowLoading();

    var header = ApiConfig.GetHeader();
    console.log(header);
    wx.request({
      url: ApiConfig.GetApiUrl() + 'address/addresslist',
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