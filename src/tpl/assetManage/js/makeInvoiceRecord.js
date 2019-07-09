/**
 * Created by Administrator on 2017/1/5.
 */
app.controller('makeInvoiceRecord',
    ["$scope","asset","commonService","modelService","$timeout","$state",
        function( $scope,asset,commonService,modelService,$timeout,$state) {
            var vm = $scope.vm = {};
            $scope.search = {};
            $scope.search.status='';
            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {};
                $scope.search.status='';
            };
            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };

            // 分页信息
            $scope.options = {
                url:'/invoiceRecord/findMakeInvoiceRecord',
                data:$scope.search,
                method:'get'
            };
            <!--状态1待审核2已驳回3待开票4已邮寄5已完成-->
            vm.status=[
                {key: '全部', value: ''},
                {key: '待审核', value: 1},
                {key: '已驳回', value: 2},
                {key: '待开票', value: 3},
                {key: '已邮寄', value: 4},
                {key: '已完成', value: 5}
            ];


        }
    ]);
