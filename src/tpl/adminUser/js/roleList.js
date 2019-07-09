/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('roleList',
    ["$scope","userManage","modelService","$timeout","$state",
        function( $scope,userManage,modelService,$timeout,$state) {
            var vm = $scope.vm = {};
            $scope.search = {};
            // 分页信息
            $scope.options = {
                url:'/role/find',
                data:$scope.search,
                method:'get'
            };
            var deleteId;
            vm.deleteRole=function(id){
                deleteId=id;
                modelService.Confirm('','是否删除角色？',vm.deleteFunc);
            };
            vm.deleteFunc = function(){
                userManage.deleteRole(deleteId).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '删除成功!', true, 1000);
                        $timeout(function(){
                            $state.reload();
                        },1000);
                    }else if(data.resultCode == '29'){
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                        $timeout(function(){
                            $state.go('app.system.roleDetail',{id:deleteId});
                        },1500);

                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            };
        }
    ])