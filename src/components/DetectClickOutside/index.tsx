import React, { useRef, useEffect, useState, ReactElement } from "react";
import PropTypes from "prop-types";

/**
 * Outside click detector wrapper component
 */

interface Props {
	className?: string;
	children: ((a: boolean) => ReactElement) | ReactElement;
}
export default function DetectClickOutside({ className, children }: Props) {
	const containerNode = useRef();
	const [isOutside, setIsOutside] = useState(false);

	const outsideClickHandler = (e) => {
		setIsOutside(!containerNode.current.contains(e.target));
	};

	useEffect(() => {
		document.addEventListener("mousedown", outsideClickHandler);
		return () => {
			document.removeEventListener("mousedown", outsideClickHandler);
		};
	}, []);

	return (
		<div className={className} ref={containerNode}>
			{typeof children === "function"
				? children(isOutside)
				: !isOutside && children}
		</div>
	);
}

DetectClickOutside.propTypes = {
	/** React component or Function that returns React component which shoul be watched for clicks outside of it
	 * (see examples below)
	 */
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};
