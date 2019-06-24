// eg:
import payServer from '/service/control/pay';
let payParams = {
	data: {
		appId: 'xxx',
		timeStamp: 'zzz',
		package: 'asdf'
	},
	sign: 'xxxxx'
};
payParams.wxPaySucc = this.paySuccess;
payParams.wxPayFail = this.payFail;
payParams.wxPayCancel = this.payCancel;
payParams.aliPaySucc = this.paySuccess;
payParams.aliPayFail = this.payFail;
payParams.aliPayCancel = this.payCancel;
payServer.pay(payParams);

// path: /service/control/pay.js
export default class Pay {
  static pay (params) {
    if (params.payType === 'WEIXIN') {
      let wx = window.wx
      Pay.wxPay(wx, params)
    } else {
      let AlipayJSBridge = window.AlipayJSBridge
      Pay.aliPay(AlipayJSBridge, params)
    }
  }
  static wxPay (wx, params) {
    wx.config({
      debug: false,
      appId: params.data.appId,
      timestamp: params.data.timeStamp,
      nonceStr: params.data.nonceStr,
      signature: params.sign,
      jsApiList: ['chooseWXPay']
    })
    wx.ready(function () {
      wx.chooseWXPay({
        timestamp: params.data.timeStamp,
        nonceStr: params.data.nonceStr,
        package: params.data.package,
        signType: params.data.signType,
        paySign: params.data.paySign,
        success: function (res) {
          params.wxPaySucc(params.orderNo)
        },
        fail: function (res) {
          params.wxPayFail(params.orderNo)
        },
        cancel: function (res) {
          params.wxPayCancel()
        }
      })
    })
  }
  static aliPay (AlipayJSBridge, params) {
    if (!params || !params.data) {
      return
    }
    AlipayJSBridge.call('tradePay', {
      tradeNO: params.data.tradeNO
    }, function (result) {
      if (result.resultCode === '6001') {
        params.aliPayCancel()
      } else if (result.resultCode === '9000') {
        params.aliPaySucc(params.orderNo)
      } else {
        params.aliPayFail(params.orderNo)
      }
    })
  }
}
