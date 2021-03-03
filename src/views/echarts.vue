<template>
  <div>
    <div>
      <el-button class="language-box" type="text" @click="changeLanguage">{{
        language
      }}</el-button>
      <el-button>{{ $t("server") }}</el-button>
    </div>
    <div class="radios radio_server">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
      >
        <el-form-item label="租户选择">
          <el-select
            size="mini"
            v-model="servermodal"
            style="width: 15%;"
            placeholder="请选择租户"
            @change="getServe"
          >
            <el-option value="ALL" label="全部"></el-option>
            <el-option value="ZU1" label="租户1"></el-option>
            <el-option value="ZU2" label="租户2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="radios">
      <el-radio-group v-model="radio1" size="small">
        <el-radio-button label="1">核心OpenAPI调用数量</el-radio-button>
        <el-radio-button label="2">业务关注数据</el-radio-button>
        <el-radio-button label="3">系统运维能力</el-radio-button>
      </el-radio-group>
    </div>
    <div
      style="width:600px; text-align:center;"
      class="echarts-title"
      v-show="radio1 === '1'"
    >
      核心OpenAPI调用数量
    </div>
    <div
      id="main1"
      style="width:600px;height:390px;"
      v-show="radio1 === '1'"
    ></div>
    <div
      id="main2"
      style="width:600px;height:400px;"
      v-show="radio1 === '2'"
    ></div>
    <div
      id="main3"
      style="width:600px;height:400px;"
      v-show="radio1 === '3'"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      language: "",
      labelPosition: "top",
      formLabelAlign: {
        name: ""
      },
      servermodal: "",
      list: [],
      radio1: "3",
      row: 3,
      datasetWithFilters: [],
      seriesList: [],
      xAxisList: [
        {
          name: "权限数据调用数量",
          data: []
        },
        {
          name: "流程启动调用数量",
          data: []
        },
        {
          name: "流程审批调用数量",
          data: []
        },
        {
          name: "查询待办调用数量",
          data: []
        },
        {
          name: "查询已办调用数量",
          data: []
        },
        {
          name: "流程查询调用数量",
          data: []
        },
        {
          name: "发送邮件接口调用数量",
          data: []
        },
        {
          name: "敏感词过滤接口调用数量",
          data: []
        }
      ],
      xAxisList2: [
        {
          name: "流程实例产生数量",
          data: 0
        },
        {
          name: "发送邮件数量",
          data: 0
        },
        {
          name: "定时任务启动数量",
          data: 0
        }
      ],
      xAxisList3: [
        {
          value: 335,
          name: this.$t("sheng")
        },
        {
          value: 1713,
          name: this.$t("use")
        }
      ]
    };
  },
  mounted() {
    this.getServe();
    this.creatLine3();
    this.language =
      localStorage.getItem("lang") === "zh" ? "English" : "简体中文";
  },
  methods: {
    changeLanguage() {
      if (this.language === "English") {
        this.language = "简体中文";
        this.$store.commit("switchLanguage", "en");
      } else {
        this.language = "English";
        this.$store.commit("switchLanguage", "zh");
      }
      location.reload();
    },
    getRanDom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    setData() {
      this.xAxisList.forEach(res => {
        res.data = [];
        for (let i = 0; i < 12; i++) {
          res.data.push(this.getRanDom(1, 1000));
        }
      });

      this.xAxisList2.forEach(res => {
        res.data = this.getRanDom(1, 500);
      });

      this.xAxisList3.forEach(res => {
        res.value = this.getRanDom(1, 2000);
      });

      this.creatLine1();
      this.creatLine2();
      this.creatLine3();
    },
    getServe() {
      this.setData();
    },
    getGridTop(legendData) {
      const DEFAULT_LINE_NUM = 6; // 采用默认grid.top值的默认线条数目；
      const DEFAULT_GRID_TOP_PECENTAGE = 18; // 默认的grid.top百分比（整数部分）；
      const DELTA_GRID_TOP_PECENTAGE = 5; // 超出默认线条数时的grid.top百分比增量（整数部分）；
      const MAX_GRID_TOP_PECENTAGE = 20; // 最大的grid.top百分比（整数部分）；

      var topInt;
      var gridTop;
      var len = legendData.length;

      // 如果图例太多，需要调整option中的grid.top值才能避免重叠
      topInt =
        len > DEFAULT_LINE_NUM
          ? DEFAULT_GRID_TOP_PECENTAGE +
            DELTA_GRID_TOP_PECENTAGE *
              Math.ceil((len - DEFAULT_LINE_NUM) / this.row)
          : DEFAULT_GRID_TOP_PECENTAGE;

      if (topInt >= MAX_GRID_TOP_PECENTAGE) {
        topInt = MAX_GRID_TOP_PECENTAGE;
      }
      gridTop = topInt + "%";
      return gridTop;
    },
    adjustLegendData(legendData) {
      let processLegend = [];
      // 调整图例显示样式 {图例太多时，Echarts文档注明: 特殊字符串 ''（空字符串）或者 '\n' (换行字符串)用于图例的换行。}
      for (let i = 0, j = 0; i < legendData.length; i++, j++) {
        // 设置一行显示6个图标
        if (i % this.row == 0) {
          processLegend.push("");
        }
        processLegend.push(legendData[i]);
      }
      return processLegend;
    },
    creatRcharts(id, option) {
      this.$echarts.init(document.getElementById(id)).setOption(option);
    },
    // 折线图
    creatLine1() {
      let xAxis_data = [];
      let series_data = [];
      this.xAxisList.forEach(res => {
        xAxis_data.push(res.name);
        series_data.push({
          name: res.name,
          type: "line",
          stack: "总量",
          data: res.data
        });
      });

      const gridtop = this.getGridTop(xAxis_data);
      const datalegend = this.adjustLegendData(xAxis_data);

      // 修改grid.top的值
      const option = {
        // title: {
        //   text: '核心OpenAPI调用数量',
        //   top: '-5px',
        //   textVerticalAlign: 'middle'
        // },
        tooltip: {
          trigger: "axis",
          // 内容过多时进行换行处理
          formatter: function(params) {
            let res = params[0].axisValueLabel;

            function getHtml(param) {
              let str =
                '<div style="float: left"><span style="background: ' +
                param.color +
                '; width: 11px; height: 11px; border-radius: 11px;float: left; margin: 5px 3px;"></span>' +
                param.seriesName +
                ":" +
                param.data +
                "&emsp;&emsp;</div>";
              return str;
            }
            let flag = false;
            res += '<div style="clear: both">';
            for (let i = 0; i < params.length; i++) {
              res += getHtml(params[i]);
              if (params.length > 11 && i % 2 == 1) {
                res += '</div><div style="clear: both">';
              }
              if (params.length <= 11) {
                res += '</div><div style="clear: both">';
              }
            }
            res += "</div>";
            return res;
          }
        },
        legend: {
          data: datalegend
        },
        grid: {
          top: gridtop,
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: series_data
      };
      this.creatRcharts("main1", option);
    },
    // 柱状图
    creatLine2() {
      let xAxis_data = [];
      let series_data = [];
      this.xAxisList2.forEach(res => {
        xAxis_data.push(res.name);
        series_data.push(res.data);
      });
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: "业务关注数据",
          x: "center",
          y: "top",
          textAlign: "center"
        },
        grid: {
          x: 25,
          y: 45,
          x2: 51,
          y2: 20,
          borderWidth: 1,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: xAxis_data,
          axisLabel: {
            interval: 0, //坐标轴刻度标签的显示间隔(在类目轴中有效) 0:显示所有  1：隔一个显示一个 :3：隔三个显示一个...
            rotate: -20 //标签倾斜的角度，显示不全时可以通过旋转防止标签重叠（-90到90）
          }
        },
        yAxis: {
          type: "value",
          min: 0, // 起始
          max: 500 // 终止
        },
        series: [
          {
            type: "bar",
            barWidth: "50%",
            data: series_data,
            showBackground: true,
            // label: {
            //   normal: {
            //     formatter: '{c}个',
            //     textStyle: {
            //       fontWeight: 'normal',
            //       fontSize: 15
            //     }
            //   }
            // },
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = ["#C1232B", "#B5C334", "#FCCE10", "#E87C25"];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 16
                  }
                }
              }
            }
          }
        ]
      };
      this.creatRcharts("main2", option);
    },
    // 饼图
    creatLine3() {
      const option = {
        title: {
          text: "总日志存储量",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}Gb ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [this.$t("sheng"), this.$t("use")]
        },
        series: [
          {
            name: "总日志存储量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.xAxisList3,
            label: {
              normal: {
                formatter: "{b}:{d}%,约{c}Gb",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 12
                }
              }
            },
            labelLine: {
              // show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.creatRcharts("main3", option);
    }
  }
};
</script>

<style lang="scss">
.radios {
  transform: rotate(-90deg);
  position: absolute;
  right: -50px;
  top: 200px;
}
.radio_server {
  transform: rotate(0);
  left: 10px;
}

.echarts-title {
  font-weight: bold;
  font-size: 16px;
}
</style>
