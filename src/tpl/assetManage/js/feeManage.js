/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('feeManage',
    ["$scope","$localStorage","asset","commonService","modelService","$timeout","$state",
        function( $scope,$localStorage,asset,commonService,modelService,$timeout,$state) {
            var vm = $scope.vm = {};
            $scope.search = {};
            vm.types=[
                {key: '全部', value: ''},
                {key: '默认计费', value: 0},
                {key: '自定义计费', value: 1},
            ];
            $scope.search.ruleType='';
            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {};
                $scope.search.ruleType='';
            };

            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };

            // 分页信息
            $scope.options = {
                url:'/feeRateConfig/find',
                data:$scope.search,
                method:'get'
            };
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


            //清除缓存
            vm.clearStore = function () {
                $localStorage.FeeRuleAdd = null;
            },

            vm.init=function () {
                /*asset.findAllStore().success(function(data){
                    if(data.resultCode == '0'){
                        var shops = data.resultData;
                        for(var x in shops){
                            angular.forEach($scope.options.dataList,function (code,index) {
                                if(code.storeId == shops[x].id){
                                    code.storeName = shops[x].brandName;
                                }
                            })
                        }
                    }
                });*/
            }
            vm.init();
        }
    ]);
