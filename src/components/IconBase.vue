<script lang="ts" setup>
import type { SVGAttributes } from 'vue'
import type { IconComponentName } from '#/interfaces/icons'

defineOptions({
  inheritAttrs: true
})

interface IconProps extends /* @vue-ignore */ SVGAttributes {
  name: IconComponentName
  animation?: 'spin' | 'pulse' | 'bounce' | 'none'
  animationSpeed?: 'slow' | 'normal' | 'fast'
}

const props = withDefaults(defineProps<IconProps>(), {
  stroke: 'currentColor',
  fill: 'none',
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: '2',
  animation: 'none',
  animationSpeed: 'normal'
})

const currentIcon = computed(() =>
  defineAsyncComponent({
    loader: () => import(`./icons/Icon${props.name}.vue`),
    delay: 200,
    timeout: 3000,
    suspensible: true
  })
)

const classes = computed(() => ({
  ['icon-base']: true,
  [`icon--${props.animation}`]: true,
  [`icon--${props.animationSpeed}`]: true
}))
</script>

<template>
  <Component :is="currentIcon" :class="classes" />
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.icon-base {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  user-select: none;
}
.icon--spin {
  animation: spin 2s linear infinite;
}
.icon--pulse {
  animation: spin 2s infinite steps(8);
}
.icon--slow {
  animation-duration: 3s;
}
.icon--fast {
  animation-duration: 1s;
}
</style>
