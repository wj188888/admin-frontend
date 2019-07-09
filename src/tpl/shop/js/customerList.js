app.controller('customerList',
    ["$scope", '$localStorage', "station","commonService","modelService","$timeout","$state",
        function( $scope, $localStorage, station,commonService,modelService,$timeout,$state) {
            var vm = $scope.vm = {};

            if(!$localStorage.sortItem) {
                $localStorage.sortItem = {
                    createdTime: {
                        sortName: 'createdTime',
                        sortType: 'DESC',
                        selected: true
                    },
                    lastLoginTime: {
                        sortName: 'loginTimes',
                        sortType: 'DESC',
                        selected: false
                    },
                    loginTimes: {
                        sortName: 'loginTimes',
                        sortType: 'DESC',
                        selected: false
                    }
                };
            }
            $scope.sortItem = angular.copy($localStorage.sortItem);
            $scope.getSelected = function() {
                for(var x in $scope.sortItem) {
                    if($scope.sortItem[x].selected) {
                        return x;
                    }
                }
                return 'storeNum';
            };
            $scope.selectedItem = $scope.getSelected();
            $scope.search = {
                startDate: '',
                endDate: '',
                phone: '',
                name: '',
                sortName: $scope.sortItem[$scope.selectedItem].sortName,
                // sortType: $scope.sortItem[$scope.selectedItem].sortType
                sortType: 'ASC'
            };
            $scope.setSort = function(sortName) {
                var nowItem = $scope.getSelected();
                $scope.sortItem[nowItem].selected = false;
                $scope.sortItem[sortName].selected = true;
                if($scope.sortItem[sortName].sortType == 'ASC') {
                    $scope.sortItem[sortName].sortType = 'DESC';
                } else {
                    $scope.sortItem[sortName].sortType = 'ASC';
                }
                $scope.search.sortName = $scope.sortItem[sortName].sortName;
                $scope.search.sortType = $scope.sortItem[sortName].sortType;
                $scope.searchFunction();
                $localStorage.sortItem = angular.copy($scope.sortItem);
            };
            vm.status=[
                {key: '已审核', value: 1},
                {key: '待审核', value: 0}
            ];

            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {
                    startDate: '',
                    endDate: '',
                    phone: '',
                    name: ''
                };
            };

            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };

            // 分页信息
            $scope.options = {
                url:'/firmUser/find',
                data:$scope.search,
                method:'get'
            };
        }
    ])