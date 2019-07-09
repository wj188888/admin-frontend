app.controller('serviceShelves',
    ["$scope",'$modal',
        function( $scope,$modal) {
            var vm = $scope.vm = {};
            $scope.search = {};

            /*
            **申请状态
             */
            vm.status = [
                {key: '待上架', value: '0'},
                {key: '已上架', value: '1'}
            ];
            $scope.search.status=''; //默认申请状态为全部
            /*
            ** 版本类型
             */
            vm.textTypes = [
                {key: 'Android版', value: '0'},
                {key: 'iOS版本', value: '1'}
            ];

            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {};
            };
            // 执行查询
            $scope.searchFunction = function(){
                if($scope.search.applyStartTime != null && $scope.search.applyStartTime != '' || $scope.search.applyStopTime != null && $scope.search.applyStopTime != ''){
                    $scope.search.applyStartTime = $scope.search.applyStartTime.split(' ')[0] + ' 00:00:00';
                    $scope.search.applyStopTime = $scope.search.applyStopTime.split(' ')[0] +  ' 23:59:59';
                }

                $scope.options.refresh($scope.search);
            };
            // 分页信息
            $scope.options = {
                url:'/appReleaseInfo/find',
                data:$scope.search,
                method:'get'
            };
            $scope.$watch('options.dataList',function () {
                $scope.releaseInfoLists = $scope.options.dataList;
            },true);

            /*
            **版本说明
             */
            vm.openExplain = function (releaseInfoList) {
                var imprintModal = $modal.open({
                    templateUrl: 'tpl/modal/imprint.html',
                    controller: 'imprint',
                    size:'md',
                    resolve: {
                        fieldParam: function () {
                            return angular.copy(releaseInfoList);
                        }
                    }
                });
                imprintModal.result.then(function() {

                });
            };
            /*
            **跟进
             */
            vm.openDialog = function (data) {
                var textModal = $modal.open({
                    templateUrl: 'tpl/modal/followUpDetail.html',
                    controller: 'followUpDetail',
                    size:'md',
                    resolve: {
                        fieldParam: function () {
                            return {id:data.id,status:data.status};
                        }
                    }
                });
                textModal.result.then(function() {
                    $scope.options.refresh($scope.search);
                });
            };

        }
    ])
