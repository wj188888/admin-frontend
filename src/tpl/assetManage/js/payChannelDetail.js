/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('payChannelDetail',
    ["$scope","$stateParams","validateService","$localStorage","asset","commonService","modelService","$timeout","$state",
        function( $scope,$stateParams,validateService,$localStorage,asset,commonService,modelService,$timeout,$state) {
            var vm = $scope.vm = {};
            $scope.search = {};
            vm.status=[
                {key: '连接官方', value: 0},
                {key: '企业自身', value: 1},
            ];
            vm.id = $stateParams.id;
            $scope.search.payType=null;
            $scope.search.type = '1';
            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {};
                $scope.search.type = '1';
            };

            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };

            // 分页信息
            $scope.options = {
                url:'/payAccountStatistic/find',
                data:$scope.search,
                method:'get'
            };

            // 查询支付渠道详情通过id
            vm.payChannelDetail = function () {
                asset.payChannelDetailById(vm.id).success(function (data) {
                    if (data.resultCode == 0) {
                        vm.channelData = data.resultData;
                    } else {
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            }

           /*
           *付款确认
           * */
            /*var dialog,resetId;
            vm.paySure = function (id,date) {
                vm.date = date;
                resetId=id;
                dialog= modelService.Dialog('tpl/modal/paySure.html','reset-dialog-content',true,'',$scope);
            };*/

           /* var validateForm = [
                {type: 'input', elem: '#amount', emptyTips: '请输入金额', regTips: '您输入的支付金额格式不正确', regName: 'number'}
            ];*/
            // validateService.blurValidate(validateForm);
            vm.paySureFunc = function () {
                var data={id:resetId,amount:vm.amount};
                if (vm.amount == null || vm.amount.length == 0) {
                    modelService.Alarm('info', '请输入金额', true, 1000);
                    return;
                }
                asset.payChannelConfirmById(resetId,data).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '支付成功!', true, 1000);
                        $timeout(function(){
                            $state.reload();
                        },1000);
                        modelService.close(dialog);
                    }else{
                        modelService.Alarm('info', data.msg, true, 1000);
                        modelService.close(dialog);
                    }
                });
            };
            vm.closeDialog = function () {
                modelService.close(dialog);
            };
            vm.payChannelDetail()
        },

    ]);
