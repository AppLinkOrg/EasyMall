
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { MemberApi } from "../../apis/member.api";

class Signup extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    options.doctor_id = 1;
    super.onLoad(options);
    this.Base.setMyData({
      isAgree: true,
      name: "",
      mobile: "",
      verifycode: "",
      showTopTips: "",
      reminderResend: 0
    });
    this.Base.needauth=true;
  }
  nameChange(e){
    this.Base.setMyData({ name: e.detail.value });
  }
  agreeChange(e) {
    this.setData({ isAgree: !this.Base.getMyData().isAgree });
  }
  verifycodeChange(e) {
    this.Base.setMyData({ verifycode: e.detail.value });
  }
  mobileChange(e) {
    this.Base.setMyData({ mobile: e.detail.value });
  }
  sendVerifycode(){
    var mobile = "";
    var data=this.Base.getMyData();
    try {
      mobile = parseInt(data.mobile).toString();
    } catch (e) {

    }
    if (mobile[0] != "1" || mobile.length.toString() != "11") {
      this.Base.info("手机号码不正确，请重新输入");
      return;
    }
    var that = this;
    var memberApi = new MemberApi();
    memberApi.sendregverifycode({ mobile: mobile },
      function (data) {
        that.Base.setMyData({ reminderResend: 60 });
        var interval = setInterval(function () {
          var reminderResend = that.data.reminderResend;
          reminderResend--;
          that.Base.setMyData({ reminderResend: reminderResend });
          if (reminderResend == 0) {
            clearInterval(interval);
          }
        }, 1000);
      });
  }
  submitRegister() {
    var data = this.Base.getMyData();
    if (data.name.trim() == "") {
      this.Base.info("请输入真实姓名" );
      return;
    }
    var mobile = "";
    try {
      mobile = parseInt(data.mobile).toString();
    } catch (e) {

    }
    if (mobile[0] != "1" || mobile.length.toString() != "11") {
      this.Base.info("请输入正确的手机号码" );
      return;
    }
    if (data.verifycode.trim() == "") {
      this.Base.info("验证码不能为空" );
      return;
    }
    var that = this;
    var memberApi = new MemberApi();
    memberApi.register({
      mobile: mobile,
      verifycode: data.verifycode,
      name: data.name
    }, function (data) {
      if (data.code == -501) {
        that.Base.error("验证码不正确" );
      } else if (data.code == - 403) {
        that.Base.error("请输入正确的手机号码");
      } else if (data.code == - 404) {
        that.Base.error("不能获取微信用户信息，请关闭程序后重试");
      } else if (data.code == 1) {
        that.Base.info("您已注册，系统将直接返回");
        AppBase.MemberInfo = data.return;
        wx.navigateBack();
      } else if (data.code == 0) {
        that.Base.info("注册成功，系统将直接返回");
        AppBase.MemberInfo = data.return;
        wx.navigateBack();
      } else {
        that.Base.error("未知错误，请联系管理员" );
      }
    });
  }
}
var signup = new Signup(); 
var body = signup.generateBodyJson();
body.onLoad = signup.onLoad;
body.nameChange = signup.nameChange; 
body.agreeChange = signup.agreeChange;
body.mobileChange = signup.mobileChange; 
body.verifycodeChange = signup.verifycodeChange; 
body.sendVerifycode = signup.sendVerifycode;
body.submitRegister = signup.submitRegister;
Page(body)
