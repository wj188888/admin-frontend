app.controller('driverVerify', ["$scope","shop","modelService","$localStorage","$location",
    function( $scope,  shop,  modelService,  $localStorage,$location) {
        var vm = $scope.vm = {

            /**
             * 查询条件
             */
            search: {
                driverRoleEnums:['GENERAL','TAXI','CARHAILING']
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

            /**
             * 司机角色
             */
            driverRoleEnums: [
                {name:'客运司机', value:'GENERAL', checked: true},
                {name:'出租司机', value:'TAXI', checked: true},
                {name:'网约司机', value:'CARHAILING', checked: true}
            ],

            /**
             * 勾选司机角色
             */
            selectRole: function (driverRoleEnum) {
                var roles = []
                angular.forEach(this.driverRoleEnums, function (value, key) {
                    if(value.value == driverRoleEnum.value){
                        value.checked = !value.checked
                    }
                    if(value.checked){
                        roles.push(value.value)
                    }
                });
                this.search.driverRoleEnums = roles
                if(!this.search.driverRoleEnums.length){
                    this.search.qualification = ''
                }
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

            /**
             * 操作
             */
            handle: function(item){
                $location.path("/app/shop/driverVerifyHandle").search({id:item.id});
            }

        };

        vm.init()
    }
]);