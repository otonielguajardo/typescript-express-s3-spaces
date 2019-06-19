$(document).ready(function (e) {

    init();

    function jsonCheck(object){
        if (typeof object === 'object'){
            return JSON.stringify(object, null, 2)
        }else{
            return object;
        }
    }

    function upload(){
        var file_data = $('#file').prop('files')[0];
        var form_data = new FormData();
        form_data.append('upload', file_data);
        $.ajax({
            url: 'http://localhost:3000/upload', // point to server-side controller method
            dataType: 'json', // what to expect back from the server
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (res) {
                console.log('success',res);
                $('#msg').html(jsonCheck(res)); // display success res from the server
            },
            error: function (res) {
                console.log('error',res);
                $('#msg').html(jsonCheck(res)); // display error res from the server
            }
        });
    }

    function init(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/test',
            dataType:"json",
            success: function (res) {
                console.log('success',res);
                $('#msg').html(jsonCheck(res)); // display success res from the server
            },
            error: function (res) {
                console.log('error',res);
                $('#msg').html(jsonCheck(res)); // display error res from the server
            }
        });
    }
      
    function reset(){
        var input = $('#file');
        input.replaceWith(input.val('').clone(true));
        init();
    }

    $('#reset').on('click', reset);

    $('#upload').on('click', upload);

});