/**
 * Created by Administrator on 2016/11/15.
 */
app.controller('createRole',
    ["$scope", "userManage", "commonService", "modelService", "validateService", "$state", "$timeout","$stateParams",
        function ($scope, userManage, commonService, modelService, validateService, $state, $timeout,$stateParams) {
            var vm = $scope.vm = {};
            vm.Role = {};
            vm.text = '创建';
            $scope.ztreeConfig = {
                addResource: userManage.findMenu(),
                editResource:'',
                menuList:[]
            };

            var roleId = $stateParams.id;
            if(roleId){
                vm.text = '编辑';
                $scope.ztreeConfig.editResource = userManage.findRoleDetail(roleId)
                $scope.ztreeConfig.editResource.success(function (data) {
                    if (data.resultCode == '0') {
                        vm.Role.roleName = data.resultData.roleName;
                        $scope.ztreeConfig.menuList = data.resultData.menuId;
                    } else {
                        modelService.Alarm('info', data.resultMsg);
                    }
                })
            }


            vm.goHistory = function () {
                window.history.back(-1);
            };

            vm.hideMenuError = true;
            var validateForm = [
                {type: 'input', elem: '#roleName', emptyTips: '请填写角色名称'}
            ];
            validateService.blurValidate(validateForm);

            vm.createRole = function(){
                var validate = validateService.submitValidate(validateForm);
                if (!validate) {
                    return;
                }
                if($scope.ztreeConfig.menuList.length == 0){
                    vm.hideMenuError = false;
                    return;
                }
                vm.Role.menuId = $scope.ztreeConfig.menuList;
                var resource=userManage.createRole(vm.Role);
                if(roleId){
                    vm.Role.id=roleId;
                    resource=userManage.editRole(roleId,vm.Role);
                }
                resource.success(function (data) {
                    if (data.resultCode == '0') {
                        modelService.Alarm('success', '角色保存成功!');
                        $timeout(function () {
                            $state.reload();
                        }, 1500);
                    } else {
                        modelService.Alarm('info', data.resultMsg);
                    }
                })
            };
            /*vm.init = function () {
                vm.findRoles();
            };

            vm.init();*/
        }
    ])
