export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export function setTheme(theme: Theme) {
	if (theme === "light") {
		document.documentElement.classList.remove("dark");
		localStorage.setItem("theme", "light");
	} else if (theme === "dark") {
		document.documentElement.classList.add("dark");
		localStorage.setItem("theme", "dark");
	} else {
		// if no theme is selected, check the system preference
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
	}
}

export function getTheme(): ResolvedTheme {
	const theme = localStorage.getItem("theme")! as ResolvedTheme;

	return theme;
}
