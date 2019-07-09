/**
 * Created by Administrator on 2017/3/13.
 */
app.controller('brandCar',
    ["$scope", "$state","adminSet","modelService","$timeout","region","$location","$localStorage",
        function( $scope,$state,adminSet,modelService,$timeout,region,$location,$localStorage) {
            var vm = $scope.vm = {};
            $scope.search = {
                province:'',
                city:''
            };
            // 分页信息
            $scope.options = {
                url:'/chStandardChargingRule/find',
                data:$scope.search,
                method:'get'
            };
            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };
            // 清空搜索条件
            $scope.cancelSearch = function(){
                vm.bindData.provinceId = '';
                vm.bindData.cityId = '';
                $scope.search = {};
            };
            vm.carTypes = [
                {key:'5座经济轿车',value:'0'},
                {key:'5座高级轿车',value:'1'},
                {key:'7座商务',value:'2'},
                {key:'经济SUV',value:'3'},
                {key:'高级SUV',value:'4'},
                {key:'小巴',value:'5'},
                {key:'中巴',value:'6'},
                {key:'大巴',value:'7'}
            ];
            vm.commonName = [];
            vm.bindData = {};
            vm.findSubRegions = function (name, type, id) {
                var flag = false;
                region.findSubRegions({id: id}).success(function (data) {
                    if (data.resultCode == '0') {
                        vm[name][type] = data.resultData;
                        var dataType = '';
                        if(type == 'city'){
                            dataType = 'province';
                            vm.commonName.county = [];
                        }else if(type == 'county'){
                            dataType = 'city'
                        } else if(type == 'town'){
                            dataType = 'county'
                        }
                        angular.forEach(vm[name][dataType],function (value,key) {
                            if(value.id == vm.bindData[dataType + 'Id']){
                                $scope.search[dataType] = value.alias;
                                flag = true;
                            }
                        })
                        if(!flag){
                            $scope.search.province = '';
                            $scope.search.city = '';
                            /*$scope.search.county = '';*/
                        }
                    }
                });
            };
            vm.deleteFunc = function() {
                adminSet.deleteCityPrice(deleteId).success(function(data) {
                    if (data.resultCode == 0) {
                        modelService.Alarm('success', '删除成功!', true, 1000);
                         $timeout(function(){
                         $state.reload();
                         },1000);
                    } else {
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            };
            var deleteId = '';
            vm.deleteCityPrice=function(id){
                deleteId=id;
                modelService.Confirm('','是否删除城市计价？',vm.deleteFunc);
            };
            vm.init = function () {
                vm.findSubRegions('commonName', 'province', '0');
            };
            vm.init();
            var double = typeof(undefined);
            console.log(double);
        }
    ])