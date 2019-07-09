app.controller('siteVerify',
    ["$scope", '$stateParams', 'validateService', 'CONSTANTS',"station","commonService","modelService","$timeout","$state",
        function( $scope, $stateParams, validateService, CONSTANTS,station,commonService,modelService,$timeout,$state) {
            var dialog = '';
            var vm = $scope.vm = {

                publicSiteTypes: angular.copy(CONSTANTS.privateSiteTypes), // 站点类型

                selectedSite: [], // 被选中的站点

                tempSelectedSite: [], // 被选中的站点

                site: {}, // 站点信息

                tempSite: {},

                disabled: true,

                showTip: true,

                /*
                * 获取站点信息
                * */
                getSiteData: function() {
                    station.getSiteData($stateParams.id).success(function(data){
                        if(data.resultCode == '0') {
                            vm.site = data.resultData;
                            vm.site.area = vm.site.province.name + '-' +
                                vm.site.city.name + '-' +
                                vm.site.county.name;
                            if(vm.site.town) {
                                vm.site.area += '-' + vm.site.town.name;
                            }

                            if(vm.site.types&&vm.site.types.length>0) {
                                angular.forEach(vm.site.types, function(value, index) {
                                    if(value < 4) {
                                        vm.tempSelectedSite.push(vm.publicSiteTypes[value-1].name);
                                    } else {
                                        vm.tempSelectedSite.push(vm.publicSiteTypes[value-3].name);
                                    }
                                });
                            }
                            if(vm.site.tempSite) {
                                vm.tempSite = data.resultData.tempSite;

                                if(vm.tempSite.types&&vm.tempSite.types.length>0) {
                                    angular.forEach(vm.tempSite.types, function(value, index) {
                                        if(value < 4) {
                                            vm.publicSiteTypes[value-1].clicked = true;
                                        } else {
                                            vm.publicSiteTypes[value-3].clicked = true;
                                        }
                                    });
                                }
                            } else {
                                vm.showTip = false;
                                vm.tempSite = angular.copy(vm.site);
                                if(vm.tempSite.types&&vm.tempSite.types.length>0) {
                                    angular.forEach(vm.tempSite.types, function(value, index) {
                                        if(value < 4) {
                                            vm.publicSiteTypes[value-1].clicked = true;
                                        } else {
                                            vm.publicSiteTypes[value-3].clicked = true;
                                        }
                                    });
                                }
                            }
                            //console.log(vm.publicSiteTypes);

                            // 定位百度地图
                            var map = new BMap.Map("map-location");
                            var point = new BMap.Point(vm.tempSite.longitude, vm.tempSite.latitude);
                            map.centerAndZoom(point, 20);
                            var myIcon = new BMap.Icon("img/mapIcon/icon.png", new BMap.Size(25,38));
                            var marker2 = new BMap.Marker(point, {icon:myIcon});  // 创建标注
                            map.addOverlay(marker2);
                        } else {
                            modelService.Alarm('info', data.resultMsg, true, 1000);
                        }
                    });
                },

                closeDialog: function () {
                    modelService.close(dialog);
                },

                rejectApply: function(){
                    // vm.findRejectLabels();
                    dialog= modelService.Dialog('tpl/modal/rejectReason.html','reset-dialog-content',true,'',$scope);
                },

                //填充驳回理由
                fillEvent: function(content){
                    vm.qualificationFailReason=content;
                },

                rejectFunc: function () {
                    var validateForm = [
                        {type: 'input', elem: '#reason', emptyTips: '请输入驳回理由'}
                    ];
                    validateService.blurValidate(validateForm);
                    var validate = validateService.submitValidate(validateForm);
                    if (!validate) {
                        return;
                    }
                    station.siteQualification({
                        id:$stateParams.id,
                        qualification:2,
                        qualificationFailReason:vm.qualificationFailReason
                    }).success(function(data){
                        if (data.resultCode == 0) {
                            modelService.Alarm('success', '操作成功!', true, 1000);
                            modelService.close(dialog);
                            $timeout(function(){
                                $state.go("app.stationManage.siteList");
                            },1000);
                        }else{
                            modelService.close(dialog);
                            modelService.Alarm('info', '操作失败!', true, 1000);
                        }
                    })
                },

                passFunc: function() {
                    station.siteQualification({
                        id:$stateParams.id,
                        qualification:1,
                        qualificationFailReason:''
                    }).success(function(data){
                        if (data.resultCode == 0) {
                            modelService.Alarm('success', '操作成功!', true, 1000);
                            $timeout(function(){
                                $state.go("app.stationManage.siteList");
                            },1000);
                        }else{
                            modelService.Alarm('info', '操作失败!', true, 1000);
                        }
                    })
                },

                init: function() {
                    vm.getSiteData();
                    /*$scope.$watch('vm.publicSiteTypes', function(newval, oldval) {
                        console.log(newval);
                        console.log(oldval);
                    });*/
                }
            };

            vm.init();
        }


    ]);