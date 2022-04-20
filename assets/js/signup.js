//身分證檢查
function identCheck()
{
    var identID = document.getElementById("identId").value.toUpperCase();
    if( !isValue("identId") ) return false;
    if( !identID.match(new RegExp("[A-Z](1|2)[0-9]{8}")) || identID.length > 10 )
    {
        document.getElementById("identId").select();
        document.getElementById("identId").focus();
        $("#identIdError").text("格式錯誤"); //警告訊息
        return false;
    }
    else
    {
        $("#identIdError").text(""); //清空警告訊息
        return true;
    }
}
//email檢查
function emailCheck()
{
    var Email = document.getElementById("emailId").value;
    if( !isValue("emailId")) return false;
    if(Email.indexOf("@gmail.com") < 0)
    {
        $("#emailIdError").text("只接受Google信箱"); //警告訊息
        document.getElementById("emailId").select();
        document.getElementById("emailId").focus();
        return false;
    }
    else if( !Email.match("[A-Za-z0-9.]{6,30}@gmail.com$")  )
    {
        $("#emailIdError").text("格式錯誤, [A-Za-z0-9.]至少6個"); //警告訊息
        document.getElementById("emailId").select();
        document.getElementById("emailId").focus();
        return false;
    }
    else 
    {
        $("#emailIdError").text(""); //清空警告訊息
        return true;
    }                                   
}
var isPasswd = false;
//密碼檢查
function passwdCheck()
{
    var passwd = document.getElementById("passwdId");
    var confirmation = document.getElementById("confirmId");
    if(!isValue("passwdId"))
    {
        $("#passwdIdError").text("請輸入密碼"); //警告訊息
        $("#confirmIdError").text(""); //清空警告訊息
        confirmation.value = "";
        confirmation.focus();
        passwd.focus();
        isPasswd = false;
        return false;
    }
    else
    {
        if(!isPasswd)
        {
            isPasswd = true;
            return false;
        }
    }
    $("#passwdIdError").text(""); //清空警告訊息
    if(confirmation.value != passwd.value)
    {
        confirmation.focus();
        confirmation.select();
        $("#confirmIdError").text("輸入的密碼不一致"); //警告訊息
        return false;
    }
    else
    {
        $("#confirmIdError").text(""); //清空警告訊息
        return true;
    }
}
//檢查是否空白
function isValue(checkID)
{
    if( document.getElementById(checkID).value.length == 0)
    {
        $(`#${checkID}`).focus();
        $(`#${checkID}Error`).text("請填寫資料"); //警告訊息
        return false;
    }
    else
    {
        $(`#${checkID}Error`).text(""); //清空警告訊息
        return true;
    }
}
//最後檢查
function lastCheck()
{
    if( isValue("usernameId") && isValue("accountId") && 
        passwdCheck() && identCheck() && isValue("birthdayId") && emailCheck())
    {
        alert("輸入資料正確!!");
    }
    else
    {
        alert("輸入資料有誤!!");
    }
}
//重新填寫
function resetData(){
    $(".br").text("");
    document.userData.reset();
}