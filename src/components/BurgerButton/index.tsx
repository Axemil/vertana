import React, { ReactElement, useState } from "react";
import Colors from "common/Colors";
import styled from "styled-components";
import cx from "classnames";

const Button = styled.div`
	width: 20px;
	height: 20px;
	background-color: ${Colors.White};
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.3s ease-in;
	cursor: pointer;
	flex-shrink: 0;

	&.isOpen {
		transform: rotate(180deg);
	}

	.dash,
	.dash:before,
	.dash:after {
		width: 100%;
		height: 2px;
		background-color: ${Colors.Gray900};
		transition: transform 0.2s ease-in-out;
	}

	.dash:before,
	.dash:after {
		content: " ";
		display: block;
	}

	.dash:before {
		transform: translateY(-8px);
	}
	.dash:after {
		transform: translateY(8px);
	}

	&.isOpen .dash {
		background-color: transparent;
		&:before {
			transform: translateY(1px) rotate(45deg);
		}

		&:after {
			transform: translateY(-1px) rotate(135deg);
		}
	}
`;

interface Props {
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	className?: string;
}

export default function BurgerButton({
	onClick,
	className,
	...rest
}: Props): ReactElement {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		setIsOpen(!isOpen);
		onClick && onClick(e);
	};

	return (
		<Button
			onClick={handleClick}
			className={cx(className, isOpen && "isOpen")}
			{...rest}
		>
			<div className="dash"></div>
		</Button>
	);
}
