<script setup lang="ts">
  import MainSidebar from "@/components/Layouts/MainSidebar.vue";
  import AlertsTop from "@/components/AlertsTop.vue";
</script>
<template>
  <div class="main-content d-flex flex-column overflow-hidden pt-20 pb-12">
    <AlertsTop />
    <MainSidebar />
    <router-view />
  </div>
</template>