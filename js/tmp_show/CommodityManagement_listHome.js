// 取得json資料
var request = new XMLHttpRequest();
request.open('GET', "data/Product.json", true);
request.responseType = 'json';
request.send();
request.onload = function(){
    var data = request.response['data'];
    // 透過檢查 HTML template 元素屬性的存在與否，以測試瀏覽器是否支援它
    if ('content' in document.createElement('template')) {
        var ls = document.querySelector('#listHome');
        var lsf = ls.content.querySelectorAll(".list-font");
        var dh = document.querySelector(".dataHome");
        data.forEach(function (item){
            // 以模板來實例化表格
            lsf[0].textContent = item.number;
            lsf[1].textContent = item.name;
            lsf[2].textContent = item.price;
            lsf[3].textContent = item.quantity;
            ls.content.querySelector("img").src = `images/product/${item.number}01.jpg`;
            // 複製新的list並將其新增至dataHome
            var clone = document.importNode(ls.content, true);
            dh.appendChild(clone);
        });
    } else {
    // 因為 HTML template 不被支援，所以要用其他方法在表格增加新行
    }
};