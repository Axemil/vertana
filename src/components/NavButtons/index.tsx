import React, { ReactElement } from "react";
import styled from "styled-components";

import { ReactComponent as RightArrow } from "assets/svg/right-arrow.svg";
import Colors from "common/Colors";

const Wrapper = styled.div`
	display: inline-block;

	.container {
		display: flex;
	}
`;
const ForwardButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 45px;
	height: 45px;
	border-radius: 999px;
	background-color: ${Colors.White};
	box-shadow: 0px 12px 29px rgba(0, 0, 0, 0.07);
	cursor: pointer;
	transition: background-color 0.2s ease-in;

	&:hover {
		background-color: ${Colors.GreenMedium};

		& .icon {
			color: ${Colors.White};
		}
	}

	.icon {
		width: 6px;
		height: 12px;
		color: ${Colors.GreenMedium};
		transition: color 0.2s ease-in;
		fill: none;
	}
`;

const BackwardButton = styled(ForwardButton)`
	margin-right: 12px;

	.icon {
		transform: rotate(180deg);
	}
`;

export enum NavDirection {
	Forward = "forward",
	Backward = "backward",
}

interface Props {
	className?: string;
	onClick: (dir: NavDirection) => void;
}

export default function NavButtons({
	className,
	onClick,
}: Props): ReactElement {
	return (
		<Wrapper className={className}>
			<div className="container">
				<BackwardButton onClick={onClick.bind(null, NavDirection.Backward)}>
					<RightArrow className="icon" />
				</BackwardButton>
				<ForwardButton onClick={onClick.bind(null, NavDirection.Forward)}>
					<RightArrow className="icon" />
				</ForwardButton>
			</div>
		</Wrapper>
	);
}
