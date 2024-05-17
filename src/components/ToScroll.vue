<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

const scrollComponent = ref()
const count = ref(0)

const emit = defineEmits<{
  (e: 'infinite'): void
}>()

const props = defineProps({
  showMore: { type: Boolean, default: true },
})

const handleScroll = () => {
    let element = scrollComponent.value
    count.value = element.getBoundingClientRect().bottom <= window.innerHeight ? count.value+1 : 0
    if(count.value === 1){
      emit("infinite")
    }
  }

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
})

</script>

<template>
  <div ref="scrollComponent">
    <slot/>
    <div v-if="props.showMore" class="overlay">
      <div class="pokemon"></div>
    </div>
  </div>
</template>
<style>
.overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.pokemon {
  position: relative;
  height: 100px;
  width: 100px;
  background: linear-gradient(to bottom, rgb(254, 0, 1) 50%, white 50% );
  border-radius: 50%;
  border: 8px solid black;
  animation: spin 1s linear infinite;
}

.pokemon::before {
  content: '';
  position: absolute;
  height: 8px;
  width: 100%;
  background: black;
  top: 43px;
  transform: translatey(-50%);
}

.pokemon::after {
  content: '';
  position: absolute;
  height: 38px;
  width: 38px;
  border-radius: 50%;
  background: white;
  top: 42px;
  left: 42px;
  transform: translate(-50%, -50%);
  box-shadow: inset 0 0 0 8px black, inset 0 0 0 10px white, inset 0 0 0 12px black;

}

/* Spin Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>