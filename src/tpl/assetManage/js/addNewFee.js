/**
 * Created by Administrator on 2017/3/13.
 */
app.controller('addNewFee',
    ["$scope","validateService","asset","$localStorage","qiniuService","adminSet","region","$timeout","modelService","$state","CONSTANTS","$stateParams",
        function( $scope,validateService,asset,$localStorage,qiniuService,adminSet,region,$timeout,modelService,$state,CONSTANTS,$stateParams) {
            var vm = $scope.vm = {};
            vm.commonName = [];
            vm.bindData = {cityId:'',provinceId:''};
            vm.ruleData = {province:'',city:'',chargingRuleItems:[{carGrade:0,nightFee:'',durationFee:'',longJourneyFee:'',mileageFee:'',startupFee:'',minConsumptionAmount:''}]};
            var ruleId = $stateParams.id;
            // vm.FeeRuleMessage.detailFeeRateList=[];

            // 新增计费规则初始值
            vm.FeeRuleMessage={
                province: "",
                city: "",
                ruleType: 0,
                contractStart: "",
                storeId: "",
                isFirst: true,
                storeName: "",
                contractEnd: "",
                platformRate: 0.6,
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
                // stationServiceFee: 0,
                // wxRate: 0,
                contractCode: "",
                contractPerson: "",
                contractPersonPhone: "",
                // id: "",
                contractDate: ""
            };

            vm.initProductFeeRateList = function() {
                if(!vm.FeeRuleMessage.isFirst) {
                    return false;
                }
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
                    'GOODS',
                    'TOUR_BUS'
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
            * 切换保险接口清空数据
            * */
            vm.clearInsuranceServiceRate = function () {
                vm.FeeRuleMessage.insuranceServiceRate = 0
            }

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
                vm.shopNames = [];
            };

            vm.shopNames = [];
            vm.getAllShop = function (provinceId,cityId) {
                vm.shopNames = [];
                if(provinceId||cityId){
                    asset.findAllStoreNew({
                        provinceId:provinceId,
                        cityId:cityId
                    }).success(function(data){
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
                }

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
                    vm.FeeRuleMessage.contractUrl = $('#success3Input').val();
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
                    $localStorage.FeeRuleAdd = vm.FeeRuleMessage;
                    console.log($localStorage.FeeRuleAdd);
                    $state.go('app.assetManage.addNewFeeTwo');
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
                    vm.FeeRuleMessage.contractUrl = $('#success3Input').val();
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
                    $localStorage.FeeRuleAdd = vm.FeeRuleMessage;
                    $state.go('app.assetManage.addDefaultFee');
                }
            };

            vm.goHistory = function () {
                $state.go('app.assetManage.feeManage')
            };


            /*
             * 默认数据写入
             * */
            vm.fillInData= function() {
                if($localStorage.FeeRuleAdd) {
                    vm.FeeRuleMessage = $localStorage.FeeRuleAdd;
                    // console.log(vm.FeeRuleMessage);
                    vm.findCity(vm.FeeRuleMessage.province);
                    $('#success3').css('background-image','url("'+ vm.FeeRuleMessage.contractUrl +'")').show();
                    $('#success3Input').val(vm.FeeRuleMessage.contractUrl);
                }
            };

            vm.init = function () {
                // $localStorage.feeRuleStep2 = null;
                vm.initImgUpload(); // 初始化图片上传插件
                $timeout(function () {
                    vm.getAllShop(vm.FeeRuleMessage.province,vm.FeeRuleMessage.city);
                },500);

                vm.findProvince(); // 获取城市下拉列表
                vm.fillInData(); // 初始化默认数据写入
                // vm.initProductFeeRateList();
            };
            vm.init();
        }
    ])