/**
 * Created by Administrator on 2017/9/19.
 */
app.controller('imprint', ['$scope','asset','modelService','$modalInstance','validateService', 'fieldParam',
    function($scope,asset,modelService,$modalInstance,validateService,fieldParam) {
        var vm = $scope.vm = {};

        //确认并关闭
        vm.confirmFunc = function () {
            $modalInstance.close();
        };
        vm.init = function(){
            vm.imprintList = fieldParam;
        };
        vm.init();
    }]);

