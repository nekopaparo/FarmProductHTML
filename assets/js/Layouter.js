const Layouter = {
    "path" : {
        "layout" : "assets",
        "content" : "assets/pages"
    },
    "run" : function (linkHTML)
    {
        const layout = this.path.layout;

        if ( linkHTML.match( new RegExp(`(.*)=(.*)$`) ) )
        {
            linkHTML = linkHTML.split('=')[1];
        }
        linkHTML = readJson.response['url'][linkHTML];
        
        this.getContent(linkHTML, function()
        {
            const _layout = layout,
                  HTML = this.response;
            // 讀取layout
            this.open('GET', `${_layout}/${getExtends(HTML)}`, true);
            this.onload = function()
            {
                const html = this.response,
                      blockHead = getValue("head"),
                      blockContent = getValue("content");
                
                document.open();
                document.write(html.replace("{% block head %}", blockHead).replace("{% block content %}", blockContent));
                document.close();
            };

            this.send();
            const getValue = function ( target ) 
            {
                return HTML.split(`{% block ${target} %}`)[1].split(`{% endblock %}`)[0];
            }
            
        });
        const getExtends = function (HTML) 
        {
            let _extends = HTML.split('%}')[0];
            return _extends.match( new RegExp(`{% extends '(.*)' $`) )? 
            _extends.split(`'`)[1] : _extends.match( new RegExp(`{% extends "(.*)" $`) )?
            _extends.split(`"`)[1] : null;
        }
    },
    "getAJAX" : function () 
    {
        let xmlHTTP;

        if( window.ActiveXObject )
        {
            xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else if( window.XMLHttpRequest ) 
        {
            xmlHTTP = new XMLHttpRequest(); // 主要跑這個
        }

        return xmlHTTP;
    },
    // 讀取內容
    "getContent" : function (linkHTML, func, fileExtension = 'html') 
    {
        const content = this.getAJAX();

        content.open('GET', `${this.path.content}/${linkHTML}.${fileExtension}`, true);
        
        if ( func )
            content.onload = func;
        
        if ( fileExtension === 'json')
            content.responseType = 'json';
        
        content.send();

        return content;
    }
}

// 建模
/* sample
var writeContent = function (tmp, append)
{
    // 實作內容
    // write your Content
    //var target = tmp.content.querySelector('target');
    //var targets = tmp.content.querySelectorAll('targets');

    append( document.importNode(tmp.content, true) ); // 插入內容
}
templater('#template', `'#insert'|'.insert'|'input[name=passwd]'`, writeContent);
*/
function templater(template, insert, writeContent)
{
    if ( !'content' in document.createElement('template') )
    {
        alert("該瀏覽器不支援<template>");
        return;
    }
    if ( !writeContent ) return;

    var tmp = document.querySelector(template);
    var insertPosition = document.querySelector(insert);

    writeContent( tmp, function (clone) { insertPosition.appendChild(clone); } );
}

function viewter (linkHTML, insert, func) 
{
    linkHTML = readJson.response['url'][linkHTML];
    // 讀取page
    Layouter.getContent(linkHTML, function()
    {
        const HTML = this.response;
        document.querySelector(insert).innerHTML = HTML.split("{% view %}")[1];
        if ( func ) func();
    });
}