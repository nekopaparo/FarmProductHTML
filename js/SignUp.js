//身分證檢查
function identCheck(){
    var identID = document.getElementById("identId").value.toUpperCase();
    if(!isValue("identId")) return false;
    if( !identID.match("[A-Z](1|2)[0-9]{8}") ){
        document.getElementById("identId").select();
        document.getElementById("identId").focus();
        $("#identIderror").text("格式錯誤"); //警告訊息
        return false;
    }
    else{
        $("#identIderror").text(""); //清空警告訊息
        return true;
    }
}
//email檢查
function emailCheck(){
    var Email = document.getElementById("emailId").value;
    if( !isValue("emailId")) return false;
    if(Email.indexOf("@gmail.com") < 0){
        $("#emailIderror").text("只接受Google信箱"); //警告訊息
            document.getElementById("emailId").select();
            document.getElementById("emailId").focus();
            return false;
        }
    else if( !Email.match("[A-Za-z0-9.]{6,30}@gmail.com")  ){
        $("#emailIderror").text("格式錯誤"); //警告訊息
        document.getElementById("emailId").select();
        document.getElementById("emailId").focus();
        return false;
    }
    else {
        $("#emailIderror").text(""); //清空警告訊息
        return true;
    }                                   
}
var isPasswd = false;
//密碼檢查
function passwdCheck(){
    var passwd = document.getElementById("passwdId");
    var confirmation = document.getElementById("confirmationId");
    if(!isValue("passwdId")){
        $("#passwdIderror").text("請輸入密碼"); //警告訊息
        confirmation.value = "";
        passwd.focus();
        isPasswd = false;
        return false;
    }
    else{
        if(!isPasswd){
            isPasswd = true;
            return false;
        }
    }
    $("#passwdIderror").text(""); //清空警告訊息
    if(confirmation.value != passwd.value){
        confirmation.focus();
        confirmation.select();
        $("#confirmationIderror").text("輸入的密碼不一致"); //警告訊息
        return false;
    }
    else{
        $("#confirmationIderror").text(""); //清空警告訊息
        return true;
    }
}
//檢查是否空白
function isValue(checkID){
    if( document.getElementById(checkID).value.length == 0){
        $("#" + checkID).focus();
        $("#" + checkID + "error").text("請填寫資料"); //警告訊息
        return false;
    }
    else{
        $("#" + checkID + "error").text(""); //清空警告訊息
        return true;
    }
}
//最後檢查
function lastCheck(){
    if( isValue("usernameId") && isValue("accountId") && isValue("passwdId") && passwdCheck() && identCheck() && isValue("dateofbirthId") && emailCheck()){
        insert_into_addname_values_addvalue();
        //document.userData.submit();
    }
    else{
        alert("輸入資料有誤!!");
    }
}
//重新填寫
function resetData(){
    $(".br").text("");
    document.userData.reset();
}
$(document).ready(function(){
    $("#identId").change(identCheck);
    $("#emailId").change(emailCheck);
    $("#passwdId").change(passwdCheck);
    $("#confirmationId").change(passwdCheck);
    $("#submitButton").click(lastCheck);
    $("#resetButton").click(resetData);
    
    //預設資料
    InputData_usernameId.className = "InputTextImitateGoogle_open";
    usernameId.value = "使用者";
    InputData_identId.className = "InputTextImitateGoogle_open";
    identId.value = "A123456789";
    InputData_dateofbirthId.className = "InputTextImitateGoogle_open";
    dateofbirthId.value = "2021-09-02"
    InputData_emailId.className = "InputTextImitateGoogle_open";
    emailId.value = "abc123456789@gmail.com";
});