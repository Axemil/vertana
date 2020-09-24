import React, { ReactElement, useRef } from "react";
import { Link } from "react-scroll";
import styled from "styled-components";
import Title from "components/Title";
import Colors from "common/Colors";
import Fonts from "common/Fonts";
import slugify from "slugify";
import Media from "common/Media";

const Wrapper = styled.div`
	box-sizing: border-box;
	background-color: #f7f7f7;
	display: inline-block;
	padding: 41px 20px 30px 0;

	@media (min-width: ${Media.laptop}) {
		padding-top: 35px;
	}

	.title {
		margin-left: 20px;

		@media (min-width: ${Media.laptop}) {
			margin-left: 24px;
			margin-bottom: 1px;
		}
	}

	.top-list,
	.list,
	.top-link,
	.link {
		list-style: none;
		padding: 0;
		margin: 0;
		display: block;
	}

	.top-list {
		padding-top: 10px;
	}

	.top-list-item {
		margin-bottom: 16px;
	}

	.list {
	}

	.list-item {
		margin-bottom: 4px;
	}

	.top-link,
	.link {
		text-decoration: none;
		color: ${Colors.Black};
		font-size: 16px;
		line-height: 28px;
		border-left: 2px solid transparent;
		transition: color 0.1s ease-in;
		cursor: pointer;

		&:hover {
			color: ${Colors.GreenDark};
		}

		&.active {
			color: ${Colors.GreenDark};
			border-left: 2px solid ${Colors.GreenDark};
		}
	}

	.top-link {
		font-family: ${Fonts.Bold};
		margin-bottom: 8px;
		display: flex;
		padding-left: 17px;

		@media (min-width: ${Media.laptop}) {
			padding-left: 22px;
		}
	}

	.link {
		padding-left: 39px;
		display: flex;

		@media (min-width: ${Media.laptop}) {
			padding-left: 44px;
		}
	}

	.top-item-number {
		margin-right: 8px;
	}

	.item-number {
		margin-right: 8px;
	}
`;

export interface TOCItemData {
	title: string;
	selected: boolean;
}

export interface TOCTopItemData {
	title: string;
	items: TOCItemData[];
	selected: boolean;
}

interface Props {
	className?: string;
	items: TOCTopItemData[];
	onSelect: (e: React.MouseEvent<HTMLElement>) => void;
	title: string;
}

export default function TableOfContent({
	className,
	onSelect,
	title,
	items,
}: Props): ReactElement {
	const refsCollection = useRef<{ [key: string]: HTMLElement }>({});

	const handleRef = (ref: HTMLElement) => {
		if (ref) {
			refsCollection.current[ref.innerText] = ref;
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		for (const key in refsCollection.current) {
			refsCollection.current[key].classList.remove("selected");
		}
		refsCollection.current[e.currentTarget.innerText].classList.add("selected");
		onSelect(e);
	};

	return (
		<Wrapper className={className}>
			<Title className="title" type="aside title">
				{title}
			</Title>
			<ul className="top-list">
				{items.map((item, i) => (
					<li className="top-list-item">
						<Link
							offset={-67}
							to={slugify(item.title)}
							smooth={true}
							className="top-link"
							activeClass="active"
							spy={true}
						>
							<span className="top-item-number">{`${i + 1}. `}</span>
							<span className="tom-item-text">{item.title}</span>
						</Link>
						<ul className="list">
							{item.items.map((subItem, j) => (
								<li className="list-item">
									<Link
										to={slugify(subItem.title)}
										smooth={true}
										className="link"
										offset={-67}
										activeClass="active"
										spy={true}
									>
										<span className="item-number">{`${i + 1}.${j + 1}. `}</span>
										<span className="item-text">{subItem.title}</span>
									</Link>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</Wrapper>
	);
}
