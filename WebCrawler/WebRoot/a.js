
var marker = null;
//创建&nbsp;初始化地图函数：
function initMap() {
    createMap();//创建地图
    addMapControl();//向地图添加控件
}
function createMap() {
    map = new BMap.Map("map", { minZoom: 4, maxZoom: 25 });
    //  map.centerAndZoom(new BMap.Point(116.606819, 39.876361), 12);
}
//向地图添加控件
function addMapControl() {
    //var scaleControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    //map.addControl(scaleControl);
    var navControl = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
    map.addControl(navControl);
    var overviewControl = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: false });
    map.addControl(overviewControl);
    map.enableScrollWheelZoom(true);

}
/*获取不同的设备
引用方式：参数=checkBrowserCommon（）
参数.versions.android
true 或 false
*/
function checkBrowserCommon() {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                //移动终端浏览器版本信息                 
                trident: u.indexOf('Trident') > -1, //IE内核                 
                presto: u.indexOf('Presto') > -1, //opera内核                 
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                 
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                 
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端  
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
                ios: !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X)/),//ios终端  
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                 
                iPad: u.indexOf('iPad') > -1, //是否iPad                 
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部             
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    return browser;
}

var map;
initMap();
//获取当前浏览器地区名称
function myFun(result) {
    var cityName = result.name;

    map.setCenter(cityName);//通过地区定位地图


    $("#dq").remove();
    var city = cityName.replace('市', '');

    map.centerAndZoom(cityName, 13);//地图显示设置该地区为中心，缩放13级
    $("#DQ").append("<span id='dq' >" + city + "<i class='caret'></i></span>");

    //添加默认值
    $("#a_city").html('');
    $("#a_city").append(city + '<span class="caret"></span>');


    GetCityList();//获取城市数据--1
}

$(function () {
    document.onkeydown = function (event) {
        if (event.keyCode == 13 && event.srcElement.type != 'submit') {
            Loadlist();//市、查询
            if ($("#modal_overlay_input").length > 0) {
                overlay_input()
            }
        }
    }
    $("#Search").click(function () {
        Loadlist();//市、查询
        if ($("#modal_overlay_input").length > 0) {
            overlay_input()
        }

    });
    //alert(document.documentElement.clientHeight-160);
    if ($("#div_content_list").length > 0) {
        $("#map").css('height', ($(window).height() - 50) + "px");
        $("#div_content_list").css('height', ($(window).height() - 50) + "px");
    } else {
        $("#div_content_list_app").css('height', ($(window).height() - 99) + "px");
        $("#map").css('height', ($(window).height() - 103) + "px");
    }
    $("#modal_data").css('max-height', ($(window).height() - 113) + "px");
    $("#div_main_list_hide").css('margin-top', (($(window).height() - 78)) / 2 + "px");
    //通过ip获取当前位置
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);
});

//点击城市事件，是否显示
function clickShowCity() {
    var v = $("#city20141104").is(":visible")

    if (v) {
        $(".city20141104").css("display", "none");
    }
    else {
        $(".city20141104").css("display", "block");
    }
}

//-------------------------


var pageindex = 1;//页数变量
var pagecount = 1;//条数变量

var Datalist = null;//充电站列表数据

//城市数据json数组变量
var cityData = {};

//窗口改变事件
window.onresize = function () {
    var browser = checkBrowserCommon();//获得终端类型
    var android = browser.versions.android;
    var iphone = browser.versions.iPhone;
    if (!android && !iphone) {
        CSSload();//css样式重新布局 
    }


}
//css样式重新布局
function CSSload() {
    // 窗口可视范围的高度
    var height = getClientHeight();
    // 窗口滚动条高度
    var theight = getScrollTop();
    // 窗口可视范围的高度
    var rheight = getScrollHeight();
    // 滚动条距离底部的高度
    var bheight = rheight - theight - height;
    $("#div_main_list_hide").css('margin-top', (($(window).height() - 78)) / 2 + "px");
    if (bheight <= 60) {
        if ($("#div_content_list").length > 0) {
            $("#div_content_list").css('height', ($(window).height() - 50) + "px");
            $("#map").css('height', ($(window).height() - 50) + "px");
        } else {
            $("#div_content_list_app").css('height', ($(window).height() - 99) + "px");
            $("#map").css('height', ($(window).height() - 103) + "px");
        }
        $("#modal_data").css('max-height', ($(window).height() - 113) + "px");

    } else {
        if ($("#div_content_list").length > 0) {
            $("#div_content_list").css('height', ($(window).height() - 50) + "px");
            $("#map").css('height', ($(window).height() - 50) + "px");
        } else {
            $("#div_content_list_app").css('height', ($(window).height() - 99) + "px");
            $("#map").css('height', ($(window).height() - 103) + "px");
        }
        $("#modal_data").css('max-height', ($(window).height() - 113) + "px");

    }

    //$("#map").css('height', (document.documentElement.clientHeight - 160) + "px");
    //alert(document.getElementById("map").offsetWidth);

    var widths = document.documentElement.clientWidth;
    var mapwidth = document.getElementById("map").offsetWidth;

    var a = document.all.map.offsetWidth;
    if (widths == a) {
        $("#DivMap").css('margin-left', "0px");
        //$("#DivTop").css('margin-top', "-95px");
        $("#DivMap").css('margin-top', "44px");
        $("#UL").css('margin-top', "0px");
        $("#rightList").css('display', "none");
        $("#rightList").css('padding-top', "10px");
        $("#StationCount").css('margin-top', "-10px");
        $("#DivTop").css('padding-left', "0px");
        $(".city20141104").css('width', "305px");
        $(".city20141104").css('padding', "0 0px");
        $("#rightList").css('padding-right', "0px");
        $(".CityCheck").css('float', "none");
        //$("#cityBtn").css('width', "49%");
        $("#cityBtn").css('width', "28%");
        //$(".QXCX").css('width', "49%");
        $(".QXCX").css('width', "28%");
        $(".QXCX").css('margin-left', "0px");
        $("#countySelect").css('width', "100%");
        $("#countySelectlist").css('width', "100%");
        //$(".ZCLX").css('width', "100%");
        $(".ZCLX").css('width', "28%");
        //$(".ZCLX").css('margin-top', "-100px");
        $(".ZCLXList").css('width', "100%");
        $(".ZCLX").css('margin-top', "-9px");
        $(".ZCLX").css('margin-left', "0px");
        $("#typeFS").css('width', "100%");
        $(".ulspimg").css('float', 'left');
        $(".ulspimg").css('width', '30%');
        $(".ulspwz").css('float', 'left');
        $(".ulspwz").css('width', '70%');
        $(".showclick").css('margin-top', '-35px');
    } else if (widths > a) {
        //$("#DivMap").css('margin-left', "20px");
        //$("#DivTop").css('margin-top', "0px");
        //$("#DivMap").css('margin-top', "148px");
        $("#UL").css('margin-top', "70px");
        $("#rightList").css('padding-top', "47px");
        $("#StationCount").css('margin-top', "1px");
        //$("#DivTop").css('padding-left', "20px");
        $(".city20141104").css('width', "470px");
        $(".city20141104").css('padding', "0 10px");
        $("#rightList").css('padding-right', "20px");
        $(".CityCheck").css('float', "none");
        $("#cityBtn").css('width', "auto");
        $(".QXCX").css('width', "auto");
        $(".QXCX").css('margin-top', "-12px");
        $(".QXCX").css('margin-left', "10px");
        $("#countySelect").css('width', "auto");
        $("#countySelectlist").css('width', "auto");
        $(".ZCLX").css('width', "auto");
        $(".ZCLXList").css('width', "auto");
        $(".ZCLX").css('margin-top', "-12px");
        $(".ZCLX").css('margin-left', "10px");
        $("#typeFS").css('width', "auto");
        $("#rightList").css('display', 'block');
        $("#DivMap").css('display', 'block');
        $("#toggleimg").attr('src', '/Content/Images/change/carList.png');
        $(".ulspimg").removeAttr('style');
        $(".ulspwz").removeAttr('style');
    }
}

//市、查询
function Loadlist() {
    pageindex = 1;

    GetCountyByCityId();
    //GetStationNetword();
    //GetStationNetWordList();
}
//返回当前选择的城市Id
function GetCityIdBycityName() {
    var citydata;
    var citydataVal = $("#dq").text();
    if (citydataVal == "全国") {
        citydata = { id: "", code: "", name: "北京市" };
        return citydata;
    } else if (citydataVal == "北京") {
        citydata = { id: "", code: "11", name: "北京市" };
        return citydata;
    } else if (citydataVal == "天津") {
        citydata = { id: "", code: "12", name: "天津市" };
        return citydata;
    } else if (citydataVal == "上海") {
        citydata = { id: "", code: "31", name: "上海市" };
        return citydata;
    } else if (citydataVal == "重庆") {
        citydata = { id: "", code: "50", name: "重庆市" };
        return citydata;
    }
    citydata = { id: "-1", code: "-1", name: "-1" };
    //var city = $("#dq").html();
    var n = $("#dq").html();
    if (n.indexOf("<") > 0) {
        var N = n.split('<');
        var city = N[0] + "市";
    } else {
        var city = n + "市";
    }

    $.each(cityData.AE.data, function (i, e) {
        if (city == e.Name) {

            citydata.id = e.id;
            citydata.code = e.Code;
            citydata.name = e.Name;
        }
    });
    $.each(cityData.FJ.data, function (i, e) {
        if (city == e.Name) {
            citydata.id = e.id;
            citydata.code = e.Code;
            citydata.name = e.Name;
        }
    });
    $.each(cityData.KO.data, function (i, e) {
        if (city == e.Name) {
            citydata.id = e.id;
            citydata.code = e.Code;
            citydata.name = e.Name;
        }
    });
    $.each(cityData.PT.data, function (i, e) {
        if (city == e.Name) {
            citydata.id = e.id;
            citydata.code = e.Code;
            citydata.name = e.Name;
        }
    });
    $.each(cityData.UZ.data, function (i, e) {
        if (city == e.Name) {
            citydata.id = e.id;
            citydata.code = e.Code;
            citydata.name = e.Name;
        }
    });

    return citydata;
}

//通过城市Id获取区县
function GetCountyByCityId() {
    var cityId = $("#cityId").html();

    var citydata = GetCityIdBycityName();
    var citycode = citydata.code;
    $("#ul_area").html('');
    $("#a_area").html("区县<span class='caret'>");
    $("#ul_area").append(" <li class='li_area_content_select' onclick='CountyClick(\"|\",this)' id='|'>全部</li>");
    if (citycode != "") {//说明不是全国
        $.getJSON("GetcountyInfo", { CityId: citycode }, function (data) {
            var Data = data.data;
            if (Data != "" || Data != null) {
                $.each(Data, function (i, e) {
                    if (e.Name != "未知") {
                        $("#ul_area").append('<li name=\'' + e.Name + '\' id=\'' + e.Code + '|' + e.Name + '\' class="li_city_content" onclick="CountyClick(\'' + e.Code + '|' + e.Name + '\',this)">' + e.Name + '</li>');
                    }
                });
            }
        });
    }
    Countylist();//查询方法---   加载完城市列表后在再去执行查询方法 ---3
}
//通过条件获取充电站坐标
function GetStationNetword() {
    // var cityId = $("#cityId").html();
    var citydata = GetCityIdBycityName();
    //var cityCode = citydata.code;
    var provinceName = "";
    var cityName = "";
    if (citydata.id == "" && citydata.code == "") {
        provinceName = "";
    } else if (citydata.id == "") {
        provinceName = citydata.name;
    } else {
        cityName = citydata.name;
    }
    var stationName = $("#stationName").val();
    var county = $("#countySelect").val();
    if (county != null) {
        var County = county.split('|');

        var countySelect = County[1];//取名称


    } else {
        var countySelect = county;
    }
    var typeFS = $("#typeFS").val();
    if (typeFS.substring(0, 1) == "<") {
        typeFS = "";
    }
    // $("#countySelect").children().remove();
    $.getJSON("GetStationNetword", { ProvinceName: provinceName, CityName: cityName, KeyWords: stationName.trim(), RegionName: countySelect, type: typeFS }, function (data, textStatus, xhr) {
        var Data = data;
        var n = $("#dq").html();
        if (n.indexOf("<") > 0) {
            var N = n.split('<');
            var city = N[0];
        } else {
            var city = n;
        }

        var county = $("#countySelect").val();
        if (county != null) {
            var County = county.split('|');

            var countyName = County[1];


            map.centerAndZoom(city + countyName, 13);
        } else {
            map.centerAndZoom(city, 13);
        }
        map.clearOverlays();
        $.each(Data, function (i, e) {
            PointJW(e.longitude, e.latitude, e.code, e)
        });

    });

}

var StationCounts = 0;
var TypeSCounts = 0;
var TypeFCounts = 0;
var TypeFSCounts = 0;

//通过条件获取充电装列表
function GetStationNetWordList() {
    // var cityId = $("#cityId").html();
    var citydata = GetCityIdBycityName();
    //var cityCode = citydata.code;
    var provinceName = "";
    var cityName = "";
    if (citydata.id == "" && citydata.code == "") {
        provinceName = "";
    } else if (citydata.id == "") {
        provinceName = citydata.name;
    } else {
        cityName = citydata.name;
    }
    var countySelect = "";
    var stationName = $("#stationName").val();
    var county = $("#countySelect").val();
    if (county != null) {
        var County = county.split('|');

        countySelect = County[1];//取名称

    } else {
        countySelect = county;
    }
    var typeFS = $("#typeFS").val();

    if (typeFS.substring(0, 1) == "<") {
        typeFS = "";
    }

    //  $("#countySelect").children().remove();
    $("#div_list_station").html(Loading);//添加加载进度条
    $("#dynamic_pager_content2").html("");
    $.getJSON("GetStationNetWordList", { ProvinceName: provinceName, CityName: cityName, KeyWords: stationName, RegionName: countySelect, type: typeFS, page: "1", rows: "10" }, function (data) {
        //   $("#UL").children().remove();
        if (data != null && data != undefined) {
            var Data = data;
            Datalist = Data.rows;
            $("#pages").children().remove();
            $("#div_list_station").html("");
            $.each(Data.rows, function (i, e) {
                var type = "";

                if (e.fastPileCount > 0 && e.slowPileCount == 0) {
                    type = '<span class="div_station_content_type_kuai">快充</span>';
                    TypeFCounts++;
                } else if (e.fastPileCount == 0 && e.slowPileCount > 0) {
                    type = '<span class="div_station_content_type_man">慢充</span>';
                    TypeSCounts++;
                } else if (e.fastPileCount > 0 && e.slowPileCount > 0) {
                    type = '<span class="div_station_content_type_kuai">快充</span><span class="div_station_content_type_man">慢充</span>';
                    TypeFSCounts++;
                } else {
                    type = '<span class="div_station_content_type_man">无</span>';
                }

                var InnerHTML = "";
                InnerHTML += ' <div id="' + e.code + '" class="div_station_content" onmouseenter="MouseEnter(this.id);" onclick="LIclick(this.id)">';
                InnerHTML += ' <div class="div_station_content_title">';
                var statype = "";
                if (e.statype != null) {
                    var strstatype = e.statype.split(',');
                    statype = '<span class="div_station_content_statype">';
                    $.each(strstatype, function (i, type) {
                        if (type == "4") {
                            statype += "&nbsp;个人桩";
                        }
                        if (type == "2") {
                            statype += "&nbsp;公共站";
                        }
                        if (type == "3") {
                            statype += "&nbsp;专用站";

                        }
                        if (type == "1") {
                            statype += "&nbsp;驻地站";
                        }
                    });
                    statype += "</span>";
                }

                InnerHTML += '<div class="div_station_content_title_font_main">';
                InnerHTML += '<span class="div_station_content_title_font">';
                InnerHTML += e.name.replace('驻地站|', '').replace('公共站|', '').replace('专用站|', '').replace('个人桩', '');
                InnerHTML += '</span>';
                InnerHTML += '</div>';
                //if (parseInt(e.freeTerminalNum) > 0) {
                InnerHTML += '<div class="div_station_content_title_kongxian">';
                InnerHTML += '闲' + e.freeTerminalNum;
                InnerHTML += '</div>';
                // }
                InnerHTML += '</div>';
                InnerHTML += '<div class="div_station_content_address">地址：' + e.address.replace('^', "") + '</div>';
                InnerHTML += '<div class="div_station_content_type">';
                InnerHTML += '支持：' + type;
                InnerHTML += statype;
                InnerHTML += '</div>';
                InnerHTML += '<hr class="hr_content" />';
                InnerHTML += '</div>';
                $("#div_list_station").append(InnerHTML);
            });
            StationCounts = Data.total;

            $("#dynamic_pager_content2").html("共" + Data.total + "个");


            LoadPagination(Data.total, "10");//加载分页

            $(".FreeTerminalNum").tooltip({ placement: "bottom", title: "空闲终端数量" });
            $(".TotalTerminalNum").tooltip({ placement: "bottom", title: "终端总数量" });


            $("#LoadDiv").remove();
        }
        else {
            $("#UL").children().remove();
            $("#UL").append("<li>暂无充电站！</li>");
            $("#LoadDiv").remove();
        }

        $("#LoadDiv").remove();
    });

}
//获取城市列表
function GetCityList() {
    $.getJSON("GetCityInfoAZ", "", function (data) {
        var Data = data;
        cityData = Data;//将获取的城市列表数据赋值给全局变量cityData数组
        $("#ul_AE").html("");
        $("#ul_FJ").html("");
        $("#ul_KO").html("");
        $("#ul_PT").html("");
        $("#ul_UZ").html("");
        var city = $("#a_city").html();
        city = city.replace('<span class="caret"></span>', "");
        $(".li_city_content_select").removeClass("li_city_content_select").addClass("li_city_content");
        $("li[name=" + city + "]").addClass("li_city_content_select").removeClass("li_city_content");
        $.each(Data.AE.data, function (i, e) {
            var name = (e.Name).replace('市', '');
            var className = "li_city_content";
            if (name == city) {
                className = "li_city_content_select";
            }
            $("#ul_AE").append("<li name='" + name + "' id='" + e.id + "|" + e.Code + "' class='" + className + "' onclick='Aclick(\"" + name + "\", this.Code,\"\",this)'>" + name + " </li>");

        });
        $.each(Data.FJ.data, function (i, e) {
            var name = (e.Name).replace('市', '');
            var className = "li_city_content";
            if (name == city) {
                className = "li_city_content_select";
            }
            $("#ul_FJ").append("<li name='" + name + "' id='" + e.id + "|" + e.Code + "'  class='" + className + "' onclick='Aclick(\"" + name + "\", this.Code,\"\",this)'>" + name + " </li>");

        });
        $.each(Data.KO.data, function (i, e) {
            var name = (e.Name).replace('市', '');
            var className = "li_city_content";
            if (name == city) {
                className = "li_city_content_select";
            }
            $("#ul_KO").append("<li name='" + name + "' id='" + e.id + "|" + e.Code + "'  class='" + className + "' onclick='Aclick(\"" + name + "\", this.Code,\"\",this)'>" + name + "</li>");



        });
        $.each(Data.PT.data, function (i, e) {
            var name = (e.Name).replace('市', '');
            var className = "li_city_content";
            if (name == city) {
                className = "li_city_content_select";
            }
            $("#ul_PT").append("<li name='" + name + "' id='" + e.id + "|" + e.Code + "'  class='" + className + "' onclick='Aclick(\"" + name + "\", this.Code,\"\",this)'>" + name + "</li>");

        });
        $.each(Data.UZ.data, function (i, e) {
            var name = (e.Name).replace('市', '');
            var className = "li_city_content";
            if (name == city) {
                className = "li_city_content_select";
            }
            $("#ul_UZ").append("<li name='" + name + "' id='" + e.id + "|" + e.Code + "' class='" + className + "' onclick='Aclick(\"" + name + "\", this.Code,\"\",this)'>" + name + " </li>");

        });
        GetCountyByCityId();//加载区县方法---   加载完城市列表后在再去加载区县方法 -----2

    });
}
//区县、状态查询
function Countylist() {
    var provinceName = "";
    var countySelect = "";
    var cityName = "";
    var citydata = GetCityIdBycityName();
    if (citydata.id == "" && citydata.code == "") {
        provinceName = "";
    } else if (citydata.id == "") {
        provinceName = citydata.name;
    } else {
        cityName = citydata.name;
    }
    var stationName = $("#stationName").val();
    var county = $("#countySelect").val();
    if (county != null) {
        var County = county.split('|');

        countySelect = County[1];//取名称


    } else {
        countySelect = county;
    }
    var typeFS = $("#typeFS").val();


    $.getJSON("GetStationNetword", { ProvinceName: provinceName, CityName: cityName, KeyWords: stationName.trim(), RegionName: countySelect, type: typeFS }, function (data) {
        var Data = data;
        var n = $("#dq").html();
        var city = "";
        if (n.indexOf("<") > 0) {
            var N = n.split('<');
            if (N[0] == "全国") {
                city = "北京";
            } else {
                city = N[0];
            }
        } else {
            if (n == "全国") {
                city = "北京";
            } else {
                city = n;
            }
        }
        var county = $("#countySelect").val();
        var County = county.split('|');
        var countyName = County[1];

        if (citydata.id == "" && citydata.code == "") {
            map.centerAndZoom(city + countyName, 5);
        } else {
            map.centerAndZoom(city + countyName, 13);
        }

        map.clearOverlays();
        $.each(Data, function (i, e) {
            PointJW(e.longitude, e.latitude, e.code, e)
        });

    });
    $("#UL").children().remove();
    $("#Phone-UL").children().remove();
    $("#pages").children().remove();

    $("#dynamic_pager_content2").html("");

    GetStationNetWordList();//获取列表---4

}

//区县点击事件
function CountyClick(id, that) {
    if (id != undefined) {
        var County = id.split('|');
        var countySelect = "";
        if (County[1] == "") {
            countySelect = "区县";
        } else {
            countySelect = County[1];
        }

    } else {
        var countySelect = "区县";
    }
    $(".li_area_content_select").removeClass("li_area_content_select").addClass("li_city_content");
    $(that).addClass("li_area_content_select").removeClass("li_city_content");
    overlay_area();
    $("#countySelect").val(id);
    $("#a_area").html(countySelect + "<span class='caret'>");

    Countylist();//查询方法---   加载完城市列表后在再去执行查询方法
}
//类型点击事件
function TypeClick(Id, that) {
    var ID = Id.split('|');
    var id = ID[0];

    $("#typeFS").val(id);
    var Name = "";
    if (id == "0") {
        Name = "支持快充<span class='caret'></span>";
    } else if (id == "1") {
        Name = "支持慢充<span class='caret'></span>";
    } else {
        Name = "类型<span class='caret'></span>";
    }
    $(".li_type_content_select").removeClass("li_type_content_select").addClass("li_city_content");
    $(that).addClass("li_type_content_select").removeClass("li_city_content");
    $("#a_type").html(Name);
    overlay_type();
    Countylist();//查询方法---   加载完城市列表后在再去执行查询方法
}
//点击充电站跳转明细页面
function LIclick(code) {

    // window.location.href = "NetworkDetail?code=" + code;
    // window.location.href = "NetworkDetail?code=" + code;
    var action = "NetworkDetail"
    if ($(window).width() <= 600) {
        action = "S_NetworkDetail"
    }
    window.open(action + "?code=" + code, "_blank")
    // 阻止事件的传播
}
//选择城市事件
function Aclick(n, id, code, that) {

    $("#dq").remove();
    // $("#DQ").append("<span id='dq' style='font-size: 14px;color: #120303;font-family: none;'>" + n + "<span id='cityId' hidden>" + id + "</span><i class='icon-map-marker'></i></span>");
    $("#DQ").append("<span id='dq' >" + n + "<i class='caret'></i></span>");
    // var cityId = $("#cityId").html();
    //var cityId = GetCityIdBycityName();
    $("#countySelect").html("全部" + "<i class='caret'></i>");
    $("#countySelect").val("|");
    $(".li_city_content_select").removeClass("li_city_content_select").addClass("li_city_content");
    $(that).addClass("li_city_content_select").removeClass("li_city_content");
    //去掉提示框
    overlay();
    $("#div_city").attr("name", n);
    $("#a_city").html(n + '<span class="caret"></span>');
    Loadlist();
    $(".city20141104").css("display", "none");
}
//添加编写自定义函数,创建标注
function PointJW(J, W, Code, EE) {
    var preNum = EE.FreeTerminalNum;
    var total = EE.fastPileCount + EE.slowPileCount;
    var pre = ((preNum / total) * 100).toFixed(0);//使用所占百分比
    pageindex = 1;
    var point = new BMap.Point(J, W);
    // var myicon = new BMap.Icon("/Content/Images/change/tagging_02.png", new BMap.Size(32, 32));
    //var map = new BMap.Map("map");
    var htm = '<div class="circle">'
                       + '<div class="pie_left"><div class="left"></div></div><div class="pie_right"><div class="right"></div></div>'
                       + '<div class="mask"><span style="display:none">' + pre + '</span>' + total + '</div>'
                       + '</div>';

    var marker = new BMapLib.RichMarker(htm, point, { "anchor": new BMap.Size(-14, -15), "enableDragging": false });
    //var marker = new BMap.Marker(htm, point);
    //map.centerAndZoom(point, 15);
    map.addOverlay(marker);


    //marker.addEventListener("click", function (e) {
    //    LIclick(Code);
    //});
    //移动至图标
    marker.addEventListener("click", function (e) {
        //alert(Code
        var type = "";

        if (EE.fastPileCount > 0 && EE.slowPileCount == 0) {
            type = '<span class="div_station_content_type_kuai">快充</span>';
            TypeFCounts++;
        } else if (EE.fastPileCount == 0 && EE.slowPileCount > 0) {
            type = '<span class="div_station_content_type_man">慢充</span>';
            TypeSCounts++;
        } else if (EE.fastPileCount > 0 && EE.slowPileCount > 0) {
            type = '<span class="div_station_content_type_kuai">快充</span><span class="div_station_content_type_man">慢充</span>';
            TypeFSCounts++;
        } else {
            type = '<span class="div_station_content_type_man">无</span>';
        }

        var statype = "";
        if (EE.statype != null) {
            var strstatype = EE.statype.split(',');
            statype = '<span class="div_station_content_statype">';
            $.each(strstatype, function (i, type) {
                if (type == "4") {
                    statype += "&nbsp;个人桩";
                }
                if (type == "2") {
                    statype += "&nbsp;公共站";
                }
                if (type == "3") {
                    statype += "&nbsp;专用站";

                }
                if (type == "1") {
                    statype += "&nbsp;驻地站";
                }
            });
            statype += "</span>";
        }

        var sContent = "";
        sContent += ' <div id="' + EE.code + '" class="div_station_content_map" onclick="LIclick(this.id)">';
        sContent += ' <div class="div_station_content_title">';
        sContent += '<div class="div_station_content_title_font_main_map">';
        sContent += '<span class="glyphicon glyphicon-map-marker div_station_content_title_font_main_map_address_marker" aria-hidden="true"></span>';
        sContent += '<span class="div_station_content_title_font div_station_content_title_font_margin">';
        sContent += EE.name.replace('驻地站|', '').replace('公共站|', '').replace('专用站|', '').replace('个人桩', '');
        sContent += '</span>';
        sContent += '</div>';
        sContent += '</div>';
        // sContent += '<div class="div_station_content_address_map">地址：' + e.address + '</div>';
        sContent += ' <div class="div_station_content_address_map"><div class="div_station_content_title_font_main_map_address">' + EE.address.replace('^', "") + '<div></div></div></div>';
        sContent += '<div class="div_station_content_type_map">';
        sContent += type;
        sContent += statype;
        sContent += '</div>';
        sContent += '<hr class="hr_content" />';
        sContent += '</div>';

        infoWindows = new BMap.InfoWindow(sContent);  // 创建信息窗口对象

        map.openInfoWindow(infoWindows, point); //开启信息窗口

        //map.openInfoWindow(infoWindows, point, { "anchor": new BMap.Size(-14, -15), "enableDragging": false }); //开启信息窗口

    });

    //移动至图标外
    //marker.addEventListener("mouseout", function (e) {
    //    map.closeInfoWindow(infoWindows, pointInfo); //关闭信息窗口
    //});
    PieLoad();

}

//加载分页
function LoadPagination(Count, rows) {

    var PageS = Math.ceil(Count / rows);//获取分页总数

    $("#pages").append("   <li><a  onclick='BeforeNext(0)'> «</a></li>");
    var page = pageindex;
    if (PageS > 5) {
        if ((PageS + 1 - pageindex) < 5 && (pageindex - (5 - (PageS + 1 - pageindex))) > 0) {
            page = pageindex - (5 - (PageS + 1 - pageindex));
        }
    } else {
        page = 1;
    }
    for (var j = page; j < PageS + 1; j++) { //i是每循环一次是添加一个页面，j是页面号
        if (j < pageindex + 5) {
            if (pageindex + 4 < PageS) {
                if (j == pageindex) {
                    $("#pages").append("   <li class='active'><a  onclick='clickPage(this.id)' id='" + j + "'>" + j + "</a></li>");
                }
                else {

                    $("#pages").append("   <li ><a  onclick='clickPage(this.id)' id='" + j + "'>" + j + "</a></li>");
                }
            }
            else {
                if (j == pageindex) {
                    $("#pages").append("   <li class='active'><a  onclick='clickPage(this.id)' id='" + j + "'>" + j + "</a></li>");
                }
                else {
                    $("#pages").append("   <li ><a  onclick='clickPage(this.id)' id='" + j + "'>" + j + "</a></li>");
                }
            }
            pagecount = j;
        }
    }
    $("#pages").append("   <li><a  onclick='BeforeNext(1)' style='background-color: #FFFFFF;'> »</a></li>");
}

//翻页按数字
function clickPage(index) {
    //$("#" + pageindex).parent().removeClass("active");
    pageindex = parseInt(index);
    //$("#" + pageindex).parent().addClass("active");
    //var cityId = $("#cityId").html();


    var provinceName = "";
    var cityName = "";
    var citydata = GetCityIdBycityName();
    if (citydata.id == "" && citydata.code == "") {
        provinceName = "";
    } else if (citydata.id == "") {
        provinceName = citydata.name;
    } else {
        cityName = citydata.name;
    }

    var county = $("#countySelect").val();
    var countySelect = "";
    if (county != null) {
        var County = county.split('|');

        countySelect = County[1];//取名称


    } else {
        countySelect = county;
    }


    var typeFS = $("#typeFS").val();
    var stationName = $("#stationName").val();
    $("#div_list_station").html("");
    $("#div_list_station").append(Loading);//添加加载进度条
    $("#pages").children().remove();
    $.getJSON("GetStationNetWordList", { ProvinceName: provinceName, CityName: cityName, KeyWords: stationName, RegionName: countySelect, type: typeFS, page: index, rows: "10" }, function (data) {
        var Data = data;
        if (data != null) {
            Datalist = Data.rows;
            $.each(Data.rows, function (i, e) {
                var type = "";

                if (e.fastPileCount > 0 && e.slowPileCount == 0) {
                    type = '<span class="div_station_content_type_kuai">快充</span>';
                    TypeFCounts++;
                } else if (e.fastPileCount == 0 && e.slowPileCount > 0) {
                    type = '<span class="div_station_content_type_man">慢充</span>';
                    TypeSCounts++;
                } else if (e.fastPileCount > 0 && e.slowPileCount > 0) {
                    type = '<span class="div_station_content_type_kuai">快充</span><span class="div_station_content_type_man">慢充</span>';
                    TypeFSCounts++;
                } else {
                    type = '<span class="div_station_content_type_man">无</span>';
                }
                var statype = "";
                if (e.statype != null) {
                    var strstatype = e.statype.split(',');
                    statype = '<span class="div_station_content_statype">';
                    $.each(strstatype, function (i, type) {
                        if (type == "4") {
                            statype += "&nbsp;个人桩";
                        }
                        if (type == "2") {
                            statype += "&nbsp;公共站";
                        }
                        if (type == "3") {
                            statype += "&nbsp;专用站";

                        }
                        if (type == "1") {
                            statype += "&nbsp;驻地站";
                        }
                    });
                    statype += "</span>";
                }

                var InnerHTML = "";
                InnerHTML += ' <div id="' + e.code + '" class="div_station_content" onmouseenter="MouseEnter(this.id);" onclick="LIclick(this.id)">';
                InnerHTML += ' <div class="div_station_content_title">';
                InnerHTML += '<div class="div_station_content_title_font_main">';
                InnerHTML += '<span class="div_station_content_title_font">';
                InnerHTML += e.name.replace('驻地站|', '').replace('公共站|', '').replace('专用站|', '').replace('个人桩', '');
                InnerHTML += '</span>';
                InnerHTML += '</div>';
                //if (parseInt(e.freeTerminalNum) > 0) {
                InnerHTML += '<div class="div_station_content_title_kongxian">';
                InnerHTML += '闲' + e.freeTerminalNum;
                InnerHTML += '</div>';
                // }
                InnerHTML += '</div>';
                InnerHTML += '<div class="div_station_content_address">地址：' + e.address.replace('^', "") + '</div>';
                InnerHTML += '<div class="div_station_content_type">';
                InnerHTML += '支持：' + type;
                InnerHTML += statype;
                InnerHTML += '</div>';
                InnerHTML += '<hr class="hr_content" />';
                InnerHTML += '</div>';
                $("#div_list_station").append(InnerHTML);
            });


            LoadPagination(Data.total, "10");//加载分页

            $(".FreeTerminalNum").tooltip({ placement: "bottom", title: "空闲终端数量" });
            $(".TotalTerminalNum").tooltip({ placement: "bottom", title: "终端总数量" });

            $("#LoadDiv").remove();
        }
        else {
            //$("#StationCounts").html("共找到 <span class='label label-warning' style='height: 22px;font-size: 20px;padding-top: 8px;'>0</span> 个充电站");
            $("#UL").children().remove();
            $("#UL").append("<li>暂无充电站！</li>");
            $("#Phone-UL").children().remove();
            $("#Phone-UL").append("<li>暂无充电站！</li>");
            $("#LoadDiv").remove();
        }
        $("#LoadDiv").remove();
    });
}
//翻页前后翻页
function BeforeNext(page) {

    if (page == "0") {
        if (pageindex > 1) {
            $("#" + pageindex).parent().removeClass("active");
            pageindex--;
        } else {
            return;
        }

    } else {
        if (pageindex < pagecount) {
            $("#" + pageindex).parent().removeClass("active");
            pageindex++;
        }
        else {
            return;
        }
    }

    clickPage(pageindex);

}

//
var pointInfo = null;//百度定位变量
var infoWindows = "";//百度显示信息变量
//列表加载显示加载图片路径
var Loading = " <div style='text-align: center;' id='LoadDiv' >" +
"<img style='width: 70px;' id='LoadPicture' src='/Content/Images/change/load-008.gif'  /> </div>";


//当鼠标进入充电站某一个站的事件
function MouseEnter(id) {

    $("#hover" + id).css("display", "block");


    $.each(Datalist, function (i, e) {
        if (id == e.code) {
            var type = "";

            if (e.fastPileCount > 0 && e.slowPileCount == 0) {
                type = '<span class="div_station_content_type_kuai">快充</span>';
                TypeFCounts++;
            } else if (e.fastPileCount == 0 && e.slowPileCount > 0) {
                type = '<span class="div_station_content_type_man">慢充</span>';
                TypeSCounts++;
            } else if (e.fastPileCount > 0 && e.slowPileCount > 0) {
                type = '<span class="div_station_content_type_kuai">快充</span><span class="div_station_content_type_man">慢充</span>';
                TypeFSCounts++;
            } else {
                type = '<span class="div_station_content_type_man">无</span>';
            }
            var statype = "";
            if (e.statype != null) {
                var strstatype = e.statype.split(',');
                statype = '<span class="div_station_content_statype">';
                $.each(strstatype, function (i, type) {
                    if (type == "4") {
                        statype += "&nbsp;个人桩";
                    }
                    if (type == "2") {
                        statype += "&nbsp;公共站";
                    }
                    if (type == "3") {
                        statype += "&nbsp;专用站";

                    }
                    if (type == "1") {
                        statype += "&nbsp;驻地站";
                    }
                });
                statype += "</span>";
            }

            var sContent = "";
            sContent += ' <div id="' + e.code + '" class="div_station_content_map">';
            sContent += ' <div class="div_station_content_title">';
            sContent += '<div class="div_station_content_title_font_main_map">';
            sContent += '<span class="glyphicon glyphicon-map-marker div_station_content_title_font_main_map_address_marker" aria-hidden="true"></span>';
            sContent += '<span class="div_station_content_title_font div_station_content_title_font_margin">';
            sContent += e.name.replace('驻地站|', '').replace('公共站|', '').replace('专用站|', '').replace('个人桩', '');
            sContent += '</span>';
            sContent += '</div>';
            sContent += '</div>';
            // sContent += '<div class="div_station_content_address_map">地址：' + e.address + '</div>';
            sContent += ' <div class="div_station_content_address_map"><div class="div_station_content_title_font_main_map_address">' + e.address.replace('^', "") + '<div></div></div></div>';
            sContent += '<div class="div_station_content_type_map">';
            sContent += type;
            sContent += statype;
            sContent += '</div>';
            sContent += '<hr class="hr_content" />';
            sContent += '</div>';

            //百度地图绑定坐标
            pointInfo = new BMap.Point(e.longitude, e.latitude);



            infoWindows = new BMap.InfoWindow(sContent, { enableMessage: false });  // 创建信息窗口对象
            if ($("#a_city").html().indexOf("全国") < 0) {
                map.centerAndZoom(pointInfo, 13);
            } else {
                map.centerAndZoom(pointInfo, 5);
            }
            map.openInfoWindow(infoWindows, pointInfo); //开启信息窗口
        }
    });

}
//当鼠标离开充电站的某一站的事件
function MouseLeave(id) {

    $("#hover" + id).css("display", "none");
    map.closeInfoWindow(infoWindows, pointInfo); //关闭信息窗口
}
//当鼠标划过终端数时间
function titleHover() {
    $('#element').tooltip('show')
}
//当鼠标划出终端数时间
function titleOut() {
    $('#element').tooltip('hide')
}

//当鼠标滑进点评与收藏事件
function MouseEnterSpan(id) {
    var ID = id.replace("hover", "");
    $("#" + ID).attr("onclick", "");
}
//当鼠标滑出点评与收藏事件
function MouseLeaveSpan(id) {

    var ID = id.replace("hover", "");
    $("#" + ID).attr("onclick", "LIclick(this.id)");
}

//点击回车事件
function EnterPress(e) { //传入 event
    var e = e || window.event;
    if (e.keyCode == 13) {

        Loadlist();//市、查询

    }
}
//滚动条事件
window.onscroll = function () {
    // 窗口可视范围的高度
    var height = getClientHeight();
    // 窗口滚动条高度
    var theight = getScrollTop();
    // 窗口可视范围的高度
    var rheight = getScrollHeight();
    // 滚动条距离底部的高度
    var bheight = rheight - theight - height;
    $("#div_main_list_hide").css('margin-top', (($(window).height() - 78)) / 2 + "px");

    if (bheight <= 60) {
        if ($("#div_content_list").length > 0) {
            $("#div_content_list").css('height', ($(window).height() - 50) + "px");
            $("#map").css('height', ($(window).height() - 50) + "px");
        } else {
            $("#div_content_list_app").css('height', ($(window).height() - 99) + "px");
            $("#map").css('height', ($(window).height() - 103) + "px");
        }
        $("#modal_data").css('max-height', ($(window).height() - 113) + "px");

    } else {
        if ($("#div_content_list").length > 0) {
            $("#div_content_list").css('height', ($(window).height() - 50) + "px");
            $("#map").css('height', ($(window).height() - 50) + "px");
        } else {
            $("#div_content_list_app").css('height', ($(window).height() - 99) + "px");
            $("#map").css('height', ($(window).height() - 103) + "px");
        }
        $("#modal_data").css('max-height', ($(window).height() - 113) + "px");

    }
}

//获取窗口可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}
//滚动条距离头部高度
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
//文档实际高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

//切换地图和列表
$("#toggleLR").click(function () {
    var src = $("#toggleimg").attr('src');
    if (src.indexOf("carList.png") > 0) {
        $("#DivMap").css("display", "none");
        $("#rightList").css("display", "block");
        $("#toggleimg").attr("src", "/Content/Images/change/carMap.png");
    }
    if (src.indexOf("carMap.png") > 0) {
        $("#DivMap").css("display", "block");
        $("#rightList").css("display", "none");
        $("#toggleimg").attr("src", "/Content/Images/change/carList.png");
    }
});

//改变左侧div的宽度、并且改变地图的margin
$("#div_main_list_hide").click(function () {
    if ($("#div_main_list_hide").attr("divvalue") == "1") {
        $("#span_glyphicon").removeClass("glyphicon-chevron-left");
        $("#span_glyphicon").addClass("glyphicon-chevron-right");
        $("#div_main_list_hide").attr("divvalue", "2");
        $("#div_content_list").animate({ marginLeft: "-330px" }, "show");
        $("#modal_overlay_caty").animate({ marginLeft: "-330px" }, "show");
        $("#modal_data").animate({ marginLeft: "-315px" }, "show");
        $("#modal_overlay_area").animate({ marginLeft: "-330px" }, "show");
        $("#modal_data_area").animate({ marginLeft: "-315px" }, "show");
        $("#modal_overlay_type").animate({ marginLeft: "-330px" }, "show");
        $("#modal_data_type").animate({ marginLeft: "-315px" }, "show");
        $("#div_right_map").animate({ marginLeft: "0px" }, "show");
    } else {
        $("#div_main_list_hide").attr("divvalue", "1");
        $("#span_glyphicon").removeClass("glyphicon-chevron-right");
        $("#span_glyphicon").addClass("glyphicon-chevron-left");
        $("#div_content_list").animate({ marginLeft: "0px" }, "show");
        $("#modal_overlay_caty").animate({ marginLeft: "0px" }, "show");
        $("#modal_data").animate({ marginLeft: "15px" }, "show");
        $("#modal_overlay_area").animate({ marginLeft: "0px" }, "show");
        $("#modal_data_area").animate({ marginLeft: "15px" }, "show");
        $("#modal_overlay_type").animate({ marginLeft: "0px" }, "show");
        $("#modal_data_type").animate({ marginLeft: "15px" }, "show");
        $("#div_right_map").animate({ marginLeft: "330px" }, "show");
    }
});
//改变左侧div的宽度、并且改变地图的margin
$("#div_list").click(function () {
    if ($("#div_list").attr("name") != '1') {
        $("#div_list").attr("name", "1");
        $("#img_list")[0].src = "/Content/Images/change/list1.png";
        $("#div_station_list").hide();
        $("#div_right_map").show();
        $("#div_page").hide();
        $("#div_content_list_app")[0].style.overflowY = "hidden"

    } else {
        $("#div_list").attr("name", "2");
        $("#img_list")[0].src = "/Content/Images/change/map1.png";
        $("#div_station_list").show();
        $("#div_content_list_app")[0].style.overflowY = "auto"
        $("#div_right_map").hide();
        $("#div_page").show();
    }
});
$("#div_city").click(function () {
    // $("name=" + $("#div_city").attr("name"));
    overlay();
})
$("#div_area").click(function () {
    overlay_area();
})
$("#div_type").click(function () {
    overlay_type();
})
function overlay() {
    $("#modal_overlay_caty")[0].style.visibility = ($("#modal_overlay_caty")[0].style.visibility == "visible") ? "hidden" : "visible";
    $("#modal_data")[0].style.visibility = ($("#modal_data")[0].style.visibility == "visible") ? "hidden" : "visible";
}

function overlay_area() {
    $("#modal_overlay_area")[0].style.visibility = ($("#modal_overlay_area")[0].style.visibility == "visible") ? "hidden" : "visible";
    $("#modal_data_area")[0].style.visibility = ($("#modal_data_area")[0].style.visibility == "visible") ? "hidden" : "visible";
}

function overlay_type() {
    $("#modal_overlay_type")[0].style.visibility = ($("#modal_overlay_type")[0].style.visibility == "visible") ? "hidden" : "visible";
    $("#modal_data_type")[0].style.visibility = ($("#modal_data_type")[0].style.visibility == "visible") ? "hidden" : "visible";
}

function overlay_input() {
    $("#modal_overlay_input")[0].style.visibility = ($("#modal_overlay_input")[0].style.visibility == "visible") ? "hidden" : "visible";
    $("#modal_data_input")[0].style.visibility = ($("#modal_data_input")[0].style.visibility == "visible") ? "hidden" : "visible";
}

//画百分比图形
function PieLoad() {
    $('.circle').each(function (index, el) {
        var num = $(this).find('span').text() * 3.6;
        if (num <= 180) {
            $(this).find('.right').css('transform', "rotate(" + num + "deg)");
        } else {
            $(this).find('.right').css('transform', "rotate(180deg)");
            $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
        };
    });
}

