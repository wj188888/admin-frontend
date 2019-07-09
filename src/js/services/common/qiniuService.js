'use strict';
/**
 * 七牛
 */
angular.module('app')
    .service('qiniuService', ['qiniu', 'commonService', function (qiniu, commonService) {
        this.uploadFile = function(obj){
            var $uploadBtn = $('#'+ obj.uploadBtn);
            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',
                browse_button: obj.uploadBtn,
                container: 'container',
                drop_element: 'container',
                filters: {
                    mime_types : [ //只允许上传图片和zip文件
                        { title : "Image files", extensions : "jpg,png,bmp" }
                    ]
//            prevent_duplicates : true //不允许选取重复文件
                },
                max_file_size: '2mb',
                dragdrop: true,
                chunk_size: '4mb',
                uptoken_func: function(){
                    return qiniu.getUploadToken();
                },
                get_new_uptoken: true,
                domain: qiniu.getUploadUrl(),
                unique_names: true,
                auto_start: true,
                multi_selection: false,
                resize: {
                    width: 1000,
                    height: 500,
                    crop: false,
                    quality: 90,
                    preserve_headers: false
                },
                init: {
                    'FilesAdded': function(up, files) {
                        plupload.each(files, function(file) {
                            var progress = new FileProgress(file, obj.progresseId);
                            progress.setStatus("等待...");
                        });
                    },
                    'BeforeUpload': function(up, file) {
                        var progress = new FileProgress(file, obj.progresseId);
                        var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                        if (up.runtime === 'html5' && chunk_size) {
                            progress.setChunkProgess(chunk_size);
                        }
                    },
                    'UploadProgress': function(up, file) {
                        var progress = new FileProgress(file, obj.progresseId);
                        var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                        progress.setProgress(file.percent + "%", file.speed, chunk_size);
                    },
                    'UploadComplete': function(file) {
                        if(obj.upType == 'carPic' && $(obj.picBox).find('li').size() == 6){
                            $uploadBtn.hide();
                        }
                        if(obj.upType == 'tourPic' && $(obj.picBox).find('li').size() == 4){
                            $uploadBtn.hide();
                        }
                    },
                    'FileUploaded': function(up, file, info) {
                        var fileinfo = JSON.parse(info),
                            imgUrl = qiniu.getUploadUrl() + fileinfo.key,
                            progress = new FileProgress(file, obj.progresseId);
                        if(obj.upType == 'carPic'){
                            var picTemp = '<li class="J_carPicList" data-pic="'+ imgUrl +'">'+
                                    '<a class="car-pic" style="background-image:url('+ imgUrl +')">'+
                                    '<p class="delete-pic"></p>'+
                                    '</a>'+
                                    '</li>';
                            $uploadBtn.before(picTemp);
                        }else if(obj.upType == 'tourPic'){
                            var picTemp = '<li class="J_carPicList text-center" data-pic="'+ imgUrl +'">'+
                                    '<a class="car-pic" style="background-image:url('+ imgUrl +')">'+
                                    '<p class="delete-pic"></p>'+
                                    '<a class="setPic">设为封面</a>'+
                                    '</a>'+
                                    '</li>';
                            $uploadBtn.before(picTemp);
                        }else{
                            if(obj.uploadBtn != 'avatar'){
                                $uploadBtn.addClass('re-upload-btn');
                            }
                            $uploadBtn.html('重新上传');
                            $(obj.showImgId).attr('href', imgUrl)
                                .css('background-image','url("'+ imgUrl +'")')
                                .html('<div class="img-mask"></div>').show();
                            $(obj.showImgId + 'Input').val(imgUrl);
                        }
                        progress.setComplete(up, info);
                    },
                    'Error': function(up, err, errTip) {
                        commonService.showTips({
                            cssClass:'alert-fail',
                            msg:errTip
                        });
                    }
                }
            });
        };
    }]);
