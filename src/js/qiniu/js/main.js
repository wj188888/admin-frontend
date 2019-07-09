/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */
$(function() {
    uploadFile('stuidcardA','fsUploadProgress','#success1');
    uploadFile('stuidcardB','fsUploadProgress2','#success2');
    uploadFile('coachidcardA','fsUploadProgress3','#success3');
    uploadFile('coachidcardB','fsUploadProgress4','#success4');
    uploadFile('vehicledrivingA','fsUploadProgress9','#success9');
    uploadFile('vehicledrivingB','fsUploadProgress10','#success10');
    uploadFile('drivinglicence','fsUploadProgress5','#success5');
    uploadFile('coachcard','fsUploadProgress7','#success7');
    uploadFile('vehicleoperating','fsUploadProgress11','#success11');

});

function uploadFile(id,fsUploadProgress,success){
	var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: id,
        container: 'container',
        drop_element: 'container',
        filters: {
        	  mime_types : [ //只允许上传图片和zip文件
        	    { title : "Image files", extensions : "jpg,gif,png,bmp" }
        	  ]
//        	  prevent_duplicates : true //不允许选取重复文件
        	},
        max_file_size: '10mb',
        dragdrop: true,
        chunk_size: '4mb',
        uptoken_url: rootPath+'/uptoken.do',
        domain: $('#domain').val(),
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
                $('table').show();
                $(success).show();
                plupload.each(files, function(file) {
                    var progress = new FileProgress(file, fsUploadProgress);
                    progress.setStatus("等待...");
                });
            },
            'BeforeUpload': function(up, file) {
                var progress = new FileProgress(file, fsUploadProgress);
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function(up, file) {
                var progress = new FileProgress(file, fsUploadProgress);
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));

                progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function() {
                $(success).show();
            },
            'FileUploaded': function(up, file, info) {
            	submitfile(id, up, file, info,fsUploadProgress,success);
            },
            'Error': function(up, err, errTip) {
                $('table').show();
                var progress = new FileProgress(err.file, fsUploadProgress);
                progress.setError();
                progress.setStatus(errTip);
            }

//             'Key': function(up, file) {
//                 var key = "";
//                 // do something with key
//                 return key;
//             }
        }
    });

}
function submitfile(id, up, file, info,fsUploadProgress,success){
    	var fileinfo = JSON.parse(info);
    	var fileName = fileinfo.key;
    	var fileHash = fileinfo.hash;
    	var fileSize = file.size;
		var img_box = $(success);
    	
    	var progress = new FileProgress(file, fsUploadProgress);
    	var test = progress.setComplete(up, info);
    $.ajax({
		type : "post",//使用post方法访问后台
		dataType : "json",//返回json格式的数据
		url : rootPath + "/add_crm_file_idcard.do?fileName="+fileName+"&fileHash="+fileHash+"&fileSize="+fileSize+"&btnid="+id,//要访问的后台地址
		success : function(msg) {
			var img_url = msg.url,
				file_id = msg.fileId,
				ele_img = $('<img/>'),
				ele_a = $('<a/>');

			ele_img.attr('src',img_url);
			ele_img.attr('width','auto');
			ele_img.attr('height','100%');
			ele_a.attr({'href':img_url,'target':'_blank'}).text('点击查看大图').css({'margin':'8px 0','display':'block'});
			img_box.html('').append(ele_img).next('.show-big-img').html('').append(ele_a);
			$('#'+id).attr('fileid',file_id);
		}
	});
}


function studentCardUpload(){
	var	id_crm_student_info = UrlParm.parm('id_crm_student_info'),
		cardA = $('#stuidcardA').attr('fileid'),
		cardB = $('#stuidcardB').attr('fileid');
	cardA = cardA?cardA:'';
	cardB = cardB?cardB:'';
	if(checkIsNull(cardA)||checkIsNull(cardB)){
		showMsg("请上传学员身份证正面和反面！");
		return false;
	}
	$.ajax({
		type:'post',
		url:rootPath+'/follow_add_crm_student_file.do',
		data:{
			'id_crm_student_info':id_crm_student_info,
			'cardA':cardA,
			'cardB':cardB
		},
		success:function(response){
			showMsg(response.resultMsg);
			setTimeout(function() {window.parent.location.reload();},500);
		}
	});
}

function returnClick(){
	var	id_crm_student_info = UrlParm.parm('id_crm_student_info');
	window.location.href = rootPath+'/html/student_info_edit.html?id_crm_student_info='+id_crm_student_info;
}
function clearImg(id){
//<div class="btn btn-danger btn-file btn-clear" onclick="clearImg(this)">清除图片</div>
	$(id).prev('.btn-file').removeAttr('fileid');
	$(id).next('.up-imgbox').html('');
	$(id).siblings('.show-big-img').html('');
	$(id).siblings('.upload-progress').html('');
}