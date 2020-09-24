import { useLocation } from "react-router-dom";
import { parseQueryStr } from "util/helpers";

export function useSearchQuery<T>() {
	const { search: query } = useLocation();
	return parseQueryStr<T>(query);
}
