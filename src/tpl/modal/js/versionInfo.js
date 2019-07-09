/**
 * 查看版本历史
 */
app.controller('versionInfo', ['$scope','$state','version','commonService','modelService','$modalInstance','validateService', 'fieldParam',
    function($scope,$state,version,commonService,modelService,$modalInstance,validateService,fieldParam) {
        var vm = $scope.vm = {};
        //关闭
        vm.cancleFunc = function () {
            $modalInstance.close();
        };
        //确认并关闭
        vm.confirmFunc = function (id) {
            vm.id = id;
            modelService.Confirm('','确定删除该历史版本记录？',vm.changeChannelSure);
        };
        vm.changeChannelSure = function () {
            version.deleteAppVersionHis(vm.id).success(function (data) {
                if (data.resultCode == 0) {
                    $modalInstance.close();
                    commonService.showTips({
                        msg:'删除成功！'
                    });
                    $state.reload();
                }else{
                    commonService.showTips({
                        cssClass:'alert-fail',
                        msg: data.resultMsg
                    });
                }
            });
        };
        //更新开关
        vm.choiceSet = function (data) {
        };
        vm.init = function(){
            vm.id = fieldParam.id;
            version.appVersionHisInfo(vm.id).success(function (data) {
                if (data.resultCode == 0) {
                    vm.versionHisList = data.resultData;
                }else{
                    commonService.showTips({
                        cssClass:'alert-fail',
                        msg: data.resultMsg
                    });
                }
            })
        };
        vm.init();
    }]);


