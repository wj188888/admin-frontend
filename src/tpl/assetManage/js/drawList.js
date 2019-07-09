/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('drawList',
    ["$scope","asset","commonService","modelService","$timeout","$state",
        function( $scope,asset,commonService,modelService,$timeout,$state) {
            var vm = $scope.vm = {};
            $scope.search = {};
            vm.status=[
                {key: '全部', value: ''},
                {key: '成功', value: 1},
                {key: '交易中', value: 2},
                {key: '失败', value: 3},
                {key: '待处理', value: 4}
            ];
            $scope.search.status=4;
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
                url:'/withdrawal/find',
                data:$scope.search,
                method:'get'
            };

            //处理
            var dealId,dialog;
            vm.dealDraw = function (id,money) {
                dealId=id;
                vm.transferMoney=money;
                dialog= modelService.Dialog('tpl/modal/drawDialog.html','reset-dialog-content',true,'',$scope);
            };
            var commitData={};
            vm.haveTransfer = function () {
                commitData.id=dealId;
                commitData.status=1;
                asset.dealDrawOrder(commitData).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', data.resultData, true, 1000);
                        modelService.close(dialog);
                        $timeout(function(){
                            $state.reload();
                        },1000);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            };
            vm.closeDialog = function () {
                modelService.close(dialog);
            };

        }
    ]);
