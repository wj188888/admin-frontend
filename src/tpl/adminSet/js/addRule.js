/**
 * Created by Administrator on 2017/3/13.
 */
app.controller('addRule',
    ["$scope","adminSet","region","$timeout","modelService","$state","CONSTANTS","$stateParams",
        function( $scope,adminSet,region,$timeout,modelService,$state,CONSTANTS,$stateParams) {
            var vm = $scope.vm = {};
            vm.commonName = [];
            vm.bindData = {cityId:'',provinceId:''};
            vm.ruleData = {province:'',city:'',chargingRuleItems:[{carGrade:0,nightFee:'',durationFee:'',longJourneyFee:'',mileageFee:'',startupFee:'',minConsumptionAmount:''}]};
            vm.carTypes = [
                {key:'5座经济轿车',value:0},
                {key:'5座高级轿车',value:1},
                {key:'7座商务',value:2},
                {key:'经济SUV',value:3},
                {key:'高级SUV',value:4}
            ];
            var ruleId = $stateParams.id;
            if(ruleId){
                adminSet.getRuleDetail(ruleId).success(function (data) {
                    if (data.resultCode == 0) {
                        vm.ruleData = data.resultData;
                        console.log(vm.ruleData);
                        if(vm.ruleData.province&&vm.ruleData.city){
                            vm.findName(vm.ruleData.province, vm.ruleData.city);
                        }

                    } else {
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            }
            vm.findName = function (province,city) {
                region.findIdByName({province: province,city:city}).success(function (data) {
                    if (data.resultCode == '0') {
                        var allProvinces = data.resultData.provinces;
                        var allCity = data.resultData.cities;
                        //var allCounty = data.resultData.counties;
                        angular.forEach(allProvinces,function (value,key) {
                            if(value.alias == province){
                                vm.bindData.provinceId = value.id;
                                region.findSubRegions({id: '0'}).success(function (data) {
                                    vm.commonName.province = data.resultData;
                                    angular.forEach(vm.commonName.province,function (value,key) {
                                        if(value.id == vm.bindData.provinceId){
                                            vm.ruleData.province = value.alias||"";
                                        }
                                    });
                                })
                            }
                        });

                            angular.forEach(allCity,function (value,key) {
                                if(value.alias == city){
                                    vm.bindData.cityId = value.id;
                                    region.findSubRegions({id: vm.bindData.provinceId}).success(function (data) {
                                        vm.commonName.city = data.resultData;
                                        angular.forEach(vm.commonName.city,function (value,key) {
                                            if(value.id == vm.bindData.cityId){
                                                vm.ruleData.city = value.alias||"";
                                            }
                                        });
                                    })
                                }
                            });

                        //vm.findSubRegions('commonName', 'city', vm.bindData.provinceId);
                    }
                })
            };
            /**
             * 查询省市县
             * @param type [storeProvince, storeCity, storeCounty] [firmProvince, firmCity, firmCounty]
             * @param id
             */
            vm.findSubRegions = function (name, type, id) {
                var flag = false;
                region.findSubRegions({id: id}).success(function (data) {
                    if (data.resultCode == '0') {
                        vm[name][type] = data.resultData;
                        var dataType = '';
                        if(type == 'city'){
                            dataType = 'province';
                            vm.bindData.cityId = '';
                            vm.ruleData.city = "";
                        }else if(type == 'county'){
                            dataType = 'city'
                        }
                        angular.forEach(vm[name][dataType],function (value,key) {
                            if(value.id == vm.bindData[dataType + 'Id']){
                                vm.ruleData[dataType] = value.alias||"";
                                flag = true;
                            }
                        });
                        if(!flag){
                            if(type == 'city'){
                                vm.ruleData.province = '';
                                vm.ruleData.city = '';
                            }else if(type == 'county'){
                                vm.ruleData.city = '';
                            }

                        }
                    }
                });
            };
            vm.addCarRule = function () {
                var obj = {carGrade:0,nightFee:'',durationFee:'',longJourneyFee:'',mileageFee:'',startupFee:'',minConsumptionAmount:''};
                vm.ruleData.chargingRuleItems.push(obj);
            };
            vm.deleteCarRule = function (index) {
                vm.ruleData.chargingRuleItems.splice(index, 1);
            };
            vm.underway = true;
            vm.inspact={};
            vm.checkNumber = function (value) {
                var flag;
                if(value){
                    if(CONSTANTS.regExp.floatPoint.test(value) == false){
                        flag = true;
                    }else{
                        flag = false;
                    }
                }else{
                    flag = true;
                }
                return flag;
                //验证不通过返回false

            };
            vm.showCityError = true;
            vm.button = {
                text: '保存',
                disabled: false,
                save: function () {
                    vm.underway = false;
                    if(vm.ruleData.type!=1) {
                        if(vm.ruleData.province==''||vm.ruleData.city==''){
                            vm.showCityError = false;
                            return false;
                        }else{
                            vm.showCityError = true;
                        }
                    }

                    var dom = $(".error-flag");
                    if(dom.length>0){
                        return false;
                    }
                    var result = [];
                    var carTypes = vm.ruleData.chargingRuleItems;
                    for (var i = 0; i < carTypes.length; i++) {
                        if (result.indexOf(carTypes[i].carGrade) == -1) {
                            result.push(carTypes[i].carGrade);
                        }
                    }
                    if(carTypes.length>result.length){
                        modelService.Alarm('info', '车辆类型不能重复', true, 1000);
                        return false;
                    }
                    if(ruleId){
                        adminSet.editRule(vm.ruleData,ruleId).success(function (data) {
                            if (data.resultCode == '0') {
                                modelService.Alarm('success', '编辑成功!', true, 1000);
                                $timeout(function () {
                                    $state.go('app.adminSet.brandCar');
                                }, 1500);
                            } else {
                                modelService.Alarm('info', data.resultMsg, true, 1000);
                            }
                        })
                    }else{
                        adminSet.createRule(vm.ruleData).success(function (data) {
                            if (data.resultCode == '0') {
                                modelService.Alarm('success', '创建成功!', true, 1000);
                                $timeout(function () {
                                    $state.go('app.adminSet.brandCar');
                                }, 1500);
                            } else {
                                modelService.Alarm('info', data.resultMsg, true, 1000);
                            }
                        })
                    }

                }
            };
            vm.goHistory = function () {
                window.history.back(-1);
            };
            vm.init = function () {
                if(!ruleId){
                    vm.findSubRegions('commonName', 'province', '0');
                }
            };
            vm.init();
        }
    ])