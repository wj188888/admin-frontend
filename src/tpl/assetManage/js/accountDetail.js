/**
 * 账单日汇总月汇总controller
 * date:  2017年1月12日
 */
app.controller('accountDetail', ["$scope", "asset", "commonService", "$localStorage", "$state", "$timeout", "$location", 'CONFIG',
    function ($scope, asset, commonService, $localStorage, $state, $timeout, $location, CONFIG) {
        var vm = $scope.vm = {};
        var searchDay = commonService.getSearchDay();
        $scope.search = {};
        vm.saleTypes = [
            {name:'自销',status:'0'},
            {name:'共享',status:'1'},
            {name:'分销',status:'2'}
        ];
        vm.payChannels = [
            {name:'连接',status:'0'},
            {name:'企业',status:'1'},
        ];
        $scope.search.productTypeLevelOne = '';
        // 清空搜索条件
        $scope.cancelSearch = function(){
            $scope.search = {};
        };

        // 执行查询
        $scope.searchFunction = function(){
            $scope.options.refresh($scope.search);
        };
        //$scope.search.storeId = $localStorage.storeId;
        // 分页信息
        $scope.options = {
            url:'/orderStatement/find',
            data:$scope.search
        };
        vm.month=1;
        $scope.search.startDate = searchDay.monthDay;
        $scope.search.endDate = searchDay.today;
        vm.productTypes=commonService.product.enumeration;

        vm.sevenDayList = function(){
            vm.seven=1;
            vm.month=0;
            $scope.search.startDate = searchDay.sevenDay;
            $scope.search.endDate = searchDay.yesterday;
            $scope.options.refresh($scope.search);
        };

        vm.monthList = function(){
            vm.month=1;
            vm.seven=0;
            $scope.search.startDate = searchDay.monthDay;
            $scope.search.endDate = searchDay.yesterday;
            $scope.options.refresh($scope.search);
        };
        $scope.searchParam ={
            storeId:'',
            token:'',
            startDate:'',
            endDate:'',
            code:'',
            productTypeLevelOne:'',
            type:'',
            payAccount:''
        };
        $scope.exprot = function () {
            $scope.searchParam.storeId = $scope.search.storeId;
            $scope.searchParam.token = $localStorage.Authorization;
            $scope.searchParam.startDate = commonService.dateToDateTime($scope.search.startDate);
            $scope.searchParam.endDate = commonService.dateToDateTime($scope.search.endDate);
            $scope.searchParam.code = $scope.search.code;
            $scope.searchParam.productTypeLevelOne = $scope.search.productTypeLevelOne;
            $scope.searchParam.type = $scope.search.type;
            $scope.searchParam.payAccount = $scope.search.payAccount;
            window.open(CONFIG.webServer + "/orderStatement/a/export?" + $.param($scope.searchParam));
        };
        vm.shopNames = [];
        vm.getAllShop = function () {
            asset.findAllStore().success(function(data){
                if(data.resultCode == '0'){
                    var shops = data.resultData;
                    console.log(shops);
                    angular.forEach(shops,function(value,key){
                        var obj={id:'',name:''};
                        obj.id = value.id;
                        obj.name = value.brandName;
                        vm.shopNames.push(obj);
                    })
                }
            });
        };
        vm.init = function () {
            vm.getAllShop();
        };
        vm.init();
    }]);
