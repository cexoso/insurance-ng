angular.module('insurance').controller("alterCtrl",["$scope","$http","base","$state",function(s,$http,base,$state){
    s.user={};
    s.clickHandle=function(u){        
        s.alter.$setUntouched();
        $http.post(base+"mvc/safeguard/modifySafeguardUser",{
            oldpassword:u.oldpassword,
            userCode:u.userCode,
            newpassword:u.newpassword
        }).success(function(d){
            if(d.code!=200){
                alert(d.msg);
            }else{
                alert("修改成功.\n请使用新密码登录.");
                $state.go("index");
            }
        });
    }
}]);