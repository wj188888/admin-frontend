/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('stationList',
    ["$scope","station","commonService","modelService","$timeout","$state",
        function( $scope,station,commonService,modelService,$timeout,$state) {
            var vm = $scope.vm = {};
            $scope.search = {};
            vm.status=[
                {key: '全部', value: ''},
                {key: '正常', value: 1},
                {key: '禁用', value: 0}
            ];
            $scope.search.status='';
            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {};
            };

            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };

            // 分页信息
            $scope.options = {
                url:'/station/find',
                data:$scope.search,
                method:'post'
            };

            //禁用车站
            var freezeId;
            vm.freezeFunc = function (id) {
                freezeId=id;
                modelService.Confirm('','是否禁用车站?',vm.freezeSureFunc);
            };
            vm.freezeSureFunc = function () {
                station.freezeStationPort(freezeId).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '禁用成功!', true, 1000);
                        $timeout(function(){
                            $state.reload();
                        },1000);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            };
            //启用车站
            var enableId;
            vm.enableFunc = function (id) {
                enableId=id;
                modelService.Confirm('','是否启用车站?',vm.enableSureFunc);
            };
            vm.enableSureFunc = function () {
                station.enableStationPort(enableId).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '启用成功!', true, 1000);
                        $timeout(function(){
                            $state.reload();
                        },1000);
                    }else{
                        commonService.showTips({
                            cssClass:'alert-fail',
                            msg: data.resultMsg
                        });
                    }
                });
            };
        }
    ])