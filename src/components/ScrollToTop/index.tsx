import { useEffect, ReactElement } from "react";
import { useLocation } from "react-router-dom";

interface Props {}

export default function ScrollToTop({}: Props): ReactElement {
	const { pathname, search } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname, search]);

	return null;
}
