/**
 * Created by Administrator on 2017/3/13.
 */
app.controller('addNewFeeEdit',
    ["$scope","validateService","asset","$localStorage","qiniuService","adminSet","region","$timeout","modelService","$state","CONSTANTS","$stateParams",
        function( $scope,validateService,asset,$localStorage,qiniuService,adminSet,region,$timeout,modelService,$state,CONSTANTS,$stateParams) {
            var vm = $scope.vm = {};
            vm.commonName = [];
            vm.bindData = {cityId:'',provinceId:''};
            vm.ruleData = {province:'',city:'',chargingRuleItems:[{carGrade:0,nightFee:'',durationFee:'',longJourneyFee:'',mileageFee:'',startupFee:'',minConsumptionAmount:''}]};
            var ruleId = $stateParams.id;
            vm.id = $stateParams.id;

            // 新增计费规则初始值
            vm.FeeRuleMessage={
                province: "",
                city: "",
                ruleType: 0,
                contractStart: "",
                storeId: "",
                contractEnd: "",
                platformFixInsuranceFeeType:'',
                platformFixServiceFeeType:'',
                detailFeeRateList:[
                    {
                        alias:'',
                        startDate:'',
                        endDate:'',
                        productFeeRateList: []
                    }
                ],
                insuranceType: 0,
                contractUrl: "",
                insuranceServiceRate: 0,
                contractCode: "",
                contractPerson: "",
                contractPersonPhone: "",
                // id: "",
                contractDate: ""
            };

            vm.initProductFeeRateList = function() {
                var productName = [
                    'CITY_BUS',
                    'AIRPORT_BUS',
                    'TRAIN_STATION_BUS',
                    'SCENIC_BUS',
                    'SCHOOL_BUS',
                    'WORK_BUS',
                    'LINE_BUS',
                    'CUSTOM_BUS',
                    'CAR_HAILING',
                    'TAXI',
                    'CAR_RENTAL',
                    'STATION_BUS',
                    'TOUR_BUS',
                ]
                for(var i = 0; i < 13; i++) {
                    var tempObj = {
                        platformInsuranceType: '1',
                        platformFixInsuranceFeeRate: '0',
                        platformServiceType: '1',
                        firmServiceRate: '',
                        platformFixInsuranceFee: '',
                        firmInsuranceRate: '0',
                        platformFixServiceFee: '',
                        platformFixServiceFeeRate: '0',
                        platformInsuranceRate: '0',
                        platformServiceRate: '0',
                        distributorRate: '0',
                        productTypeLevelOne:productName[i]
                    }
                    vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList.push(tempObj);
                }
            };

            /*
             * 初始化上传图片插件
             * */
            vm.initImgUpload = function () {
                qiniuService.uploadFile({uploadBtn: 'jszCard1',progresseId: 'progress3',showImgId: '#success3'});
            };

            /*
             * 表单验证
             * */
            var validateForm = [
                {type: 'select', elem: '#province', emptyTips: '请选择省份'},
                {type: 'select', elem: '#city', emptyTips: '请选择城市'},
                {type: 'select', elem: '#storeId', emptyTips: '请选择平台'},
                {type: 'input', elem: '#contractCode', emptyTips: '请输入合同编号'},
                {type: 'input', elem: '#contractPerson', emptyTips: '请输入签约代理人'},
                {type: 'input', elem: '#contractPersonPhone', emptyTips: '请输入手机号码',regTips: '您输入的手机号格式不正确', regName: 'tel'},
                {type: 'input', elem: '#signDate', emptyTips: '请输入合同签约日期'},
                {type: 'input', elem: '#effectiveDate', emptyTips: '请输入合同生效日期'},
                {type: 'input', elem: '#endDate', emptyTips: '请输入合同截止日期'}
            ];
            validateService.blurValidate(validateForm);

            /**
             * 查询省市县
             * @param type [storeProvince, storeCity, storeCounty] [firmProvince, firmCity, firmCounty]
             * @param id
             */
            vm.provinces = [];
            vm.findProvince = function() {
                region.findSubRegions({id: 0}).success(function (data) {
                    if (data.resultCode == '0') {
                        vm.provinces = data.resultData;
                    }
                });
            };
            vm.citys = [];
            vm.findCity = function(id) {
                region.findSubRegions({id: id}).success(function (data) {
                    if (data.resultCode == '0') {
                        vm.citys = data.resultData;
                    }
                });
            };

            vm.showCityError = true;

            /*
             * 自定义计费规则点击下一步执行的函数
             * */
            vm.newRuleCreateBtn= {
                text: '下一步',
                    disabled: false,
                newRuleCreate: function(){
                    var validate = validateService.submitValidate(validateForm);
                    if (!validate) {
                        return;
                    }
                    if(!$('#success3Input').val()){
                        modelService.Alarm('info', '请上传合同页面', true, 1000);
                        return false
                    }
                    asset.findAllStore().success(function(data){
                        if(data.resultCode == '0'){
                            var shops = data.resultData;
                            for(var x in shops){
                                if(vm.FeeRuleMessage.storeId == shops[x].id){
                                    vm.FeeRuleMessage.storeName = shops[x].brandName;
                                }
                            }
                        }
                    });
                    vm.FeeRuleMessage.contractUrl = $('#success3Input').val();
                    $timeout(function () {
                        $localStorage.FeeRuleAdd = vm.FeeRuleMessage;
                        $state.go('app.assetManage.addNewFeeTwoEdit');
                    }, 500);

                }
            };

            /*
             * 选择默认计费规则点击下一步执行的函数
             * */
            vm.newRuleCreateBtnNormal= {
                text: '下一步',
                disabled: false,
                newRuleCreate: function(){
                    var validate = validateService.submitValidate(validateForm);
                    if (!validate) {
                        return;
                    }
                    if(!$('#success3Input').val()){
                        modelService.Alarm('info', '请上传合同页面', true, 1000);
                        return false
                    }
                    asset.findAllStore().success(function(data){
                        if(data.resultCode == '0'){
                            var shops = data.resultData;
                            for(var x in shops){
                                if(vm.FeeRuleMessage.storeId == shops[x].id){
                                    vm.FeeRuleMessage.storeName = shops[x].brandName;
                                }
                            }
                        }
                    });
                    vm.FeeRuleMessage.contractUrl = $('#success3Input').val();
                    // console.log(vm.FeeRuleMessage.contractUrl);
                    $localStorage.FeeRuleAdd = vm.FeeRuleMessage;
                    $state.go('app.assetManage.addDefaultFeeEdit');
                }
            };

            vm.goHistory = function () {
                $state.go('app.assetManage.feeManage')
            };
            vm.shopNames = [];
            vm.getAllShop = function () {
                asset.findAllStore().success(function(data){
                    if(data.resultCode == '0'){
                        var shops = data.resultData;
                        // console.log(shops);
                        angular.forEach(shops,function(value,key){
                            var obj={id:'',name:''};
                            obj.id = value.id;
                            obj.name = value.brandName;
                            vm.shopNames.push(obj);
                        })
                    }
                });
            };
            vm.init = function () {
                vm.initImgUpload(); // 初始化图片上传插件
                vm.findProvince();
                vm.getAllShop();
                vm.initProductFeeRateList();

               /*
               * 初始化查询规则信息通过id
               * */
                asset.feeRateConfigById(vm.id).success(function (data) {
                    if(data.resultCode == 0){
                        // 所有返回信息
                        vm.FeeRuleMessage =  data.resultData;
                        vm.FeeRuleMessage.detailFeeRateList[0] = data.resultData.detailFeeRateList[0];
                        $('#success3').css('background-image','url("'+ vm.FeeRuleMessage.contractUrl +'")').show();
                        $('#success3Input').val(vm.FeeRuleMessage.contractUrl);
                        angular.forEach(vm.FeeRuleMessage.detailFeeRateList[0].productFeeRateList,function(data, index) {
                            if(!data.platformServiceType) {
                                data.platformServiceType = 1;
                            }
                            if(!data.platformInsuranceType) {
                                data.platformInsuranceType = 1;
                            }
                        });
                       /* if(vm.FeeRuleMessage.ruleType == 0){
                            vm.FeeRuleMessage.clearRuleType = 0;
                        }*/
                        vm.findCity(vm.FeeRuleMessage.province);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                });
            };
            vm.init();
        }
    ])