/**
 * Created by Administrator on 2017/1/5.
 */
app.controller('makeInvoiceList',
    ["$scope","asset","commonService","modelService","$modal","$timeout",
        function( $scope,asset,commonService,modelService,$modal,$timeout) {
            var vm = $scope.vm = {};
            vm.showDialog = false;
            $scope.search = {};
            $scope.search.status = '';
            $scope.search.taxType = '';
            $scope.search.platformType = '';
            // 清空搜索条件
            $scope.cancelSearch = function () {
                $scope.search = {};
                $scope.search.status = '';
                $scope.search.taxType = '';
                $scope.search.platformType = '';
            };
           // delete $scope.search.taxType;
            //delete $scope.search.platformType;
            // 执行查询
            $scope.searchFunction = function () {
                $scope.options.refresh($scope.search);
            };
            // 分页信息
            $scope.options = {
                url: '/invoiceRecord/findMakeInvoiceRecord',
                data: $scope.search,
                method: 'get'
            };
            <!--状态1待审核2已驳回3待开票4已邮寄5已完成-->
            vm.status = [
                {key: '全部', value: ''},
                {key: '待审核', value: 1},
                {key: '已驳回', value: 2},
                {key: '待开票', value: 3},
                {key: '已邮寄', value: 4},
                {key: '已完成', value: 5}
            ];
            vm.ticketType = [
                {key: '全部', value: ''},
                {key: '增值税普通发票', value: 0},
                {key: '增值税专用发票', value: 1}
            ];
            vm.platType = [
                {key: '全部', value: ''},
                {key: '企业', value: 0},
                {key: '个人', value: 1}
            ];

            vm.openDialog = function (dataId) {
                var textModal = $modal.open({
                    templateUrl: 'tpl/modal/ticketDetail.html',
                    controller: 'ticketDetail',
                    size:'lg',
                    resolve: {
                        fieldParam: function () {
                            return dataId;
                        }
                    }
                });

               // vm.showDialog = true;
                textModal.result.then(function(infoData){
                    if(!infoData) {
                        return;
                    }
                    asset.editTicketRecord(dataId,infoData).success(function (data) {
                        if (data.resultCode == 0) {
                            $timeout(function(){
                                modelService.Alarm('success', '操作成功!', true, 1000);
                            },500);
                            $scope.options.refresh($scope.search);
                        }else{
                            modelService.Alarm('info', data.resultMsg ,true, 1000);
                        }
                    })
                });
            }
        }
    ]);
