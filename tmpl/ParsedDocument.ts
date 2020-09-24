import { JSDOM } from "jsdom";
import { log } from "console";

export class ParsedDocument {
	protected document: Document;

	constructor(htmlStr: string) {
		this.document = new JSDOM(htmlStr).window.document;
	}

	getStyle() {
		const s = this.document.querySelector("style");
		return s ? s.innerHTML : "";
	}

	getAppRoot() {
		const rootTag = this.document.querySelector("#blog-root");
		if (rootTag) {
			return rootTag.innerHTML;
		}
		return "";
	}
}
