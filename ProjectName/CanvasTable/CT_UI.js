﻿"use strict";

//--------------------------------------------------------------------
// 容器格式
//--------------------------------------------------------------------
// [窗口数据,...]
// 窗口:[id,层,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,背景图片,图像偏移];
// 
// [UI数据,...]
// 按钮:[id,对应窗口的索引,1,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,文本颜色,背景图片,文本,文本宽度,文本高度,点击状态,始终按下状态,按下状态,松开状态,图像偏移,使用图像字体,字体图像索引,字体字符数,字体间隙,字体字符列表,字体字形列表]
// 文本:[id,对应窗口的索引,2,x,y,文本颜色,文本,字体大小,使用图像字体,字体图像索引,字体字符数,字体间隙,字体字符列表,字体字形列表]
// 复选框:[id,对应窗口的索引,3,x,y,宽度,高度,背景颜色,边框颜色,部件颜色,状态]
// 单选框:[id,对应窗口的索引,4,x,y,宽度,高度,背景颜色,边框颜色,部件颜色,组,状态]
// 进度条:[id,对应窗口的索引,5,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,部件颜色,背景图片,部件宽度,值,最大值,图像偏移]
// 文本框:[id,对应窗口的索引,6,x,y,宽度,高度,背景颜色,上边框颜色,下边框颜色,左边框颜色,右边框颜色,字体颜色,背景图片,值,密码,数字,最大字符数,只读,子文本框,子文本框名称,字体大小,图像偏移,使用图像字体,字体图像索引,字体字符数,字体间隙,字体字符列表,字体字形列表]
// 图像元件[id,对应窗口的索引,7,x,y,图像,子图像,子图像数量,子图像宽度,子图像高度,子图像偏移]
//--------------------------------------------------------------------
var CT_UIId = 0;
var CT_ContainerWindow = []; //窗口容器
var CT_ContainerWindowLength = 0; //窗口容器长度
var CT_ContainerUI = []; //UI容器
var CT_ContainerUILength = 0; //UI容器长度
var CT_Textbox_Index = -1; //点击文本框的索引
var CT_DownX = -1; //鼠标按下的位置x
var CT_DownY = -1; //鼠标按下的位置y
var CT_DialogShow = 0; //对话框显示
var CT_Dialog_Index = -1; //对话框对应文本框的索引
//--------------------------------------------------------------------
// UI对象ID
//--------------------------------------------------------------------
function CT_UIGetId()
{
    var id = CT_UIId; //当前UI Id
    CT_UIId ++; //UI Id +1
    if(CT_UIId > 2100000000) //如果UI id大于2100000000
    {
        CT_UIId = 630000000; //UI id等于630000000
    }
    return id; //返回 UI Id
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI运行
//--------------------------------------------------------------------
function CT_UIRun()
{
    var i;
    for(i=0;i<CT_ContainerWindowLength;i++) //遍历窗口容器
    {
        if(CT_ContainerWindow[i] != null) //如果当前窗口不为空
        {
            var win_x = CT_ContainerWindow[i][2]; //窗口位置x
            var win_y = CT_ContainerWindow[i][3]; //窗口位置y
            var win_w = CT_ContainerWindow[i][4]; //窗口宽度
            var win_h = CT_ContainerWindow[i][5]; //窗口高度
            var i2;
            for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
            {
                if(CT_ContainerUI[i2] != null) //如果当前UI对象不为空
                {
                    var ui_win_index = CT_ContainerUI[i2][1]; //当前UI对象对应窗口索引
                    if(ui_win_index === i) //如果前UI对象对应窗口索引等于当前窗口索引
                    {
                        var ui_x = win_x + CT_ContainerUI[i2][3]; //UI位置x
                        var ui_y = win_y + CT_ContainerUI[i2][4]; //UI位置y
                        var ui_w = CT_ContainerUI[i2][5]; //UI宽度
                        var ui_h = CT_ContainerUI[i2][6]; //UI高度
                        var ui_type = CT_ContainerUI[i2][2]; //所点击UI的类型
                        if(ui_type === 1) //如果当前UI对象是按钮
                        {
                            if(mouse_down(mkey_left)) //如果鼠标按下
                            {
                                CT_DownX = mouse_x(); //鼠标按下的位置x
                                CT_DownY = mouse_y(); //鼠标按下的位置y
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX < ui_x + ui_w && CT_DownY < ui_y + ui_h) //如果鼠标按下的位置在UI范围内
                                {
                                    if(CT_DialogShow === 0) //如果对话框没有显示
                                    {
                                        CT_ContainerUI[i2][18] = 1; //设置当前按钮的始终按下状态
                                        CT_ContainerUI[i2][19] = 1; //设置当前按钮的按下状态
                                    }
                                }
                            }
                            if(mouse_up(mkey_left)) //如果鼠标松开
                            {
                                CT_ContainerUI[i2][18] = 0; //设置当前按钮的始终按下状态
                                var up_x = mouse_x(); //鼠标松开的位置x
                                var up_y = mouse_y(); //鼠标松开的位置y
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX < ui_x + ui_w && CT_DownY < ui_y + ui_h && up_x >= ui_x && up_y >= ui_y && up_x < ui_x + ui_w && up_y < ui_y + ui_h) //如果鼠标按下的位置和松开的位置都在UI范围内
                                {
                                    if(CT_DialogShow === 0) //如果对话框没有显示
                                    {
                                        CT_ContainerUI[i2][17] = 1; //设置当前按钮的点击状态
                                        CT_ContainerUI[i2][20] = 1; //设置当前按钮的松开状态
                                    }
                                }
                            }
                        }
                        if(ui_type === 3) //如果当前UI对象是复选框
                        {
                            if(mouse_down(mkey_left)) //如果鼠标按下
                            {
                                CT_DownX = mouse_x(); //鼠标按下的位置x
                                CT_DownY = mouse_y(); //鼠标按下的位置y
                            }
                            if(mouse_up(mkey_left)) //如果鼠标松开
                            {
                                var up_x = mouse_x(); //鼠标松开的位置x
                                var up_y = mouse_y(); //鼠标松开的位置y
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX < ui_x + ui_w && CT_DownY < ui_y + ui_h && up_x >= ui_x && up_y >= ui_y && up_x < ui_x + ui_w && up_y < ui_y + ui_h) //如果鼠标按下的位置和松开的位置都在UI范围内
                                {
                                    var c_s = CT_ContainerUI[i2][10]; //复选框状态
                                    if(c_s === 0) //如果复选框没有勾选
                                    {
                                        CT_ContainerUI[i2][10] = 1; //设置复选框状态
                                        CT_Repaint = 1; //请求重绘
                                        return; //中断
                                    }
                                    if(c_s === 1) //如果复选框勾选
                                    {
                                        CT_ContainerUI[i2][10] = 0; //设置复选框状态
                                        CT_Repaint = 1; //请求重绘
                                        return; //中断
                                    }
                                }
                            }
                        }
                        if(ui_type === 4) //如果当前UI对象是单选框
                        {
                            if(mouse_down(mkey_left)) //如果鼠标按下
                            {
                                CT_DownX = mouse_x(); //鼠标按下的位置x
                                CT_DownY = mouse_y(); //鼠标按下的位置y
                            }
                            if(mouse_up(mkey_left)) //如果鼠标松开
                            {
                                var up_x = mouse_x(); //鼠标松开的位置x
                                var up_y = mouse_y(); //鼠标松开的位置y
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX < ui_x + ui_w && CT_DownY < ui_y + ui_h && up_x >= ui_x && up_y >= ui_y && up_x < ui_x + ui_w && up_y < ui_y + ui_h) //如果鼠标按下的位置和松开的位置都在UI范围内
                                {
                                    var radio_g = CT_ContainerUI[i2][10]; //当前单选框组
                                    var i3;
                                    for(i3=0;i3<CT_ContainerUILength;i3++) //遍历UI容器
                                    {
                                        if(CT_ContainerUI[i3] != null) //如果当前UI对象不为空
                                        {
                                            var c_ui_type = CT_ContainerUI[i3][2]; //UI容器当前UI对象类型
                                            if(c_ui_type === 4) //如果UI容器当前UI对象类型是单选框
                                            {
                                                var c_radio_g = CT_ContainerUI[i3][10]; //UI容器当前单选框组
                                                if(c_radio_g === radio_g) //如果UI容器当前单选框组等于当前单选框组
                                                {
                                                    CT_ContainerUI[i3][11] = 0; //将UI容器当前单选框状态设置为0
                                                }
                                            }
                                        }
                                    }
                                    CT_ContainerUI[i2][11] = 1; //将当前单选框状态设置为1
                                    CT_Repaint = 1; //请求重绘
                                }
                            }
                        }
                        if(ui_type === 6) //如果当前UI对象是文本框
                        {
                            if(mouse_down(mkey_left)) //如果鼠标按下
                            {
                                CT_DownX = mouse_x(); //鼠标按下的位置x
                                CT_DownY = mouse_y(); //鼠标按下的位置y
                            }
                            if(mouse_up(mkey_left)) //如果鼠标松开
                            {
                                var up_x = mouse_x(); //鼠标松开的位置x
                                var up_y = mouse_y(); //鼠标松开的位置y
                                if(CT_DownX >= ui_x && CT_DownY >= ui_y && CT_DownX < ui_x + ui_w && CT_DownY < ui_y + ui_h && up_x >= ui_x && up_y >= ui_y && up_x < ui_x + ui_w && up_y < ui_y + ui_h) //如果鼠标按下的位置和松开的位置都在UI范围内
                                {
                                    var subbox = CT_ContainerUI[i2][19]; //子文本框
                                    if(subbox === 0) //如果不使用子文本框
                                    {
                                        CT_Textbox_Index = i2; //点击的文本框在窗口中的索引
                                    }
                                    if(subbox === 1 || CT_DEVICE === 1) //如果使用子文本框或设备是移动平台
                                    {
                                        var readonly = CT_ContainerUI[i2][18]; //文本框只读参数
                                        if(readonly === 0) //如果文本框不是只读
                                        {
                                            var t_val = CT_ContainerUI[i2][14]; //文本框值
                                            var t_name = CT_ContainerUI[i2][20]; //文本框名称
                                            var t_max = CT_ContainerUI[i2][17]; //文本框最大字符数
                                            var t_pass = CT_ContainerUI[i2][15]; //文本框密码
                                            var t_numb = CT_ContainerUI[i2][16]; //文本框数字
                                            CT_Textbox_Index = -1; //取消点击的文本框
                                            CT_Dialog_Index = i2; //对话框对应文本框的索引
                                            CT_DialogCreate(t_val,t_name,t_max,t_pass,t_numb); //创建子文本框
                                        }
                                    }
                                    CT_Repaint = 1; //请求重绘
                                    return; //中断
                                }
                            }
                            if(CT_Textbox_Index === i2) //如果点击了文本框
                            {
                                if(CT_ContainerUI[CT_Textbox_Index] != null) //如果点击的文本框不为空
                                {
                                    var readonly = CT_ContainerUI[CT_Textbox_Index][18]; //文本框只读参数
                                    if(readonly === 0) //如果文本框不是只读
                                    {
                                        if(CT_KeyChar !== "" && CT_KeyChar !== "\b") //如果输入了字符
                                        {
                                            var tbox_length = CT_ContainerUI[CT_Textbox_Index][14].length; //文本框字符串长度
                                            var tbox_max = CT_ContainerUI[CT_Textbox_Index][17]; //文本框最大字符数
                                            var tbox_number = CT_ContainerUI[CT_Textbox_Index][16]; //数字文本框参数
                                            if(tbox_length < tbox_max) //如果文本框字符串长度小于文本框最大字符数
                                            {
                                                if(tbox_number !== 1) //如果文本框不是数字文本框
                                                {
                                                    CT_ContainerUI[CT_Textbox_Index][14] += CT_KeyChar; //文本框增加字符
                                                    CT_Repaint = 1; //请求重绘
                                                }
                                                else //如果文本框是数字文本框
                                                {
                                                    if(CT_KeyChar === "0" || CT_KeyChar === "1" || CT_KeyChar === "2" || CT_KeyChar === "3" || CT_KeyChar === "4" || CT_KeyChar === "5" || CT_KeyChar === "6" || CT_KeyChar === "7" || CT_KeyChar === "8" || CT_KeyChar === "9") //如果当前输入的字符是数字
                                                    {
                                                        CT_ContainerUI[CT_Textbox_Index][14] += CT_KeyChar; //文本框增加字符
                                                        CT_Repaint = 1; //请求重绘
                                                    }
                                                }
                                            }
                                        }
                                        if(CT_KeyChar === "\b") //如果输入了退格
                                        {
                                            var tbox_length = CT_ContainerUI[CT_Textbox_Index][14].length; //文本框字符串长度
                                            if(tbox_length > 0) //如果文本框字符串长度大于0
                                            {
                                                CT_ContainerUI[CT_Textbox_Index][14] = CT_ContainerUI[CT_Textbox_Index][14].slice(0,tbox_length-1); //文本框字符串减少一个字符
                                                CT_Repaint = 1; //请求重绘
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// UI渲染
//--------------------------------------------------------------------
function CT_UIRender(l)
{
    var i;
    var win_index = 0; //当前窗口索引
    for(i=0;i<CT_ContainerWindowLength;i++) //遍历窗口容器
    {
        win_index = i; //当前窗口索引
        if(CT_ContainerWindow[i] != null) //如果当前窗口不为空
        {
            var window_layer = CT_ContainerWindow[i][1]; //当前窗口层
            if(window_layer === l) //如果当前窗口层等于渲染层
            {
                var win_x = CT_ContainerWindow[i][2]; //窗口位置x
                var win_y = CT_ContainerWindow[i][3]; //窗口位置y
                var win_w = CT_ContainerWindow[i][4]; //窗口宽度
                var win_h = CT_ContainerWindow[i][5]; //窗口高度
                var win_cbg = CT_ContainerWindow[i][6]; //窗口背景颜色
                var win_cbu = CT_ContainerWindow[i][7]; //窗口上边框颜色
                var win_cbd = CT_ContainerWindow[i][8]; //窗口下边框颜色
                var win_cbl = CT_ContainerWindow[i][9]; //窗口左边框颜色
                var win_cbr = CT_ContainerWindow[i][10]; //窗口右边框颜色
                var win_img = CT_ContainerWindow[i][11]; //窗口背景图片
                var win_imgo = CT_ContainerWindow[i][12]; //窗口背景图像偏移
                if(win_img !== -1) //如果窗口背景图片不为空
                {
                    var img_w = CT_ResourceList[win_img][2] - win_imgo * 2; //背景图像宽度
                    var img_h = CT_ResourceList[win_img][3] - win_imgo * 2; //背景图像高度
                    CTBCanvas_ImagePart(win_x,win_y,win_img,win_imgo,win_imgo,img_w,img_h); //绘制背景图像
                }
                else //如果窗口背景图片为空
                {
                    CTBCanvas_Rectangle(win_x,win_y,win_w,win_h,win_cbg,1); //绘制窗口背景
                    CTBCanvas_Rectangle(win_x,win_y-2,win_w,2,win_cbu,1); //绘制窗口上边框
                    CTBCanvas_Rectangle(win_x,win_y+win_h,win_w,2,win_cbd,1); //绘制窗口下边框
                    CTBCanvas_Rectangle(win_x-2,win_y-2,2,win_h+4,win_cbl,1); //绘制窗口左边框
                    CTBCanvas_Rectangle(win_x+win_w,win_y-2,2,win_h+4,win_cbr,1); //绘制窗口右边框
                }
                var i2;
                for(i2=0;i2<CT_ContainerUILength;i2++) //遍历UI容器
                {
                    if(CT_ContainerUI[i2] != null) //如果当前UI对象不为空
                    {
                        var ui_win_index = CT_ContainerUI[i2][1]; //当前UI对象对应窗口索引
                        if(ui_win_index === win_index) //如果当前UI对象对应窗口索引等于当前窗口索引
                        {
                            var ui_type = CT_ContainerUI[i2][2]; //当前UI对象类型
                            if(ui_type === 1) //如果当前UI对象是按钮
                            {
                                var b_x = win_x + CT_ContainerUI[i2][3]; //按钮位置x
                                var b_y = win_y + CT_ContainerUI[i2][4]; //按钮位置y
                                var b_w = CT_ContainerUI[i2][5]; //按钮宽度
                                var b_h = CT_ContainerUI[i2][6]; //按钮高度
                                var b_cbg = CT_ContainerUI[i2][7]; //按钮背景颜色
                                var b_cbu = CT_ContainerUI[i2][8]; //按钮上边框颜色
                                var b_cbd = CT_ContainerUI[i2][9]; //按钮下边框颜色
                                var b_cbl = CT_ContainerUI[i2][10]; //按钮左边框颜色
                                var b_cbr = CT_ContainerUI[i2][11]; //按钮右边框颜色
                                var b_ct = CT_ContainerUI[i2][12]; //按钮文本颜色
                                var b_img = CT_ContainerUI[i2][13]; //按钮背景图片
                                var b_imgo = CT_ContainerUI[i2][21]; //背景图像偏移
                                var b_t = CT_ContainerUI[i2][14]; //按钮显示文本
                                var b_tw = CT_ContainerUI[i2][15]; //按钮文本宽度
                                var b_th = CT_ContainerUI[i2][16]; //按钮文本高度
                                var b_tx = parseInt(b_x + ((b_w - b_tw) / 2)); //按钮显示文本位置x
                                var b_ty = parseInt(b_y + ((b_h - b_th) / 2)); //按钮显示文本位置y
                                var imgfont_use = CT_ContainerUI[i2][22]; //使用图像字体
                                if(b_img !== -1) //如果按钮背景图片不为空
                                {
                                    var img_w = CT_ResourceList[b_img][2] - b_imgo * 2; //背景图像宽度
                                    var img_h = CT_ResourceList[b_img][3] - b_imgo * 2; //背景图像高度
                                    CTBCanvas_ImagePart(b_x,b_y,b_img,b_imgo,b_imgo,img_w,img_h); //绘制按钮背景图片
                                }
                                else //如果按钮背景图片为空
                                {
                                    CTBCanvas_Rectangle(b_x,b_y,b_w,b_h,b_cbg,1); //绘制按钮背景
                                    CTBCanvas_Rectangle(b_x,b_y,b_w,2,b_cbu,1); //绘制按钮上边框
                                    CTBCanvas_Rectangle(b_x,b_y+b_h-2,b_w,2,b_cbd,1); //绘制按钮下边框
                                    CTBCanvas_Rectangle(b_x,b_y,2,b_h-2,b_cbl,1); //绘制按钮左边框
                                    CTBCanvas_Rectangle(b_x+b_w-2,b_y,2,b_h-2,b_cbr,1); //绘制按钮右边框
                                }
                                if(imgfont_use === 1) //如果使用图像字体
                                {
                                    var b_font_img = CT_ContainerUI[i2][23]; //字体图像
                                    var b_font_charnum = CT_ContainerUI[i2][24]; //字体字符数
                                    var b_font_chargap = CT_ContainerUI[i2][25]; //字体间隙
                                    var b_font_charlist = CT_ContainerUI[i2][26]; //字体字符列表
                                    var b_font_glyphlist = CT_ContainerUI[i2][27]; //字体字形列表
                                    CTBCanvas_ImgString(b_tx,b_ty,b_ct,b_t,b_font_img,b_font_charnum,b_font_chargap,b_font_charlist,b_font_glyphlist); //绘制按钮文本
                                }
                                if(imgfont_use === 0) //如果使用一般字体
                                {
                                    CTBCanvas_String(b_tx,b_ty,b_th,b_ct,b_t); //绘制按钮文本
                                }
                            }
                            if(ui_type === 2) //如果当前UI对象是文本
                            {
                                var t_x = win_x + CT_ContainerUI[i2][3]; //文本位置x
                                var t_y = win_y + CT_ContainerUI[i2][4]; //文本位置y
                                var t_c = CT_ContainerUI[i2][5]; //文本颜色
                                var t_t = CT_ContainerUI[i2][6]; //文本
                                var imgfont_use = CT_ContainerUI[i2][8]; //使用图像字体
                                if(imgfont_use === 0) //如果使用一般字体
                                {
                                    var t_s = CT_ContainerUI[i2][7]; //文本字体大小
                                    CTBCanvas_String(t_x,t_y,t_s,t_c,t_t); //绘制文本
                                }
                                if(imgfont_use === 1) //如果使用图像字体
                                {
                                    var t_font_img = CT_ContainerUI[i2][9]; //字体图像
                                    var t_font_charnum = CT_ContainerUI[i2][10]; //字体字符数
                                    var t_font_chargap = CT_ContainerUI[i2][11]; //字体间隙
                                    var t_font_charlist = CT_ContainerUI[i2][12]; //字体字符列表
                                    var t_font_glyphlist = CT_ContainerUI[i2][13]; //字体字形列表
                                    CTBCanvas_ImgString(t_x,t_y,t_c,t_t,t_font_img,t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist); //绘制按钮文本
                                }
                            }
                            if(ui_type === 3) //如果当前UI对象是复选框
                            {
                                var c_x = win_x + CT_ContainerUI[i2][3]; //复选框位置x
                                var c_y = win_y + CT_ContainerUI[i2][4]; //复选框位置y
                                var c_w = CT_ContainerUI[i2][5]; //复选框宽度
                                var c_h = CT_ContainerUI[i2][6]; //复选框高度
                                var c_cbg = CT_ContainerUI[i2][7]; //复选框背景颜色
                                var c_cb = CT_ContainerUI[i2][8]; //复选框边框颜色
                                var c_cw = CT_ContainerUI[i2][9]; //复选框部件颜色
                                var c_s = CT_ContainerUI[i2][10]; //复选框状态
                                CTBCanvas_Rectangle(c_x,c_y,c_w,c_h,c_cbg,1); //绘制复选框背景
                                CTBCanvas_Rectangle(c_x,c_y,c_w,c_h,c_cb,0); //绘制复选框外边框
                                CTBCanvas_Rectangle(c_x+1,c_y+1,c_w-2,c_h-2,c_cb,0); //绘制复选框内边框
                                if(c_s === 1) //如果复选框状态为１
                                {
                                    CTBCanvas_Line(c_x+4,c_y+9,c_x+8,c_y+13,2,c_cw); //绘制复选框部件1
                                    CTBCanvas_Line(c_x+8,c_y+13,c_x+13,c_y+4,2,c_cw); //绘制复选框部件2
                                }
                            }
                            if(ui_type === 4) //如果当前UI对象是单选框
                            {
                                var r_x = win_x + CT_ContainerUI[i2][3]; //单选框位置x
                                var r_y = win_y + CT_ContainerUI[i2][4]; //单选框位置y
                                var r_w = CT_ContainerUI[i2][5]; //单选框宽度
                                var r_cgb = CT_ContainerUI[i2][7]; //单选框背景颜色
                                var r_cb = CT_ContainerUI[i2][8]; //单选框边框颜色
                                var r_cw = CT_ContainerUI[i2][9]; //单选框部件颜色
                                var r_s = CT_ContainerUI[i2][11]; //单选框状态
                                CTBCanvas_Circle(r_x+8,r_y+8,r_w/2,r_cb,1); //绘制单选框边框
                                CTBCanvas_Circle(r_x+8,r_y+8,r_w/2-2,r_cgb,1); //绘制单选框背景
                                if(r_s === 1) //如果单选框状态为１
                                {
                                    CTBCanvas_Circle(r_x+8,r_y+8,r_w/2-4,r_cw,1); //绘制单选框部件
                                }
                            }
                            if(ui_type === 5) //如果当前UI对象是进度条
                            {
                                var p_x = win_x + CT_ContainerUI[i2][3]; //进度条位置x
                                var p_y = win_y + CT_ContainerUI[i2][4]; //进度条位置y
                                var p_w = CT_ContainerUI[i2][5]; //进度条宽度
                                var p_h = CT_ContainerUI[i2][6]; //进度条高度
                                var p_cgb = CT_ContainerUI[i2][7]; //进度条背景颜色
                                var p_cbu = CT_ContainerUI[i2][8]; //进度条上边框颜色
                                var p_cbd = CT_ContainerUI[i2][9]; //进度条下边框颜色
                                var p_cbl = CT_ContainerUI[i2][10]; //进度条左边框颜色
                                var p_cbr = CT_ContainerUI[i2][11]; //进度条右边框颜色
                                var p_cw = CT_ContainerUI[i2][12]; //进度条部件颜色
                                var p_img = CT_ContainerUI[i2][13]; //进度条背景图片
                                var p_ww = CT_ContainerUI[i2][14]; //进度条部件宽度
                                var p_imgo = CT_ContainerUI[i2][17]; //进度条图像偏移
                                if(p_img !== -1) //如果进度条背景图片不为空
                                {
                                    var img_w = CT_ResourceList[p_img][2] - p_imgo * 2; //背景图像宽度
                                    var img_h = CT_ResourceList[p_img][3] - p_imgo * 2; //背景图像高度
                                    CTBCanvas_ImagePart(p_x,p_y,p_img,p_imgo,p_imgo,img_w,img_h); //绘制背景图像
                                }
                                else //如果进度条背景图片为空
                                {
                                    CTBCanvas_Rectangle(p_x,p_y,p_w,p_h,p_cgb,1); //绘制进度条背景
                                    CTBCanvas_Rectangle(p_x,p_y,p_w,2,p_cbu,1); //绘制进度条上边框
                                    CTBCanvas_Rectangle(p_x,p_y+p_h-2,p_w,2,p_cbd,1); //绘制进度条下边框
                                    CTBCanvas_Rectangle(p_x,p_y,2,p_h-2,p_cbl,1); //绘制进度条左边框
                                    CTBCanvas_Rectangle(p_x+p_w-2,p_y,2,p_h-2,p_cbr,1); //绘制进度条右边框
                                }
                                CTBCanvas_Rectangle(p_x+4,p_y+4,p_ww,p_h-8,p_cw,1); //绘制进度条部件
                            }
                            if(ui_type === 6) //如果当前UI对象是文本框
                            {
                                var t_x = win_x + CT_ContainerUI[i2][3]; //文本框位置x
                                var t_y = win_y + CT_ContainerUI[i2][4]; //文本框位置y
                                var t_w = CT_ContainerUI[i2][5]; //文本框宽度
                                var t_h = CT_ContainerUI[i2][6]; //文本框高度
                                var t_cbg = CT_ContainerUI[i2][7]; //文本框背景颜色
                                var t_cbu = CT_ContainerUI[i2][8]; //文本框上边框颜色
                                var t_cbd = CT_ContainerUI[i2][9]; //文本框下边框颜色
                                var t_cbl = CT_ContainerUI[i2][10]; //文本框左边框颜色
                                var t_cbr = CT_ContainerUI[i2][11]; //文本框右边框颜色
                                var t_ct = CT_ContainerUI[i2][12]; //文本框字体颜色
                                var t_img = CT_ContainerUI[i2][13]; //文本框背景图片
                                var t_imgo = CT_ContainerUI[i2][22]; //文本框背景图像偏移
                                var t_val = CT_ContainerUI[i2][14]; //文本框字符串
                                var t_pass = CT_ContainerUI[i2][15]; //密码文本框参数
                                var t_readonly = CT_ContainerUI[i2][18]; //文本框只读参数
                                var imgfont_use = CT_ContainerUI[i2][23]; //使用图像字体
                                if(t_img !== -1) //如果文本框背景图片不为空
                                {
                                    var img_w = CT_ResourceList[t_img][2] - t_imgo * 2; //背景图像宽度
                                    var img_h = CT_ResourceList[t_img][3] - t_imgo * 2; //背景图像高度
                                    CTBCanvas_ImagePart(t_x,t_y,t_img,t_imgo,t_imgo,img_w,img_h); //绘制背景图像
                                }
                                else //文本框背景图片为空
                                {
                                    CTBCanvas_Rectangle(t_x,t_y,t_w,t_h,t_cbg,1); //绘制文本框背景
                                    CTBCanvas_Rectangle(t_x,t_y,t_w,2,t_cbu,1); //绘制文本框上边框
                                    CTBCanvas_Rectangle(t_x,t_y+t_h-2,t_w,2,t_cbd,1); //绘制文本框下边框
                                    CTBCanvas_Rectangle(t_x,t_y,2,t_h-2,t_cbl,1); //绘制文本框左边框
                                    CTBCanvas_Rectangle(t_x+t_w-2,t_y,2,t_h-2,t_cbr,1); //绘制文本框右边框
                                }
                                if(imgfont_use === 0) //如果使用一般字体
                                {
                                    var t_fsize = CT_ContainerUI[i2][21]; //文本框字体大小
                                    var text_y = t_y + (t_h - t_fsize) / 2; //文本框字符串位置y
                                    if(t_pass !== 1) //如果文本框不是密码文本框
                                    {
                                        CTBCanvas_String(t_x+4,text_y,t_fsize,t_ct,t_val); //绘制文本框字符串
                                        if(i2 === CT_Textbox_Index) //如果选择的文本框是当前文本框
                                        {
                                            var val_width = string_pxwidth(t_val,t_fsize); //文本框字符串宽度
                                            if(t_readonly === 0) //如果文本框不是只读
                                            {
                                                CTBCanvas_Line(t_x+4+val_width+1,t_y+3,t_x+4+val_width+1,t_y+t_h-3,2,color(0,0,0,255)); //绘制文本框输入线
                                            }
                                        }
                                    }
                                    else //如果文本框是密码文本框
                                    {
                                        var pass_x = t_x + 4; //密码字符串位置x
                                        var passc_w = string_pxwidth("●",t_fsize); //密码符宽度
                                        var val_l = t_val.length; //文本框字符串长度
                                        var passi;
                                        for(passi=0;passi<val_l;passi++) //遍历文本框字符串
                                        {
                                            CTBCanvas_String(pass_x,text_y,t_fsize,t_ct,"●"); //绘制文本框密码串
                                            pass_x += passc_w; //密码字符串+
                                        }
                                        if(i2 === CT_Textbox_Index) //如果选择的文本框是当前文本框
                                        {
                                            var val_width = passc_w * val_l; //文本框字符串宽度
                                            if(t_readonly === 0)
                                            {
                                                CTBCanvas_Line(t_x+4+val_width+1,t_y+3,t_x+4+val_width+1,t_y+t_h-3,2,color(0,0,0,255)); //绘制文本框输入线
                                            }
                                        }
                                    }
                                }
                                if(imgfont_use === 1) //如果使用图像字体
                                {
                                    var t_font_img = CT_ContainerUI[i2][24]; //字体图像
                                    var t_font_charnum = CT_ContainerUI[i2][25]; //字体最大字符数
                                    var t_font_chargap = CT_ContainerUI[i2][26]; //字体字符间隙
                                    var t_th = CT_ContainerUI[i2][21]; //文本高度
                                    var t_font_charlist = CT_ContainerUI[i2][27]; //字体字符列表
                                    var t_font_glyphlist = CT_ContainerUI[i2][28]; //字体字形列表
                                    var t_ty = t_y + (t_h - t_th) / 2; //文本框字符串位置y
                                    if(t_pass !== 1) //如果文本框不是密码文本框
                                    {
                                        CTBCanvas_ImgString(t_x+4,t_ty,t_ct,t_val,t_font_img,t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist); //绘制文本框文本
                                        if(i2 === CT_Textbox_Index) //如果选择的文本框是当前文本框
                                        {
                                            var val_width = CT_ImgStringMeasure(t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist,t_val); //文本框字符串宽度
                                            if(t_readonly === 0)
                                            {
                                                CTBCanvas_Line(t_x+4+val_width+1,t_y+3,t_x+4+val_width+1,t_y+t_h-3,2,color(0,0,0,255)); //绘制文本框输入线
                                            }
                                        }
                                    }
                                    else //如果文本框是密码文本框
                                    {
                                        var t_val_l = t_val.length; //文本框字符串长度
                                        var pass_x = t_x + 4; //密码字符串位置x
                                        var passc_w = CT_ImgStringMeasure(t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist,"+"); //密码符宽度
                                        var passi;
                                        for(passi=0;passi<t_val_l;passi++) //遍历文本框字符串
                                        {
                                            CTBCanvas_ImgString(pass_x,t_ty,t_ct,"+",t_font_img,t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist); //绘制文本框文本      //绘制文本框密码串
                                            pass_x += passc_w + 1; //密码字符串+
                                        }
                                        if(i2 === CT_Textbox_Index) //如果选择的文本框是当前文本框
                                        {
                                            var t_val_l = t_val.length; //文本框字符串长度
                                            var val_width = CT_ImgStringMeasure(t_font_charnum,t_font_chargap,t_font_charlist,t_font_glyphlist,"+") * t_val_l + t_val_l; //文本框密码串宽度
                                            if(t_readonly === 0) //如果文本框不是只读
                                            {
                                                CTBCanvas_Line(t_x+4+val_width+1,t_y+3,t_x+4+val_width+1,t_y+t_h-3,2,color(0,0,0,255)); //绘制文本框输入线
                                            }
                                        }
                                    }
                                }
                            }
                            if(ui_type === 7) //如果当前UI对象是图像元件
                            {
                                var ie_x = win_x + CT_ContainerUI[i2][3]; //图像元件位置x
                                var ie_y = win_y + CT_ContainerUI[i2][4]; //图像元件位置y
                                var ie_i = CT_ContainerUI[i2][5]; //图像元件图像索引
                                var ie_si = CT_ContainerUI[i2][6]; //图像元件子图像索引
                                var ie_si_o = CT_ContainerUI[i2][10]; //子图像偏移
                                var ie_si_w = CT_ContainerUI[i2][8]; //子图像宽度
                                var ie_si_h = CT_ContainerUI[i2][9]; //子图像高度
                                if(ie_i !== -1) //如果图像元件图像不为空
                                {
                                    var si_x = ie_si * ie_si_w; //图块位置x
                                    var si_y = 0; //图块位置y
                                    if(ie_si_o > 0) //子如果图像偏移大于0
                                    {
                                        si_x = ie_si_o + (ie_si_w * ie_si) + (ie_si * ie_si_o * 2); //图块位置x
                                        si_y = ie_si_o; //图块位置y
                                    }
                                    CTBCanvas_ImagePart(ie_x,ie_y,ie_i,si_x,si_y,ie_si_w,ie_si_h); //绘制图像元件
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
// 按钮重置
//--------------------------------------------------------------------
function CT_ButtonReset()
{
    var i;
    for(i=0;i<CT_ContainerUILength;i++) //遍历UI容器
    {
        if(CT_ContainerUI[i] != null) //如果当前UI不为空
        {
            var ui_type = CT_ContainerUI[i][2]; //获取当前UI类型
            if(ui_type === 1) //如果当前UI是按钮
            {
                CT_ContainerUI[i][17] = 0; //设置当前按钮的点击状态
                CT_ContainerUI[i][19] = 0; //设置当前按钮的按下状态
                CT_ContainerUI[i][20] = 0; //设置当前按钮的松开状态
            }
        }
    }
}
//--------------------------------------------------------------------