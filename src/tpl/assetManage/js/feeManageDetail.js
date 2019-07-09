/**
 * Created by Administrator on 2017/3/13.
 */
app.controller('feeManageDetail',
    ["$scope","asset","commonService","$localStorage","adminSet","region","$timeout","modelService","$state","CONSTANTS","$stateParams",
        function( $scope,asset,commonService,$localStorage,adminSet,region,$timeout,modelService,$state,CONSTANTS,$stateParams) {
            var vm = $scope.vm = {};

            var ruleId = $stateParams.id;
            vm.id =$stateParams.id;
            vm.productTypes=angular.copy(commonService.product.enumeration).slice(1);

            vm.makeFeeTypeOnes=[
                {name:'按比例',type:1},
                {name:'固定费用',type:2}
            ];

            vm.makeFeeTypeTwos=[
                {name:'先收满',type:0},
                {name:'按比例收',type:1}
            ];


            /*
            * 点击放大图片
            * */
            vm.bigImg = false;
            vm.bigImgBack = false;
            vm.showBigImg = function() {
                vm.bigImg = true;
            };
            vm.hideBigImg = function() {
                vm.bigImg = false;
            };
            vm.showBigImgBack = function() {
                vm.bigImgBack= true;
            };
            vm.hideBigImgBack = function() {
                vm.bigImgBack = false;
            };

            vm.changePlatformType = function (type, ruleIndex) {
                if(type == 1){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformServiceType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixServiceFee = '';
                        data.platformFixServiceFeeType = '';
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixServiceFeeRate = '';
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformServiceType = 2;
                        data.platformServiceRate = '';
                    })


                }

            }

            vm.changeplatformInsuranceType = function (type, ruleIndex) {
                if(type == 1){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformInsuranceType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixInsuranceFee = '';
                        data.platformFixInsuranceFeeType = '';
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixInsuranceFeeRate = '';
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformInsuranceType = 2;
                        data.platformInsuranceRate = '';
                    })


                }

            };


            vm.isManOne = function (type,ruleIndex) {
                if(type == 0){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformFixServiceFeeType = 0;
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixServiceFeeRate = 100;
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformFixServiceFeeType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixServiceFeeRate = '';
                    })
                }
            };
            vm.isManTwo = function (type,ruleIndex) {
                if(type == 0){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformFixInsuranceFeeType = 0;
                        // vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixInsuranceFeeRate = 100;
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[ruleIndex].productFeeRateList,function (data,index) {
                        data.platformFixInsuranceFeeType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixInsuranceFeeRate = '';
                    })
                }
            }


            vm.goHistory = function () {
                $state.go('app.assetManage.feeManage')
            };

            vm.copyData = [];

            vm.init = function () {
                asset.feeRateConfigById(vm.id).success(function (data) {
                    if(data.resultCode == 0){
                        // 所有返回信息
                        vm.FeeRuleMessage =  data.resultData;
                        vm.FeeRuleMessage.detailFeeRateList[0] = data.resultData.detailFeeRateList[0];
                        angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function(data, index) {
                            if(!data.platformServiceType) {
                                data.platformServiceType = 1;
                            }
                            if(!data.platformInsuranceType) {
                                data.platformInsuranceType = 1;
                            }
                        })
                        console.log(vm.FeeRuleMessage);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });

                vm.FeeRuleMessage = $localStorage.FeeRuleAdd;

               /* asset.findAllStore().success(function(data){
                    if(data.resultCode == '0'){
                        var shops = data.resultData;
                        for(var x in shops){
                            if(vm.FeeRuleMessage.storeId == shops[x].id){
                                vm.FeeRuleMessage.storeName = shops[x].brandName;
                            }
                        }
                    }
                });*/

                $timeout(function () {
                    region.findSubRegions({id: 0}).success(function (data) {
                        if(data.resultCode == '0'){
                            var prinvices = data.resultData;
                            console.log(prinvices);
                            for(var x in prinvices){
                                if(vm.FeeRuleMessage.province == prinvices[x].id){
                                    vm.FeeRuleMessage.province = prinvices[x].alias;
                                }
                            }
                        }
                    })
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList, function(data, index) {
                        data.ruleIndex = index;
                    });
                    for(var x in vm.FeeRuleMessage.detailFeeRateList){
                        var _ruleIndex = vm.FeeRuleMessage.detailFeeRateList[x].ruleIndex;
                        angular.forEach(vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].productFeeRateList,function (data,index) {
                            vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixServiceFee = data.platformFixServiceFee;
                            vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixServiceFeeRate = data.platformFixServiceFeeRate;
                            vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixInsuranceFee = data.platformFixInsuranceFee;
                            vm.FeeRuleMessage.detailFeeRateList[_ruleIndex].fixPlatformFixInsuranceFeeRate = data.platformFixInsuranceFeeRate;
                            if(data.platformFixServiceFeeRate == 100){
                                vm.makeFeeTypeOne = 1
                            }else {
                                vm.makeFeeTypeOne = 2
                            }
                            if(data.platformFixInsuranceFeeRate == 100){
                                vm.makeFeeTypeTwo = 1
                            }else {
                                vm.makeFeeTypeTwo = 2
                            }
                        });
                    }
                },1000)

            };
            vm.init();
        }
    ])