angular.module('insurance').controller("insuranceCtrl",["$scope","$http","base","$state","loading","$q","$timeout",function(s,$http,base,$state,loading,$q,$timeout){
    s.data={};
    s.$watch("phoneImage",function(d){
        if(!d){
            return;
        }else{            
            s.filename=d.file.name;
            s.data.phoneImage=d.base64;
        }
    });
    function valid(){
        var f=s.insurance;
        if(f.$invalid){
            alert("输入有误。");
            return false;
        }
        return true;
    }
    s.clickHandle=function(){
        if(!valid()){
            return;
        }        
        loading.push($http.post(base+"mvc/safeguard/addSafeguard",s.data).success(function(d){
            if(d.code!=200){
                alert(d.msg);
            }else{
                alert("投保成功");
                $state.go("info",{
                    searchParam:d.data.safeguardID
                });
            }            
        }));
    }
}]);