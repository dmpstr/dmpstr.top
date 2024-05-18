<script setup lang="ts">
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "$components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-vue-next";
import { LINKS } from "$lib/config";
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger class="sm:hidden" asChild>
			<Button variant="ghost" class="w-9 px-0 !ring-0">
				<MenuIcon class="h-[1.2rem] w-[1.2rem]" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-28 !min-w-[unset]">
			<DropdownMenuItem v-for="link in LINKS" :key="link.link" class="h-7" asChild>
				<a :href="link.link" rel="preload">{{ link.name }}</a>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
