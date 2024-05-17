<script setup lang="ts">
import { ref, onMounted } from "vue";
import MainSidebar from "@/components/Layouts/MainSidebar.vue";
import AlertsTop from "@/components/AlertsTop.vue";

const isLogin = ref(false)

onMounted(() => {
  document.body.classList.add("bg-body-secondary");
  isLogin.value = true
})
</script>
<template>
  <div class="main-content d-flex flex-column transition overflow-hidden pt-20 pb-12">
    <AlertsTop />
    <MainSidebar />
    <RouterView />
  </div>
</template>