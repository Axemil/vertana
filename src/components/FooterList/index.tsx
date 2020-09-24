import React, { ReactElement } from "react";
import styled from "styled-components";
import Colors from "common/Colors";
import PrimaryItems from "app/MainMenu/PrimaryItems";
import rightArrowUrl, {
	ReactComponent as RightArrow,
} from "assets/svg/right-arrow.svg";
import Fonts from "common/Fonts";

const Wrapper = styled.div`
	color: ${Colors.White};

	.title {
		margin: 0;
		margin-bottom: 10px;
		font-size: 13px;
		font-family: ${Fonts.Bold};
	}

	.list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.list-item {
		margin-bottom: 0px;
	}

	.list-item-link {
		color: ${Colors.White};
		font-family: ${Fonts.Regular};
		font-size: 13px;
		line-height: 30px;
		display: flex;
		align-items: baseline;
		text-decoration: none;
		cursor: pointer;
	}

	.list-item-icon {
		display: block;
		height: 9px;
		width: 6px;
		margin-right: 6px;
		flex-shrink: 0;
	}
`;

export interface FooterListItem {
	name: string;
	link: string;
}

export interface FooterListData {
	title: string;
	items: FooterListItem[];
}

interface Props {
	className?: string;
	title: string;
	items: FooterListItem[];
}

export default function FooterList({
	className,
	title,
	items,
}: Props): ReactElement {
	return (
		<Wrapper className={className}>
			<h3 className="title">{title}</h3>
			<ul className="list">
				{items.map((item) => (
					<li className="list-item">
						<a className="list-item-link" href={item.link}>
							<RightArrow className="list-item-icon" />
							<span className="list-item-text">{item.name}</span>
						</a>
					</li>
				))}
			</ul>
		</Wrapper>
	);
}
