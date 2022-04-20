function inputCoverter(datas, insert, extra)
{
    var writeContent = function (tmp, append)
    {
        // 實作內容
        const target_one = tmp.content.querySelector('.cover-close');
        const target_two = tmp.content.querySelector('input');
        datas.forEach(function (item)
        {
            target_one.id = `cover_${item.control}Id`;
            target_one.textContent = item.message;

            target_two.id = `${item.control}Id`;
            target_two.name = item.control;
            
            if (extra) extra(tmp, item);

            append( document.importNode(tmp.content, true) ); // 插入內容
        });
    }
    templater('#input-data-view', insert, writeContent);
    // cover特效
    $(".input-data-view-body input").focus(function()
    { 
        var cover = $(`#cover_${$(this).prop("id")}`);
        if (cover.hasClass('cover-close'))
        {
            cover.removeClass('cover-close');
            cover.addClass('cover-open');
        }      
    });
    $(".input-data-view-body input").blur(function()
    {
        if($(this).prop("value")) return;
        var cover = $(`#cover_${$(this).prop("id")}`);
        if (cover.hasClass('cover-open'))
        {
            cover.removeClass('cover-open');
            cover.addClass('cover-close');
        }  
    });
    // 取消輸入記錄
    var test = $(".input-data-view-body input");
    for(var i=0; i<test.length; i++)
    {
        test[i].autocomplete = "off"; 
    }
}