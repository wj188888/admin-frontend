/**
 * 车辆认证-处理
 * @author liaohao
 * @date   2016-10-12 10:05:56
 */

app.controller('driverVerifyHandle',
    ["$scope","shop","modelService","$localStorage","$location",'$timeout','validateService', 'commonService', '$state',
        function( $scope,shop,modelService,$localStorage,$location,$timeout,validateService, commonService, $state) {
            var vm = $scope.vm = {};
            vm.driverData = null;
            vm.roles = {
                TAXI: false,
                CARHAILING: false,
                GENERAL: true
            };
            vm.driverRoleEnum = 'GENERAL';
            function returnType(type) {
                if(type == 'GENERAL') {
                    return 'generalRole';
                }else if(type == 'TAXI') {
                    return 'taxiRole';
                }else if(type == 'CARHAILING') {
                    return 'chRole';
                }
            }
            vm.setRoleEnum = function(data) {
                vm.roles = {
                    TAXI: false,
                    CARHAILING: false,
                    GENERAL: false
                }
                vm.roles[data] = true;
                vm.driverRoleEnum = data;
            }
            vm.handleCategory = function(type) {
                var temp = vm.roles[type]
                vm.roles = {
                    TAXI: false,
                    CARHAILING: false,
                    GENERAL: false
                }
                vm.roles[type] = !temp;
                vm.driverRoleEnum = type;
                var thisType = returnType(type);
                vm.showSuspension = vm.Driver[thisType].subQualification;
            }
            $scope.id = $location.search().id;
            vm.getDriver = function() {
                vm.showSuspension = 0;
                shop.findDriverById({id:$scope.id}).success(function(data){
                    if(data.resultCode == '0') {
                        vm.driverData = data.resultData;
                        vm.Driver = data.resultData;
                        if(data.resultData) {
                            if(!data.resultData.tempDriver) {
                                vm.Driver = data.resultData;
                            } else {
                                vm.Driver = commonService.copyNotNullDriver(data.resultData, data.resultData.tempDriver)
                            }
                        }
                        var i = 0;
                        angular.forEach(vm.roles, function(value, key) {
                            var thisType = returnType(key);
                            if(vm.Driver[thisType]) {
                                if(vm.Driver[thisType].subQualification == 6) {
                                    vm.setRoleEnum(key);
                                    vm.showSuspension = 6;
                                    i++;
                                }
                                if(i == 0) {
                                    vm.setRoleEnum(key);
                                }
                            }
                        })
                        if(data.resultData.qualification == 0) {
                            $scope.page = data.resultData;
                        }
                    }
                });
            }
            vm.getDriver();
            //查询驳回理由标签
            vm.findRejectLabels = function () {
                shop.findLabels({
                    type:2
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
            vm.rejectFunc = function () {
                var validateForm = [
                    {type: 'input', elem: '#reason', emptyTips: '请输入驳回理由'}
                ];
                validateService.blurValidate(validateForm);
                var validate = validateService.submitValidate(validateForm);
                if (!validate) {
                    return;
                }
                shop.findDriverChangeStatus({
                    id:$scope.id,
                    qualification:2,
                    qualificationFailReason:vm.qualificationFailReason,
                    driverRoleEnum:vm.driverRoleEnum
                }).success(function(data){
                    if (data.resultCode == 0) {
                        modelService.Alarm('success', '操作成功!', true, 1000);
                        modelService.close(dialog);
                        // $timeout(function(){
                        //     $location.path("/app/shop/driverVerify");
                        // },1000);
                        vm.getDriver();
                    }else{
                        modelService.close(dialog);
                        modelService.Alarm('info', '操作失败!', true, 1000);
                    }
                })
            };
            vm.closeDialog = function () {
                modelService.close(dialog);
            };
            vm.passApply = function(){
                angular.forEach()
                shop.findDriverChangeStatus({
                    id:$scope.id,
                    qualification:1,
                    driverRoleEnum:vm.driverRoleEnum
                }).success(function(data){
                    if (data.resultCode == 0) {
                        modelService.Alarm('success', '操作成功!', true, 1000);
                        // $timeout(function(){
                        //     $location.path("/app/shop/driverVerify");
                        // },1000);
                        vm.getDriver();
                    }else{
                        modelService.Alarm('info', '操作失败!', true, 1000);
                    }
                })

            };
            // 图片放大
            $scope.imgShow = false;
            vm.img_show = function(img) {
                $scope.imgShow = true;
                $scope.img = img;
            }
            /**
             * flag 1 审核通过 2 驳回
             * String id, adminStatus adminMessage
             */
            /*$scope.confirm = function(flag){
                $scope.name = "审核通过"
                ;                if(flag == 2){
                    $scope.name = "驳回";
                }
                shop.findDriverChangeStatus({
                        id:$scope.page.id,
                        adminStatus:flag,
                        adminMessage:$scope.adminMessage
                    }
                ).success(function(data){
                    if (data.resultCode == 0) {
                        modelService.Alarm('success', '操作成功!', true, 1000);
                        $timeout(function(){
                            $location.path("/app/shop/driverVerify");
                        },1000);
                    }else{
                        modelService.Alarm('info', '操作失败!', true, 1000);
                    }
                })

            };*/

        }]);