import type { TransitionAnimationPair, TransitionDirectionalAnimations } from "astro";

export function slideFade(config: { delay: number | string }): TransitionDirectionalAnimations {
	const pair: TransitionAnimationPair = {
		old: {
			name: "slide-to-top",
			duration: "250ms",
			easing: "cubic-bezier(0.5, 0.7, 0.1, 1)",
			fillMode: "both",
		},
		new: {
			name: "slide-from-bottom",
			duration: "250ms",
			easing: "cubic-bezier(0.5, 0.7, 0.1, 1)",
			fillMode: "both",
		},
	};
	return {
		forwards: pair,
		backwards: {
			old: {
				...pair.new,
				name: "slide-to-bottom",
			},
			new: {
				...pair.old,
				name: "slide-from-top",
			},
		},
	};
}
