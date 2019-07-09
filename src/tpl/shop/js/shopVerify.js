/**
 * 店铺认证
 * @author liaohao
 * @date   2016-10-12 10:05:56
 */

app.controller('shopVerify',
    ["$scope","shop","$localStorage","modelService","$location",
        function( $scope,  shop,  $localStorage,  modelService,$location) {
            var vm = $scope.vm = {};
            $scope.search = {};
            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {};
            }

            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            }

            // 分页信息
            $scope.options = {
                url:'/store/find',
                data:$scope.search
            }

            /**
             * 处理
             */
            /*$scope.handle = function(item){
                $location.path("/app/shop/shopVerifyHandle").search({id:item.id});
                console.log(item);
            }*/

            /**
             * 确认收到发票
             */
            $scope.confirm = function(item){
                $scope.openModal({
                    modalClass:'warning-modal',
                    content:'是否确认收到发票？确认后不能修改。',
                    showOk:true,
                    okText:'确定',
                    showCancel:true,
                    cancelText:'稍后再说',
                    callBack: function(){
                        asset.confirmInovice({id:item.id}).success(function(data){
                            if (data.resultCode == 0) {
                                modelService.Alarm('success', '操作成功!', true, 1000);
                                $scope.searchFunction();
                            }else{
                                modelService.Alarm('info', '操作失败!', true, 1000);
                            }
                        })
                    }
                })
            };
            var dialog;
            vm.showDetail = function (detail) {
                vm.detailText=detail;
                dialog= modelService.Dialog('tpl/modal/rejectDetail.html','reset-dialog-content',true,'',$scope);
            };
        }]);