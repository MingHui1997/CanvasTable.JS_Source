"use strict";

//--------------------------------------------------------------------
// 控制台输出
//--------------------------------------------------------------------
function cprint(str)
{
    if(CT_DEBUG_MODE === 1) //如果调试模式开启
    {
        console.log(str); //将字符串输出到控制台
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取资源
//--------------------------------------------------------------------
function res(n)
{
    var i;
    for(i=0;i<CT_ResourceList.length;i++) //查找整个资源列表
    {
        if(CT_ResourceList[i] != null) //如果当前资源路径不为空
        {
            if(CT_ResourceList[i][0] === n) //如果找到指定资源
            {
                return i; //返回资源索引
            }
        }
    }
    return -1;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// rgb颜色
//--------------------------------------------------------------------
function color(r,g,b,a)
{
    var red = "00"; //red值
    var green = "00"; //green值
    var blue = "00"; //blue值
    var alpha = "00";
    var color_code = "#00000000";
    if(r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) //如果参数的范围在0 - 255之间
    {
        if(r >= 0 && r <= 15) //如果参数r的范围在0 - 15之间
        {
            red = "0" + r.toString(16); //在十六进制red值前加0
        }
        else //如果参数r的范围不在0 - 16之间
        {
            red = r.toString(16); //在十六进制red值
        }
        if(g >= 0 && g <= 15) //如果参数g的范围在0 - 15之间
        {
            green = "0" + g.toString(16); //在十六进制green值前加0
        }
        else //如果参数g的范围不在0 - 16之间
        {
            green = g.toString(16); //在十六进制green值
        }
        if(b >= 0 && b <= 15) //如果参数b的范围在0 - 15之间
        {
            blue = "0" + b.toString(16); //在十六进制blue值
        }
        else //如果参数b的范围不在0 - 16之间
        {
            blue = b.toString(16); //在十六进制blue值
        }
        if(a >= 0 && a <= 15) //如果参数a的范围在0 - 15之间
        {
            alpha = "0" + a.toString(16); //在十六进制alpha值前加0
        }
        else //如果参数a的范围不在0 - 16之间
        {
            alpha = a.toString(16); //在十六进制alpha值
        }
        color_code = "#" + red + green + blue + alpha; //颜色值
    }
    else
    {
        cprint("ERROR : The color value is error.");
    }
    return color_code; //返回颜色值
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 文本像素宽度
//--------------------------------------------------------------------
function string_pxwidth(str,size)
{
    CT_Ctx.font = String(size) + "px Def"; //字体大小
    var text_w = CT_Ctx.measureText(str); //测量文本像素宽度
    return parseInt(text_w.width); //返回文本像素宽度
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置视野设置x
//--------------------------------------------------------------------
function view_set_x(x)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(x !== CT_ViewLastX) //如果x不等于上次x
        {
            CT_ViewX = x; //设置视野位置x
            CT_ViewLastX = x; //设置上次视野位置x
            CT_InterfaceRepaint(); //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 设置视野设置y
//--------------------------------------------------------------------
function view_set_y(y)
{
    if(CT_RunnerStatus === 1) //如果运行器状态为1
    {
        if(y !== CT_ViewLastY) //如果y不等于上次y
        {
            CT_ViewY = y;//设置视野位置y
            CT_ViewLastY = y; //设置上次视野位置y
            CT_InterfaceRepaint(); //请求重绘
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 视野位置x
//--------------------------------------------------------------------
function view_x()
{
    return CT_ViewX; //返回视野位置x
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 视野位置y
//--------------------------------------------------------------------
function view_y()
{
    return CT_ViewY; //返回视野位置y
}
//--------------------------------------------------------------------