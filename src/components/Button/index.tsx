import React, { ReactElement, ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import Colors from "common/Colors";
import rightArrow, {
	ReactComponent as RightArrow,
} from "assets/svg/right-arrow.svg";
import Fonts from "common/Fonts";
import Media from "common/Media";
import { ReactComponent as SvgButtonArrow } from "assets/svg/styled-button-arrow.svg";

const GenericButton = styled.a`
	white-space: nowrap;
	overflow: hidden;
	display: inline-block;
	font-family: ${Fonts.Bold};
	font-size: 12px;
	border-radius: 999px;
	position: relative;
	cursor: pointer;
	vertical-align: middle;

	.svg-icon {
		position: absolute;
		height: 100%;
		width: 65px;
		color: ${Colors.GreenDark};
		top: 0;
		right: 0;
		transition: color 0.2s ease-in;
	}
`;

const PrimaryButton = styled(GenericButton)`
	font-size: 14px;
	line-height: 22px;
	padding: 17px 75px 17px 25px;
	background-color: ${Colors.GreenMedium};
	color: ${Colors.White};
	/* background-image: linear-gradient(
		105.5deg,
		transparent calc(100% - 55px),
		${Colors.GreenDark} calc(100% - 55px)
	); */
	transition: background-color 0.2s ease-in;

	&:hover {
		background-color: ${Colors.GreenDark};
	}
`;

const SecondaryButton = styled(GenericButton)`
	border: 2px solid ${Colors.GreenMedium};
	padding: 12px 40px 12px 10px;
	color: ${Colors.GreenMedium};
	transition: transform 0.2s ease-in, background-color 0.2s ease-in,
		color 0.2s ease-in, border-color 0.2s ease-in;
	background-color: ${Colors.White};
	background-image: linear-gradient(
		103deg,
		transparent calc(100% - 30px),
		${Colors.GreenLight} calc(100% - 30px)
	);

	&:hover {
		background-color: ${Colors.GreenLight};
		border-color: ${Colors.GreenDark};
		color: ${Colors.GreenDark};
	}

	.icon {
		color: ${Colors.GreenMedium};
	}

	&:hover .icon {
		color: ${Colors.GreenDark};
	}
`;

type ButtonType = "primary" | "secondary";

interface Props {
	/** Type of the button, one of: "primary" | "secondary" */
	type: ButtonType;

	children: ReactNode;

	className?: string;

	/** scale button when it is hovered over */
	scaleOnHover?: boolean;

	/** Turn on shaddow underneath */
	dropShadow?: boolean;

	href?: string;

	onClick: (e: React.SyntheticEvent) => void;
}

function Button({
	type,
	className,
	children,
	onClick,
	...rest
}: Props): ReactElement {
	switch (type) {
		case "primary":
			return (
				<PrimaryButton onClick={onClick} className={className} {...rest}>
					{children}
					<SvgButtonArrow className="svg-icon" />
					{/* <RightArrow className="icon" /> */}
				</PrimaryButton>
			);
		case "secondary":
			return (
				<SecondaryButton className={className} {...rest}>
					{children}
					<RightArrow className="icon" />
				</SecondaryButton>
			);
		default:
			throw new Error("Prop 'type' is required");
	}
}

export default Button;
