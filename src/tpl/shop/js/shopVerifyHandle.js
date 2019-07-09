/**
 * 店铺认证-处理
 * @author liaohao
 * @date   2016-10-12 10:05:56
 */

app.controller('shopVerifyHandle',
    ["$scope","modelService","$localStorage","$location","shop","$timeout",'validateService',
        function( $scope,  modelService,  $localStorage ,$location,shop,$timeout,validateService) {
            var vm = $scope.vm = {};
            $scope.id = $location.search().id;
            shop.findStoreById({id:$scope.id}).success(function(data){
                $scope.page = data.resultData;
            });
            //查询驳回理由标签
            vm.findRejectLabels = function () {
                shop.findLabels({
                    type:0
                }).success(function(data){
                    if (data.resultCode == 0) {
                        vm.labelLists = data.resultData;
                    }
                })
            };
            //填充驳回理由
            vm.fillEvent = function(content){
                vm.qualificationFailReason=content;
            };
            /**
             *  驳回
             */
            var dialog;
            vm.rejectApply = function(){
                vm.findRejectLabels();
                dialog= modelService.Dialog('tpl/modal/rejectReason.html','reset-dialog-content',true,'',$scope);
            };
            /**
             * flag 1 审核通过 2 驳回
             * String id, adminStatus adminMessage
             */
            vm.rejectFunc = function () {
                var validateForm = [
                    {type: 'input', elem: '#reason', emptyTips: '请输入驳回理由'}
                ];
                validateService.blurValidate(validateForm);
                var validate = validateService.submitValidate(validateForm);
                if (!validate) {
                    return;
                }
                shop.findStoreChangeStatus({
                    id:$scope.page.id,
                    qualification:5,
                    qualificationFailReason:vm.qualificationFailReason
                }).success(function(data){
                    if (data.resultCode == 0) {
                        modelService.Alarm('success', '操作成功!', true, 1000);
                        modelService.close(dialog);
                        $timeout(function(){
                            $location.path("/app/shop/shopVerify");
                        },1000);
                    }else{
                        modelService.close(dialog);
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })
            };
            vm.closeDialog = function () {
                modelService.close(dialog);
            };
            vm.passApply = function(){
                shop.findStoreChangeStatus({
                    id:$scope.page.id,
                    qualification:2
                }).success(function(data){
                    if (data.resultCode == 0) {
                        modelService.Alarm('success', '操作成功!', true, 1000);
                        $timeout(function(){
                            $location.path("/app/shop/shopVerify");
                        },1000);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })

            };

        }]);