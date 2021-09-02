//前端模擬MySQL
var productID = ["P20210704110001",
                 "P20210417100005",
                 "P20210817120043"]
var productData = ["P2021070411000101.jpg:蘋果:哈洽馬:2021/07/04:100:一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果一包5顆大蘋果123:3:100:",
                   "P2021041710000501.jpg:紅蘿蔔:配口茶:2021/06/17:80:巨大蘿蔔，總長3公分:1:50:",
                   "P2021081712004301.jpg:葡萄:可可醬:2021/07/01:81000:公道價:5:80:"];
//MySQL查詢
function SELECT_all_FROM_Commodity_WHERE_Commodity_id_productID(ID){
    productID.forEach(function(item, i){
        if(ID == item){
            addCookie("productDetail", productID[i] + ":" + productData[i], "/FarmProductHTML/Product.html");
            document.location.href = "Product.html";
            return false;
        }
    });
}
function BUYCARUSE_SELECT_all_FROM_Commodity_WHERE_Commodity_id_productID(ID){
    if(ID.length == 0) return false;
    productID.forEach(function(item, i){
        if(ID == item){
            addCookie("productDetail", productID[i] + ":" + productData[i], "/FarmProductHTML/Product.html");
            document.location.href = "Product.html";
            return false;
        }
    });
}
//新增會員
function insert_into_addname_values_addvalue(){
    var fromValue = ["passwdId", "usernameId", "identId", "dateofbirthId", "emailId"];
    var newID = "A000000001";
    var idCreated = true;
    //系統建立會員ID，最多可新增9組會員
    if(isCookie("userID")){
        var userID = getCookieValue("userID");
        for(var i=2; i<10; i++){
            newID = "A00000000" + i;
            if(!userID.match(newID)){ //userID還未建立
                break;
            }
            if(i==9) idCreated = false;
        }
        if(idCreated){
            addCookie("userID", getCookieValue("userID") + ":" + accountId.value + "," + newID);
        }
    }
    else{
        addCookie("userID", accountId.value + "," + newID);
    }
    //建立會員資料
    var data = "";
    if(idCreated){
        fromValue.forEach(function(item){
            data += document.getElementById(item).value + ":";
        });
        
        //指定cookie只能在登入頁面中讀取
        addCookie(newID, data, "/FarmProductHTML/SignIn.html");
        //顯示訊息
        alert("成功申請會員");
        document.location.href = "SignIn.html";
        return false;
    }
    else{
        //超過9組會員
        alert("會員建立失敗");
    }
} 


/*forEach test
var array = ['小明', '杰倫', '漂亮阿姨', '小美']
array.forEach(function(item, i) {
alert(i);
});
*/