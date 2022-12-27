﻿"use strict";

//--------------------------------------------------------------------
// 清除缓冲画布
//--------------------------------------------------------------------
function CTBCanvas_Clear()
{
    CT_BCtx.clearRect(0,0,CT_CanvasW,CT_CanvasH); //清除整个缓冲画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 缓冲画布输出
//--------------------------------------------------------------------
function CTBCanvas_Output()
{
    CT_Ctx.clearRect(0,0,CT_CanvasW,CT_CanvasH); //清除整个画布
    CT_Ctx.drawImage(CT_BufferCanvas,0,0); //将缓冲画布输出到主画布
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制矩形(缓冲)
//--------------------------------------------------------------------
function CTBCanvas_Rectangle(x,y,w,h,c,f)
{
    CT_BCtx.beginPath(); //开始路径
    if(f === 1) //如果是实心
    {
        CT_BCtx.fillStyle = c; //填充颜色
        CT_BCtx.fillRect(x,y,w,h); //在缓冲画布上绘制矩形
    }
    if(f === 0) //如果是空心
    {
        CT_BCtx.strokeStyle = c; //描边颜色
        CT_BCtx.lineWidth = 1; //线宽度
        CT_BCtx.strokeRect(x+0.5,y+0.5,w-1,h-1); //在缓冲画布上绘制矩形边框
    }
    CT_BCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制线(缓冲)
//--------------------------------------------------------------------
function CTBCanvas_Line(x1,y1,x2,y2,w,c)
{
    CT_BCtx.beginPath(); //开始路径
    CT_BCtx.strokeStyle = c; //描边颜色
    CT_BCtx.lineWidth = w; //线宽度
    var line_move = w * 0.5; //线偏移
    if(x1 === x2) //如果是竖线
    {
        CT_BCtx.moveTo(x1+line_move,y1); //设置线的起点位置
        CT_BCtx.lineTo(x2+line_move,y2); //设置线的终点位置
    }
    if(y1 === y2) //如果是横线
    {
        CT_BCtx.moveTo(x1,y1+line_move); //设置线的起点位置
        CT_BCtx.lineTo(x2,y2+line_move); //设置线的终点位置
    }
    if(x1 !== x2 && y1 !== y2) //如果是斜线
    {
        CT_BCtx.moveTo(x1,y1); //设置线的起点位置
        CT_BCtx.lineTo(x2,y2); //设置线的终点位置
    }
    CT_BCtx.stroke(); //在缓冲画布上绘制线
    CT_BCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制圆(缓冲)
//--------------------------------------------------------------------
function CTBCanvas_Circle(x,y,r,c,f)
{
    CT_BCtx.beginPath(); //开始路径
    if(f === 1) //如果是实心
    {
        CT_BCtx.fillStyle = c; //填充颜色
        CT_BCtx.arc(x,y,r,0,Math.PI*2); //设置圆
        CT_BCtx.fill(); //在缓冲画布上绘制圆
    }
    if(f === 0) //如果是空心
    {
        CT_BCtx.beginPath(); //开始路径
        CT_BCtx.strokeStyle = c; //描边颜色
        CT_BCtx.lineWidth = 1; //线宽度
        CT_BCtx.arc(x,y,r,0,Math.PI*2); //设置圆
        CT_BCtx.arc(x,y,r,0,Math.PI*2); //设置圆
        CT_BCtx.stroke(); //在缓冲画布上绘制圆边框
    }
    CT_BCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制文本(缓冲)
//--------------------------------------------------------------------
function CTBCanvas_String(x,y,s,c,t)
{
    CT_BCtx.font = String(s) + "px Def"; //字体大小
    CT_BCtx.fillStyle = c; //字体颜色
    CT_BCtx.fillText(t,x,y+s-2); //在缓冲画布上绘制文本
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像(缓冲)
//--------------------------------------------------------------------
function CTBCanvas_Image(x,y,i)
{
    CT_BCtx.drawImage(CT_ContainerResource[i],x,y); //绘制资源容器中指定的图像
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制图像部分(缓冲)
//--------------------------------------------------------------------
function CTBCanvas_ImagePart(x,y,i,ix,iy,iw,ih)
{
    CT_BCtx.drawImage(CT_ContainerResource[i],ix,iy,iw,ih,x,y,iw,ih); //绘制资源容器中指定的图像部分
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制曲线(缓冲)
//--------------------------------------------------------------------
function CTBCanvas_Curve(x1,y1,x2,y2,x3,y3,w,c)
{
    CT_BCtx.beginPath(); //开始路径
    CT_BCtx.strokeStyle = c; //描边颜色
    CT_BCtx.lineWidth = w; //曲线宽度
    CT_BCtx.moveTo(x1,y1); //曲线起点
    CT_BCtx.quadraticCurveTo(x2,y2,x3,y3); //曲线的控制点和终点
    CT_BCtx.stroke(); //在缓冲画布上绘制曲线
    CT_BCtx.closePath(); //结束路径
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 绘制三角形(缓冲)
//--------------------------------------------------------------------
function CTBCanvas_Triangle(x1,y1,x2,y2,x3,y3,c,f)
{
    if(f === 0) //如果是空心
    {
        CT_BCtx.beginPath(); //开始路径
        CT_BCtx.strokeStyle = c; //填充颜色
        CT_BCtx.moveTo(x1+0.5,y1+0.5); //设置三角形的起点位置
        CT_BCtx.lineTo(x2+0.5,y2+0.5); //设置三角形第二点的位置
        CT_BCtx.lineTo(x3+0.5,y3+0.5); //设置三角形第三点的位置
        CT_BCtx.lineTo(x1+0.5,y1+0.5); //设置三角形终点的位置
        CT_BCtx.stroke(); //填充三角形
        CT_BCtx.closePath(); //结束路径
    }
    if(f === 1) //如果是实心
    {
        CT_BCtx.beginPath(); //开始路径
        CT_BCtx.fillStyle = c; //填充颜色
        CT_BCtx.moveTo(x1,y1); //设置三角形的起点位置
        CT_BCtx.lineTo(x2,y2); //设置三角形第二点的位置
        CT_BCtx.lineTo(x3,y3); //设置三角形第三点的位置
        CT_BCtx.lineTo(x1,y1); //设置三角形终点的位置
        CT_BCtx.fill(); //填充三角形
        CT_BCtx.closePath(); //结束路径
    }
}
//--------------------------------------------------------------------