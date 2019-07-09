/**
 * Created by Administrator on 2016/11/24.
 */
app.controller('labelList',
    ["$scope","adminSet","modelService","$timeout","$state","$location","$localStorage",
        function( $scope,adminSet,modelService,$timeout,$state,$location,$localStorage) {
            var vm = $scope.vm = {};
            $scope.search = {
                labelType:''
            };
            /**
             * 清空搜索
             */
            vm.cancelSearch = function(){
               
                $scope.search.labelType = ''
            };
            // 分页信息
            $scope.options = {
                url:'/rebutLabel/findAll',
                data:$scope.search,
                method:'get'
            };
            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };
            vm.types=[
                {key: '全部', value: ''},
                {key: '平台认证', value: 0},
                {key: '车辆认证', value: 1},
                {key: '司机认证', value: 2}
            ];
            vm.createPath = function(){
                $localStorage.editLabel={};
                $state.go('app.adminSet.createLabel');
            };
            /**
             * 处理
             */
            vm.handle = function(data){
                $state.go('app.adminSet.createLabel');
                $localStorage.editLabel = data;
            };
            var deleteId;
            vm.deleteLabel=function(id){
                deleteId=id;
                modelService.Confirm('','是否删除标签？',vm.deleteFunc);
            };
            vm.deleteFunc = function(){
                adminSet.deleteLabel(deleteId).success(function(data){
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
            vm.deleteIds=[];
            var updateSelected = function(action,id){
                if(action == 'add' && vm.deleteIds.indexOf(id) == -1){
                    vm.deleteIds.push(id);
                }
                //indexOf==-1表示字符串没有出现
                if(action == 'remove' && vm.deleteIds.indexOf(id)!=-1){
                    var idx = vm.deleteIds.indexOf(id);
                    vm.deleteIds.splice(idx,1);
                }
            };

            vm.updateSelection = function($event, id){
                var checkbox = $event.target;
                var action = (checkbox.checked?'add':'remove');
                updateSelected(action,id);
            };

            vm.isSelected = function(id){
                return vm.deleteIds.indexOf(id)>=0;
            };
            vm.checkAllState=false;
            vm.checkAllFunc = function () {
                vm.checkAllState = !vm.checkAllState;
                var nodes=$(".chooseFlag");
                var ids=[];
                var one;
                if(vm.checkAllState){
                    nodes.each(function () {
                        one=$(this).attr("id");
                        ids.push(one);
                    });
                }else{
                   ids=[];
                }

                vm.deleteIds=ids;
            };
            vm.deleteData={
                labelIds:[]
            };
            vm.batchDelete = function(){
                vm.deleteData.labelIds = vm.deleteIds.join(",");
                adminSet.batchDeleteLabel( vm.deleteData).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '批量删除成功!', true, 1000);
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