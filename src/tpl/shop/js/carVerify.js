/**
 * Created by Administrator on 2016/10/12.
 */
app.controller('carVerify',
    ["$scope","shop","modelService","$localStorage","$location",
        function( $scope,  shop,  modelService,  $localStorage,$location) {
            var vm = $scope.vm = {};
            $scope.search = {};
            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {};
            };

            $scope.licensePlatProvinces = ['川', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '京', '宁', '琼'];


            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };

            // 查看详情
            $scope.view = function(item){
                $location.path("/app/asset/ticketView").search({amount:item.amount,type:item.type,recipients:item.recipients,phone:item.phone,address:item.address});
            };

            /**
             *执行查询
             */
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };

            // 分页信息
            $scope.options = {
                url:'/car/find',
                data:$scope.search,
                method: 'post'
            };
            vm.uppercase = function() {
                $scope.search.licensePlat = angular.uppercase($scope.search.licensePlat);
            };

            /**
             * 处理
             */

            $scope.handle = function(item){
                $location.path("/app/shop/carVerifyHandle").search({id:item.id});
            };

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
        }
    ]);