import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "assets/svg/search.svg";
import { ReactComponent as CrossIcon } from "assets//svg/cross.svg";
import Colors from "common/Colors";

const Wrapper = styled.div`
	display: block;
	position: relative;
	width: 18px;
	height: 18px;

	.icon {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transition: color 0.2s;
		transform: translate(-50%, -50%);
		color: ${Colors.Gray900};
		cursor: pointer;

		&:hover {
			color: ${Colors.GreenDark};
		}
	}
`;

interface Props {
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;

	/** Toggle button icon on click (true) or just show one icon (false) */
	toggleIcon?: boolean;
}

export default function SearchButton({
	className,
	toggleIcon = true,
	onClick,
}: Props): ReactElement {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		setIsOpen(!isOpen);
		onClick && onClick(e);
	};

	return (
		<Wrapper onClick={handleClick} className={className}>
			<button className="visually-hidden" type="button">
				Search
			</button>
			{(toggleIcon && isOpen && <CrossIcon className="icon" />) || (
					<SearchIcon className="icon" />
				) || <SearchIcon className="icon" />}
		</Wrapper>
	);
}
