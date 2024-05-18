import type { Component } from "vue";

export interface ProjectTechnologies {
	name: string;
	url: string;
	icon: Component;
}

export interface Project {
	name: string;
	description: string;
	url: string;
}

export const projects: Project[] = [
	{
		name: "Kanging at 25:00",
		description: "A kernel project/buildbotting group",
		url: "https://t.me/kangingat25",
	},
];
