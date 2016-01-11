angular.module('insurance').directive("imgbase",["$q",function($q){    
    function blobToBase64(blob) {
        var defer=$q.defer();
        var reader = new FileReader();
        reader.addEventListener("loadend",function (d) {
            defer.resolve(d);            
        });
        reader.readAsDataURL(blob);
        return defer.promise;
    }
    function compress(base64) {
        var defer=$q.defer();
        var img = new Image();
        function getWH(img){
            var w=img.width;
            var h=img.height;
            var r=w/h;            
            if(w>h&&w>1000){
                w=1000;
                h=w/r;
            }else if(h>w&&h>1000){
                h=1000;
                w=h*r;
            }
            return {
                h:h,
                w:w
            }
        }
        img.addEventListener("load",function () {
            var i=getWH(img);
            var width = i.w;
            var height = i.h;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fff";
            canvas.width = width;
            canvas.height = height;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
            var base = canvas.toDataURL("image/jpeg", 1.0);
            defer.resolve(base);
        });
        img.src = base64;
        return defer.promise;
    };
    function f2base(d){
        var defer=$q.defer();
        var file=d.target.files[0];
        blobToBase64(file).then(function(d){
            if(file.size>1000000){
                compress(d.target.result).then(function(d){
                    defer.resolve(d);                    
                })
            }else{
                defer.resolve(d.target.result);                
            }
        });
        return defer.promise;
    }
    return {
        restrict:'A',
        require:'ngModel',
        link:function(scope,ele,attrs,ngModel){
            function clickHandle(d){
                var file=d.target.files[0];
                f2base(d).then(function(d){
                    ngModel.$setViewValue({file:file,base64:d});
                });
            }
            ele.on('change',clickHandle);
        }
    }
}]);