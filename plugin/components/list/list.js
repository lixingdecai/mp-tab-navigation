Component({
  data: {
    list:[],
    toView: 'red',
    scrollTop: 100,
    indicatorDots: false,
    autoplay: false,
    duration: 500,
    activeIndex: 0,
    scrollLeft: 0,
    cate1Info: [],
    cate2Info: [],
    cataItems: [],
    currentCate1Id: 0,
    isLoading: true,
    isError: false,
  },

  // 优先获取缓存分类数据
  getCataStorageData() {
    return httpClient.requestStorageFirst(
      {
        url: config.API.GETCATALOGDATA,
        data: {
          type: ''
        }
      }
    );
  },



  methods: {
    chooseCatalog: function(event) {
      // console.log(index);
      this.setData({activeIndex: event.currentTarget.dataset.index})
    },

    swiperChange: function(e) {
      // console.log('bindchange事件', `this.data.index:${this.data.activeIndex} e.detail.current:${e.detail.current}`)
      this.setData({
        activeIndex: e.detail.current,
        currentCate1Id: this.data.cate1Info[this.data.activeIndex].cate1Id,
      })
      this.activeIndex = e.detail.current;
      this.currentCate1Id = this.data.cate1Info[this.data.activeIndex].cate1Id;
      // this.cataItems = [];
      this.calcScrollLeft();
      // if (this.cate1Info && this.cate1Info.length) {
      //   this.cataItems = this.getCataItems(this.cate1Info[this.activeIndex].cate1Id);
      //   console.log(this.cataItems);
      // }
    },
      // 横滑同步距离计算
    calcScrollLeft: function() {
      if (this.data.activeIndex < 2) this.setData({scrollLeft: 0});
      // else this.scrollLeft = (this.calcTextLength(this.activeIndex) * 16) + (this.activeIndex * 20) - 100;
      this.calcTextLength(this.data.activeIndex)
    },

    calAllScrollItem() {
      let query = wx.createSelectorQuery().in(this);
      let nodeRef = query.selectAll(`.scroll-view-item`);
      this.currentWidth = 0;
      nodeRef.boundingClientRect().exec(ret => {
        if (!ret || !ret.length) return;
        this.setData({
          calScrollItems: ret[0]
        });
        // console.log('currentWidth -> ' + this.currentWidth);
      });
    },

    // 计算文本长度
    calcTextLength: function(index = 0) {
      if (!index || !this.data.cate1Info || !this.data.cate1Info.length) return 0
      let length = 0;
      const cate1Info = this.data.cate1Info;
      const currentWidth = this.data.calScrollItems[index].width;
      for (let i = 0; i < index; i += 1) {
        length += this.data.calScrollItems[i].width;
      }
      this.setData({
        scrollLeft: length - ((wx.getSystemInfoSync().windowWidth - currentWidth) / 2)
      });
      // console.log('calcTextLength: ' + length);
      return length;
    },
  },

  ready: function() {
    this.calAllScrollItem();
  },

  attached: function(){
    // 可以在这里发起网络请求获取插件的数据
    this.setData({
      cate1Info: [
        {
          "cate1Id": 1,
          "cate1Name": "热门游戏test",
          "shortName": "PCgame",
          "cate2Info": [
            {
              "cate1Id": 1,
              "cate2Id": 3,
              "cate2Name": "DOTA2",
              "shortName": "DOTA2",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 74,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 38,
              "cate2Name": "三国争霸2",
              "shortName": "SanGuo",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 26,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 2,
              "cate2Name": "炉石传说testtest",
              "shortName": "How",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 111,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 2055,
              "cate2Name": "丁丁",
              "shortName": "dingidng",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 2,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 5,
              "cate2Name": "魔兽",
              "shortName": "WOW",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 334,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 35,
              "cate2Name": "风暴英雄",
              "shortName": "HOTS",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 5,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 40,
              "cate2Name": "地下城与勇士",
              "shortName": "DNF",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 1,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 26,
              "cate2Name": "怀旧游戏",
              "shortName": "classic",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 2135,
              "cate2Name": "Tangel测试二级分类",
              "shortName": "Tangel",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 1,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 30,
              "cate2Name": "手游&amp;掌机",
              "shortName": "phone",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 1,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 44,
              "cate2Name": "我的世界",
              "shortName": "MC",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 6,
              "cate2Name": "CS:GO",
              "shortName": "CSGO",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 5,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 55,
              "cate2Name": "魔兽争霸",
              "shortName": "mszb",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 5,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 90,
              "cate2Name": "跑跑卡丁车",
              "shortName": "Popkart",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 3,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 13,
              "cate2Name": "剑灵",
              "shortName": "BladeSoul",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 2,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 46,
              "cate2Name": "逆战",
              "shortName": "NZ",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 2097,
              "cate2Name": ";&#039;./",
              "shortName": "1",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 115,
          "cate1Name": "付费接口测试",
          "shortName": "ffjk"
        },
        {
          "cate1Id": 122,
          "cate1Name": "互动竞猜",
          "shortName": "vmcate1"
        },
        {
          "cate1Id": 123,
          "cate1Name": "音直播",
          "shortName": "yinpin",
          "cate2Info": [
            {
              "cate1Id": 123,
              "cate2Id": 2107,
              "cate2Name": "音直播2",
              "shortName": "yinpin",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 10,
              "isVertical": 0
            },
            {
              "cate1Id": 123,
              "cate2Id": 2119,
              "cate2Name": "音直播二级分类",
              "shortName": "audio",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 9,
              "isVertical": 0
            },
            {
              "cate1Id": 123,
              "cate2Id": 2123,
              "cate2Name": "卢阳音二级111",
              "shortName": "luyangaudio2",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 1,
              "isVertical": 0
            },
            {
              "cate1Id": 123,
              "cate2Id": 2145,
              "cate2Name": "Tangel语音二级分类",
              "shortName": "tangel3",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 125,
          "cate1Name": "下次V型从",
          "shortName": "ewew",
          "cate2Info": [
            {
              "cate1Id": 125,
              "cate2Id": 2109,
              "cate2Name": "张小花5",
              "shortName": "fdf",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 125,
              "cate2Id": 2110,
              "cate2Name": "张小花4",
              "shortName": "fds",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 127,
          "cate1Name": "房间管理测试",
          "shortName": "ssfdf"
        },
        {
          "cate1Id": 128,
          "cate1Name": "音直播lili",
          "shortName": "yinpinll",
          "cate2Info": [
            {
              "cate1Id": 128,
              "cate2Id": 2121,
              "cate2Name": "音001",
              "shortName": "yp001",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 35,
              "isVertical": 0
            },
            {
              "cate1Id": 128,
              "cate2Id": 2122,
              "cate2Name": "音002",
              "shortName": "yp002",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 2,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 130,
          "cate1Name": "lisi测试",
          "shortName": "lisi",
          "cate2Info": [
            {
              "cate1Id": 130,
              "cate2Id": 2126,
              "cate2Name": "lisi二级分类",
              "shortName": "lisi2",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 130,
              "cate2Id": 2127,
              "cate2Name": "lisi二级分类不想删",
              "shortName": "mashang",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 130,
              "cate2Id": 2133,
              "cate2Name": "xc测试1",
              "shortName": "xc",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 133,
          "cate1Name": "xuchen测试",
          "shortName": "xc"
        },
        {
          "cate1Id": 136,
          "cate1Name": "聚合测试",
          "shortName": "juheces"
        },
        {
          "cate1Id": 137,
          "cate1Name": "娱乐天地",
          "shortName": "yltd",
          "cate2Info": [
            {
              "cate1Id": 137,
              "cate2Id": 2141,
              "cate2Name": "原创IP",
              "shortName": "ycip",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 1,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 142,
          "cate1Name": "手游休闲100",
          "shortName": "shyxx",
          "cate2Info": [
            {
              "cate1Id": 142,
              "cate2Id": 2143,
              "cate2Name": "PSP游戏",
              "shortName": "pspgame",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 1,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 143,
          "cate1Name": "999户外",
          "shortName": "huwai999",
          "cate2Info": [
            {
              "cate1Id": 143,
              "cate2Id": 2146,
              "cate2Name": "丛林探险",
              "shortName": "cded",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 145,
          "cate1Name": "陈湘",
          "shortName": "xixi"
        },
        {
          "cate1Id": 147,
          "cate1Name": "郭健栖",
          "shortName": "guojianxi"
        },
        {
          "cate1Id": 148,
          "cate1Name": "张文雅",
          "shortName": "zhangwenya",
          "cate2Info": [
            {
              "cate1Id": 148,
              "cate2Id": 2155,
              "cate2Name": "张小花",
              "shortName": "zhangxiaohua",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 3,
              "isVertical": 0
            },
            {
              "cate1Id": 148,
              "cate2Id": 2158,
              "cate2Name": "张小花1",
              "shortName": "zhangxiaohua1",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 3,
              "isVertical": 0
            },
            {
              "cate1Id": 148,
              "cate2Id": 2157,
              "cate2Name": "张小花2",
              "shortName": "zhangxiaohua2",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 3,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 150,
          "cate1Name": "盛天",
          "shortName": "st"
        },
        {
          "cate1Id": 156,
          "cate1Name": "董小姐一级分类",
          "shortName": "missdong",
          "cate2Info": [
            {
              "cate1Id": 156,
              "cate2Id": 2172,
              "cate2Name": "董小姐二级分类",
              "shortName": "missdong",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 2,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 157,
          "cate1Name": "廖颖分类测试",
          "shortName": "LYFLTEST"
        },
        {
          "cate1Id": 158,
          "cate1Name": "试播",
          "shortName": "shibo"
        },
        {
          "cate1Id": 38,
          "cate1Name": "秦毅测试专用",
          "shortName": "qycszy"
        },
        {
          "cate1Id": 50,
          "cate1Name": "娱乐",
          "shortName": "dy1hour",
          "cate2Info": [
            {
              "cate1Id": 50,
              "cate2Id": 1,
              "cate2Name": "二次元",
              "shortName": "ecy",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 87,
              "isVertical": 0
            },
            {
              "cate1Id": 50,
              "cate2Id": 2016,
              "cate2Name": "英糙",
              "shortName": "yincao",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 8,
          "cate1Name": "颜值",
          "shortName": "yz",
          "cate2Info": [
            {
              "cate1Id": 8,
              "cate2Id": 201,
              "cate2Name": "颜值测试",
              "shortName": "yz",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 1372,
              "isVertical": 1
            }
          ]
        },
        {
          "cate1Id": 32,
          "cate1Name": "手机游戏",
          "shortName": "SJYX",
          "cate2Info": [
            {
              "cate1Id": 32,
              "cate2Id": 29,
              "cate2Name": "格斗游戏",
              "shortName": "FTG",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 3,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 2,
          "cate1Name": "乐星天地",
          "shortName": "ylxtd",
          "cate2Info": [
            {
              "cate1Id": 2,
              "cate2Id": 124,
              "cate2Name": "户外直播",
              "shortName": "hhhh",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 31,
              "isVertical": 0
            },
            {
              "cate1Id": 2,
              "cate2Id": 132,
              "cate2Name": "星秀",
              "shortName": "qmxx",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 105,
              "isVertical": 0
            },
            {
              "cate1Id": 2,
              "cate2Id": 72,
              "cate2Name": "SNx1H48",
              "shortName": "SNH48",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 4,
          "cate1Name": "体育道",
          "shortName": "typd"
        },
        {
          "cate1Id": 5,
          "cate1Name": "影视专区",
          "shortName": "yszq"
        },
        {
          "cate1Id": 3,
          "cate1Name": "玩科技",
          "shortName": "ywkj"
        },
        {
          "cate1Id": 31,
          "cate1Name": "影视发布",
          "shortName": "DST"
        },
        {
          "cate1Id": 34,
          "cate1Name": "客厅游戏",
          "shortName": "ktyx"
        },
        {
          "cate1Id": 97,
          "cate1Name": "正能量",
          "shortName": "znl",
          "cate2Info": [
            {
              "cate1Id": 97,
              "cate2Id": 32,
              "cate2Name": "暗黑破坏神3",
              "shortName": "DIABLO3",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 114,
              "isVertical": 0
            },
            {
              "cate1Id": 97,
              "cate2Id": 51,
              "cate2Name": "张小花7",
              "shortName": "footballgame",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 2,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 110,
          "cate1Name": "科技分区",
          "shortName": "kj"
        },
        {
          "cate1Id": 131,
          "cate1Name": "立马删",
          "shortName": "n"
        },
        {
          "cate1Id": 132,
          "cate1Name": "立马2删233321",
          "shortName": "lims"
        },
        {
          "cate1Id": 33,
          "cate1Name": "竖屏栏目测试",
          "shortName": "sp"
        },
        {
          "cate1Id": 134,
          "cate1Name": "主播招募测试1",
          "shortName": "zbzm",
          "cate2Info": [
            {
              "cate1Id": 134,
              "cate2Id": 2136,
              "cate2Name": "修改主播招募二级分类1",
              "shortName": "fd",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 134,
              "cate2Id": 2137,
              "cate2Name": "主播招募二级分类2",
              "shortName": "sdf",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 141,
          "cate1Name": "分类通知测试4",
          "shortName": "fltz4"
        },
        {
          "cate1Id": 118,
          "cate1Name": "陶冶一级分类",
          "shortName": "taoye",
          "cate2Info": [
            {
              "cate1Id": 118,
              "cate2Id": 181,
              "cate2Name": "王者荣耀",
              "shortName": "wzry",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 21,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 138,
          "cate1Name": "分类通知测试1",
          "shortName": "fltz1"
        },
        {
          "cate1Id": 151,
          "cate1Name": "cl一级分类非秀场是手游音直播",
          "shortName": "clcate1",
          "cate2Info": [
            {
              "cate1Id": 151,
              "cate2Id": 2164,
              "cate2Name": "clcate2001正常分类",
              "shortName": "clcate2001",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 151,
              "cate2Id": 2165,
              "cate2Name": "clcate2002隐藏的分类",
              "shortName": "clcate2002",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 152,
          "cate1Name": "cl一级分类是秀场非手游音直播",
          "shortName": "clcate1002"
        },
        {
          "cate1Id": 154,
          "cate1Name": "cl一级分类子级是空的",
          "shortName": "clcate1004"
        },
        {
          "cate1Id": 116,
          "cate1Name": "流量线接口测试勿动",
          "shortName": "llxjkcs"
        },
        {
          "cate1Id": 139,
          "cate1Name": "分类通知测试2",
          "shortName": "fltz2"
        },
        {
          "cate1Id": 15,
          "cate1Name": "单机热游1",
          "shortName": "djry",
          "cate2Info": [
            {
              "cate1Id": 15,
              "cate2Id": 2140,
              "cate2Name": "经典游戏",
              "shortName": "oldgames",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 15,
              "cate2Id": 2142,
              "cate2Name": "分类通知测试二级1",
              "shortName": "fltxzcej",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 9,
          "cate1Name": "移动游戏",
          "shortName": "ydyx123123",
          "cate2Info": [
            {
              "cate1Id": 9,
              "cate2Id": 218,
              "cate2Name": "火影忍者",
              "shortName": "hyrz",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "",
              "count": 155,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 14,
          "cate1Name": "王者荣耀",
          "shortName": "wzry"
        },
        {
          "cate1Id": 117,
          "cate1Name": "歪歪的分类",
          "shortName": "sdf"
        },
        {
          "cate1Id": 102,
          "cate1Name": "zyy1一级分类",
          "shortName": "zyyfl",
          "cate2Info": [
            {
              "cate1Id": 102,
              "cate2Id": 2128,
              "cate2Name": "lisi验证缓存",
              "shortName": "yanzheng",
              "pic": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "icon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "smallIcon": "https://i.h2.pdim.gs/b7885f4021d7089a321d86935af3a252.webp",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 109,
          "cate1Name": "zyy2一级分类",
          "shortName": "zyyfl2"
        },
        {
          "cate1Id": 121,
          "cate1Name": "h5白名单",
          "shortName": "h5"
        },
        {
          "cate1Id": 155,
          "cate1Name": "tes<a>1</a>",
          "shortName": "test"
        },
        {
          "cate1Id": 140,
          "cate1Name": "分类通知测试3",
          "shortName": "fltz3"
        },
        {
          "cate1Id": 100,
          "cate1Name": "直播间竞价推广",
          "shortName": "subject"
        }
      ]
    })
  },
})