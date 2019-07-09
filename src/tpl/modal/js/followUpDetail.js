app.controller('followUpDetail', ['$scope','version','modelService','$modalInstance','validateService', 'fieldParam',
    function($scope,version,modelService,$modalInstance,validateService,fieldParam) {
        var vm = $scope.vm = {};
        vm.shelves = fieldParam.status + '';
        //关闭弹框
        vm.cancleFunc = function() {
            $modalInstance.close();
        };

        //确认并关闭
        vm.confirmFunc = function () {
            fieldParam.status =  vm.shelves;
            version.followingAppReleaseInfo({id:fieldParam.id,status:fieldParam.status}).success(function(data){
                if(data.resultCode == 0){
                    $modalInstance.close();
                }else{
                    modelService.Alarm('info', data.resultMsg, true, 1000);
                }
            });

        };
        vm.init = function(){

        };
        vm.init();
    }]);

