/**
 * Created by Administrator on 2016/11/25.
 */
app.controller('roleDetail',
    ["$scope","userManage","modelService","$timeout","$state","$stateParams",
        function( $scope,userManage,modelService,$timeout,$state,$stateParams) {
            var vm = $scope.vm = {};
            var id = $stateParams.id;
            vm.getRoleDetail = function(){
                userManage.roleDetail(id).success(function(data){
                    if(data.resultCode == '0'){
                       vm.userList=data.resultData;
                    }
                });
            };
            vm.forceDeleteFunc = function () {
                modelService.Confirm('','是否确认一键解除关联并删除角色？',vm.forceConfirmFunc);
            };
            vm.forceConfirmFunc = function(){
                userManage.forceDeleteRole(id).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', data.resultMsg, true);
                        $timeout(function(){
                            $state.go('app.system.roleList');
                        },1500);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })
            };
            vm.init = function () {
                vm.getRoleDetail();
            };
            vm.init();
        }
    ]);
