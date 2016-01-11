angular.module('services').service("wx", ["$http", "base", "$q","$filter","$timeout",
function($http, base, $q,$filter,$timeout) {
  var json=$filter("json");
    function pay(data) {
        var defer=$q.defer();
        var to=$timeout(function(){
            defer.reject("timeout");
        },3000);        
        function onBridgeReady() {
            $http.get(base + "mvc/safeguard/safeguardPay", {
                params: data
            }).success(function(d) {
                $timeout.cancel(to);
                if (d.code != 200) {
                    alert(d.msg);
                } else {
                    d = d.data;
                    WeixinJSBridge.invoke('getBrandWCPayRequest', {
                        "appId": d.appid,
                        "timeStamp": d.timeStamp,
                        "nonceStr": d.nonce_str,
                        "package": "prepay_id=" + d.prepay_id,
                        "signType": "MD5",
                        "paySign": d.sign
                    },
                    function(res) {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            alert("支付成功");
                            defer.resolve(data);                            
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            alert("支付失败\n" + json(res));
                            defer.reject(data);                            
                        } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                            alert("支付失败\n" + json(res));
                            defer.reject(data);                            
                        }
                    });
                }
            });
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
        return defer.promise;
    }
    var wx = {
        pay: pay
    }
    return wx;
}]);