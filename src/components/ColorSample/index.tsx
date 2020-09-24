import React, { ReactElement, useMemo } from "react";
import styled from "styled-components";
import Colors from "common/Colors";

interface Props {
	/**
	 *  Sample color from styleguide
	 */
	color: Colors;
	textColor?: Colors;
	borderColor?: Colors;
}

const StyledDiv = styled.div<Props>`
	width: 135px;
	height: 135px;
	background-color: ${(props) => props.color};
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	color: ${(props) => props.textColor};
	font-family: Arial, Helvetica, sans-serif;
	border: 1px solid ${(props) => props.borderColor};
	box-sizing: border-box;

	.text {
		line-height: 2em;
	}
`;

export default function ColorSample({
	color,
	textColor,
	borderColor,
}: Props): ReactElement {
	// Get color name from enum and enum color value
	const colorName = useMemo(() => {
		const index = Object.values(Colors).indexOf(color);
		return Object.keys(Colors)[index];
	}, [color]);

	// Copy color name to clipboard
	const handleClick = () => {
		navigator.clipboard.writeText(colorName);
	};

	return (
		<StyledDiv
			onClick={handleClick}
			color={color}
			textColor={textColor || Colors.White}
			borderColor={borderColor || color}
		>
			<span className={"text"}>{color.toUpperCase()}</span>
			<span className={"text"}>{colorName}</span>
		</StyledDiv>
	);
}
