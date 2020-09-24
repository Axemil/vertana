import React, { ReactElement } from "react";
import styled from "styled-components";
import StyledInput from "components/StyledInput";
import Colors from "common/Colors";
import CategoriesMenu from "app/CategoriesMenu";
import Ad from "app/CategoriesMenu/Ad";
import Media from "common/Media";
import ContextSearch from "./ContextSearch";

const Wrapper = styled.aside`
	@media (min-width: ${Media.tabletLg}) {
		width: 245px;
	}
	@media (min-width: ${Media.laptop}) {
		width: 300px;
	}

	.sidebar-search {
		margin-bottom: 30px;
	}

	.sidebar-categories {
		margin-bottom: 60px;

		@media (min-width: ${Media.tabletLg}) {
			margin-bottom: 115px;
		}
	}

	.ad {
		margin-bottom: 120px;
	}
`;

interface SidebarMenuArgs {
	className: string;
}
interface ContextSearchArgs {
	className: string;
}

interface Props {
	className?: string;
	sidebarMenu: (a: SidebarMenuArgs) => ReactElement;
	contextSearch: (a: ContextSearchArgs) => ReactElement;
}

export default function Sidebar({
	className,
	sidebarMenu,
	contextSearch,
}: Props): ReactElement {
	return (
		<Wrapper className={className}>
			{/* <ContextSearch className="sidebar-search" /> */}
			{contextSearch({ className: "sidebar-search" })}
			{sidebarMenu({ className: "sidebar-categories" })}
			{/* <CategoriesMenu className="sidebar-categories" /> */}
			<Ad className="ad" />
		</Wrapper>
	);
}
