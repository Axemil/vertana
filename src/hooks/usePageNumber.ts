import { useParams } from "react-router-dom";
import { useState } from "react";

export const usePageNumber = (): number => {
	const { pageNumber } = useParams<{ pageNumber: string }>();
	let page = parseInt(pageNumber);
	page = !page || page <= 0 ? 1 : page;
	return page;
};

export function useImageOnLoad(imageUrl: string): boolean {
	const [loaded, setLoaded] = useState(false);
	const img = new Image();
	img.onload = () => setLoaded(true);
	img.src = imageUrl;
	return loaded;
}
