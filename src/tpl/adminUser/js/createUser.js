/**
 * Created by Administrator on 2016/11/15.
 */
app.controller('createUser',
    ["$scope","userManage","modelService","$stateParams","validateService","$state","$timeout",
        function( $scope,userManage,modelService,$stateParams,validateService,$state,$timeout) {
            var vm = $scope.vm = {};
            vm.text = '创建';
            vm.userData = {
                roleId:[],
                roleName:[]
            };
            vm.showPass=true;
            var userId = $stateParams.id;
            if(userId){
                vm.text = '编辑';
                //如果id存在，则查询车站详情，进行编辑
                vm.showPass=false;
                userManage.findUserDetail(userId).success(function(data){
                    if(data.resultCode == 0){
                        vm.userData = data.resultData;
                        if(!vm.userData.roleId){
                            vm.userData.roleId = []
                        }
                        if(!vm.userData.roleName){
                            vm.userData.roleName = []
                        }
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            }

            var validateForm = [
                {type: 'input', elem: '#username', emptyTips: '请输入用户名'},
                {type: 'input', elem: '#password', emptyTips: '请输入密码'},
                {type: 'input', elem: '#phone', emptyTips: '请输入电话号码',regTips:'您输入的电话号码不正确', regName:'tel'}
            ];
            validateService.blurValidate(validateForm);

            vm.updateSelection = function($event, id,name){
                var checkbox = $event.target;
                var indexId = vm.userData.roleId.indexOf(id);
                var indexName = vm.userData.roleName.indexOf(name);
                if(checkbox.checked){
                    if(indexId ==-1){
                         vm.userData.roleId.push(id);
                    }
                    if(indexName ==-1){
                        vm.userData.roleName.push(name);
                    } 
                }else{
                    if(indexId > -1){
                        vm.userData.roleId.splice(indexId,1);
                    }
                    if(indexName > -1){
                        vm.userData.roleName.splice(indexName,1)
                    }
                }
            };

            vm.isSelected = function(id,name){
                return (vm.userData.roleId.indexOf(id)>=0 && vm.userData.roleName.indexOf(name)>=0);
            };
            // 创建
            vm.createUserSave = function(){
                var resource,_validateForm;
                if(userId){
                    _validateForm=validateForm.slice(0,1);
                    var cValidate = validateService.submitValidate(_validateForm);
                    if (!cValidate) {
                        return;
                    }
                    resource=userManage.editUser(userId,vm.userData);
                }else{
                    var ids,names;
                    ids=vm.userData.roleId.join(",");
                    vm.userData.roleId=ids;
                    names=vm.userData.roleName.join(",");
                    vm.userData.roleName=names;
                    _validateForm=validateForm;
                    var validate = validateService.submitValidate(_validateForm);
                    if (!validate) {
                        return;
                    }
                    resource=userManage.createUser(vm.userData);
                }
                resource.success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', data.resultMsg, true, 1000);
                        $timeout(function(){
                            $state.go('app.system.userList');
                        },1500);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })

            };

            vm.goHistory = function () {
                window.history.back(-1);
            };
            vm.findRoles=function () {
                userManage.findAllRole().success(function(data){
                    if(data.resultCode == '0'){
                        vm.roleData=data.resultData;
                        

                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })
            };
            vm.init = function () {
                vm.findRoles();
            };

            vm.init();
        }
    ]);
