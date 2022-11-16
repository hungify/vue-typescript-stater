<script lang="ts" setup>
import type { SVGAttributes } from 'vue';
import type { IconComponentName } from '~/interfaces/icons';

interface IconProps extends SVGAttributes {
  name: IconComponentName;
  animation?: 'spin' | 'pulse' | 'bounce' | 'none';
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

const props = withDefaults(defineProps<IconProps>(), {
  name: 'Tooling',
  stroke: 'currentColor',
  fill: 'none',
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: '2',
  animation: 'none',
  animationSpeed: 'normal',
});

const currentIcon = computed(() =>
  defineAsyncComponent({
    loader: () => import(`./icons/Icon${props.name}.vue`),
    delay: 200,
    timeout: 3000,
    suspensible: true,
  }),
);
const attrs = useAttrs();

const $style = useCssModule();

const classes = computed(() => {
  return [
    $style['icon'],
    $style[`icon--${props.animation}`],
    $style[`icon--${props.animationSpeed}`],
  ];
});
</script>

<template>
  <component :is="currentIcon" :class="classes" v-bind="attrs" />
</template>

<style module>
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.icon {
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
