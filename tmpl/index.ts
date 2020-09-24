import { readFile, writeFile } from "fs";
import { resolve } from "path";
import { JSDOM } from "jsdom";
import yargs from "yargs";
import { log } from "console";
import { getStringFromHtml, writeStringToFile } from "./helpers";
import { ParsedDocument } from "./ParsedDocument";

const argv = yargs.options({
	page: {
		type: "string",
		demandOption: true,
	},
	prerendered: {
		type: "string",
		demandOption: true,
	},
	outputPath: {
		type: "string",
		demandOption: true,
	},
}).argv;

/** Start file for prerendering */
const prerenderedPath = resolve(__dirname, argv.prerendered, "index.html");

/** Main page template */
const mainSrcPath = resolve(__dirname, argv.outputPath, "src/home.php");
const mainDestPath = resolve(__dirname, argv.outputPath, "home.php");

/** Post page template */
const postSrcPath = resolve(__dirname, argv.outputPath, "src/single-post.php");
const postDestPath = resolve(__dirname, argv.outputPath, "single-post.php");

/** Header */
const headerSrcPath = resolve(
	__dirname,
	argv.outputPath,
	"src/header-blog.php",
);
const headerDestPath = resolve(__dirname, argv.outputPath, "header-blog.php");

(async () => {
	const prerenderedStr = (await getStringFromHtml(prerenderedPath)) as string;
	const prerenderedDoc = new ParsedDocument(prerenderedStr);
	const style = prerenderedDoc.getStyle();
	const content = prerenderedDoc.getAppRoot();

	let tmplStr;
	let destPath;
	if (argv.page === "main") {
		tmplStr = (await getStringFromHtml(mainSrcPath)) as string;
		destPath = mainDestPath;
	} else if (argv.page === "post") {
		tmplStr = (await getStringFromHtml(postSrcPath)) as string;
		destPath = postDestPath;
	}
	const destStr = tmplStr.replace("<!-- replace -->", content);
	writeStringToFile(destPath, destStr);

	const headerTmplStr = (await getStringFromHtml(headerSrcPath)) as string;
	const headerStr = headerTmplStr.replace("<!-- replace -->", `${style}` || "");
	writeStringToFile(headerDestPath, headerStr);
})();
