require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([3],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_card__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_bmap_wx_min__ = __webpack_require__(126);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      motto: 'Hello World',
      userInfo: {},
      items: [{ name: 'USA', value: '美国' }, { name: 'CHN', value: '中国', checked: 'true' }, { name: 'BRA', value: '巴西' }, { name: 'JPN', value: '日本' }, { name: 'ENG', value: '英国' }, { name: 'TUR', value: '法国' }],
      active: 0,
      code: "",
      cityName: ''
    };
  },


  components: {
    card: __WEBPACK_IMPORTED_MODULE_0__components_card__["a" /* default */]
  },
  created: function created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  },
  mounted: function mounted() {
    this.getWeatherData();
  },

  methods: {
    onChange: function onChange(event) {
      console.log(event.detail);
    },
    vuexPage: function vuexPage() {
      this.$router.push('../counter/main');
    },
    apiPage: function apiPage() {
      this.$router.push('../search/search');
    },
    suggestionPage: function suggestionPage() {
      this.$router.push('../suggestion/suggestion');
    },
    regeocodingPage: function regeocodingPage() {
      this.$router.push('../regeocoding/regeocoding');
    },
    weatherPage: function weatherPage() {
      this.$router.push('../weather/weather');
    },
    bindViewTap: function bindViewTap() {
      // const url = '../logs/main'
      // wx.navigateTo({url})
      this.$router.push('../logs/main');
    },
    photoPage: function photoPage() {
      this.$router.push('../photo/photo');
    },
    getUserInfo: function getUserInfo() {
      var _this2 = this;

      // 调用登录接口
      // wx.login({
      //   success: () => {
      //     wx.getUserInfo({
      //       success: (res) => {
      //         this.userInfo = res.userInfo
      //         console.log(res)
      //         console.log(this.userInfo)
      //       }
      //     })
      //   }
      // }),
      wx.login({
        //获取code
        success: function success(res) {
          _this2.code = res.code;
          console.log(res.code); //返回code
          wx.getUserInfo({
            success: function success(res) {
              _this2.userInfo = res.userInfo;
              console.log(res);
              console.log(_this2.userInfo);
              // wx.request({
              //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx52a9380821d85603&secret=353ae1409d24e026d2bdcb0b180953e8&js_code=' + this.code + '&grant_type=authorization_code',
              //   data: {},
              //   header: {
              //     'content-type': 'application/json'
              //   },
              //   success: (res) => {
              //     console.log("openid"+res)
              //     openid = res.data.openid //返回openid
              //   }
              //})
            }
          });
          wx.getLocation({
            type: 'wgs84',
            success: function success(res) {
              console.log(res);
              var latitude = res.latitude;
              var longitude = res.longitude;
              var speed = res.speed;
              var accuracy = res.accuracy;
              wx.request({ // ②百度地图API，将微信获得的经纬度传给百度，获得城市等信息
                url: 'https://api.map.baidu.com/geocoder/v2/?ak=FuD2k606aTeFr0dOa4bFs0PIzz8VFs9Y&location=' + latitude + ',' + longitude + '&output=json&coordtype=wgs84ll',
                data: {},
                header: {
                  'Content-Type': 'application/json'
                },
                success: function success(res) {
                  console.log(res.data.result);
                  console.log(res.data.result.addressComponent.city + res.data.result.addressComponent.district);
                },

                fail: function fail() {
                  // fail
                },
                complete: function complete() {
                  // complete
                }
              });
            }
          });
        }
      });
    },
    clickHandle: function clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev);
    },
    radioChange: function radioChange(e) {
      console.log('radio发生change事件，携带value值为：', e.target.value);
    },
    getWeatherData: function getWeatherData() {
      var _this = this;
      var BMap = new __WEBPACK_IMPORTED_MODULE_1__libs_bmap_wx_min__["default"].BMapWX({
        ak: 'FuD2k606aTeFr0dOa4bFs0PIzz8VFs9Y'
      });
      var fail = function fail(data) {
        console.log('fail!!!!');
      };
      var success = function success(data) {
        console.log(data);
        console.log('success!!!');
        var weatherData = data.currentWeather[0];
        weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
        _this.setData({
          weatherData: weatherData
        });
        _this.cityName = weatherData.currentCity;
      };
      BMap.weather({
        fail: fail,
        success: success
      });
    }
  }
});

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "index"
  }, [_c('div', {
    staticClass: "search"
  }, [_c('div', {
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.toMappage
    }
  }, [_vm._v(_vm._s(_vm.cityName))]), _vm._v(" "), _c('div', {
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.toSearch
    }
  }, [_c('input', {
    attrs: {
      "type": "text",
      "placeholder": "搜索"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "swiper"
  }, [_c('swiper', {
    staticClass: "swiper-container",
    attrs: {
      "indicator-dots": "true",
      "autoplay": "true",
      "interval": "3000",
      "circular": "true",
      "duration": "500"
    }
  }, _vm._l((_vm.banner), function(item, index) {
    return _c('block', {
      key: index
    }, [_c('swiper-item', {
      staticClass: "swiper-item",
      attrs: {
        "mpcomid": '0-' + index
      }
    }, [_c('image', {
      staticClass: "slide-image",
      attrs: {
        "src": item.image_url
      }
    })])], 1)
  }))], 1), _vm._v(" "), _c('div', {
    staticClass: "channel"
  }, _vm._l((_vm.channel), function(item, index) {
    return _c('div', {
      key: index,
      attrs: {
        "eventid": '2-' + index
      },
      on: {
        "click": function($event) {
          _vm.categoryList(item.id)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": item.icon_url,
        "alt": ""
      }
    }), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.name))])], 1)
  })), _vm._v(" "), _c('div', {
    staticClass: "brand"
  }, [_c('div', {
    staticClass: "head",
    attrs: {
      "eventid": '3'
    },
    on: {
      "click": _vm.tobrandList
    }
  }, [_vm._v("\n      品牌制造商直供\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, _vm._l((_vm.brandList), function(item, index) {
    return _c('div', {
      key: index,
      attrs: {
        "eventid": '4-' + index
      },
      on: {
        "click": function($event) {
          _vm.branddetail(item.id)
        }
      }
    }, [_c('div', [_c('p', [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.floor_price) + "元起")])], 1), _vm._v(" "), _c('img', {
      attrs: {
        "src": item.new_pic_url,
        "alt": ""
      }
    })])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "newgoods"
  }, [_c('div', {
    staticClass: "newgoods-top",
    attrs: {
      "eventid": '5'
    },
    on: {
      "click": function($event) {
        _vm.goodsList('new')
      }
    }
  }, [_c('div', {
    staticClass: "top"
  }, [_c('p', [_vm._v("新品首发")]), _vm._v(" "), _c('p', [_vm._v("查看全部")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, [_c('ul', [_c('scroll-view', {
    staticClass: "scroll-view",
    attrs: {
      "scroll-x": true
    }
  }, _vm._l((_vm.newGoods), function(item, index) {
    return _c('li', {
      key: index,
      attrs: {
        "eventid": '6-' + index
      },
      on: {
        "click": function($event) {
          _vm.goodsDetail(item.id)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": item.list_pic_url,
        "alt": ""
      }
    }), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.goods_brief))]), _vm._v(" "), _c('p', [_vm._v("￥" + _vm._s(item.retail_price))])], 1)
  }))], 1)], 1)]), _vm._v(" "), _c('div', {
    staticClass: "newgoods hotgoods"
  }, [_c('div', {
    staticClass: "newgoods-top",
    attrs: {
      "eventid": '7'
    },
    on: {
      "click": function($event) {
        _vm.goodsList('hot')
      }
    }
  }, [_c('div', {
    staticClass: "top"
  }, [_c('p', [_vm._v("人气推荐\n          "), _c('span'), _vm._v(" 好物精选")]), _vm._v(" "), _c('p', [_vm._v("查看全部")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, [_c('ul', [_c('scroll-view', {
    staticClass: "scroll-view",
    attrs: {
      "scroll-x": true
    }
  }, _vm._l((_vm.hotGoods), function(item, index) {
    return _c('li', {
      key: index,
      attrs: {
        "eventid": '8-' + index
      },
      on: {
        "click": function($event) {
          _vm.goodsDetail(item.id)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": item.list_pic_url,
        "alt": ""
      }
    }), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.goods_brief))]), _vm._v(" "), _c('p', [_vm._v("￥" + _vm._s(item.retail_price))])], 1)
  }))], 1)], 1)]), _vm._v(" "), _c('div', {
    staticClass: "topicList"
  }, [_c('div', {
    staticClass: "topicList-top",
    attrs: {
      "eventid": '9'
    },
    on: {
      "click": _vm.totopic
    }
  }, [_vm._v("\n      专题精选\n      "), _c('span', {
    staticClass: "icon"
  })]), _vm._v(" "), _c('div', {
    staticClass: "list"
  }, [_c('ul', [_c('scroll-view', {
    staticClass: "scroll-view",
    attrs: {
      "scroll-x": true
    }
  }, _vm._l((_vm.topicList), function(item, index) {
    return _c('li', {
      key: index,
      attrs: {
        "eventid": '10-' + index
      },
      on: {
        "click": function($event) {
          _vm.topicdetail(item.id)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": item.item_pic_url,
        "alt": ""
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "btom"
    }, [_c('div', [_c('p', [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.subtitle))])], 1), _vm._v(" "), _c('div', [_vm._v("\n                " + _vm._s(item.price_info) + "元起\n              ")])])])
  }))], 1)], 1)]), _vm._v(" "), _c('div', {
    staticClass: "newcategory"
  }, _vm._l((_vm.newCategoryList), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "list"
    }, [_c('div', {
      staticClass: "head"
    }, [_vm._v(_vm._s(item.name) + "好物")]), _vm._v(" "), _c('div', {
      staticClass: "sublist"
    }, [_vm._l((item.goodsList), function(subitem, subindex) {
      return _c('div', {
        key: subindex,
        attrs: {
          "eventid": '11-' + index + '-' + subindex
        },
        on: {
          "click": function($event) {
            _vm.goodsDetail(subitem.id)
          }
        }
      }, [_c('img', {
        attrs: {
          "src": subitem.list_pic_url,
          "alt": ""
        }
      }), _vm._v(" "), _c('p', [_vm._v(_vm._s(subitem.name))]), _vm._v(" "), _c('p', [_vm._v("￥" + _vm._s(subitem.retail_price))])], 1)
    }), _vm._v(" "), _c('div', {
      attrs: {
        "eventid": '12-' + index
      },
      on: {
        "click": function($event) {
          _vm.categoryList(item.id)
        }
      }
    }, [_c('div', {
      staticClass: "last"
    }, [_c('p', [_vm._v(_vm._s(item.name) + "好物")]), _vm._v(" "), _c('span', {
      staticClass: "icon"
    })], 1)])], 2)])
  }))])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-378baaca", esExports)
  }
}

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);


function _classCallCheck(t, a) {
  if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}var _createClass = function () {
  function t(t, a) {
    for (var e = 0; e < a.length; e++) {
      var i = a[e];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(t, i.key, i);
    }
  }return function (a, e, i) {
    return e && t(a.prototype, e), i && t(a, i), a;
  };
}(),
    BMapWX = function () {
  function t(a) {
    _classCallCheck(this, t), this.ak = a.ak;
  }return _createClass(t, [{ key: "getWXLocation", value: function value(t, a, e, i) {
      t = t || "gcj02", a = a || function () {}, e = e || function () {}, i = i || function () {}, wx.getLocation({ type: t, success: a, fail: e, complete: i });
    } }, { key: "search", value: function value(t) {
      var a = this;t = t || {};var e = { query: t.query || "生活服务$美食&酒店", scope: t.scope || 1, filter: t.filter || "", coord_type: t.coord_type || 2, page_size: t.page_size || 10, page_num: t.page_num || 0, output: t.output || "json", ak: a.ak, sn: t.sn || "", timestamp: t.timestamp || "", radius: t.radius || 2e3, ret_coordtype: "gcj02ll" },
          i = { iconPath: t.iconPath, iconTapPath: t.iconTapPath, width: t.width, height: t.height, alpha: t.alpha || 1, success: t.success || function () {}, fail: t.fail || function () {} },
          n = "gcj02",
          o = function o(t) {
        e.location = t.latitude + "," + t.longitude, wx.request({ url: "https://api.map.baidu.com/place/v2/search", data: e, header: { "content-type": "application/json" }, method: "GET", success: function success(t) {
            var a = t.data;if (0 === a.status) {
              var e = a.results,
                  n = {};n.originalData = a, n.wxMarkerData = [];for (var o = 0; o < e.length; o++) {
                n.wxMarkerData[o] = { id: o, latitude: e[o].location.lat, longitude: e[o].location.lng, title: e[o].name, iconPath: i.iconPath, iconTapPath: i.iconTapPath, address: e[o].address, telephone: e[o].telephone, alpha: i.alpha, width: i.width, height: i.height };
              }i.success(n);
            } else i.fail({ errMsg: a.message, statusCode: a.status });
          }, fail: function fail(t) {
            i.fail(t);
          } });
      },
          s = function s(t) {
        i.fail(t);
      },
          c = function c() {};if (t.location) {
        var u = t.location.split(",")[1],
            r = t.location.split(",")[0],
            l = "input location",
            p = { errMsg: l, latitude: r, longitude: u };o(p);
      } else a.getWXLocation(n, o, s, c);
    } }, { key: "suggestion", value: function value(t) {
      var a = this;t = t || {};var e = { query: t.query || "", region: t.region || "全国", city_limit: t.city_limit || !1, output: t.output || "json", ak: a.ak, sn: t.sn || "", timestamp: t.timestamp || "", ret_coordtype: "gcj02ll" },
          i = { success: t.success || function () {}, fail: t.fail || function () {} };wx.request({ url: "https://api.map.baidu.com/place/v2/suggestion", data: e, header: { "content-type": "application/json" }, method: "GET", success: function success(t) {
          var a = t.data;0 === a.status ? i.success(a) : i.fail({ errMsg: a.message, statusCode: a.status });
        }, fail: function fail(t) {
          i.fail(t);
        } });
    } }, { key: "regeocoding", value: function value(t) {
      var a = this;t = t || {};var e = { coordtype: t.coordtype || "gcj02ll", pois: t.pois || 0, output: t.output || "json", ak: a.ak, sn: t.sn || "", timestamp: t.timestamp || "", ret_coordtype: "gcj02ll" },
          i = { iconPath: t.iconPath, iconTapPath: t.iconTapPath, width: t.width, height: t.height, alpha: t.alpha || 1, success: t.success || function () {}, fail: t.fail || function () {} },
          n = "gcj02",
          o = function o(t) {
        e.location = t.latitude + "," + t.longitude, wx.request({ url: "https://api.map.baidu.com/geocoder/v2/", data: e, header: { "content-type": "application/json" }, method: "GET", success: function success(a) {
            var e = a.data;if (0 === e.status) {
              var n = e.result,
                  o = {};o.originalData = e, o.wxMarkerData = [], o.wxMarkerData[0] = { id: 0, latitude: t.latitude, longitude: t.longitude, address: n.formatted_address, iconPath: i.iconPath, iconTapPath: i.iconTapPath, desc: n.sematic_description, business: n.business, alpha: i.alpha, width: i.width, height: i.height }, i.success(o);
            } else i.fail({ errMsg: e.message, statusCode: e.status });
          }, fail: function fail(t) {
            i.fail(t);
          } });
      },
          s = function s(t) {
        i.fail(t);
      },
          c = function c() {};if (t.location) {
        var u = t.location.split(",")[1],
            r = t.location.split(",")[0],
            l = "input location",
            p = { errMsg: l, latitude: r, longitude: u };o(p);
      } else a.getWXLocation(n, o, s, c);
    } }, { key: "weather", value: function value(t) {
      var a = this;t = t || {};var e = { coord_type: t.coord_type || "gcj02", output: t.output || "json", ak: a.ak, sn: t.sn || "", timestamp: t.timestamp || "" },
          i = { success: t.success || function () {}, fail: t.fail || function () {} },
          n = "gcj02",
          o = function o(t) {
        e.location = t.longitude + "," + t.latitude, wx.request({ url: "https://api.map.baidu.com/telematics/v3/weather", data: e, header: { "content-type": "application/json" }, method: "GET", success: function success(t) {
            var a = t.data;if (0 === a.error && "success" === a.status) {
              var e = a.results,
                  n = {};n.originalData = a, n.currentWeather = [], n.currentWeather[0] = { currentCity: e[0].currentCity, pm25: e[0].pm25, date: e[0].weather_data[0].date, temperature: e[0].weather_data[0].temperature, weatherDesc: e[0].weather_data[0].weather, wind: e[0].weather_data[0].wind }, i.success(n);
            } else i.fail({ errMsg: a.message, statusCode: a.status });
          }, fail: function fail(t) {
            i.fail(t);
          } });
      },
          s = function s(t) {
        i.fail(t);
      },
          c = function c() {};if (t.location) {
        var u = t.location.split(",")[0],
            r = t.location.split(",")[1],
            l = "input location",
            p = { errMsg: l, latitude: r, longitude: u };o(p);
      } else a.getWXLocation(n, o, s, c);
    } }]), t;
}();module.exports.BMapWX = BMapWX;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(127)(module)))

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(98);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_378baaca_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(104);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(99)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-378baaca"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_378baaca_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\index\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-378baaca", Component.options)
  } else {
    hotAPI.reload("data-v-378baaca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 99:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[97]);
//# sourceMappingURL=main.js.map