/**
 * Created by Administrator on 2016/10/17.
 */
/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('createAccount', ["$scope", "station", "commonService", "modelService", "$stateParams", "validateService", "$state", "$timeout",
    function ($scope, station, commonService, modelService, $stateParams, validateService, $state, $timeout) {
        var vm = $scope.vm = {};
        vm.showPass = true;
        vm.Account = {};
        vm.Account.stationId = '';
        var accountId = $stateParams.id;
        if (accountId) {
            //如果id存在，则查询车站详情，进行编辑
            station.findAccountById(accountId).success(function (data) {
                if (data.resultCode == 0) {
                    vm.Account = data.resultData;
                    vm.showPass = false;
                } else {
                    modelService.Alarm('info', data.resultMsg, true, 1000);
                }
            });
        }
        var validateForm = [
            {type: 'select', elem: '#station', emptyTips: '请选择归属车站'},
            {type: 'input', elem: '#number', emptyTips: '请输入验票账号'},
            {type: 'input', elem: '#passWord', emptyTips: '请输入登录密码'}
        ];
        validateService.blurValidate(validateForm);
        // 创建车站
        var _validateForm;
        vm.createAccount = function () {
            if (accountId) {
                _validateForm = validateForm.slice(0, 1);
            } else {
                _validateForm = validateForm;
            }
            var validate = validateService.submitValidate(_validateForm);
            if (!validate) {
                return;
            }
            if (accountId) {
                station.editAccountById(accountId, vm.Account).success(function (data) {
                    if (data.resultCode == '0') {
                        modelService.Alarm('success', '编辑账号成功!', true, 1000);
                        $timeout(function () {
                            $state.go('app.stationManage.personList');
                        }, 1500);
                    } else {
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })
            } else {
                station.isUserExit({username: vm.Account.username}).success(function (data) {
                    if (data.resultCode == 0) {
                        if (data.resultData) {
                            modelService.Alarm('info', '用户名已存在!', true, 1000);
                            return false;
                        } else {
                            station.createAccountPort(vm.Account).success(function (data) {
                                if (data.resultCode == '0') {
                                    modelService.Alarm('success', '创建账号成功!', true, 1000);
                                    $timeout(function () {
                                        $state.go('app.stationManage.personList');
                                    }, 1500);
                                } else {
                                    modelService.Alarm('info', data.resultMsg, true, 1000);
                                }
                            })
                        }
                    }
                });

            }

        };
        vm.goHistory = function () {
            window.history.back(-1);
        };
        vm.findStationList = function () {
            station.findStationList({pageNo: 1, pageSize: 100}).success(function (data) {
                if (data.resultCode == 0) {
                    vm.stationList = data.resultData.content;
                    //console.log(vm.stationList);
                } else {
                    modelService.Alarm('info', data.resultMsg, true, 1000);
                }
            })
        };
        vm.init = function () {
            vm.findStationList();
        };

        vm.init();
    }
]);