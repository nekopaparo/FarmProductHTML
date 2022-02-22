//無購物車資料
if(!myCookie.ishas("buyCars") || myCookie.get("buyCars") == ""){
    alert("查無購物車資料!!!")
    history.back();//返回上一頁
}
//商品ID紀錄
const buyCarID = myCookie.get("buyCars").split(":");
var productNO = 0;
var sum = 0;
//建立商品列表
function createdList(LIST) {
    document.write('<div name="NO" class="list">');
    document.write('<div class="imgDel"><img src="images/del-removebg.png" onclick="listDel('+LIST+')"></div>');
    document.write('<div class="imgDelRight">');
    document.write(' <div class="listImg"><img name="product" src="images/product/"></div>');
    document.write('<div class="listPName" name="product">商品名</a></div>'); 
    document.write('<div class="listOther">');
    document.write('<div name="product">價錢</div>');
    document.write('<div name="product">數量</div>');
    document.write('</div></div></div>');
    getData(LIST);
}
//讀取商品資料
function getData(NO){
    var buyCarsProduct = "buyCar" + buyCarID[NO];
    var buyP = myCookie.get(buyCarsProduct).split(":");
    sum += buyP[2] * buyP[3];
    document.getElementsByName("product")[productNO++].src += buyP[0];
    for(var i=1; i<4; i++){
        document.getElementsByName("product")[productNO++].innerHTML = buyP[i];
    }
}
//刪除商品
function listDel(NO){
    if(confirm("確定刪除?")){
        //隱藏list顯示
        document.getElementsByName("NO")[NO].className = "listClose";
        //更新總價顯示
        var buyP = myCookie.get("buyCar" + buyCarID[NO]).split(":");
        sum -= buyP[2] * buyP[3];
        document.getElementById("totalPrice").innerHTML = sum;
        //刪除商品資料
        myCookie.remove("buyCar" + buyCarID[NO], "/FarmProductHTML/BuyCar.html")
        //刪除購物車中商品ID
        carDel(NO);
    }
}
//刪除購物車中商品ID
function carDel(NO){
    var tmp = myCookie.get("buyCars", ":");
    var newbuyCars = "";
    tmp.forEach(function (item, i) {
        if(item == buyCarID[NO] || item == "") return false;
        if(i != 0 && newbuyCars != "") newbuyCars += ":";
        newbuyCars += item;
    });
    //無購物車內容
    if(newbuyCars == ""){
        //移除整個購物車
        myCookie.remove("buyCars");
        return false;
    }
    //更新購物車內容
    myCookie.add("buyCars", newbuyCars);
}