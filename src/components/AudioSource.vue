<script setup lang="ts">
  import { ref } from "vue"

  const audioRef = ref()
  const controls = ref()
  const iconPlay = ref(`<svg class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
  </svg>`)
  const iconPause = ref(`<svg class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
  </svg>`)

  const playAudio = (audioSrc: string | undefined) => {
    const audio = audioRef.value
    const playerButton = controls.value.querySelector('.player-button')
    audio.src = audioSrc
    if (audio.paused) {
      audio.play()
      playerButton.innerHTML = `${iconPause.value}`
    }
  }

  const ended = () => {
    const playerButton = controls.value.querySelector('.player-button')
    playerButton.innerHTML = `${iconPlay.value}`
  }

  const props = defineProps<{
    audioSrc: string | undefined
  }>()
</script>
<template>
  <div class="audio-player">
    <audio ref="audioRef" controls class="w-full" :src="props.audioSrc" type="audio/ogg" @ended="ended"></audio>
    <div ref="controls" class="controls">
      <button class="player-button" @click="playAudio(props.audioSrc)">
        <div v-html="iconPlay"></div>
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.audio-player {
  --player-button-width: 3em;
  --sound-button-width: 2em;
  --space: .5em;
  width: 3rem;
  height: 3rem;
  audio{
    display: none;
  }
  .controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
  .player-button {
    background-color: transparent;
    border: 0;
    width: var(--player-button-width);
    height: var(--player-button-width);
    cursor: pointer;
    padding: 0;
  }
}
</style>