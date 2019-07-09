/**
 * Created by Administrator on 2017/3/13.
 */
app.controller('addDefaultFeeEdit',
    ["$scope","asset","commonService","$localStorage","adminSet","region","$timeout","modelService","$state","CONSTANTS","$stateParams",
        function( $scope,asset,commonService,$localStorage,adminSet,region,$timeout,modelService,$state,CONSTANTS,$stateParams) {
            var vm = $scope.vm = {};

            var ruleId = $stateParams.id;
            vm.id =$stateParams.id;
            vm.makeFeeTypeOnes=[
                {name:'按比例',type:1},
                {name:'固定费用',type:2}
            ];
            // vm.makeFeeTypeThree = 0;
            vm.makeFeeTypeTwos=[
                {name:'先收满',type:1},
                {name:'按比例收',type:2}
            ];

            vm.changePlatformType = function (type) {
                if(type == 1){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                        data.platformServiceType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFee = '';
                        vm.makeFeeTypeOne = '';
                        vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFeeRate = '';
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                        data.platformServiceType = 2;
                        data.platformServiceRate = '';
                    })


                }

            }

            vm.changeplatformInsuranceType = function (type) {
                if(type == 1){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                        data.platformInsuranceType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixInsuranceFee = '';
                        vm.makeFeeTypeTwo = '';
                        vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixInsuranceFeeRate = '';
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                        data.platformInsuranceType = 2;
                        data.platformInsuranceRate = '';
                    })


                }

            };

            vm.isManOne = function (type) {
                if(type == 1){
                    vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFeeRate = 100;
                }
            };
            vm.isManTwo = function (type) {
                if(type == 1){
                    vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixInsuranceFeeRate = 100;
                }
            }

            /*
             * 点击下一步执行的函数
             * */
            vm.newRuleCreateBtn= {
                text: '保存',
                disabled: false,
                newRuleCreate: function(){

                        angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                            data.platformFixServiceFee = vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFee;
                            data.platformFixServiceFeeRate = vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFeeRate;
                            data.platformFixInsuranceFee = vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixInsuranceFee;
                            data.platformFixInsuranceFeeRate = vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixInsuranceFeeRate;
                        });
                    asset.editDefaultFeeRateConfig(vm.id,vm.FeeRuleMessage).success(function (data) {
                        if (data.resultCode == '0') {
                            modelService.Alarm('success', '保存成功!', true, 1000);
                            $timeout(function () {
                                $state.go('app.assetManage.feeManage');
                            }, 1500);
                        } else {
                            modelService.Alarm('info', data.resultMsg, true, 1000);
                        }
                    })
                }
            };

            vm.goHistory = function () {
                $state.go('app.assetManage.feeManage')
            };

            vm.gotoPre = function() {
                $localStorage.FeeRuleAdd = vm.FeeRuleMessage;
                console.log(vm.FeeRuleMessage);
                $state.go('app.assetManage.addNewFeeEdit',{id:vm.FeeRuleMessage.id});
            };

            var nameIndex= [
                'CITY_BUS',
                'AIRPORT_BUS',
                'TRAIN_STATION_BUS',
                'SCENIC_BUS',
                'SCHOOL_BUS',
                'WORK_BUS',
                'LINE_BUS',
                'CUSTOM_BUS',
                'CAR_HAILING',
                'TAXI',
                'CAR_RENTAL',
                'STATION_BUS',
                'TOUR_BUS'
            ];
            var arr= [];

            vm.getNewTicketList = function () {
                angular.forEach(nameIndex,function (value,index) {
                    arr.push(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList[vm.returnIndexName(value)])
                })
            };

            vm.returnIndexName = function (name) {
                for(var x in vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList){
                    if(name==vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList[x].productTypeLevelOne){
                        return x
                    }
                }
                return 0;
            };

            vm.init = function () {
                vm.FeeRuleMessage = $localStorage.FeeRuleAdd;
                console.log(vm.FeeRuleMessage.id);
                asset.getCommonConfig().success(function (data) {
                    if(data.resultCode == 0){
                        // 所有返回信息

                        vm.FeeRuleMessage.detailFeeRateList[0] = data.resultData.detailFeeRateList[0];
                        vm.getNewTicketList();
                        vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList = angular.copy(arr)
                        angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function(data, index) {
                            vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFee=data.platformFixServiceFee;
                            vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFeeRate=data.platformFixServiceFeeRate;
                            vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixInsuranceFee=data.platformFixInsuranceFee;
                            vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixInsuranceFeeRate=data.platformFixInsuranceFeeRate;

                            if(!data.platformServiceType) {
                                data.platformServiceType = 1;
                            }
                            if(!data.platformInsuranceType) {
                                data.platformInsuranceType = 1;
                            }
                        })
                        // console.log(vm.FeeRuleMessage);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })

            };
            vm.init();
        }
    ])