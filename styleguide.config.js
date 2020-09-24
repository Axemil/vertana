const path = require("path");

module.exports = {
	components: "src/components/**/*.tsx",
	ignore: ["**/pages/**/*.*"],
	// sections: [
	// 	{
	// 		name: "Colors",
	// 		components: "src/components/colors/**/*.tsx",
	// 	},
	// 	{
	// 		name: "Typography",
	// 		components: "src/components/typography/**/*.tsx",
	// 	},
	// 	{
	// 		name: "MainMenu",
	// 		components: "src/app/MainMenu/index.tsx",
	// 	},
	// 	{
	// 		name: "Search",
	// 		components: "src/components/search/**/*.tsx",
	// 	},
	// 	{
	// 		name: "Sidebar",
	// 		components: "src/components/sidebar/**/*.tsx",
	// 	},
	// 	{
	// 		name: "Buttons",
	// 		components: "src/components/buttons/**/*.tsx",
	// 	},
	// 	{
	// 		name: "Graphics",
	// 		components: "src/components/graphics/**/*.tsx",
	// 	},
	// ],
	moduleAliases: {
		components: path.resolve(__dirname, "src/components"),
		app: path.resolve(__dirname, "src/app"),
		common: path.resolve(__dirname, "src/common"),
		assets: path.resolve(__dirname, "src/assets"),
	},
	theme: {
		maxWidth: "100%",
	},
	styleguideComponents: {
		Wrapper: path.join(__dirname, "src/styleguide/StyleGuideWrapper"),
	},
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.ts(x?)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "ts-loader",
						},
					],
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env", "@babel/preset-react"],
						},
					},
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf|png|jpg)$/,
					use: ["file-loader"],
				},
				{
					test: /\.svg$/,
					use: ["@svgr/webpack", "url-loader"],
				},
			],
		},
		resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
	},
};
