/**
 * Created by Administrator on 2017/3/13.
 */
app.controller('editDefaultFee',
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
            vm.changePlatformType = function (type) {
                if(type == 1){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                        data.platformServiceType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFee = '';
                        data.platformFixServiceFeeType = '';
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
                        data.platformFixInsuranceFeeType = '';
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
                if(type == 0){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                        data.platformFixServiceFeeType = 0;
                        vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFeeRate = 100;
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                        data.platformFixServiceFeeType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFeeRate = '';
                    })
                }
            };
            vm.isManTwo = function (type) {
                if(type == 0){
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                        data.platformFixInsuranceFeeType = 0;
                        // vm.FeeRuleMessage.detailFeeRateList[ruleIndex].fixPlatformFixInsuranceFeeRate = 100;
                    })

                }else{
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                        data.platformFixInsuranceFeeType = 1;
                        vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixInsuranceFeeRate = '';
                    })
                }
            }

            /*
             * 点击下一步执行的函数
             * */
            vm.newRuleCreateBtn= {
                text: '保存',
                disabled: false,
                newRuleCreate: function(){
                    console.log(vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFee);
                    console.log(vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFeeRate);
                    var validate = vm.constantFee1();
                    var validateNull =  vm.checkIsNull();
                    if(!validate) {
                        return false;
                    }
                    if(!validateNull) {
                        return false;
                    }
                    angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function (data,index) {
                        data.platformFixServiceFee = vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFee;
                        data.platformFixServiceFeeRate = vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixServiceFeeRate;
                        data.platformFixInsuranceFee = vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixInsuranceFee;
                        data.platformFixInsuranceFeeRate = vm.FeeRuleMessage.detailFeeRateList[0].fixPlatformFixInsuranceFeeRate;
                    });
                    asset.editDefaultFeeRateConfig(vm.FeeRuleMessage.id,vm.FeeRuleMessage).success(function (data) {
                        if (data.resultCode == '0') {
                            modelService.Alarm('success', '修改成功!', true, 1000);
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

            vm.constantFee1 = function() {
                for(var i in vm.FeeRuleMessage.detailFeeRateList) {
                    var data1 = vm.FeeRuleMessage.detailFeeRateList[i];
                    var nowData = data1.productFeeRateList[0];

                    if(nowData.platformInsuranceType == 2) {
                        var maxFee = vm.getMax(data1.productFeeRateList);
                        if(nowData.platformFixInsuranceFeeType == 0) {
                            for(var x in data1.productFeeRateList) {
                                data1.productFeeRateList[x].platformFixInsuranceFeeRate = 100 - maxFee;
                                data1.fixPlatformFixInsuranceFeeRate=100 - maxFee;
                            }
                        } else if (nowData.platformFixInsuranceFeeType == 1) {
                            if((data1.fixPlatformFixInsuranceFeeRate) > (100 - maxFee)) {
                                modelService.Alarm('info', '连接保险分成比例与保险公司分成比例之和必须小于等于100', true, 1000);
                                return false;
                            }
                        }
                    } else if(nowData.platformInsuranceType == 1) {
                        for(var x in data1.productFeeRateList) {
                            var data2 = data1.productFeeRateList[x];
                            // console.log(parseFloat(data2.platformInsuranceRate) + parseFloat(data2.firmInsuranceRate));
                            if((parseFloat(data2.platformInsuranceRate) + parseFloat(data2.firmInsuranceRate)) > 100) {
                                modelService.Alarm('info', '连接保险分成比例与保险公司分成比例之和必须小于等于100', true, 2000);
                                return false;
                            }
                        }
                    }

                }
                return true;
            };


            vm.getMax = function(arr) {
                var max = 0;
                angular.forEach(arr, function(data, index) {
                    if(data.firmInsuranceRate > max) {
                        max = data.firmInsuranceRate;
                    }
                });
                // console.log(max);
                return max;
            };

            vm.checkIsNull = function () {
                for(var i in vm.FeeRuleMessage.detailFeeRateList){
                    var data1 = vm.FeeRuleMessage.detailFeeRateList[i];
                    var reg = new RegExp("^((\\d{1,2}(\\.\\d{1,2})?)|100|100.00)$");
                    for(var x in data1.productFeeRateList){
                        // 连接佣金验证
                        if(data1.productFeeRateList[x].platformRate!==''){
                            if(!reg.test(data1.productFeeRateList[x].platformRate)) {
                                modelService.Alarm('info', '连接佣金比例输入范围只能是0-100的数字', true, 2000);
                                return false
                            }
                        }else {
                            modelService.Alarm('info', '连接佣金分成不能为空', true, 2000);
                            return false
                        }
                        //保险公司分成验证
                        if(data1.productFeeRateList[x].firmInsuranceRate !==''){
                            if(!reg.test(data1.productFeeRateList[x].firmInsuranceRate)) {
                                modelService.Alarm('info', '保险公司分成比例输入范围只能是0-100的数字', true, 2000);
                                return false
                            }
                        }else {
                            modelService.Alarm('info', '保险公司分成不能为空', true, 2000);
                            return false
                        }
                        //分销佣金验证
                        if(data1.productFeeRateList[x].distributorRate!==''){
                            if(!reg.test(data1.productFeeRateList[x].distributorRate)) {
                                modelService.Alarm('info', '分销佣金比例输入范围只能是0-100的数字', true, 2000);
                                return false
                            }
                        }else {
                            modelService.Alarm('info', '分销佣金不能为空', true, 2000);
                            return false
                        }
                        //分销服务费验证
                        if(data1.productFeeRateList[x].firmServiceRate !== ''){
                            if(!reg.test(data1.productFeeRateList[x].firmServiceRate)) {
                                modelService.Alarm('info', '分销服务费比例输入范围只能是0-100的数字', true, 2000);
                                return false
                            }
                        }else {
                            modelService.Alarm('info', '分销服务费不能为空', true, 2000);
                            return false
                        }
                        //连接服务费的判断
                        if(data1.productFeeRateList[x].platformServiceType == 1){
                            if(data1.productFeeRateList[x].platformServiceRate !== ''){
                                if(!reg.test(data1.productFeeRateList[x].platformServiceRate)) {
                                    modelService.Alarm('info', '连接服务比例输入范围只能是0-100的数字', true, 2000);
                                    return false
                                }
                            }else {
                                modelService.Alarm('info', '连接服务的比例不能为空', true, 2000);
                                return false
                            }
                        }else {
                            if(!data1.fixPlatformFixServiceFee){
                                modelService.Alarm('info', '连接服务的固定费用不能为空', true, 2000);
                                return false
                            }else {
                                if(data1.productFeeRateList[x].platformFixServiceFeeType ==1){
                                    if(!data1.fixPlatformFixServiceFeeRate){
                                        modelService.Alarm('info', '连接服务的固定费用比例不能为空', true, 2000);
                                        return false
                                    }else {
                                        if(!reg.test(data1.fixPlatformFixServiceFeeRate)) {
                                            modelService.Alarm('info', '连接服务的固定费用比例输入范围只能是0-100的数字', true, 2000);
                                            return false
                                        }
                                    }
                                }
                            }
                        }
                        //连接保险分成的判断
                        if(data1.productFeeRateList[x].platformInsuranceType == 1){
                            if(data1.productFeeRateList[x].platformInsuranceRate !==''){

                            }else {
                                modelService.Alarm('info', '连接保险分成比例不能为空', true, 2000);
                                return false
                            }
                          /*  if(!data1.productFeeRateList[x].platformInsuranceRate){
                                modelService.Alarm('info', '连接保险分成比例不能为空', true, 2000);
                                return false
                            }*/
                        }else {
                            if(data1.fixPlatformFixInsuranceFee!==''){
                                if(data1.productFeeRateList[x].platformFixInsuranceFeeType ==1){
                                    if(!data1.fixPlatformFixInsuranceFeeRate){
                                        modelService.Alarm('info', '连接保险分成的固定费用比例不能为空', true, 2000);
                                        return false
                                    }
                                }
                            }else {
                                modelService.Alarm('info', '连接保险分成的固定费用不能为空', true, 2000);
                                return false
                            }

                           /* if(!data1.fixPlatformFixInsuranceFee){
                                modelService.Alarm('info', '连接保险分成的固定费用不能为空', true, 2000);
                                return false
                            }else {
                                if(data1.productFeeRateList[x].platformFixInsuranceFeeType ==1){
                                    if(!data1.fixPlatformFixInsuranceFeeRate){
                                        modelService.Alarm('info', '连接保险分成的固定费用比例不能为空', true, 2000);
                                        return false
                                    }
                                }
                            }*/
                        }

                    }
                }
                return true;
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
                'GOODS',
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
                asset.getCommonConfig().success(function (data) {
                    if(data.resultCode == 0){
                        // 所有返回信息
                        vm.FeeRuleMessage = data.resultData;
                        vm.FeeRuleMessage.detailFeeRateList[0] = data.resultData.detailFeeRateList[0];
                        vm.getNewTicketList();
                        vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList = angular.copy(arr)

                        console.log(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList);
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
                        console.log(vm.FeeRuleMessage);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })

            };
            vm.init();
        }
    ])