app.controller('bankApply',
    ["$scope","shop","commonService","modelService","$timeout","$state","validateService",
        function( $scope,shop,commonService,modelService,$timeout,$state,validateService) {
            var vm = $scope.vm = {};
            $scope.search = {};
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
                url:'/storeVerify/findBankCard',
                data:$scope.search,
                method:'get'
            };

            //处理
            var dealId,dialog;
            vm.dealBankCard = function (id) {
                dealId=id;
                dialog= modelService.Dialog('tpl/modal/bankVerifyDialog.html','reset-dialog-content',true,'',$scope);
            };
            var validateForm = [
                {type: 'input', elem: '#money', emptyTips: '请输入打款金额'}
            ];
            validateService.blurValidate(validateForm);
            var commitData={};
            vm.handleMoney = function () {
                var validate = validateService.submitValidate(validateForm);
                if (!validate) {
                    return;
                }
                commitData.id=dealId;
                commitData.money=vm.modalMoney;
                shop.handleBankApply(commitData).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '成功!', true, 1000);
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
