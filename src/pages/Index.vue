<template>
  <q-page class="flex flex-center full-width full-height">
    <div class="eighty-width">
      <q-input v-model="rawUrls" type="textarea"
               autogrow autofocus
               placeholder="VnStat Json 文件链接，以换行分隔" />
      <q-btn>提交</q-btn>
    </div>
    <q-separator />
    <div>
      <q-select value="1" label="VnStat Json 文件链接"
                :options="[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }]" />
      <q-select value="1" label="网络接口"
                :options="[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }]" />
    </div>
    <router-view />
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      rawUrls: "",
      cacheUrls: {}
    };
  },
  computed: {
    vnStatUrls() {
      return this.rawUrls ? this.rawUrls.split("\n") : [];
    }
  },
  methods: {
    fetchVnStat(url) {
      if (this.cacheUrls[url]) {
        return this.cacheUrls[url];
      }
      return this.$axios.get(url).then(res => {
        this.cacheUrls[url] = res.data;
        return res.data;
      });
    },
    fetchVnStatUrls() {
      return Promise.all(this.vnStatUrls.map(url => this.fetchVnStat(url)));
    }
  }
};
</script>
