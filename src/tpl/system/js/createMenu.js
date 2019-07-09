app.controller('createMenu',
    ["$scope","menu","modelService","$stateParams","validateService","$state","$timeout",
        function( $scope,menu,modelService,$stateParams,validateService,$state,$timeout) {
            var vm = $scope.vm = {};
            vm.menuData = {
            };
            vm.showPass=true;
            var menuId = $stateParams.id;
            var menuPId = $stateParams.fatherId;
            if(menuPId){
                vm.menuData.fatherId = menuPId;
            }
            if(menuId){
                //如果id存在，则查询菜单详情，进行编辑
                vm.showPass=false;
                menu.findMenuDetail(menuId).success(function(data){
                    if(data.resultCode == 0){
                        vm.menuData = data.resultData;
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            }
            var validateForm = [
                {type: 'input', elem: '#menu_name', emptyTips: '请输入菜单名'},
                {type: 'input', elem: '#menu_path', emptyTips: '请输入菜单路径'},
                {type: 'input', elem: '#order', emptyTips: '请输入菜单顺序'}
            ];
            validateService.blurValidate(validateForm);
            // 创建
            vm.createMenuSave = function(){
                var resource,_validateForm;
                if(menuId){
                    _validateForm=validateForm.slice(0,1);
                    var cValidate = validateService.submitValidate(_validateForm);
                    if (!cValidate) {
                        return;
                    }
                    resource=menu.editMenu(menuId,vm.menuData);
                }else{
                    _validateForm=validateForm;
                    var validate = validateService.submitValidate(_validateForm);
                    if (!validate) {
                        return;
                    }
                    resource=menu.createMenu(vm.menuData);
                }
                resource.success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', data.resultMsg, true, 1000);
                        $timeout(function(){
                            $state.go('app.system.menuList');
                        },1500);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })

            };
            vm.goHistory = function () {
                window.history.back(-1);
            };
        }
    ]);
