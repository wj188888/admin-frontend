app.controller('siteList',
    ["$scope","station","commonService","modelService","$timeout","$state",
        function( $scope,station,commonService,modelService,$timeout,$state) {
            var vm = $scope.vm = {};
            $scope.search = {
                startTime: '',
                endTime: '',
                qualification: '',
                applyFirmName: '',
                name: ''
            };
            vm.status=[
                {key: '已认证', value: 1},
                {key: '未认证', value: 2}
            ];
            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {
                    startTime: '',
                    endTime: '',
                    qualification: '',
                    applyFirmName: '',
                    name: ''
                };
            };

            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };

            // 分页信息
            $scope.options = {
                url:'/site/find',
                data:$scope.search,
                method:'get'
            };
        }
    ])