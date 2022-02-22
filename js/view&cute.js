var view_cute = `
<!--圖片-->
<!--預覽和切割圖片-->
<div id="view_cuteMain">
    <input id="imgInput" type="file" accept="image/*"/>
    <div class="img-view-home">
        <div class="img-cute-range" tabindex="0"></div>
        <img id="imgView" src="#" alt="your image"/>
    </div>
    <div class="img-size-range-home">
        <input id="imgSizeRange" type="range" step="0.01" min="0.01" max="1.00" value="0.20" aria-label="zoom"/>
    </div>
    <div style="display: flex; justify-content: right;">
        <input id="imgCuteResult" type="button" value="輸出"/>
    </div>
    <canvas id="canvas" width="150" height="150"></canvas>
</div>
`
/*
<form name="form" class="pictureUp" action="../photo" enctype="multipart/form-data" method="POST">
	<div class="upDiv">
		<input name="photo" id="imgUpDate" type="file" accept="image/jpeg" onchange="showImg()">
	</div>
<div class="imgDiv">
	<img id="imgview" >
</div>
</form>
 */

var imgURL = null;
var imgWidth = 0; //圖片寬度
var imgMove = null; //圖片移動
window.onload = function() {
    //預覽圖片
    imgInput.addEventListener('change', function(){
        imgURL = null;
        const [file] = imgInput.files;
        if (file){
            imgView.src = URL.createObjectURL(file);
        }
    });
    //讀取完圖片後
    imgView.addEventListener('load', function(){
        if(imgURL == null) imgURL = imgView.src; //儲存原始圖片
        imgView.style.width = "auto";
        imgWidth = imgView.width; //儲存原始圖片寬度
        imgView.style.width = imgWidth * imgSizeRange.value + "px"; //調成目前放大倍率
    });
    //在瀏覽圖中按下滑鼠
    imgView.addEventListener('mousedown', function(){
        if(imgMove == null){
            //初始滑鼠位置
            const mouseX = event.pageX;
            const mouseY = event.pageY;
            //初始圖片位置
            const imgX = imgView.offsetLeft;
            const imgY = imgView.offsetTop;
            //滑鼠移動時
            view_cuteMain.addEventListener('mousemove', imgMove = function(e){
                //圖片移動(= imgXY + (startMouseXY - nowMouseXY))
                imgView.style.left = imgX + e.pageX - mouseX + 'px';
                imgView.style.top = imgY + e.pageY - mouseY + 'px';
            });
        }
    });
    //在網頁中滑鼠放開
    document.addEventListener('mouseup', function(){
        if(imgMove != null){
            view_cuteMain.removeEventListener('mousemove', imgMove);
            imgMove = null;
        }
    });
    //當range輸入時，調整圖片大小(只調整寬度)
    imgSizeRange.addEventListener('input', function(){
        imgView.style.width = imgWidth * this.value + "px";
    });
    //切割
    const imgRange = document.getElementsByClassName("img-cute-range");
    imgCuteResult.addEventListener("click", function(){
        if (canvas.getContext){
            const imgSize = imgSizeRange.value;
            canvas.width = "150";
            canvas.height = "150";
            var ctx = canvas.getContext("2d");
            var x = (imgRange[0].offsetLeft - imgView.offsetLeft ) / imgSize;
            var y = (imgRange[0].offsetTop - imgView.offsetTop) / imgSize;
            var w = 150 / imgSize;
            var h = 150 / imgSize;
            ctx.drawImage(imgView, x, y, w, h, 0, 0, 150, 150); // (img, imgX,imgY,imgW,imgH , canvaX,canvaY,canvaW,canvaH)
            
            /*切好的傳給 hidden input (還未後端測試過),必須先去掉開頭的「data:image/jpeg;base64, 」，剩下的才是base64編碼後的照片) https://www.cc.ntu.edu.tw/chinese/epaper/0052/20200320_5208.html
            document.getElementsByName('imgCuteServer').value = canvas.toDataURL();//base64編碼字串
            alert(document.getElementsByName('imgCuteServer').value);
            */
            //觀看結果用
            newImg.src = canvas.toDataURL(); 
        }
        else{
            alert("您的瀏覽器不支援 canvas 元素，無法切割!!!");
        }
    });
};

//圖片預覽
function showImg() {
    const [file] = imgUpDate.files;
    imgview.src = URL.createObjectURL(file);
}

// <資料送出(待測試)>
//送出
var no = 0;
function submitAll() {
    if(no==0){
        document.getElementById("imgName").value = imgUpDate.files[0].name;
        Ajax();
    }else if(no==1){
        Ajax();
    }else if(no==2){
        form.submit();
    }else{
        return false;
    }
}
//顯示
function resetAll() {
    form1.reset();
    form2.reset();
    form3.reset();
}
var path = ["../add", "../save"];
var value = ["productName%^&$productPricing%^&$productQuantity%^&$imgName", "txt%^&$imgName"];

var xmlHTTP;
if(window.ActiveXObject)
{
    xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");
}
else if(window.XMLHttpRequest)
{
    xmlHTTP=new XMLHttpRequest();
}
function Ajax(){  
    var newValue = "?";
    var innerValue = value[no].split("%^&$");
    innerValue.forEach(function(item , i){
        if(i!=0) newValue += "&";
        newValue += item + "=" + document.getElementById(item).value;
    });
    var url = path[no] + newValue;
    xmlHTTP.open("GET",url,true);
    xmlHTTP.send();
    //延遲送出，確保執行完成
    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4) {
            no++;
            submitAll();
        }
    }
}
// </資料送出(待測試)>