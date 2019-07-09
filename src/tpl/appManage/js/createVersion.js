/**
 * Created by Administrator on 2016/11/1.
 */
app.controller('createVersion',
    ["$scope","version",'$localStorage', '$http','CONFIG',"commonService","modelService","$timeout","$stateParams","$state","validateService",
        function( $scope,version,$localStorage,$http,CONFIG,commonService,modelService,$timeout,$stateParams,$state,validateService) {
            var filedata = null;
            var fileValue = null;
            var vm = $scope.vm = {};
            // 文件名字
            vm.fileName = '';
            vm.onLoadTxt = '上传文件';

            vm.App={
                hotReapirVersion:'',
                updateMode:1,
                updateSwitch:1,
                appChannel:0,
                appName:'',
                uploadPath:'',
                downloadUrl:''
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

            // var versionId = $stateParams.id;
            /*if(versionId){
                //如果id存在，则查询车站详情，进行编辑
                version.searchDetailById(versionId).success(function(data){
                    if(data.resultCode == 0){
                        vm.App = data.resultData;
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            };*/

            //获取可选择的产品类别
            vm.productTypeLevelOnes = commonService.product.enumeration;
            vm.productTypeOne = [];
            vm.init = function () {
                version.getNewAppTypeAppVersion().success(function(data){
                    if(data.resultCode == '0'){
                        vm.LevelOnes = data.resultData;
                        angular.forEach(vm.LevelOnes,function (val1) {
                            angular.forEach(vm.productTypeLevelOnes,function (val2) {
                                if(val1 == val2.code){
                                    vm.productTypeOne.push({code:val1,name:val2.name})
                                }
                            })
                        });
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
                /*
                * 上传文件
                * */
                setTimeout(function() {
                    $('#upfile').hover(function() {
                        if(!filedata) {
                            $('#upfileBtn').css({
                                background: '#f8f8f8'
                            })
                        }

                    }, function() {
                        if(!filedata) {
                            $('#upfileBtn').css({
                                background: '#fff'
                            })
                        }
                    });
                    $('#upfile').on('change', function() {
                        filedata = document.getElementById('upfile').files[0];
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
                            } else {
                                vm.fileName = '';
                            }
                        });

                        $(this).clone(true).replaceAll(this);
                    });
                }, 1000);

            };
            vm.init();

            /*
             * 点击应用包名下载
             * */
            vm.uploadPath = function (data) {
                angular.forEach(vm.loadLists,function (val,index) {
                    if(data === val.name){
                        vm.App.downloadUrl = val.href;
                    }
                });
            };

            vm.isAllowed = true;
            vm.upFile = function () {
                if(!vm.isAllowed) {
                    return;
                }
                if(!filedata) {
                    vm.onLoadTxt = '上传文件';
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
                        vm.App.uploadPath = data.resultData;
                        vm.onLoadTxt = '已上传';
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

            var validateForm;
            vm.createVersionFunc = function(){
                vm.App.appChannel = 0;
                // var hotVersion=vm.App.hotReapirVersion;
                // if(hotVersion!==""){
                    validateForm = [
                        {type: 'select', elem: '#productTypeLevelOne', emptyTips: '请选择产品类别'},
                        {type: 'input', elem: '#version', emptyTips: '请输入APP版本号'},
                        {type: 'input', elem: '#downUrl', emptyTips: '请输入下载地址'},
                        {type: 'input', elem: '#content', emptyTips: '请输入更新内容'},
                        // {type: 'input', elem: '#alias', emptyTips: '请输入APP版本别名'},
                        // {type: 'input', elem: '#hotVersion', emptyTips: '请输入修复包APP版本号'},
                        // {type: 'input', elem: '#hotDownUrl', emptyTips: '请输入修复包下载地址'},
                        // {type: 'input', elem: '#hotContent', emptyTips: '请输入修复包更新内容'}
                    ]
                /*}else{
                    validateForm = [
                        {type: 'select', elem: '#productTypeLevelOne', emptyTips: '请选择产品类别'},
                        {type: 'input', elem: '#version', emptyTips: '请输入APP版本号'},
                        {type: 'input', elem: '#downUrl', emptyTips: '请输入下载地址'},
                        {type: 'input', elem: '#content', emptyTips: '请输入更新内容'},
                        {type: 'input', elem: '#alias', emptyTips: '请输入APP版本别名'}
                    ];
                }*/
                validateService.blurValidate(validateForm);
                var validate = validateService.submitValidate(validateForm);
                if (!validate) {
                    return;
                }
                // if(versionId){
                //     version.editVersion(versionId,vm.App).success(function(data){
                //         if(data.resultCode == '0'){
                //             modelService.Alarm('success', '编辑版本成功!', true, 1000);
                //             $timeout(function(){
                //                 $state.go('app.appManage.versionList');
                //             },1500);
                //         }else{
                //             modelService.Alarm('info', data.resultMsg, true, 1000);
                //         }
                //     })
                // }else{
                    if(vm.onLoadTxt == '已上传'){
                        version.createVersion(vm.App).success(function(data){
                            if(data.resultCode == '0'){
                                modelService.Alarm('success', '创建版本成功!', true, 1000);
                                $timeout(function(){
                                    $state.go('app.appManage.versionList');
                                },1500);
                            }else{
                                modelService.Alarm('info', data.resultMsg, true, 1000);
                            }
                        })
                    }else{
                        modelService.Alarm('success', '应用包上传成功才保存', true, 1000);
                    }

                // }

            };
            //获取产品名称
            vm.appProductName = function (data) {
                angular.forEach(data,function (val,index) {
                    if(vm.App.productTypeLevelOne === val.code) {
                        vm.App.appName = val.name;
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
            vm.goHistory = function () {
                window.history.back(-1);
            };

        }
    ])
