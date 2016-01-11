angular.module('insurance').directive("same",["$q","$parse",function($q,$parse){
    return {
        restrict:'A',
        require:'ngModel',
        link:function(scope,ele,attrs,ngModel){            
            function h(n){
                var g=$parse(attrs.same);
                var v=g(scope);
                var g1=$parse(attrs.ngModel);
                var v1=g1(scope);
                if(!v||!v1){
                    ngModel.$setValidity('theSame',true);
                    return;
                }
                if(v!==v1){
                    ngModel.$setValidity('theSame',false);
                }else{
                    ngModel.$setValidity('theSame',true);
                }
            }
            scope.$watch(attrs.ngModel,h);
            scope.$watch(attrs.same,h);
        }
    }
}]);