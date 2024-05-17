<script setup lang="ts">
  const props = defineProps<{
    stat: any;
  }>();
</script>
<template>
  <div class="mb-2 flex justify-between items-center">
    <h3 class="text-sm font-semibold text-gray-800 dark:text-white">{{ props.stat.stat.name }}</h3>
    <span class="text-sm text-gray-800 dark:text-white">{{ props.stat.base_stat }}</span>
  </div>
  <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" :aria-valuenow="props.stat.base_stat" aria-valuemin="0" aria-valuemax="100">
    <div class="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500" :style="`width: ${props.stat.base_stat}%`"></div>
  </div>
</template>