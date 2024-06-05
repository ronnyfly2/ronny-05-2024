<script setup lang="ts">
const props = defineProps<{
  types: { type: { name: string } }[];
}>();
</script>
<template>
  <div class="flex gap-2 mb-4">
    <span
      class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
      v-for="(itm, indx) in props.types"
      :key="indx"
    >{{ itm.type.name }}</span>
  </div>
</template>