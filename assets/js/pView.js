const P = window.document.location.href.split("?p=")[1];
//無商品資料時回到首頁
if( !P )
{
    alert("ERROR!!! PRODUCT NOT FIND");
    document.location.href = ".";
}
const productData = readJson.response['product'][P];
var buyInV;
//檢查數字
function checkBuy()
{
    buyInV = document.getElementById("buyIn");
    if(buyInV.value.match("[^0-9]")) return false;
    return true;
}
//檢查購買數量
function checkQ()
{
    if( parseInt(buyInV.value) > productData.quantity) return false;
    return true;
}
function buyQ(buyIN)
{
    //非數字      
    if(!checkBuy())
    {
        buyInV.value = 1;
        return;
    }
    buyInV.value = parseInt(buyInV.value) + (buyIN === "+"? 1:-1);
    //超過購買數量
    if(!checkQ())
    {
        buyInV.value = productData.quantity;
        return;
    }
    //低於1
    if(buyInV.value <= 1)
    {
        buyInV.value = 1;
        return;
    }
    if (mouseholddown)
        t = setTimeout(function () { buyQ(buyIN);}, 100);
}
//按下購買
function buyCar()
{
    var buyIn = document.getElementById("buyIn");
    if(!checkBuy())
    {
        alert("請輸入數字!!!");
        buyIn.focus();
        buyIn.select();
        return;
    }
    if(!checkQ())
    {
        alert("庫存不足，請重新輸入!!!");
        buyIn.focus();
        buyIn.select();
        return;
    }
    //已登入會員
    if(myCookie.ishas(cookieData.user))
    {
        var carList = myCookie.get(cookieData.shopping);
        //已有購物清單
        if( carList )
        {
            //已加入購物車
            if(carList.match(P)){
                alert("已加入購物車");
                return;
            }
            myCookie.add(cookieData.shopping, `${carList}:${P},${buyIn.value}`); //新增商品ID
        }
        //尚未有購物清單
        else
        {
            myCookie.add(cookieData.shopping, `${P},${buyIn.value}`); //新增購物車
        }
        
        alert("成功加入購物車");
    }
    else
    {
        document.location.href = "?pg=userin";
        return;
    }
}