angular.module('services').service("order",["$http","base","$q","$cacheFactory",function($http,base,$q,$cacheFactory){
    var lru=$cacheFactory('lru',{
        capacity:20
    });    
    function get(p){
        return $http.get(base+"mvc/safeguard/querySafeguard",{
            cache:lru,
            params:p
        });        
    }
    var o={
        get:get,
        lru:lru
    };
    return o;
}]);