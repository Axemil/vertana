import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import VisibilitySensor from "react-visibility-sensor";
import cx from "classnames";
import TableOfContent, { TOCTopItemData } from "components/TableOfContent";
import Ad from "app/CategoriesMenu/Ad";
import tocData from "components/TableOfContent/data";
import Media from "common/Media";

const Wrapper = styled.aside<{ isStickyTop?: boolean }>`
	padding-top: 60px;
	width: 360px;
	flex-shrink: 0;
	position: ${({ isStickyTop }) => (isStickyTop ? "static" : "relative")};

	@media (min-width: ${Media.laptop}) {
		padding-top: 80px;
		width: 425px;
	}

	.sticky-wrapper {
		height: ${({ isStickyTop }) =>
			isStickyTop ? "calc(100vh - 67px)" : "auto"};
		overflow: ${({ isStickyTop }) => (isStickyTop ? "scroll" : "auto")};

		padding: 0 30px 30px 85px;

		@media (min-width: ${Media.laptop}) {
			padding-left: 100px;
			padding-right: 0;
		}
	}

	.is-sticky-top {
		position: fixed;
		top: 67px;

		@media (min-width: ${Media.laptop}) {
			width: 425px;
			top: 97px;
		}
	}

	.is-sticky-bottom {
		position: absolute;
		bottom: 80px;
		left: 0;
		top: auto;

		@media (min-width: ${Media.laptop}) {
			width: 425px;
			top: auto;
		}
	}

	.toc {
		@media (min-width: ${Media.laptop}) {
			margin-right: 25px;
		}
	}

	.ad {
		/* margin-top: 108px; */
		z-index: 999;

		@media (min-width: ${Media.laptop}) {
			margin-right: 25px;
		}
	}
`;

interface Props {
	className?: string;
	data: TOCTopItemData[];
}

export default function Aside({ className, data }: Props): ReactElement {
	const [isStickyTop, setIsStickyTop] = useState(false);
	const [isStickyBottom, setIsStickyBottom] = useState(false);

	const handleChangeTop = (isVisible: boolean) => {
		setIsStickyTop(!isVisible);
	};

	const handleChangeBottom = (isVisible: boolean) => {
		setIsStickyBottom(isVisible);
		setIsStickyTop(!isVisible);
	};

	return (
		<VisibilitySensor
			onChange={handleChangeTop}
			partialVisibility={("top" as unknown) as boolean}
			offset={{ top: 20 }}
		>
			<VisibilitySensor
				onChange={handleChangeBottom}
				partialVisibility={("bottom" as unknown) as boolean}
				offset={{ bottom: 0 }}
			>
				<Wrapper className={className} isStickyTop={isStickyTop}>
					<div
						className={cx(
							"sticky-wrapper",
							isStickyTop && "is-sticky-top",
							isStickyBottom && "is-sticky-bottom",
						)}
					>
						<Ad aside className="ad" />
					</div>
				</Wrapper>
			</VisibilitySensor>
		</VisibilitySensor>
	);
}
