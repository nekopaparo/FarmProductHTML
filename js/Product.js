//無商品資料時回到首頁
if( !myCookie.ishas("productDetail")){
    alert("ERROR_PRODUCT!!!");
    document.location.href = "Homepage.html";
}
const productDetail = myCookie.get("productDetail", ":");  
var buyInV;
function starDraw(quantity){
    for(i=0; i<quantity; i++){
        document.write('<img src="./images/starBright-removebg.png">');
    }
    for(i=0; i<5-quantity; i++){
        document.write('<img src="./images/star-removebg.png">');
    }
}
//檢查數字
function checkBuy(){
    buyInV = document.getElementById("buyIn");
    if(buyInV.value.match("[^0-9]")) return false;
    return true;
}
//檢查購買數量
function checkQ(){
    if( buyInV.value >= parseInt(productDetail[8])) return false;
    return true;
}
//-+按鍵
function buyQ(buyIN){
    //非數字      
    if(!checkBuy()){
        buyInV.value = 1;
        return false;
    }
    //超過購買數量
    if(!checkQ() && buyIN == 1) {
        buyInV.value = parseInt(productDetail[8]);
        return false;
    }
    //低於1
    if(buyInV.value <= 1 && buyIN == -1){
        buyInV.value = 1;
        return false;
    }
    buyInV.value = parseInt(buyInV.value) + buyIN;
}
//按下購買
function buyCar(){
    var buyIn = document.getElementById("buyIn");
    if(!checkBuy()){
        alert("請輸入數字!!!");
        buyIn.focus();
        buyIn.select();
        return false;
    }
    if(!checkQ()){
        alert("庫存不足，請重新輸入!!!");
        buyIn.focus();
        buyIn.select();
        return false;
    }
    var carlist = myCookie.get("buyCars");
    //商品ID
    var pID = productDetail[0];
    //已登入會員
    if(myCookie.get("userState")){
        //已有購物清單
        if( myCookie.ishas("buyCars") ){
            //已加入購物車
            if(carlist.match(pID)){
                alert("已加入購物車");
                return false;
            }
            myCookie.add("buyCars", carlist + ":" + pID); //新增商品ID
        }
        //尚未有購物清單
        else{
            myCookie.add("buyCars", pID); //新增購物車
        }
        var byCar = productDetail[1] + ":" + productDetail[2] + ":" + productDetail[5] + ":" + buyIn.value;
        myCookie.add("buyCar" + pID, byCar, "/FarmProductHTML/BuyCar.html") //******************************
        alert("成功加入購物車");
    }
    else{
        document.location.href = "SignIn.html";
        return false;
    }
}