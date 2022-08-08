<template>
  <q-layout view="hhh lpr lFr">
    <q-header elevated>
      <q-toolbar>
        <q-avatar icon="flight_takeoff" />

        <q-toolbar-title>
          VnStat Dashboard
        </q-toolbar-title>

        <div>Github@IITII</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
