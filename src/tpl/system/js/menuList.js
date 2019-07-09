/**
 * Created by Administrator on 2016/12/14.
 */
app.controller('menuList',
    ["$scope","menu","modelService","$timeout","$state","validateService",
        function( $scope,menu,modelService,$timeout,$state,validateService) {
            var vm = $scope.vm = {};
            $scope.search = {};
            // 分页信息
            $scope.options = {
                url:'/menu/find',
                data:$scope.search,
                method:'get'
            };
            var deleteId;
            vm.deleteMenu=function(id){
                deleteId=id;
                modelService.Confirm('','是否删除菜单？',vm.deleteFunc);
            };
            vm.deleteFunc = function(){
                menu.deleteMenu(deleteId).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '删除成功!', true, 1000);
                        $timeout(function(){
                            $state.reload();
                        },1000);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            };
        }
    ])