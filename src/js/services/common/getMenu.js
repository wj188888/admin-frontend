angular.module('app')
    .service('getMenu', ['httpService', '$location','CONFIG','$localStorage',
        function (httpService,$location,CONFIG,$localStorage) {
			/**
             * 获取子菜单
             * @param parentMenu 父菜单对象
             * @returns {string}
             */
            this.getChildMenu = function(parentMenu) {
                var childMenu = '';
                angular.forEach(parentMenu, function (value) {
                    if (!value.childMenu || !value.menu_state) return;
                        if ($location.path().indexOf(value.menu_state.replace(/\./gm, '/')) > -1) {
                            childMenu = value.childMenu;
                            return false;
                        }
                    });
                return childMenu;
            }

            /**
             * 获取二级菜单名称
             * @param parentMenu
             * @returns {string}
             */
        
            this.getMenuTitle = function(parentMenu) {
	            var menuTitle = '';
	            angular.forEach(parentMenu, function (value) {
	                if (!value.menu_title) return;
	                if ($location.path().indexOf(value.menu_state.replace(/\./gm, '/')) > -1) {
	                    menuTitle = value.menu_title;
	                    return false;
	                }
	            });
	            return menuTitle;
            }

			/**
             * 初始化菜单
             */
			this.menuData = function(menuUrl){
				var data;
				$.ajax({
					type: 'post',
	                dataType: 'json',
	                async: false,
	                url: CONFIG.webServer+menuUrl,
					beforeSend: function (request) {
							request.setRequestHeader('X-Auth-Token', $localStorage.Authorization);
					},
	                success: function(res) {
	                	data = res.resultData;
	                }	
				});
				return data;
			}

        }
    ])
        