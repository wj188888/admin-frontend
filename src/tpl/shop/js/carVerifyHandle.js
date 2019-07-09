app.controller('carVerifyHandle',
    ["$scope","shop","modelService","$localStorage","$location",'$timeout','validateService', 'CONSTANTS', 'commonService',
        function( $scope,shop,modelService,$localStorage,$location,$timeout,validateService, CONSTANTS, commonService) {
            var vm = $scope.vm = {};
            $scope.id = $location.search().id;
            vm.carData = null;
            vm.compressImage = CONSTANTS.compressImage;
            shop.findCarById({id:$scope.id}).success(function(data){
                vm.carData = data.resultData;
                if(data.resultCode == '0') {
                    if(data.resultData) {
                        if(!data.resultData.tempCar) {
                            vm.Car = data.resultData;
                        } else {
                            vm.Car = commonService.copyNotNull(data.resultData, data.resultData.tempCar);
                        }
                    }
                    vm.category = vm.Car.category;
                }
            });
            //查询驳回理由标签
            vm.findRejectLabels = function () {
                shop.findLabels({
                    type:1
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
                shop.findCarChangeStatus({
                    id:$scope.id,
                    qualification:2,
                    qualificationFailReason:vm.qualificationFailReason
                }).success(function(data){
                    if (data.resultCode == 0) {
                        modelService.Alarm('success', '操作成功!', true, 1000);
                        modelService.close(dialog);
                        $timeout(function(){
                            $location.path("/app/shop/carVerify");
                        },1000);
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
                        shop.findCarChangeStatus({
                            id:$scope.id,
                            qualification:1
                        }).success(function(data){
                            if (data.resultCode == 0) {
                                modelService.Alarm('success', '操作成功!', true, 1000);
                                $timeout(function(){
                                    $location.path("/app/shop/carVerify");
                                },1000);
                            }else{
                                modelService.Alarm('info', '操作失败!', true, 1000);
                            }
                        })

            };
            // 图片放大
            $scope.imgShow = false;
            vm.img_show = function(img) {
                $scope.img = img;
                $scope.imgShow = true;
            }
        }]);