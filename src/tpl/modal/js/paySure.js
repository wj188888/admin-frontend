/**
 * Created by Administrator on 2017/1/5.
 */
app.controller('paySure', ['$scope','asset','modelService','$modalInstance','validateService', 'fieldParam',
    function($scope,asset,modelService,$modalInstance,validateService,fieldParam) {
        var vm = $scope.vm = {};
        var validateForm = [
            {type: 'input', elem: '#amount', emptyTips: '请输入联系人电话', regTips: '您输入的支付金额格式不正确', regName: 'number'}
        ];
        validateService.blurValidate(validateForm);

        vm.init = function(){
            console.log(1111111111);
        };
        vm.init();
    }]);
