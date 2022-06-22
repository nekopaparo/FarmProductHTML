var myCookie = {
    //cookieName已存在且屬性相同時，舊的會被刪除並從最後面加入
    "add" : function (name, value, path, age) // 指定存取權限
    { 
        value = this.encode(value);
        var addValue = name + '=' + value + ';';
        switch(arguments.length)
        {
            case 4:
                addValue += "max-age=" + age + ';'
            case 3: 
                addValue += "path=" + path + ';'
        }
        document.cookie = addValue;
    },
    //讀取cookValue
    "ishas" : function (name)
    {
        if(document.cookie.match(name+"=") === null) return false;
        return true;
    },
    //讀取cookValue
    "get" : function (name, key){
        if(this.ishas(name))
        {
            const values = document.cookie.split(name + "=");
            if(values[0]==="")
            {
                const value = this.decode(values[1].split(';')[0]);
                return key?  value.split(key):value;
            }
            var i = 0;
            while(i<values.length)
            {
                if(values[i].match(/\s$/))
                {
                    const value = this.decode(values[i+1].split(';')[0]);
                    return key?  value.split(key):value;
                }
                i++;
            }
        }
        return null;
    },
    //刪除 ps.要同樣path才能刪除成功
    "remove" : function (name, path){
        if(!this.ishas(name))
            return;
        var removeValue = name + "=;";
        if(path)
            removeValue += "path=" + path + ';';
        var date = new Date();
        date.setTime(date.getTime()-1);
        removeValue += "expires=" + date.toGMTString();
        document.cookie = removeValue;
    },
    // 轉成 Base64 編碼 (簡易加密)
    // 參考 https://www.wfublog.com/2020/07/js-string-encryption-decryption-aes.html
    "encode" : function (str) {
        str = encodeURI(str); // 轉成URL格式，解決中文無法使用btoa
        str = btoa(str); // 將字串轉換為 Base64 編碼
        return str;
    },
    "decode" : function (str) {
        str = atob(str); // 將 Base64 編碼還原回字串
        str = decodeURI(str); // 還原中文
        return str;
    }
}
/*參考 https://shubo.io/cookies/
function getCookie() {
    var name = prompt("請輸入cookieName:");
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) alert(parts.pop().split(';').shift());
}
*/