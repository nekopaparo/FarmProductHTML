//搭配InputTextImitateGoogle.css使用
//jQuery
$(document).ready(function(){
    $(".InputTextImitateGoogle_body input").focus(function(){ 
        inputFocus($(this).prop("id"));
    });
    $(".InputTextImitateGoogle_body input").blur(function(){
        inputBlur($(this).prop("id"));
    });
    var test = $(".InputTextImitateGoogle_input");
    for(var i=0; i<test.length; i++){
        test[i].autocomplete = "off"; //取消輸入記錄
    }
});
//javaScript
function inputFocus(id){
    document.getElementById("InputData_"+id).className = "InputTextImitateGoogle_open";
}
function inputBlur(id){
    if(document.getElementById(id).value == ""){
        document.getElementById("InputData_"+id).className  = "InputTextImitateGoogle_close";
    }
}


/*
    var chkid = "0123456789ABCDEFGHJKLMNPQRSTUVXYWZIO";
    // 首字字元的索引值
    var id_1 = chkid.indexOf(identID.charAt(0));
    // 首字字元的加權值(無條件捨去)
    var total = Math.floor( id_1 / 10 + (id_1 % 10) * 9 ) ;
    // total=total+其他字元的加權值
    for (i = 1; i < 9; i++) {
        total += chkid.indexOf(identID.charAt(i)) * (9 - i);
    }
    total += chkid.indexOf(identID.charAt(9));
    // 結果
    if (total % 10 == 0) {
        alert(total);
    }                  
*/