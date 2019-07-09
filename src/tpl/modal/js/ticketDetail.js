/**
 * Created by Administrator on 2017/1/5.
 */
app.controller('ticketDetail', ['$scope','asset','modelService','$modalInstance','validateService', 'fieldParam',
    function($scope,asset,modelService,$modalInstance,validateService,fieldParam) {
        var vm = $scope.vm = {};
        //关闭弹框
        vm.cancleFunc = function() {
            $modalInstance.close();
            //vm.showDialog = false;
        };
        vm.getTicketDetail = function(){
            asset.findTicketDetail(fieldParam).success(function (data) {
                if (data.resultCode == 0) {
                    vm.infoData = data.resultData;
                    if(vm.infoData.status==3){
                        vm.getAllCompany();
                    }
                    if(vm.infoData.status==4||vm.infoData.status==5){
                        vm.getLogistic();
                    }


                }
            })
        };
        //状态1待审核2已驳回3待开票4已邮寄5已完成
        //待审核状态驳回通过操作1为驳回 2为通过
        vm.infoData={};
        vm.rejectAgreeFunc = function(flag){
            if(!vm.infoData.message){
                modelService.Alarm('info', '处理理由不能为空！' ,true, 1000);
                return;
            }
            if(flag==1){
                vm.infoData.status=2;
            }else if(flag==2){
                vm.infoData.status=3;
            }
            $modalInstance.close(vm.infoData);
            //vm.showDialog = false;
        };
        //待开票状态填写物流信息
        vm.companyData = [];
        vm.getAllCompany = function(){
            asset.findAllCompany().success(function (data) {
                if (data.resultCode == 0) {
                    var company = data.resultData;
                    angular.forEach(company, function(value, key) {
                        var obj={name:'',key:''};
                        obj.name = value.name;
                        obj.key = value.code;
                        vm.companyData.push(obj);
                    });
                }
            })
        };
        var validateForm = [
            {type: 'input', elem: '#invoiceNo', emptyTips: '请输入发票号码'},
            {type: 'input', elem: '#logisticsNo', emptyTips: '请输入快递单号'},
            {type: 'select', elem: '#companyName', emptyTips: '请输入公司名称'}
        ];
        validateService.blurValidate(validateForm);
        vm.choosedCompany={name:'',key:''};
        vm.saveLogistic = function(){
            var validate = validateService.submitValidate(validateForm);
            if (!validate) {
                return;
            }
            vm.infoData.logisticsName = vm.choosedCompany.name;
            vm.infoData.shipperCode = vm.choosedCompany.key;
            vm.infoData.status = 4;
            $modalInstance.close(vm.infoData);
           // vm.showDialog = false;
        };
        //获取物流信息
        vm.logistics = [];
        vm.getLogistic = function(){
            asset.getLogisticInfo({id:fieldParam}).success(function (data) {
                if (data.resultCode == 0) {
                    vm.logistics = data.resultData;
                }
            })
        };
        vm.init = function(){
            vm.getTicketDetail();
        };
        vm.init();
    }]);
