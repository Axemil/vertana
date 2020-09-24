import React, { ReactElement } from "react";
import cx from "classnames";
import styled from "styled-components";
import Fonts from "common/Fonts";
import Colors from "common/Colors";
import { useHistory } from "react-router-dom";

const ListItem = styled.li`
	font-family: ${Fonts.Bold};
	color: ${Colors.Black};
	font-size: 14px !important;
	line-height: 22px !important;
	list-style: none;
	border-bottom: 1px solid ${Colors.Gray600};
	padding: 14px 0;
	margin: 0;

	.link {
		display: flex;
		align-items: center;
		cursor: pointer;

		&:hover .text {
			color: ${Colors.GreenDark};
			transition: color 0.3s;
		}

		& .text.active {
			color: ${Colors.GreenDark};
		}

		& .number-wrapper {
			margin-left: auto;
			width: 50px;
			text-align: center;
		}

		& .number {
			padding: 6px 12px;
			border-radius: 30px;
		}

		& .number.active {
			background-color: ${Colors.GreenLight};
			color: ${Colors.GreenDark};
		}
	}
`;

interface Props {
	className: string;
	active?: boolean;
	name: string;
	count: number;
	href: string;
}

export default function SidebarMenuItem({
	className,
	active,
	name,
	count,
	href,
}: Props): ReactElement {
	const history = useHistory();
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		history.push(href);
	};
	return (
		<ListItem className={className}>
			<a onClick={handleClick} className="link" href={href}>
				<span className={cx("text", active && "active")}>{name}</span>
				<span className={"number-wrapper"}>
					<span className={cx("number", active && "active")}>{count}</span>
				</span>
			</a>
		</ListItem>
	);
}
