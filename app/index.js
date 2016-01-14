'use strict';
window.local=true;
angular.module('insurance', [
  'ui.router',
  'controller',
  'directive',
  'services',
  'oc.lazyLoad',
]).config(['$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('index');
    $stateProvider.state('index',{
        url:'/index',
        templateUrl:"router/index/index.html",
        resolve:{
            depend:['$ocLazyLoad',function($oclazyload){
                var login=['pages/login/login.js','pages/login/login.css','modules/user.js'];
                var search=['pages/search/search.js','pages/search/search.css','model/order.js','component/loading/loading.js','component/loading/loading.css'];
                return $oclazyload.load(Array.prototype.concat.call(login,search));
            }]
        }
    }).state('insurance',{
        url:'/insurance',
        templateUrl:"router/insurance/insurance.html",
        resolve:{
            depend:['$ocLazyLoad',function($oclazyload){
                var insurance=['router/insurance/insurance.js','router/insurance/insurance.css','modules/user.js','component/img2base64.js','component/loading/loading.js','component/loading/loading.css'];
                var number=['component/number/number.html','component/number/number.js','component/number/number.css'];
                return $oclazyload.load(Array.prototype.concat.call(insurance,number));
            }]
        }
    }).state('info',{
        url:'/info?searchParam',
        templateUrl:"router/info/info.html",
        resolve:{
            depend:['$ocLazyLoad',function($oclazyload){
                var info=['router/info/info.js','router/info/info.css','model/order.js','component/wx.js','component/loading/loading.js','component/loading/loading.css'];
                return $oclazyload.load(Array.prototype.concat.call(info));
            }]
        }
    }).state('alter',{
        url:'/alter',
        templateUrl:"router/alter/alter.html",
        resolve:{
            depend:['$ocLazyLoad',function($oclazyload){
                var alter=['router/alter/alter.js','router/alter/alter.css','component/same.js'];
                return $oclazyload.load(Array.prototype.concat.call(alter));
            }]
        }
    });
}]);

angular.module('controller', []);
angular.module('directive', []);
angular.module('services', []);
if(local){
  angular.module('services').constant("base","http://192.168.0.145:8080/Patica2.0/");
}else{
  angular.module('services').constant("base","/Patica2.0/");
}
