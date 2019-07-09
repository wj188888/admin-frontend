/**
 * Created by Administrator on 2016/11/24.
 */
app.controller('createLabel',
    ["$scope","adminSet","modelService","$stateParams","validateService","$state","$timeout","$localStorage",
        function( $scope,adminSet,modelService,$stateParams,validateService,$state,$timeout,$localStorage) {
            var vm = $scope.vm = {};
            vm.labelData = {};
            var labelId;
            var localData= $localStorage.editLabel;
            console.log(localData);
            if(localData){
                vm.labelData=localData;
                labelId =localData.id;
            }

            var validateForm = [
                {type: 'input', elem: '#labelName', emptyTips: '请输入标签名'},
                {type: 'input', elem: '#labelContent', emptyTips: '请输入内容'}
            ];
            validateService.blurValidate(validateForm);
            // 创建标签
            vm.createLabelSave = function(){
                var resource;
                var validate = validateService.submitValidate(validateForm);
                if (!validate) {
                    return;
                }
                if(labelId){
                    resource=adminSet.editLabel(labelId,vm.labelData);
                }else{
                    resource=adminSet.createLabel(vm.labelData);
                }
                resource.success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', data.resultMsg, true, 1000);
                        $localStorage.editLabel={};
                        $timeout(function(){
                            $state.go('app.adminSet.labelList');
                        },1500);

                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })

            };
            vm.goHistory = function () {
                window.history.back(-1);
            };

        }
    ]);
