angular.module('insurance').service("loading",['$q',function($q){
    var div=angular.element(document.createElement("div"));
    var container=angular.element(document.createElement("div"));
    container.addClass("loading_container");
    container.append(div);
    div.addClass("_loading");
    var Str="LOADING";
    var len=Str.length;
    for(var i=0;i<len;i++){
        var tmp=angular.element(document.createElement("div"));
        tmp.text(Str[len-i-1]);        
        div.append(tmp);
    }
    var body=angular.element(document.getElementsByTagName("body")[0]);
    body.append(container);
    var arr=[];
    function push(promise){        
        arr.push(promise);
        check();
        promise.finally(function(){
            done(promise);            
        });
    }
    function done(promise){
        var i=arr.indexOf(promise);
        if(i>-1){
            arr.splice(i,1);
            check();
        }
    }
    var check=(function(){
            var start_time=null,end_time=null;
            var t=null;
            var min_time=250;
            return function(){
                if(arr.length>0&&!container.hasClass('active')){
                    start_time=Date.now();
                    container.addClass('active');
                }else if(arr.length==0&&container.hasClass('active')){
                    var delte=Date.now()-start_time;
                    t&&clearTimeout(t);
                    setTimeout(function(){
                        container.removeClass('active');
                    }, min_time-delte);                    
                }
            }    
    })();
    
    var obj={
        push:push
    };

    return obj;
}]);