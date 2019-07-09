/**
 * Created by Administrator on 2016/11/1.
 */
app.controller('versionList',
    ["$scope", '$state', '$timeout',  'commonService','modelService','version',
        function($scope, $state, $timeout, commonService,modelService,version) {
            $scope.search = {};
            // 清空搜索条件
            $scope.cancelSearch = function(){
                $scope.search = {};
            },

            // 执行查询
            $scope.searchFunction = function(){
                $scope.options.refresh($scope.search);
            },

            // 开关
            $scope.choiceSet = function (data) {

            };
            // 分页信息
            $scope.options = {
                url:'/appVersion/find',
                data:$scope.search,
                method:'post'
            };
            $scope.productTypes = commonService.product.enumeration;
            if(!$scope.search.productTypeLevelOne) {
                $scope.search.productTypeLevelOne = '';
            }

            var vm = $scope.vm = {
                // 更换开关
                choiceSet : function (data, index) {
                    if(data.updateSwitch == 1){
                        // $scope.options.dataList[index].updateSwitch = 0;
                        modelService.Confirm('','关闭开关后，APP端将不会收到更新提醒，如果已经更新为最新版本则不提醒',function(){vm.changeChannelSure(data,index, 0)});
                    }else if(data.updateSwitch == 0){
                        modelService.Confirm('','打开开关后，APP端将收到更新提醒，如果已经更新为最新版本则不提醒',function(){vm.changeChannelSure(data,index, 1)});
                    }
                },
                changeChannelSure: function(data, index, value) {
                    $scope.options.dataList[index].updateSwitch = value;
                    version.changeSwitchAppVersion({
                            id:data.id,
                            updateSwitch:value
                        }).success(function(data){
                        if(data.resultCode == '0'){
                            if(value == 1){
                                modelService.Alarm('success', '打开成功!', true, 1000);
                            }else if(value == 0){
                                modelService.Alarm('success', '关闭成功!', true, 1000);
                            }
                            $timeout(function(){
                                $state.go('app.appManage.versionList');
                            },1500);
                        }else{
                            modelService.Alarm('info', data.resultMsg, true, 1000);
                        }
                    })
                }
            };
        }
    ]);