/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('stationDetail',
    ["$scope","station","commonService","$stateParams",
        function( $scope,station,commonService,$stateParams) {
            var vm = $scope.vm = {};
            vm.Station = {};
            var stationId = $stateParams.id;
            vm.findDetailById = function () {
                station.findStationById(stationId).success(function(data){
                    if(data.resultCode == '0'){
                        vm.Station = data.resultData;
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