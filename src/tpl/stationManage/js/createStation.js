/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('createStation', ["$scope", "region","station", "commonService", "modelService", "$stateParams", "validateService", "$state", "$timeout",
    function ($scope, region,station, commonService, modelService, $stateParams, validateService, $state, $timeout) {
        var vm = $scope.vm = {};
        vm.Station = {};
        vm.text = '创建';
        var stationId = $stateParams.id;
        if (stationId) {
            vm.text = '编辑';
            //如果id存在，则查询车站详情，进行编辑
            station.findStationById(stationId).success(function (data) {
                if (data.resultCode == 0) {
                    vm.Station = data.resultData;
                    if(vm.Station.province){
                        vm.findSubRegions('positionStation', 'stationCity', vm.Station.province.id);
                    }
                    if(vm.Station.city){
                        vm.findSubRegions('positionStation', 'stationCounty', vm.Station.city.id);
                    }

                } else {
                    modelService.Alarm('info', data.resultMsg, true, 1000);
                }
            });
        }
        /**
         * 查询省市县
         * @param type [storeProvince, storeCity, storeCounty] [firmProvince, firmCity, firmCounty]
         * @param id
         */
        vm.positionStation = [];
        vm.findSubRegions = function (name, type, id) {
            region.findSubRegions({id: id}).success(function (data) {
                if (data.resultCode == '0') {
                    vm[name][type] = data.resultData;
                }
            });
        };
        //查询所有平台
        vm.findAllPlat = function(){
            station.findAllPlats().success(function (data) {
                if (data.resultCode == '0') {
                    vm.plats = data.resultData;
                }
            });
        };
        var validateForm = [
            {type: 'input', elem: '#station', emptyTips: '请输入客运站名称'},
            {type: 'input', elem: '#detail', emptyTips: '请输入详细地址'},
            {type: 'input', elem: '#name', emptyTips: '请输入联系人姓名'},
            {type: 'select', elem: '#platId', emptyTips: '请选择平台'},
            {type: 'input', elem: '#phone', emptyTips: '请输入联系人电话', regTips: '您输入的手机号格式不正确', regName: 'tel'}
        ];
        validateService.blurValidate(validateForm);
        // 创建车站
        vm.createStation = function () {
            var validate = validateService.submitValidate(validateForm);
            if (!validate) {
                return;
            }
           /* var flag = vm.checkName();
            if (flag) {
                modelService.Alarm('info', '此客运站已存在!', true, 1000);
                return false;
            }*/
            if (stationId) {
                station.editStationById(stationId, vm.Station).success(function (data) {
                    if (data.resultCode == '0') {
                        modelService.Alarm('success', '编辑车站成功!', true, 1000);
                        $timeout(function () {
                            $state.go('app.stationManage.stationList');
                        }, 1500);
                    } else {
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })
            } else {
                station.createStationPort(vm.Station).success(function (data) {
                    if (data.resultCode == '0') {
                        modelService.Alarm('success', '创建车站成功!', true, 1000);
                        $timeout(function () {
                            $state.go('app.stationManage.stationList');
                        }, 1500);
                    } else {
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })
            }
        };
        vm.checkName = function () {
            station.isNameExit({name: vm.Station.name}).success(function (data) {
                if (data.resultCode == 0) {
                    if (data.resultData) {
                        return true;
                    } else {
                        return false;
                    }
                }
            })
        };
        vm.goHistory = function () {
            window.history.back(-1);
        };
        vm.init = function () {
            vm.findSubRegions('positionStation', 'stationProvince', '0');
            vm.findAllPlat();
        };

        vm.init();
    }
])