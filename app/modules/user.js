angular.module('services').service("user",["$filter",function($filter){
    var user=JSON.parse(localStorage.getItem("user_author"))||{};
    function set(n){
        user.author=true;
        user.u=n;
        _save();
    }
    function get(){
        return user;
    }
    function isAuthor(){
        return user.author;
    }
    function _save(){
        var json=$filter("json");
        localStorage.setItem("user_author",json(user));
    }
    return{
        set:set,
        get:get,
        isAuthor:isAuthor
    }
}]);