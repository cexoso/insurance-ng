angular.module('insurance').directive("number",["$q","$parse",function($q,$parse){
    return {
        restrict:'A',
        require:'ngModel',
        scope:{
            data:"=ngModel"
        },
        templateUrl:"component/number/number.html",    
        replace:true,
        link:function(scope,ele,attrs,ngModel){            
            scope.minuxClickHandle=minuxClickHandle;
            scope.plusClickHandle=plusClickHandle;            
            ele.on('change',function(e){                
                var v=parseInt(+ele.val())||attrs.default||0;
                var min=attrs.min;
                if(min){
                    if(v<min){
                        v=min;
                    }
                }
                var max=attrs.max;                    
                if(max){                        
                    if(v>max){
                        v=max;
                    }
                }
                ngModel.$setViewValue(v);
            })
            function minuxClickHandle(){
                var v=parseInt(ngModel.$viewValue)||attrs.default||0;
                v--;
                var min=attrs.min;
                if(min){
                    if(v<min){
                        v=min;
                    }
                }                
                ngModel.$setViewValue(v);                
            }
            function plusClickHandle(){
                var v=parseInt(ngModel.$viewValue)||attrs.default||0;
                v++;
                var max=attrs.max;
                if(max){
                    if(v>max){
                        v=max;
                    }
                }
                ngModel.$setViewValue(v);                
            }
            if(!ngModel.$viewValue){
                ngModel.$setViewValue(attrs.default||0);
            }
        }
    }
}]);