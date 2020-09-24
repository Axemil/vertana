import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import { ReactComponent as SvgButtonArrow } from "assets/svg/styled-button-arrow.svg";
import { ReactComponent as SvgButtonSearch } from "assets/svg/styled-button-search.svg";
import Colors from "common/Colors";
import Fonts from "common/Fonts";

const Wrapper = styled.div`
	position: relative;
	background-color: transparent;
	border-radius: 999px;
	box-sizing: border-box;
	height: 52px;

	.svg-button {
		box-sizing: border-box;
		display: inline-block;
		height: 52px;
		width: 62px;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
		color: ${Colors.GreenMedium};
	}
`;

const ArrowInput = styled.input`
	color: ${Colors.Gray700};
	background-color: ${Colors.White};
	border: none;
	border-radius: 999px;
	font-family: ${Fonts.Regular};
	font-size: 14px;
	line-height: 22px;
	padding: 13px 60px 13px 25px;
	width: 100%;
	height: 100%;

	&:focus {
		outline: none;
	}
`;

const SearchInput = styled(ArrowInput)`
	border: 1px solid ${Colors.Gray600};

	&:focus {
		outline: none;
		border-color: ${Colors.GreenDark};
	}
`;

interface Props {
	className?: string;
	placeholder?: string;
	onClick?: (e: React.SyntheticEvent) => void;
	onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
	value: string;
	type: "search" | "arrow";
	showButton?: boolean;
}

export default function StyledInput({
	className,
	value,
	onChange,
	onClick,
	placeholder,
	type,
	showButton = true,
}: Props): ReactElement {
	let input: ReactNode;
	let svgButton: ReactNode;

	if (type == "arrow") {
		input = <ArrowInput type="email" placeholder={placeholder} />;
		svgButton = <SvgButtonArrow className="svg-button" />;
	} else if (type === "search") {
		input = (
			<SearchInput
				onChange={onChange}
				value={value}
				placeholder={placeholder}
			/>
		);
		svgButton = <SvgButtonSearch onClick={onClick} className="svg-button" />;
	}

	return (
		<Wrapper className={className}>
			{input}
			<button className="visually-hidden" onClick={onClick} />
			{showButton && svgButton}
		</Wrapper>
	);
}
