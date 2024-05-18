<script setup lang="ts">
import { buttonVariants } from ".";
import { cn } from "$lib/util/tailwind";

interface Props {
	variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
	size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
	as?: string;
	id?: string;
	asChild?: boolean;
}

withDefaults(defineProps<Props>(), {
	as: "button",
});
</script>

<template>
	<component :is="as" :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')" :id="id">
		<slot />
	</component>
</template>
