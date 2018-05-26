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


    // 计算文本长度
    calcTextLength: function(index = 0) {
      if (!index || !this.data.cate1Info || !this.data.cate1Info.length) return 0
      let length = 0;
      const cate1Info = this.data.cate1Info;
      console.log(cate1Info[index].shortName);
      // 如果存在page 中
      // let query = wx.createSelectorQuery().in(this);
      // 如果存在于自定义组件 里
      let query = wx.createSelectorQuery().in(this);
      let nodeRef = query.select(`#${cate1Info[index].shortName}`);
      this.data.currentWidth = 0;
      console.log(nodeRef);
      nodeRef.boundingClientRect().exec((ret) => {
        console.log(ret);
        this.data.currentWidth = ret[0].width;
        // console.log('currentWidth -> ' + this.currentWidth);
      });
      for (let i = 0; i < index; i += 1) {
        query = wx.createSelectorQuery().in(this);
        nodeRef = query.select(`#${cate1Info[i].shortName}`);
        nodeRef.boundingClientRect().exec((ret) => {
          ret.forEach(e => {
            console.log(e);
            if (e.width) length += e.width;
          })
          // 水平居中
          this.setData({
            scrollLeft: length - ((wx.getSystemInfoSync().windowWidth - this.data.currentWidth) / 2),
          })
        });
        // length += cate1Info[i].cate1Name.length || 0;
      }
      // console.log('calcTextLength: ' + length);
      return length;
    },
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/dfb7341f7c3119fdc2e8cf0d8bf2592c.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/355010a13360445e85f899e2189ff2c7.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/5d20fa738d63b9e8c7e7ffabaa4f09c0.jpg",
              "count": 74,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 38,
              "cate2Name": "三国争霸2",
              "shortName": "SanGuo",
              "pic": "https://live.dz11.com/upload/game_ca",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr",
              "smallIcon": "",
              "count": 26,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 2,
              "cate2Name": "炉石传说testtest",
              "shortName": "How",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/ff869b8da8231a3f2e8136f6d46e052b.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/a315c530727b8776e1f39eae1cf3511f.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/b1749c82e567bdee1e9fbfe3861894a5.png",
              "count": 111,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 2055,
              "cate2Name": "丁丁",
              "shortName": "dingidng",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/bba02613fefe4f08200bfb6cd5cad20f.png",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/b96bf057b2cb6920303f3e3ccedb2c70.png",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/b63f5852dfa482e4142a37660bf5a9fd.png",
              "count": 2,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 5,
              "cate2Name": "魔兽",
              "shortName": "WOW",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/7c6a0ac74e59c3e82f9827c50b4a221f.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/c8e1b9999055086cf20e68955f8d0e9a.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/b54ef58f440108f50a55bd8e025cf4fc.png",
              "count": 334,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 35,
              "cate2Name": "风暴英雄",
              "shortName": "HOTS",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/a261f533177b3c78859d9d29d8eb0633.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/cad4a0fcb11dc84515288f0026ccd892.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/766813351302a4869846d4391f503ac8.jpg",
              "count": 5,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 40,
              "cate2Name": "地下城与勇士",
              "shortName": "DNF",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/02ef326d73d00d8a077d0d9b17fcee73.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/c79c024c1a29b8400110114a53d4ab8d.jpg",
              "smallIcon": "",
              "count": 1,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 26,
              "cate2Name": "怀旧游戏",
              "shortName": "classic",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/7b5d81c4481b5a8b3bba263517c4843b.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/069cd4211cbff6484a90c6aabeb876a8.jpg",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 2135,
              "cate2Name": "Tangel测试二级分类",
              "shortName": "Tangel",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/a854e51fe666ce8f0929552a99137f59.png",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/ee087e2fae6dec1ba9bf185e5e4fa8e2.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/d9b581a4c2e8813dae9477c3ab016050.png",
              "count": 1,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 30,
              "cate2Name": "手游&amp;掌机",
              "shortName": "phone",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/a725e4b2705cc8bcb662f2d366a76793.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/c50dd6fe568750e899038b6e03ed145a.jpg",
              "smallIcon": "",
              "count": 1,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 44,
              "cate2Name": "我的世界",
              "shortName": "MC",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/fed3c5e04e1598cce20800af0da7254b.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/ae27fbeac2c32e508d0c748530104e75.jpg",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 6,
              "cate2Name": "CS:GO",
              "shortName": "CSGO",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/da50cdd66c2b7f5748bc0f2f098dda55.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/349a00079b4f995538da1c228ff9e0ba.jpg",
              "smallIcon": "",
              "count": 5,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 55,
              "cate2Name": "魔兽争霸",
              "shortName": "mszb",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/2bcd85bc223deaab025ff6fda1802b2d.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/38707d3f1c4c7057716b4af5947decb1.jpg",
              "smallIcon": "",
              "count": 5,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 90,
              "cate2Name": "跑跑卡丁车",
              "shortName": "Popkart",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/c44ee9269ef5f479c4c9c9c9101a3198.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/e4f2b6dcb9b742e783f80165d106e0fb.jpg",
              "smallIcon": "",
              "count": 3,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 13,
              "cate2Name": "剑灵",
              "shortName": "BladeSoul",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/c436c4c3c25cf0866d96f7ee8ad3f925.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/7f009302fb191324b0e809e96e40c14e.jpg",
              "smallIcon": "",
              "count": 2,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 46,
              "cate2Name": "逆战",
              "shortName": "NZ",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/a73c6f233b0c25fa0469bc34cd691172.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/b9e04bc06b5d216db74c0575d28d3a6b.jpg",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 1,
              "cate2Id": 2097,
              "cate2Name": ";&#039;./",
              "shortName": "1",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/cda749fe97834dde66d3d7cceab60076.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/2623f8f84cafe9785e07aa543aba1394.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/9b3e55cd075f4dbaf28f1c41694bfa92.jpg",
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
          "cate1Name": "音频直播",
          "shortName": "yinpin",
          "cate2Info": [
            {
              "cate1Id": 123,
              "cate2Id": 2107,
              "cate2Name": "音频直播2",
              "shortName": "yinpin",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/36cf447624077578de2b949fd222c371.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/a0e2ea4e88b3e9ec9af6c340a7e6b2d4.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/468bb2d14ff1f205f8e0d4dfb4c1cca7.jpg",
              "count": 10,
              "isVertical": 0
            },
            {
              "cate1Id": 123,
              "cate2Id": 2119,
              "cate2Name": "音频直播二级分类",
              "shortName": "audio",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/10583cad687171a8139652bcfbfe00f9.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/5f69c305c32fbd1368f4f489cf22ba9c.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/d17edf4ebbd167c1e583b5b0edc38725.jpg",
              "count": 9,
              "isVertical": 0
            },
            {
              "cate1Id": 123,
              "cate2Id": 2123,
              "cate2Name": "卢阳音频二级111",
              "shortName": "luyangaudio2",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/b624d3255d0c81abd679263c7f52d804.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/3b275d992417e5ef929b79097d80b618.jpg",
              "smallIcon": "",
              "count": 1,
              "isVertical": 0
            },
            {
              "cate1Id": 123,
              "cate2Id": 2145,
              "cate2Name": "Tangel语音二级分类",
              "shortName": "tangel3",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/ab422dcb2e0239399ac7eac18d023b49.png",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/c493aa52bbbb9a9d6f92a0789d146888.png",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/d226db9b7b4fd7b281471a94515ead29.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/e8b297a91963b2d25dd5587c681add34.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/20afe4f4f3ed73bfc454fe934660eb17.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/9d50acb68148abf4021fdadda0efd47b.jpg",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 125,
              "cate2Id": 2110,
              "cate2Name": "张小花4",
              "shortName": "fds",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/1a22aae4ff2799a9faa137a7e0615d3c.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/6ab89e7a58e09ea2c52c4d57e5a0b094.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/05cd6207e182f2cdda89fc4c4fe41ad3.jpg",
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
          "cate1Name": "音频直播lili",
          "shortName": "yinpinll",
          "cate2Info": [
            {
              "cate1Id": 128,
              "cate2Id": 2121,
              "cate2Name": "音频001",
              "shortName": "yp001",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/4ab069209aee34d9f034eec0e592c8a8.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/7508f7f1f1ab2ffce89234dc90e55cd4.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/9b3dd5340f4d0faab5c2951a6d50a291.jpg",
              "count": 35,
              "isVertical": 0
            },
            {
              "cate1Id": 128,
              "cate2Id": 2122,
              "cate2Name": "音频002",
              "shortName": "yp002",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/606cbfc26af82ce7be7169a4439d9550.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/9d20c26623cb145f96ee593a01268b8a.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/991ba82cbbccca7c258c17cba0638f44.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/25a8a9aadd646d271527b9da575b1fdb.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/fb0ec43505dfc52af0379c6d02aeb9a2.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/09b3d2d400c2a59a580a4b1e0b61d644.jpg",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 130,
              "cate2Id": 2127,
              "cate2Name": "lisi二级分类不想删",
              "shortName": "mashang",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/bacb43c7b37545e49bdd6390907590ac.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/9e388ca694c3bd6c8601a3e14abbec53.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/f04080b7784216c6c13d71594e408965.jpg",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 130,
              "cate2Id": 2133,
              "cate2Name": "xc测试1",
              "shortName": "xc",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/2f46038a42436362419bf30b84cfe5d8.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/c0f2772fe7d1404a860749bff1fec8fc.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/5fe12f73787510ce87ab1d332a80d9e7.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/0b7af47db6f39c1a2a3dc9cf6235aa7a.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/5c773cc91c92cc6c64aafec9cf887cc1.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/c8490d6a4617e29f61fe784da08be3a2.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/a49f5285c1c008f5ed3205c492b8a06d.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/f175b25e7a39b9fbfa76964f23086a57.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/be2c1bc5ee68db5378761bdeaee7017f.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/e501d66827e4106611aeecdf094bc51d.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/3f89a554c8ca9c36f6629ded9a629cd2.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/b6bd2c5b644eb36b82e4515b0ab53bbe.jpg",
              "count": 3,
              "isVertical": 0
            },
            {
              "cate1Id": 148,
              "cate2Id": 2158,
              "cate2Name": "张小花1",
              "shortName": "zhangxiaohua1",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/ce4aa4d55a1994f2eb1596fc37f65d50.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/a31c7bc9b2a9f2bf4deeffbbeb70d087.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/b59b146fee27b2ba468d1eb7ff2662db.jpg",
              "count": 3,
              "isVertical": 0
            },
            {
              "cate1Id": 148,
              "cate2Id": 2157,
              "cate2Name": "张小花2",
              "shortName": "zhangxiaohua2",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/bfe89575fdd3e0c0dcc71cc696e574c2.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/0340bc40886e60b5eeb23dc2c1af1bf3.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/9cb7d67dab4cd48a4367790e29e49350.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/01757739a2bc18fd0dad84ab27acfb79.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/9f782891aa592125401b963e72bccd80.png",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/15ad2f8d2d807310c1bef6c4ab73b318.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/5c0fb756bbf209510a792769b42746b4.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/b8215fa6d704c19d0f81c883158f6621.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/359aeaa7bf786f5d5973e0b45de94787.jpg",
              "count": 87,
              "isVertical": 0
            },
            {
              "cate1Id": 50,
              "cate2Id": 2016,
              "cate2Name": "英糙",
              "shortName": "yincao",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/863ef826de61508f58acb09fc1c61405.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/778a2c7224db3282e861e36450327570.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/0c2d40f409ba5b7a54471c685e7253f5.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/2295c01ee5b9d61a34558490f5eebf04.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/869bf9613543af91b4ced45a3c22af6f.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/aa8f65c3c7efd2c0300b39e9205bb9c0.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/ae9bd5038761b103ec0e6412e25604f9.jpg",
              "smallIcon": "",
              "count": 3,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 2,
          "cate1Name": "鱼乐星天地",
          "shortName": "ylxtd",
          "cate2Info": [
            {
              "cate1Id": 2,
              "cate2Id": 124,
              "cate2Name": "户外直播",
              "shortName": "hhhh",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/b0c235b6e8a932eb065a61efcd53af0c.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/6952475c5bade18a2a97c47294218a0e.png",
              "smallIcon": "",
              "count": 31,
              "isVertical": 0
            },
            {
              "cate1Id": 2,
              "cate2Id": 132,
              "cate2Name": "星秀",
              "shortName": "qmxx",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/5d93494ae18fe03edda358f39f675826.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/565d18c12fb4d5991e6a8e491fe9c31f.jpg",
              "smallIcon": "",
              "count": 105,
              "isVertical": 0
            },
            {
              "cate1Id": 2,
              "cate2Id": 72,
              "cate2Name": "SNx1H48",
              "shortName": "SNH48",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/499813edef0813126e58591f092bd868.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/5335447db366f588e87902eccd92dabd.jpg",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 4,
          "cate1Name": "体育频道",
          "shortName": "typd"
        },
        {
          "cate1Id": 5,
          "cate1Name": "影视专区",
          "shortName": "yszq"
        },
        {
          "cate1Id": 3,
          "cate1Name": "鱼玩科技",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/121b523ec0b8c1731fd6cdd51f4cfc67.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/951febb68a080dd3df37dbd1117ba20f.jpg",
              "smallIcon": "",
              "count": 114,
              "isVertical": 0
            },
            {
              "cate1Id": 97,
              "cate2Id": 51,
              "cate2Name": "张小花7",
              "shortName": "footballgame",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/6527c4b35ca70ecee934835015e39d0e.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/d655db746e4be4dcba12a7e66338eed6.png",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/65479a0d24b8746840cc7639fab82978.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/9e8c769e706c18b14631eab0378d2a16.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/7d63db370f4b5121ba0d879fb6be013e.jpg",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 134,
              "cate2Id": 2137,
              "cate2Name": "主播招募二级分类2",
              "shortName": "sdf",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/6f28fbbc404dbd9311f2e392500485c8.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/16722e1b14b20f5466fc8dc979497253.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/4a6ce51d90a88cc7c8012e91a90b257c.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/285a8f700e8e9b18b165c9d1536aa552.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/efc8db6595eb69ca09c17784637e9c5f.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/01a5d71f336cb3fb63d9c4ebda7505c2.jpg",
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
          "cate1Name": "cl一级分类非秀场是手游音频直播",
          "shortName": "clcate1",
          "cate2Info": [
            {
              "cate1Id": 151,
              "cate2Id": 2164,
              "cate2Name": "clcate2001正常分类",
              "shortName": "clcate2001",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/1544f3b15642eb2861f3612506fedc5e.png",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/e2f831851db7abfebcc4f5d5b7840d0b.png",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/91384373c52d93c7d407343deef45af1.jpg",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 151,
              "cate2Id": 2165,
              "cate2Name": "clcate2002隐藏的分类",
              "shortName": "clcate2002",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/82339544b19081ffe0d6b902a67e97a2.png",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/09061743004a20faa8e816220fe66e90.png",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/1d180ae51ee1b178b120b346b6b53a18.jpg",
              "count": 0,
              "isVertical": 0
            }
          ]
        },
        {
          "cate1Id": 152,
          "cate1Name": "cl一级分类是秀场非手游音频直播",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/61b4127063aba2ab651b5b5e6ccc78e3.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/35777127d536d53229de0c84f213d293.jpg",
              "smallIcon": "",
              "count": 0,
              "isVertical": 0
            },
            {
              "cate1Id": 15,
              "cate2Id": 2142,
              "cate2Name": "分类通知测试二级1",
              "shortName": "fltxzcej",
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/e5c2844fdb3426ec11dc9e0e0fda255d.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/919cf2f7828707c0f2605909e6b3da36.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/game_cate/40dbf46bd6b2e828122f014c070a3db2.jpg",
              "icon": "https://live.dz11.com/upload/game_cate/733d43b1891fc262ba3a314695f16920.jpg",
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
              "pic": "https://ceph-dev-pub.dz11.com/dycatr/84b45194b14312bac99e6d7682a96bbc.jpg",
              "icon": "https://ceph-dev-pub.dz11.com/dycatr/5d1e890bad067f4b78caeef95a1e4a72.jpg",
              "smallIcon": "https://ceph-dev-pub.dz11.com/dycatr/9806534844cb16824bebeb6c0afb06e4.jpg",
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