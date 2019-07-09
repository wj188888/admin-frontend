'use strict';

/**
 * 表单验证
 */
angular.module('app')
    .service('validateService', ['CONSTANTS', 'commonService',
        function (CONSTANTS, commonService) {
            this.blurValidate = function (array) {
                angular.forEach(array, function (obj) {
                    var $elem = $(obj.elem);
                    if (obj.type == 'input') {
                        $elem.blur(function () {
                            var validata = true;
                            _validate(obj, validata);
                        });
                    } else if (obj.type == 'select') {
                        $elem.change(function () {
                            var validata = true;
                            _validate(obj, validata);
                        });
                    }
                });
            };

            this.submitValidate = function (array) {
                var validata = true;
                angular.forEach(array, function (obj) {
                    validata = _validate(obj, validata);
                });
                return validata;
            };

            function _validate(obj, validata) {
                var _this = $(obj.elem),
                    emptyTips = obj.emptyTips,
                    regTips = obj.regTips || emptyTips,
                    errorTips = obj.errorTips,
                    regName = obj.regName,
                    maxNum = obj.maxNum || 0,
                    minNum = obj.minNum || 0,
                    minlength = obj.minlength,
                    eqLength = obj.eqLength,
                    serverValidate = obj.serverValidate,
                    value = $.trim(_this.val());

                //为空验证
                if (value == '') {
                    validata = _displayError(_this, emptyTips);
                } else {
                    if (regName && !CONSTANTS.regExp[regName].test(value)) {
                        validata = _displayError(_this, regTips);
                    }

                    //最小长度
                    if (minlength != undefined) {
                        if (value.length <= minlength) {
                            validata = _displayError(_this, errorTips);
                        }
                    }

                    //长度
                    if (eqLength != undefined) {
                        if (value.length != eqLength) {
                            validata = _displayError(_this, errorTips);
                        }
                    }

                    //重复密码校验
                    if (obj.eqValue != undefined) {
                        if (value != $(obj.eqValue).val()) {
                            validata = _displayError(_this, errorTips);
                        }
                    }
                    //最大值检查
                    if (maxNum) {
                        if (+value > +maxNum) {
                            validata = _displayError(_this, errorTips);
                        }
                    }

                    //最小值检查
                    if (minNum) {
                        if (+value < +minNum) {
                            validata = _displayError(_this, errorTips);
                        }
                    }

                    // var data;
                    // switch (serverValidate) {
                    //     case 'phone':
                    //         data = firmUser.phoneExist({phone: value});
                    //         data.resultMsg = '该' + data.resultMsg;
                    //         break;
                    //     case 'brandName':
                    //         data = store.brandNameExist({brandName: value});
                    //         break;
                    //     case 'driverCreateCheck':
                    //         data = driver.driverCreateCheck({telephone: value});
                    //         break;
                    // }
                    // if (data && data.resultCode != '0') {
                    //     commonService.showTips({
                    //         cssClass:'alert-fail',
                    //         msg: data.resultMsg
                    //     });
                    //     validata = false;
                    // }
                }

                if (validata) {
                    _this.parent().removeClass('has-error');
                    _this.siblings('.error-msg').remove();
                }
                return validata;
            }

            function _displayError(elem, errorTips) {
                var $parent = elem.parent(),
                    $errorMsg = $parent.find('.error-msg');
                $parent.addClass('has-error');
                if ($errorMsg.length > 0) {
                    $errorMsg.html(errorTips);
                } else {
                    $parent.append('<p class="error-msg">' + errorTips + '</p>');
                }
                return false;
            }
        }
    ]);

