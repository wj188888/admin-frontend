/**
 * Created by Administrator on 2016/11/15.
 */
/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('userList',
    ["$scope","userManage","modelService","$timeout","$state","validateService",
        function( $scope,userManage,modelService,$timeout,$state,validateService) {
            var vm = $scope.vm = {};
            $scope.search = {};
            // 分页信息
            $scope.options = {
                url:'/adminUser/find',
                data:$scope.search,
                method:'get'
            };

            //禁用账户
            var freezeId;
            vm.freezeFunc = function (id) {
                freezeId=id;
                modelService.Confirm('','是否禁用用户?',vm.freezeSureFunc);
            };
            vm.freezeSureFunc = function () {
                userManage.freezeUseUser(freezeId).success(function(data){
                    if(data.resultCode == 0){
                        modelService.Alarm('success', '禁用成功!', true, 1000);
                        $timeout(function(){
                            $state.reload();
                        },1000);
                    }else{
                        modelService.Alarm('success',data.resultMsg, true, 1000);
                    }
                });
            };
            //启用账户
            var enableId;
            vm.enableFunc = function (id) {
                enableId=id;
                modelService.Confirm('','是否启用用户?',vm.enableSureFunc);
            };
            vm.enableSureFunc = function () {
                userManage.freezeUseUser(enableId).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '启用成功!', true, 1000);
                        $timeout(function(){
                            $state.reload();
                        },1000);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            };

            var dialog,resetId;
            vm.resetPass = function (id) {
                //template, className, autoClose, callback, scope
                resetId=id;
                dialog= modelService.Dialog('tpl/modal/resetPass.html','reset-dialog-content',true,'',$scope);
            };
            vm.resetFunc = function () {
                var validateForm = [
                    {type: 'input', elem: '#pwd', emptyTips: '请输入密码'},
                    {type: 'input', elem: '#repwd', emptyTips: '请再次输入密码', errorTips: '两次输入密码不一致', eqValue: '#pwd'}
                ];
                validateService.blurValidate(validateForm);
                var validate = validateService.submitValidate(validateForm);
                if (!validate) {
                    return;
                }
                var data={id:resetId,newPassword:vm.password};
                //console.log(data)
                userManage.resetPassword(resetId,data).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '重置密码成功!', true, 1000);
                        $timeout(function(){
                            $state.reload();
                        },1000);
                        modelService.close(dialog);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                        modelService.close(dialog);
                    }
                });
            };
            vm.closeDialog = function () {
                modelService.close(dialog);
            };

        }
    ])