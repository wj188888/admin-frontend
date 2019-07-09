/**
 * 版本编辑
 */
app.controller('editVersion',
    ["$scope","version","$modal","commonService", 'CONFIG','$http','$localStorage',"modelService","$timeout","$stateParams","$state","validateService",
        function( $scope,version,$modal,commonService,CONFIG,$http,$localStorage,modelService,$timeout,$stateParams,$state,validateService) {
            var filedata = null;
            var fileValue = null;
            var vm = $scope.vm = {};
            var versionId = $stateParams.id;

            vm.onLoadTxt = '重新上传';

            vm.App={
                updateMode:1,
                updateSwitch:1,
                uploadPath:'',
                packageName:''
            };

            /*
             * 下载链接
             * */
            vm.loadLists=[
                {name: 'CITY_BUS',href: "https://obfiwfjx9.qnssl.com/undunion-release-1.2.3_123_jiagu_sign.apk"},
                {name: 'CAR_HAILING',href: "https://obfiwfjx9.qnssl.com/undunion_brand-release-1.2.2_122_jiagu_sign.apk"},
                {name: 'TAXI',href: "https://obfiwfjx9.qnssl.com/undunion_taxi-release-1.0.1_101_jiagu_sign.apk"},
                {name: 'AIRPORT_BUS',href: "https://obfiwfjx9.qnssl.com/undunion_aircraft-release-1.0.0_100_jiagu_sign.apk"},
                {name: 'TRAIN_STATION_BUS',href: "https://obfiwfjx9.qnssl.com/undunion_train-release-1.0.0_100_jiagu_sign.apk"},
                {name: 'CAR_INSPECTION',href: "https://obfiwfjx9.qnssl.com/undunion_vehicle_1.0.0.apk"},
            ];

            vm.productTypeLevelOnes = commonService.product.app_enumeration;
            var validateForm;
            vm.createVersionFunc = function(){
                if(vm.onLoadTxt == '已上传' || vm.onLoadTxt == '重新上传'){
                    if(vm.App.versionNum !== vm.AppTemp.versionNum) {
                        var newNum = vm.App.versionNum;
                        var num = vm.AppTemp.versionNum;
                        var newArr = newNum.split('.');
                        var arr = num.split('.');
                        if(parseInt(arr[0]) < parseInt(newArr[0])){
                            modelService.Confirm('','版本号修改后，上一个版本将作为历史版本显示在列表下方。',vm.changeChannelSure);
                        }else{
                            if(parseInt(arr[1]) < parseInt(newArr[1])){
                                modelService.Confirm('','版本号修改后，上一个版本将作为历史版本显示在列表下方。',vm.changeChannelSure);
                            }else{
                                if(parseInt(arr[2]) < parseInt(newArr[2])){

                                    modelService.Confirm('','版本号修改后，上一个版本将作为历史版本显示在列表下方。',vm.changeChannelSure);
                                }else{
                                    modelService.Alarm('success', '请确保您填写的版本大于当前版本', true, 1000);
                                }
                            }
                        }
                    }else if(vm.App.versionNum === vm.AppTemp.versionNum){
                        vm.changeChannelSure();
                    }
                }else if(vm.onLoadTxt == '上传中...'){
                    modelService.Alarm('success', '应用包上传成功才保存', true, 1000);
                }

            };



            vm.changeChannelSure = function () {
                validateForm = [
                    {type: 'input', elem: '#version', emptyTips: '请输入APP版本号'},
                    {type: 'input', elem: '#downUrl', emptyTips: '请输入下载地址'},
                    {type: 'input', elem: '#content', emptyTips: '请输入更新内容'}
                ];
                validateService.blurValidate(validateForm);
                var validate = validateService.submitValidate(validateForm);
                if (!validate) {
                    return;
                }
                version.editVersion(versionId,vm.App).success(function(data){
                    if(data.resultCode == '0'){
                        modelService.Alarm('success', '编辑版本成功!', true, 1000);
                        $timeout(function(){
                            $state.go('app.appManage.versionList');
                        },1500);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })
            };

            //更新开关
            vm.choiceSet = function (data) {
                if(data == 1){
                    vm.App.updateSwitch = 0;
                }else if(data == 0){
                    vm.App.updateSwitch = 1;
                }
            };

            // 判断输入的版本号是否大于当前版本
            /*vm.versionNumBlur = function () {
                var newNum = vm.App.versionNum;
                var num = vm.AppTemp.versionNum;
                var newArr = newNum.split('.');
                var arr = num.split('.');

                if(arr[0] > newArr[0]){
                    modelService.Alarm('success', '请确保您填写的版本大于当前版本', true, 1000);
                }else{
                    if(arr[1] > newArr[1]){
                        modelService.Alarm('success', '请确保您填写的版本大于当前版本', true, 1000);
                    }else{
                        if(arr[2] > newArr[2]){
                            modelService.Alarm('success', '请确保您填写的版本大于当前版本', true, 1000);
                        }
                    }
                }
            };*/

            /*
            * 点击应用包名下载
            * */
            vm.uploadPath = function (data) {
                angular.forEach(vm.loadLists,function (val,index) {
                    if(data === val.name){
                        vm.loadHref = val.href;
                    }
                });
            };

            vm.init = function () {
                //查询版本信息
                version.searchDetailById(versionId).success(function(data){
                    if(data.resultCode == 0){
                        vm.App = angular.copy(data.resultData);
                        vm.fileName = vm.App.packageName;
                        vm.AppTemp = angular.copy(data.resultData);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });

                // 历史版本列表
                version.findAppVersionHis({appId:versionId}).success(function (data) {
                    if (data.resultCode == 0) {
                        vm.versionHisList = data.resultData.content;
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })

                /*
                 * 上传文件
                 * */
                setTimeout(function() {
                    $('#upfile').on('change', function() {
                        filedata = document.getElementById('upfile').files[0];
                        var strRegex = "(.apk)$";
                        var re=new RegExp(strRegex);
                        var name = filedata.name;
                        if(!re.test(name.toLowerCase())){
                            modelService.Alarm('success', '请上传正确的安装包', true, 1000);
                            return;

                        }
                        if(!!filedata) {
                            fileValue = filedata;
                        }
                        if(!!filedata) {
                            $('#upfileBtn').css({
                                background: '#07d'
                            });
                        } else {
                            filedata = fileValue;
                        }

                        $scope.$apply(function() {
                            if(filedata) {
                                vm.upFile();
                                vm.fileName = filedata.name;
                                vm.App.packageName = filedata.name;
                            } else {
                                vm.fileName = '';
                            }
                        });

                        $(this).clone(true).replaceAll(this);
                    });
                }, 1000);

            };
            vm.init();

            vm.isAllowed = true;
            vm.upFile = function () {
                if(!vm.isAllowed) {
                    return;
                }
                if(!filedata) {
                    vm.onLoadTxt = '重新上传';
                    commonService.showTips({
                        cssClass:'alert-fail',
                        msg: '请上传文件'
                    });
                    return;
                }
                vm.isAllowed = false;
                var fs = new FormData();
                fs.append('file', filedata);
                vm.url = CONFIG.webServer + '/appVersion/uploadPackage';
                vm.onLoadTxt = '上传中...';
                $http({
                    method:'post',
                    url:vm.url,
                    data: fs,
                    headers: {
                        'Content-Type':undefined,
                        'X-Auth-Token':$localStorage.Authorization,
                        'STORE_ID': $localStorage.STORE_ID
                    }
                }).success(function(data) {
                    if(data.resultCode == 0) {
                        vm.onLoadTxt = '已上传';
                        vm.App.uploadPath = data.resultData;
                    } else {
                        commonService.showTips({
                            cssClass:'alert-fail',
                            msg: data.resultMsg
                        });
                        vm.importText = '重试';
                    }
                    vm.isAllowed = true;

                }).error(function(data) {
                    vm.isAllowed = true;
                });
            };
            
            //
            vm.lookInfo = function (id) {
                var imprintModal = $modal.open({
                    templateUrl: 'tpl/modal/versionInfo.html',
                    controller: 'versionInfo',
                    size:'lg',
                    resolve: {
                        fieldParam: function () {
                            return {id: id}
                        }
                    }
                });
                imprintModal.result.then(function() {

                });
            };
            //返回
            vm.goHistory = function () {
                window.history.back(-1);
            };

        }
    ])

