<script setup lang="ts">
import { cn } from "$lib/util/tailwind";

const props = defineProps({
	class: {
		type: String,
		default: "",
	},
	as: {
		type: String,
		default: "div",
	},
});
</script>

<template>
	<component :is="props.as" :class="cn('rounded-xl border bg-card text-card-foreground shadow', props.class)">
		<slot />
	</component>
</template>
