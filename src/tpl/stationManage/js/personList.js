/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('personList',
    ["$scope","station","modelService","$timeout","$state",'validateService',
        function( $scope,station,modelService,$timeout,$state,validateService) {
            var vm = $scope.vm = {};
            $scope.search = {};
            vm.status=[
                {key: '全部', value: ''},
                {key: '正常', value: 'ACTIVE'},
                {key: '锁定', value: 'LOCKED'},
                {key: '冻结', value: 'FREEZE'}
            ];
            $scope.search.status='';
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
                url:'/stationUser/find',
                data:$scope.search,
                method:'post'
            };
            //禁用账户
            var freezeId;
            vm.freezeFunc = function (id) {
                freezeId=id;
                modelService.Confirm('','是否禁用账户?',vm.freezeSureFunc);
            };
            vm.freezeSureFunc = function () {
                station.freezeUser(freezeId).success(function(data){
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
                modelService.Confirm('','是否启用账户?',vm.enableSureFunc);
            };
            vm.enableSureFunc = function () {
                station.enableUser(enableId).success(function(data){
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
            var validateForm = [
                {type: 'input', elem: '#pwd', emptyTips: '请输入密码'},
                {type: 'input', elem: '#repwd', emptyTips: '请再次输入密码', errorTips: '两次输入密码不一致', eqValue: '#pwd'}
            ];
            validateService.blurValidate(validateForm);
            vm.resetFunc = function () {
                var validate = validateService.submitValidate(validateForm);
                if (!validate) {
                    return;
                }
                var data={id:resetId,password:vm.password};
                //console.log(data)
                station.resetPassword(resetId,data).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '重置密码成功!', true, 1000);
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

        }
    ])