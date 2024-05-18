<script setup lang="ts">
import { setTheme, type Theme } from "$lib/util/theme";
import { MoonIcon, SunIcon } from "lucide-vue-next";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "$components/ui/dropdown-menu";

const COLOR_MODES = ["Light", "Dark", "System"];
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" class="h-9 w-9 px-0 !ring-0">
				<MoonIcon class="hidden h-[1.2rem] w-[1.2rem] dark:inline-block" />
				<SunIcon class="absolute inline-block h-[1.2rem] w-[1.2rem] dark:hidden" />
				<span class="sr-only">Toggle theme</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-28 !min-w-[unset]">
			<DropdownMenuItem
				v-for="colorMode in COLOR_MODES"
				:key="colorMode"
				class="h-7"
				@click="setTheme(colorMode.toLowerCase() as Theme)"
			>
				{{ colorMode }}
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
