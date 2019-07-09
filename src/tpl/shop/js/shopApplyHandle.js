/**
 * Created by Administrator on 2017/1/11.
 */
app.controller('shopApplyHandle',
    ["$scope","modelService","$localStorage","$location","shop","$timeout",'validateService',
        function( $scope,  modelService,  $localStorage ,$location,shop,$timeout,validateService) {
            var vm = $scope.vm = {};
            $scope.id = $location.search().id;
            console.log($scope.id);
            shop.findApplyById($scope.id).success(function(data){
                $scope.page = data.resultData;
            });
            //查询驳回理由标签
            vm.findRejectLabels = function () {
                shop.findLabels({
                    type:0
                }).success(function(data){
                    if (data.resultCode == 0) {
                        vm.labelLists = data.resultData;
                    }
                })
            };
            //填充驳回理由
            vm.fillEvent = function(content){
                vm.qualificationFailReason=content;
            };
            /**
             *  驳回
             */
            var dialog;
            vm.rejectApply = function(){
                vm.findRejectLabels();
                dialog= modelService.Dialog('tpl/modal/rejectReason.html','reset-dialog-content',true,'',$scope);
            };
            /**
             * flag 1 审核通过 2 驳回
             * String id, adminStatus adminMessage
             */
            vm.rejectFunc = function () {
                var validateForm = [
                    {type: 'input', elem: '#reason', emptyTips: '请输入驳回理由'}
                ];
                validateService.blurValidate(validateForm);
                var validate = validateService.submitValidate(validateForm);
                if (!validate) {
                    return;
                }
                shop.handlePlatApply({
                    id:$scope.page.id,
                    qualification:2,
                    qualificationFailReason:vm.qualificationFailReason
                }).success(function(data){
                    if (data.resultCode == 0) {
                        modelService.Alarm('success', '操作成功!', true, 1000);
                        modelService.close(dialog);
                        $timeout(function(){
                            $location.path("/app/shop/shopVerify");
                        },1000);
                    }else{
                        modelService.close(dialog);
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })
            };
            vm.closeDialog = function () {
                modelService.close(dialog);
            };
            vm.passApply = function(){
                shop.handlePlatApply({
                    id:$scope.page.id,
                    qualification:1
                }).success(function(data){
                    if (data.resultCode == 0) {
                        modelService.Alarm('success', '操作成功!', true, 1000);
                        $timeout(function(){
                            $location.path("/app/shop/shopVerify");
                        },1000);
                    }else{
                        modelService.Alarm('info', data.resultMsg, true, 1000);
                    }
                })

            };

            // 放大后的高宽
            vm.drawImg = function (ImgD) {
                var showImg2 = document.getElementById("plat-brief");
                var showImg3 = document.getElementById("plat-brief").getElementsByTagName("img");
                var imgWidth = ImgD.width();
                var imgHeight = ImgD.height();
            };
            vm.viewBigImg = function (obj,iframe,showImg,$showImg) {
                var src = obj.attr('src');
                // var iframe = document.getElementById("transbox");
                var iframe = document.getElementById(iframe);
                iframe.style.display = "";
                iframe.style.height = document.body.clientHeight + "px";
                iframe.style.width = document.body.clientWidth  + "px";
                // var showImg = document.getElementById("showImgImg");
                var showImg = document.getElementById(showImg);
                // var objShowImg = $('#showImgImg');
                var objShowImg = $showImg;
                showImg.src = obj.attr('src');
                showImg.style.display = "";
                var imgWidth = objShowImg.width();
                var imgHeight = objShowImg.height();
                return false;
            };
            vm.hideImgImg = function (iframe,showImg) {
                // var iframe = document.getElementById("transbox");
                var iframe = document.getElementById(iframe);
                iframe.style.display = "none";
                // var showImg = document.getElementById("showImgImg");
                var showImg = document.getElementById(showImg);
                showImg.style.display = "none";
            };


            // 获取平台信息里的所有img标签
            vm.selectImg =function () {
                var reg = /<img[^>]*>/gi;
                var str2 = vm.customContents[0].content;
                vm.imgArr = str2.match(reg);
                angular.forEach(vm.imgArr,function (value,index) {
                    var id = $(value);

                })
            };

            // 定位查看遮罩层
            vm.showImgMark = function (value,index,plat) {
                value.on('mouseover', function() {
                    this.style.cursor = 'pointer';
                    var imgoffsetLeft = this.offsetLeft + 15;
                    var imgoffsetTop = this.offsetTop - document.getElementById(plat).scrollTop;
                    var imgMark = document.getElementsByClassName('img-mark')[index];
                    imgMark.style.left = imgoffsetLeft+1 + 'px';
                    imgMark.style.top = imgoffsetTop+1 + 'px';
                    imgMark.style.display = 'block';
                    imgMark.style.cursor = 'pointer';
                });
                value.on('mouseout', function() {
                    var imgMark = document.getElementsByClassName('img-mark')[index];
                    imgMark.style.display = 'none';
                });
            };


            vm.initImg = function() {
                var ObjImgs3 = $('#plat-brief3').find('img');
                ObjImgs3.on('click', function() {
                    vm.viewBigImg($(this),"transbox3","showImgImg3",$('#showImgImg3'));
                    vm.drawImg($(this))
                });
                vm.showImgMark(ObjImgs3,0,'plat-brief3');
            };
            vm.init = function () {
                setTimeout(function() {
                    vm.initImg()
                }, 500)
            };
            vm.init();

        }]);
