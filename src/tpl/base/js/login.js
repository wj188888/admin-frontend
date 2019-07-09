app.controller('login', ['$rootScope', '$scope', 'login', 'CONFIG', 'validateService', '$localStorage', '$state', '$timeout', 'modelService', 'getMenu',
    function ($rootScope, $scope, login, CONFIG, validateService, $localStorage, $state, $timeout, modelService, getMenu) {
        var vm = $scope.vm = {};
        /* 页面效果 */
        var mU = function() {
            function a() {
                var a = window.particlesJS;
                a && ((0, window.$)("<div>", {
                    id: "particles"
                }).appendTo("body"), a("particles", c))
            }
            var b = !! window.HTMLCanvasElement,
                c = {
                    particles: {
                        number: {
                            value: 20,
                            density: {
                                enable: !0,
                                value_area: 1E3
                            }
                        },
                        color: {
                            value: "#e1e1e1"
                        },
                        shape: {
                            type: "circle",
                            stroke: {
                                width: 0,
                                color: "#000000"
                            },
                            polygon: {
                                nb_sides: 5
                            },
                            image: {
                                src: "img/github.svg",
                                width: 100,
                                height: 100
                            }
                        },
                        opacity: {
                            value: .5,
                            random: !1,
                            anim: {
                                enable: !1,
                                speed: 1,
                                opacity_min: .1,
                                sync: !1
                            }
                        },
                        size: {
                            value: 15,
                            random: !0,
                            anim: {
                                enable: !1,
                                speed: 180,
                                size_min: .1,
                                sync: !1
                            }
                        },
                        line_linked: {
                            enable: !0,
                            distance: 650,
                            color: "#cfcfcf",
                            opacity: .26,
                            width: 1
                        },
                        move: {
                            enable: !0,
                            speed: 2,
                            direction: "none",
                            random: !0,
                            straight: !1,
                            out_mode: "out",
                            bounce: !1,
                            attract: {
                                enable: !1,
                                rotateX: 600,
                                rotateY: 1200
                            }
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: {
                                enable: !1,
                                mode: "repulse"
                            },
                            onclick: {
                                enable: !1,
                                mode: "push"
                            },
                            resize: !0
                        },
                        modes: {
                            grab: {
                                distance: 400,
                                line_linked: {
                                    opacity: 1
                                }
                            },
                            bubble: {
                                distance: 400,
                                size: 40,
                                duration: 2,
                                opacity: 8,
                                speed: 3
                            },
                            repulse: {
                                distance: 200,
                                duration: .4
                            },
                            push: {
                                particles_nb: 4
                            },
                            remove: {
                                particles_nb: 2
                            }
                        }
                    },
                    retina_detect: !0
                };
            (0, window.$)(function() {
                b;
                a();
            })
        };
        $(function() {
            mU();
        });
        //记住密码
        vm.remember = true;
        /**
         * 验证码
         */
        vm.verifyCodeFresh = function () {
            var tmp = Math.random() * 100;
            var rand = Math.floor(tmp);
            vm.verifyCodePic = CONFIG.webServer + '/adminUser/a/getLoginVerifyCode?random=' + rand;
        };
        vm.verifyCodeFresh();
        var validateForm = [
            {type: 'input', elem: '#phone', emptyTips: '请输入电话号码', regTips: '您输入的电话号码不正确', regName: 'tel'},
            {type: 'input', elem: '#password', emptyTips: '请输入您的登陆密码'},
            {type: 'input', elem: '#verifyCode', emptyTips: '请输入验证码'}
        ];
        validateService.blurValidate(validateForm);
        vm.isShowLoginVerifyCode = false;
        vm.showLoginVerifyCode = function () {
            if (!vm.username)return;
            login.showLoginVerifyCode(vm.username).success(function (data) {
                if (data.resultCode == '0') {
                    vm.isShowLoginVerifyCode = data.resultData;
                } else {
                }
            });
        };
        vm.showLoginVerifyCode();
        $timeout(function () {
            vm.showLoginVerifyCode();
        }, 1500);
        vm.loginBtn = {
            text: '登录',
            disabled: false,
            login: function () {
                var _validateForm;
                if (!vm.isShowLoginVerifyCode) {
                    _validateForm = validateForm.slice(0, 1);
                }
                else {
                    _validateForm = validateForm;
                }
                var validate = validateService.submitValidate(_validateForm);
                if (!validate) {
                    return;
                }
                vm.loginBtn.text = '登录中...';
                vm.loginBtn.disabled = true;
                login.loginUrl({
                    username: vm.username,
                    password: vm.password,
                    verifyCode: vm.verifyCode
                }).success(function (data) {
                    if (data.resultCode == '0') {
                        $localStorage.$reset();
                        $localStorage.hasMenu = false;
                        $localStorage.Authorization = data.resultData.token;
                        $localStorage.userId = data.resultData.id;
                        $localStorage.showUserName = data.resultData.userName;
                        $rootScope.showUserName = data.resultData.userName;
                        //记住密码
                        if(vm.remember){
                            $localStorage.adminUser = vm.username;
                            $localStorage.adminPass = vm.password;
                        }else{
                            $localStorage.adminUser = '';
                            $localStorage.adminPass = '';
                        }

                        //缓存菜单
                        if($localStorage.menus){
                            $rootScope.menus = $localStorage.menus;
                            $localStorage.hasMenu = true;
                        }else{
                            var menuUrl = '/menu/' + data.resultData.id + '/getMenusByUserId';
                            $.ajax({
                                type: 'post',
                                dataType: 'json',
                                async: false,
                                url: CONFIG.webServer+menuUrl,
                                beforeSend: function (request) {
                                    request.setRequestHeader('X-Auth-Token', $localStorage.Authorization);
                                },
                                success: function(res) {
                                    $localStorage.menus = res.resultData;
                                    $rootScope.menus = $localStorage.menus;
                                    if($rootScope.menus) {
                                        $localStorage.hasMenu = true;
                                    }
                                }
                            });
                        }

                        $timeout(function () {
                            $state.go('app.dashboard-v1');
                        }, 300);
                        $('#particles').remove();
                    } else {
                        modelService.Alarm('danger', data.resultMsg, true, 1000);
                        vm.loginBtn.text = '登录失败';
                        vm.loginBtn.disabled = false;
                        vm.showLoginVerifyCode();
                        vm.verifyCodeFresh();
                    }
                });
            }
        };
        vm.init = function () {
            if($localStorage.adminUser||$localStorage.adminPass){
                vm.username = $localStorage.adminUser;
                vm.password = $localStorage.adminPass;
            }
        };
        vm.init();
    }
]);

