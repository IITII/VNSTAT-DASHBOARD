<template>
  <q-page class="flex flex-center full-width column wrap">
    <div class="q-pa-md column q-gutter-y-md eighty-width">
      <q-input class="col" v-model="input.rawUrls" type="textarea"
               autogrow autofocus outlined
               placeholder="VnStat Json 文件链接，以换行分隔" />
      <q-btn class="col" dense color="primary" @click="reCalcCacheUrls">提交</q-btn>
      <q-select class="col-6" label="VnStat Json 文件链接"
                :disable="urlOpts.length === 0"
                v-model="selectUrl" :options="urlOpts" />
      <q-select class="col-6" label="网络接口"
                :disable="interfaceOpts.length === 0"
                v-model="selectInf" :options="interfaceOpts" />
    </div>
    <div class="column eighty-width">
      <vn-dashboard v-if="interfaceData"
                    :interfaceData="interfaceData"
                    :c-time="cTime" :u-time="uTime" />
    </div>
  </q-page>
</template>

<script>
import VnDashboard from 'pages/VnDashboard'
import { getDateTime } from 'src/utils/vn_utils'

export default {
  name: 'PageIndex',
  components: { VnDashboard },
  data() {
    return {
      input: {
        rawUrls: '',
      },
      // select
      selectUrl: '',
      selectInf: '',
      cacheUrls: {},
      cacheKey: 'vnstat_cache_urls',
    }
  },
  computed: {
    urlOpts() {
      if (!this.cacheUrls) return []
      return [...Object.keys(this.cacheUrls)]
      // return [...Object.keys(this.cacheUrls)].map(_ => {
      //   return {
      //     value: _,
      //     label: _,
      //   }
      // })
    },
    interfaceOpts() {
      const json = this.cacheUrls[this.selectUrl]?.data
      if (!json) return []
      const version = json['jsonversion']
      if (!(version && parseInt(version) > 1)) {
        this.$q.notify({
          message: `VnStat Json 文件版本不支持: ${version}`,
          type: 'warning',
        })
        return []
      } else {
        return json.interfaces.map(_ => _.name)
      }
    },
    interfaceData() {
      if (this.urlOpts.length === 0 || this.interfaceOpts.length === 0) return undefined
      let json = this.cacheUrls[this.selectUrl]
      return json.data.interfaces.find(_ => _.name === this.selectInf)
    },
    cTime() {
      if (!this.interfaceData) return ''
      return getDateTime(this.interfaceData.created, 'YYYY/MM/DD')
    },
    uTime() {
      const j = this.interfaceData
      if (!j) return ''
      return getDateTime(j.updated, 'YYYY/MM/DD HH:mm')
    },
  },
  methods: {
    reCalcCacheUrls() {
      const reUrls = this.input.rawUrls
        ? this.input.rawUrls.split('\n').filter(_ => _.startsWith('http'))
        : []
      if (reUrls.length === 0) {
        return this.$q.notify({
          // message: '请填写有效HTTP链接',
          caption: '请填写有效HTTP链接',
          type: 'warning',
        })
      }
      let res = {}
      reUrls.forEach(u => {
        const o = this.cacheUrls[u]
        if (o) {
          res[u] = JSON.parse(JSON.stringify(o))
        } else {
          res[u] = {
            loaded: false,
            data: undefined,
          }
        }
      })
      this.cacheUrls = res
      if (!this.selectUrl || reUrls.indexOf(this.selectUrl) < 0) {
        this.selectUrl = reUrls[0]
      }
    },
    fetchUrl(url) {
      this.$log.debug(typeof url, url)
      const c = this.cacheUrls[url] || {}
      if (c.loaded) {
        return c.data
      }
      this.$q.loading.show({
        message: `请求: ${url} 中...`,
      })
      return this.$axios.get(url).then(res => {
        // debugger
        const d = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
        c.loaded = true
        c.data = d
        this.cacheUrls[url] = c
        return d
      }).catch(e => {
        return this.$q.notify({
          message: 'URL 加载失败',
          caption: e.message,
          type: 'error',
        })
      }).finally(() => {
        this.$q.loading.hide()
      })
    },
    saveToCache(v) {
      this.$q.localStorage.set(this.cacheKey, v)
    },
    // fetchVnStatUrls() {
    //   return Promise.all(this.vnStatUrls.map(url => this.fetchVnStat(url)))
    // },
  },
  watch: {
    async selectUrl(v) {
      this.$log.debug(typeof v, v)
      await this.fetchUrl(this.selectUrl)
      this.selectInf = this.interfaceOpts[0] || ''
    },
    async selectInf(v) {
      this.$log.debug(typeof v, v)
      this.saveToCache(this.input.rawUrls)
    },
  },
  mounted() {
    const v = this.$q.localStorage.getItem(this.cacheKey)
    this.$log.debug('afterMount', v)
    if (v) {
      this.input.rawUrls = v
      this.reCalcCacheUrls()
    }
  },
}
</script>
