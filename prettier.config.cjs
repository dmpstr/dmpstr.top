module.exports = {
	useTabs: true,
	singleQuote: false,
	trailingComma: "es5",
	printWidth: 110,
	tailwindFunctions: ["tv"],
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
