app.controller('customerDetail',
    ["$scope", "$stateParams", "shop","commonService","modelService","$timeout","$state",
        function( $scope, $stateParams, shop,commonService,modelService,$timeout,$state) {
            var vm = $scope.vm = {

                customerData: '', // 客户基本信息

                getCustomerData: function() {
                    shop.getCustomerData($stateParams.id).success(function(data) {
                        if (data.resultCode == 0) {
                            vm.customerData = data.resultData;

                            var newDate = new Date(vm.customerData.stores[0].qualificationTime)
                            var nowDate = new Date().getTime();
                            var startMs = newDate.getTime();
                            newDate.setFullYear(newDate.getFullYear()+1);
                            var endMs = newDate.getTime();//
                            vm.endDate = newDate.getFullYear() + '-' +
                                (newDate.getMonth()+1) + '-' +
                                newDate.getDate() + ' ' +
                                newDate.getHours() + ':' +
                                newDate.getMinutes() + ':' +
                                newDate.getSeconds();
                            vm.diffDay = Math.floor((endMs-nowDate)/86400000);
                            angular.forEach(vm.customerData.stores, function(value, index) {
                                if(value.qualificationTime) {
                                    var newDate = new Date(value.qualificationTime)
                                    var nowDate = new Date().getTime();
                                    var startMs = newDate.getTime();
                                    newDate.setFullYear(newDate.getFullYear()+1);
                                    var endMs = newDate.getTime();
                                    value.endDate = newDate.getFullYear() + '-' +
                                        (newDate.getMonth()+1) + '-' +
                                        newDate.getDate() + ' ' +
                                        newDate.getHours() + ':' +
                                        newDate.getMinutes() + ':' +
                                        newDate.getSeconds();
                                    value.diffDay = Math.floor((endMs-nowDate)/86400000);
                                }
                            })
                        }else{
                            modelService.Alarm('info', data.resultMsg, true, 1000);
                        }
                    })
                },

                init: function() {
                    vm.getCustomerData();
                }
            };


            vm.init();

        }
    ])