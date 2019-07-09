/**
 * Created by Administrator on 2016/10/17.
 */
app.controller('payChannel',
    ["$scope","asset","commonService","modelService","$timeout","$state",
        function( $scope,asset,commonService,modelService,$timeout,$state) {
            var vm = $scope.vm = {};
            $scope.search = {};
            vm.status=[
                {key: '连接官方', value: 0},
                {key: '企业自身', value: 1},
            ];
            $scope.search.payType=null;
            $scope.search.type = '0';
            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {};
                $scope.search.type = '0';
            };

            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            };

            // 分页信息
            $scope.options = {
                url:'/payAccountStatistic/find',
                data:$scope.search,
                method:'get'
            };

            //切换渠道
            var channelId;
            vm.changeChannel = function (id) {
                channelId=id;
                modelService.Confirm('','切换支付渠道后将会立即生效，是否切换?',vm.changeChannelSure);
                console.log(channelId);
            };
            vm.changeChannelSure = function () {
                asset.changePayChannel(channelId).success(function(data){
                    if(data.resultCode == 0){
                        modelService.Alarm('success', '支付渠道切换成功!', true, 1000);
                        $timeout(function(){
                            $state.reload();
                        },1000);
                    }else{
                        modelService.Alarm('success',data.resultMsg, true, 1000);
                    }
                });
            };


        }
    ]);
