﻿"use strict";

var CT_ContainerTask = []; //子程序容器
var CT_ContainerTaskNum = []; //子程序数字变量容器
var CT_ContainerTaskStr = []; //子程序字符串变量容器
var CT_ContainerTaskLength = 0; //子程序容器长度
var CT_TaskStateList = []; //子程序状态列表
var CT_TaskRunIndex = 0; //子程序运行索引
//--------------------------------------------------------------------
// 子程序创建
//--------------------------------------------------------------------
function CT_TaskCreate(task_i,task_m,task_l)
{
    var data_i = task_i * 2; //子程序函数索引
    CT_ContainerTask[data_i] = task_m; //将子程序的主函数存入容器
    CT_ContainerTask[data_i+1] = task_l; //将子程序的循环函数存入容器
    CT_TaskStateList[task_i] = 1; //将子程序状态设置为等待
    if(task_i >= CT_ContainerTaskLength) //如果子程序索引大于等于子程序容器长度
    {
        CT_ContainerTaskLength = task_i + 1; //确定子程序长度
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序销毁
//--------------------------------------------------------------------
function CT_TaskDestroy(task_i)
{
    if(task_i < CT_ContainerTaskLength) //如果子程序索引小于等于子程序容器长度
    {
        var data_i = task_i * 256; //子程序变量数据索引
        var data_i2 = task_i * 2; //子程序函数索引
        var i;
        var i2;
        CT_ContainerTask[data_i2] = null; //清除子程序主函数
        CT_ContainerTask[data_i2+1] = null; //清除子程序循环函数
        CT_TaskStateList[task_i] = 0; //子程序状态为0
        for(i=0;i<256;i++) //遍历该子程序的变量
        {
            CT_ContainerTaskNum[data_i+i] = 0; //清除数字变量
            CT_ContainerTaskStr[data_i+i] = ""; //清除字符串变量
        }
        for(i2=CT_ContainerTaskLength-1;i2>=-1;i2--) //反向遍历子程序容器
        {
            if(i2 >= 0) //如果子程序索引大于0
            {
                if(CT_TaskStateList[i2] !== 0) //如果当前子程序不为空
                {
                    CT_ContainerTaskLength = i2 + 1; //确定子程序容器长度
                    break; //中断
                }
            }
            else
            {
                CT_ContainerTaskLength = 0; //子程序容器长度为0
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序变量赋值 数字
//--------------------------------------------------------------------
function CT_TaskSetNum(ti,vi,n)
{
    if(ti < CT_ContainerTaskLength) //如果子程序索引小于子程序容器长度
    {
        if(vi < 256) //如果变量索引小于256
        {
            CT_ContainerTaskNum[ti * 256 + vi] = n; //数字变量赋值
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取子程序变量 数字
//--------------------------------------------------------------------
function CT_TaskNum(ti,vi)
{
    if(ti < CT_ContainerTaskLength) //如果子程序索引小于子程序容器长度
    {
        if(vi < 256) //如果变量索引小于256
        {
            return CT_ContainerTaskNum[ti * 256 + vi]; //获取数字变量
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序变量赋值 小数
//--------------------------------------------------------------------
function CT_TaskSetDec(ti,vi,d)
{
    if(ti < CT_ContainerTaskLength) //如果子程序索引小于子程序容器长度
    {
        if(vi < 256) //如果变量索引小于256
        {
            CT_ContainerTaskNum[ti * 256 + vi] = d; //小数变量赋值
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取子程序变量 小数
//--------------------------------------------------------------------
function CT_TaskDec(ti,vi)
{
    if(ti < CT_ContainerTaskLength) //如果子程序索引小于子程序容器长度
    {
        if(vi < 256) //如果变量索引小于256
        {
            return CT_ContainerTaskNum[ti * 256 + vi]; //获取小数变量
        }
    }
    return 0;
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序变量赋值 字符串
//--------------------------------------------------------------------
function CT_TaskSetStr(ti,vi,s)
{
    if(ti < CT_ContainerTaskLength) //如果子程序索引小于子程序容器长度
    {
        CT_ContainerTaskStr[ti * 256 + vi] = s; //设置子程序字符串变量
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 获取子程序变量 字符串
//--------------------------------------------------------------------
function CT_TaskStr(ti,vi)
{
    if(ti < CT_ContainerTaskLength) //如果子程序索引小于子程序容器长度
    {
        if(vi < 256)
        {
            return CT_ContainerTaskStr[ti * 256 + vi]; //获取字符串变量
        }
    }
    return "";
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序准备
//--------------------------------------------------------------------
function CT_TaskReady()
{
    var i;
    for(i=0;i<CT_ContainerTaskLength;i++) //遍历子程序容器
    {
        if(CT_TaskStateList[i] === 1) //如果当前子程序状态为准备
        {
            CT_TaskStateList[i] = 2; //将当前子程序标记为运行
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行子程序子函数
//--------------------------------------------------------------------
function CT_TaskRunMain()
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerTaskLength;i++) //遍历子程序容器
    {
        if(CT_TaskStateList[i] === 2) //如果当前子程序状态为运行
        {
            data_i = i * 2; //子程序函数索引
            if(CT_ContainerTask[data_i] != null) //如果当前子程序主函数指针不为空
            {
                CT_TaskRunIndex = i; //子程序运行索引
                CT_ContainerTask[data_i](); //执行子程序main函数
                CT_TaskStateList[i] = 3; //将当前子程序状态设置为循环
            }
        }
    }
    CT_TaskRunIndex = 0; //子程序运行索引
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 运行程序循环函数
//--------------------------------------------------------------------
function CT_TaskRunLoop()
{
    var i;
    var data_i;
    for(i=0;i<CT_ContainerTaskLength;i++) //遍历子程序容器
    {
        if(CT_TaskStateList[i] === 3) //如果当前子程序状态为循环
        {
            data_i = i * 2; //子程序函数索引
            if(CT_ContainerTask[data_i + 1] != null) //如果当前子程序循环函数不为空
            {
                CT_TaskRunIndex = i; //子程序运行索引
                CT_ContainerTask[data_i + 1](); //执行子程序循环函数
            }
        }
    }
    CT_TaskRunIndex = 0; //子程序运行索引为0
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 子程序容器清除
//--------------------------------------------------------------------
function CT_ContainerTaskClear()
{
    CT_ContainerTask = []; //清除子程序容器
    CT_ContainerTaskNum = []; //清除子程序数字/小数变量容器
    CT_ContainerTaskStr = []; //清除子程序字符串变量容器
    CT_TaskStateList = []; //清除子程序状态列表
    CT_ContainerTaskLength = 0; //子程序长度为0
    CT_TaskRunIndex = 0; //子程序运行索引为0
}
//--------------------------------------------------------------------