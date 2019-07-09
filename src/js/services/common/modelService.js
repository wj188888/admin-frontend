angular.module('app')
    .factory('modelService', ['$timeout', 'ngDialog',
        function ($timeout, ngDialog) {
            //对话框集合
            return {
                /**
                 * [Confirm 弹出提示]
                 * @param title [提示标题]
                 * @param content [提示内容]
                 * @param successCallback [成功回调]
                 * @param cancelCallback [失败回调]
                 * @returns {*}
                 * @constructor
                 */
                Confirm: function (title, content, successCallback, cancelCallback) {
                    return ngDialog.openConfirm({
                        template: '<div class="ngdialog-message">' +
                        '<h4 class=\'socm-font-16\'>' + title + '</h4>' +
                        '<p>' + content + '</p>' +
                        '</div>' +
                        '<div class="ngdialog-buttons">' +
                        '<input type="button" class="btn btn-success" value="确定" ng-click="confirm();"/>' +
                        '<input type="button" class="btn btn-danger mar-l-10" value="取消" ng-click="closeThisDialog();"/>' +
                        '</div>',
                        className: 'ngdialog-theme-default ngdialog-theme-custom',
                        plain: true,
                        showClose: false
                    })
                    .then(function () {
                        if (successCallback) {
                            successCallback();
                        }
                    }, function () {
                        if (cancelCallback) {
                            cancelCallback();
                        }
                    });
                },
                /**
                 * [Alarm 警告提示]
                 * @param {[string]} type          [提示类型]
                 * @param {[string]} content       [提示内容]
                 * @param {[bool]}   autoClose     [是否定时自动关闭]
                 * @param {[int]}    time          [定时关闭时间毫秒]
                 */
                Alarm: function (type, content, autoClose, time) {
                    var dialog = undefined;
                    var strType = type ||  'success';
                    var isClose = autoClose || true;
                    var closetime = time || 1000;
                    switch (strType) {
                        case 'success':
                            dialog = ngDialog.open({
                                template: '<div class="alert alert-success" role="alert"><strong>提示：</strong>' + content + '</div>',
                                plain: true,
                                showClose: false
                            });
                            break;
                        case 'info':
                            dialog = ngDialog.open({
                                template: '<div class="alert alert-info" role="alert"><strong>提示：</strong>' + content + '</div>',
                                plain: true,
                                showClose: false
                            });
                            break;
                        case 'warning':
                            dialog = ngDialog.open({
                                template: '<div class="alert alert-warning" role="alert"><strong>提示：</strong>' + content + '</div>',
                                plain: true,
                                showClose: false
                            });
                            break;
                        case 'danger':
                            dialog = ngDialog.open({
                                template: '<div class="alert alert-danger" role="alert"><strong>提示：</strong>' + content + '</div>',
                                plain: true,
                                showClose: false
                            });
                            break;
                    }
                    if (dialog && isClose) {
                        if (isClose) {
                            setTimeout(function () {
                                dialog.close();
                            }, closetime);
                        }
                    }
                    return dialog;
                },
                /**
                 * [Dialog 打开模式对话框]
                 * @param {[string]}    template  [模版路径]                 必须
                 * @param {[string]}    className [效果classname]            必须
                 * @param {[bool]}      autoClose [点击空白区是否自动关]     必须
                 * @param {Function}    callback  [回调函数]
                 * @param {[object]}    scope     [父容器Scope对象]
                 */
                Dialog: function (template, className, autoClose, callback, scope) {
                    if (autoClose) {
                        autoClose = true;
                    } else {
                        autoClose = false;
                    }
                    if (!scope) {
                        return ngDialog.open({
                            template: template,
                            className: 'ngdialog-theme-default ' + className,
                            cache: false,
                            preCloseCallback: function (value) {
                                if (value === '$closeButton' || value === undefined) {
                                    if (callback) {
                                        callback();
                                    }
                                    return true;
                                }
                                if (callback) {
                                    if (autoClose) {
                                        callback();
                                    }
                                }
                                return autoClose;
                            }
                            //overlay: autoClose
                        });
                    } else {
                        return ngDialog.open({
                            template: template,
                            className: 'ngdialog-theme-default ' + className,
                            cache: false,
                            scope: scope,
                            preCloseCallback: function (value) {
                                if (value === '$closeButton' || value === undefined) {
                                    if (callback) {
                                        callback();
                                    }
                                    return true;
                                }
                                if (callback) {
                                    if (autoClose) {
                                        callback();
                                    }
                                }
                                return autoClose;
                            }
                            //overlay: autoClose
                        });
                    }
                },
                /**
                 * [close 关闭指定的对话窗口]
                 * @param  {[object]} dialog [窗口对象]
                 * @return {[null]}        [无]
                 */
                close: function (dialog) {
                    if (dialog) {
                        dialog.close();
                    } else {
                        ngDialog.closeAll();
                    }
                }
            };
        }
    ])