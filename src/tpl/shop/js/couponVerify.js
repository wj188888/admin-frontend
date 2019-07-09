app.controller('couponVerify', ["$scope","shop","modelService","$localStorage","$location",
    function( $scope,  shop,  modelService,  $localStorage,$location) {
        var dialog = '';
        var vm = $scope.vm = {

            /**
             * 查询条件
             */
            search: {
                driverRoleEnums:['GENERAL','TAXI','CARHAILING']
            },

            /**
             * 搜索
             */
            searchEvent: function(){
                this.options.refresh(this.search);
            },

            /**
             * 清除搜索
             */
            clearEvent: function(){
                this.driverRoleEnums = [
                    {name:'客运司机', value:'GENERAL', checked: true},
                    {name:'出租司机', value:'TAXI', checked: true},
                    {name:'网约司机', value:'CARHAILING', checked: true}
                ];
                this.search = {
                    driverRoleEnums:['GENERAL','TAXI','CARHAILING']
                };
                this.searchEvent()
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
                console.log(vm.qualificationFailReason);
                /*var validateForm = [
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
                })*/
            },

            /**
             * 初始化方法
             */
            init: function () {
                this.options = {
                    url:'/driver/find',
                    data: this.search,
                    method: 'post'
                }
            },
        };

        vm.init()
    }
]);