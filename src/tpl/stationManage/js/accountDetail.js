/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('accountDetail',
    ["$scope","station","commonService","$stateParams",
        function( $scope,station,commonService,$stateParams) {
            var vm = $scope.vm = {};
            vm.Station = {};
            var accountId = $stateParams.id;
            vm.findDetailById = function () {
                station.findAccountById(accountId).success(function(data){
                    if(data.resultCode == '0'){
                        vm.Account = data.resultData;
                    }else{
                        commonService.showTips({
                            cssClass:'alert-fail',
                            msg: data.resultMsg
                        });
                    }
                });
            };
            vm.init = function () {
                vm.findDetailById();
            };
            vm.init();
        }
    ])
