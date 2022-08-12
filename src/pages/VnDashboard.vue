<template>
  <div class="full-width q-gutter-y-sm">
    <div class="flex flex-center q-gutter-sm">
      <q-badge v-for="(v, k) in badgeArr" :key="k" :color="v.color" :label="v.label" />
    </div>
    <div class="flex flex-center column full-width">
      <vn-chat chart-name="24h流量(GB)" :chart-data="latest24h" :width="cusWidth()" />
      <vn-chat chart-name="日流量(GB)" :chart-data="latest30d" :width="cusWidth()" :height="500" />
      <div class="flex flex-center no-warp q-gutter-x-sm">
        <vn-chat chart-name="Top10天流量(GB)" :chart-data="top10d" :width="cusWidth(0.4)" :height="300" />
        <vn-chat chart-name="月流量(GB)" :chart-data="latestMonth" :width="cusWidth(0.3)" :height="300"/>
        <!-- <vn-chat chart-name="年流量(GB)" :chart-data="latestYear" :width="400" /> -->
      </div>
    </div>
  </div>
</template>

<script>/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/08/10
 */
'use strict'

import { getDateTime, getTraffic } from 'src/utils/vn_utils'
import VnChat from 'components/VnChart'
import * as Utils from 'src/utils/chart_utils'

export default {
  name: 'VnDashboard',
  components: { VnChat },
  props: {
    interfaceData: {
      type: Object,
      required: true,
    },
    cTime: {
      type: String,
      required: true,
    },
    uTime: {
      type: String,
      required: true,
    },
  },
  computed: {
    latest24h() {
      let arr = this.interfaceData?.traffic.hour.slice(-24) || []
      let res = this.getData(arr, 'DD-HH')
      res = this.additionDs(res, true)
      return res
    },
    latest30d() {
      let arr = this.interfaceData?.traffic.day.slice(-30) || []
      let res = this.getData(arr, 'MM/DD')
      res = this.additionDs(res, false)
      return res
    },
    top10d() {
      let arr = this.interfaceData?.traffic.top.slice(-10) || []
      let res = this.getData(arr, 'MM/DD')
      res.labels = res.labels.reverse()
      for (let i = 0; i < res.datasets.length; i++) {
        res.datasets[i].data = res.datasets[i].data.reverse()
      }
      res = this.additionDs(res, true)
      // res.datasets.
      return res
    },
    latestMonth() {
      let arr = this.interfaceData?.traffic.month || []
      let res = this.getData(arr, 'YYYY/MM')
      res = this.additionDs(res, false)
      return res
    },
    latestYear() {
      let arr = this.interfaceData?.traffic.year || []
      let res = this.getData(arr, 'YYYY')
      res = this.additionDs(res, false)
      return res
    },
    badgeArr() {
      return [`安装时间: ${this.cTime}`,
      `更新时间: ${this.uTime}`,
      `接口总上传: ${getTraffic(this.interfaceData.traffic.total.tx)}`,
      `接口总下载: ${getTraffic(this.interfaceData.traffic.total.rx)}`,
      ].map(r => {
        return {
          label: r,
          color: 'teal',
        }
      })
    },
  },
  methods: {
    formatTraffic(arr, format = 'YYYY/MM/DD') {
      return arr.map(r => {
        return {
          tx: getTraffic(r.tx, false),
          rx: getTraffic(r.rx, false),
          label: getDateTime(r, format)
        }
      })
    },
    getDatasets(data, label = '上传', key = 'tx', color = Utils.CHART_COLORS.blue, type = 'bar') {
      return {
        type, label,
        data: data.map(_ => _[key]),
        borderColor: color,
        backgroundColor: Utils.transparentize(color, 0.5),
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      }
    },
    getData(traffic, format = 'YYYY/MM/DD') {
      const data = this.formatTraffic(traffic, format)
      const labels = data.map(_ => _.label)
      const datasets = []
      datasets.push(this.getDatasets(data, '上传', 'tx', Utils.CHART_COLORS.blue))
      datasets.push(this.getDatasets(data, '下载', 'rx', Utils.CHART_COLORS.red))
      return {
        labels,
        datasets,
      }
    },
    cusWidth(fac = 0.8, min = 0, maxFac = 0.8) {
      const dy = Math.floor(window.innerWidth * fac)
      const maxWidth = Math.floor(window.innerWidth * maxFac)
      return min === 0 ? dy : Math.max(Math.max(dy, min), maxWidth)
    },
    additionDs(origin, count = false) {
      let res = origin
      let i = 0
      if (count) {
        const data = []
        const color = Utils.CHART_COLORS.yellow
        origin.datasets[0].data.forEach(tx => {
          data.push(tx + origin.datasets[1].data[i])
          i++
        })
        res.datasets.push({
          type: 'line', label: '总流量', data,
          borderColor: color,
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          borderSkipped: false,
        })
      } else {
        const [tx, rx] = [[], []]
        let [acc1, acc2] = [0, 0]
        origin.datasets[0].data.forEach(t => {
          acc1 += t
          acc2 += origin.datasets[1].data[i]
          i+=1
          tx.push(acc1)
          rx.push(acc2)
        })
        const txColor = Utils.CHART_COLORS.blue_1
        const rxColor = Utils.CHART_COLORS.blue_5
        res.datasets.push({
          type: 'line', label: '上传总流量', data: tx,
          borderColor: txColor,
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          borderSkipped: false,
        })
        res.datasets.push({
          type: 'line', label: '下载总流量', data: tx,
          borderColor: rxColor,
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          borderSkipped: false,
        })
      }
      return res
    }
  },
}
</script>

<style scoped>
</style>
