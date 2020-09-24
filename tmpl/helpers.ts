import { readFile, writeFile } from "fs";
import { log } from "console";

/** Read prerendered html file to string */
async function getStringFromHtml(path: string) {
	return new Promise((res, rej) => {
		readFile(path, "utf8", (err, data) => {
			if (err) {
				rej(err);
			}
			res(data);
		});
	});
}

function writeStringToFile(path: string, content: string): void {
	writeFile(path, content, (err) => {
		if (err) return log(err);
		log("Successfully written: " + path);
	});
}

export { getStringFromHtml, writeStringToFile };
