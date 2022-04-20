var nowSelect = nowView = null;

const selectView = {
    "select_0" : function () 
    {
        this.select('error');
    },
    "select_1" : function () 
    {
        this.select('p', function () 
        {
            const pData = readJson.response['user'][myCookie.get('user')]['product'];
        
            templater('#dataHome-list-view', '#dataHome', function (tmp, append)
            {
                // 實作內容
                var targets = tmp.content.querySelectorAll(".list-datas");

                pData.forEach(function (p){
                    var item = readJson.response['product'][p];
                    targets[0].textContent = p;
                    targets[1].textContent = item.name;
                    targets[2].textContent = item.price;
                    targets[3].textContent = item.quantity;
                    tmp.content.querySelector("img").src = `images/product/${p}01.jpg`;
                    
                    append( document.importNode(tmp.content, true) ); // 插入內容
                });
            });
            
            //商品|新增
            $('#produc-pageHome-menu div').click(function()
            {
                const id = $(this).prop('id');
                $(this).addClass("selectPage");
                $(`#produc-pageHome-${id}`).removeClass("unselect");
                
                const another = (id==='view'? "create":"view"); 
                $(`#${another}`).removeClass("selectPage");
                $(`#produc-pageHome-${another}`).addClass("unselect");
            });
            //預覽圖片
            $('#imgInput').change(function(){
                const [file] = document.getElementById('imgInput').files;
                if (file)
                {
                    document.getElementById('imgView').src = URL.createObjectURL(file);
                }
            })
        });
    },
    "select_2" : function () 
    {
        this.select('error');
    },
    "select" : function (view, func) 
    {
        // 讀取view
        viewter(view, "#selectpageshow", func)
    },
};