import Sidebar from "app/Sidebar";
import Media from "common/Media";
import CategoryHeader from "pages/Archives/CategoryHeader";
import {
	GetPostsData,
	GetPostData,
	PostData,
	PageType,
} from "typings/app-types";
import UserHeader from "components/UserHeader";
import styled from "styled-components";
import { ReactElement } from "react";
import React from "react";
import MainSection from "pages/Main/MainSection";
import { ArchiveType } from "pages/Archives";
import CategoriesMenu from "app/CategoriesMenu";
import NewsAndEventsCategoriesMenu from "app/NewsAndEventsCategoriesMenu";
import ContextSearch from "app/Sidebar/ContextSearch";

declare const VI_BLOG_DEBUG_MODE: string;

const StyledCategoryHeader = styled(CategoryHeader)`
	margin-top: 67px;
`;

const StyledUserHeader = styled(UserHeader)`
	margin-top: 67px;
`;

const Wrapper = styled.div`
	max-width: 1200px;
	padding: 0 20px;
	margin: 60px 0 60px 0;

	@media (min-width: ${Media.tabletLg}) {
		display: flex;
		padding: 0 30px;
		box-sizing: border-box;

		.sidebar {
			width: 245px;
			flex-shrink: 0;
			margin-left: 80px;
		}
	}

	@media (min-width: ${Media.laptop}) {
		padding: 0;
		margin: 60px auto;

		.sidebar {
			width: 300px;
			flex-shrink: 0;
			margin-left: 100px;
		}
	}
`;

const getSidebarMenu = (pageType: PageType): ((p: {}) => ReactElement) => {
	switch (pageType) {
		case "main":
			return (p) => <CategoriesMenu {...p} />;
		case "news":
			return (p) => <NewsAndEventsCategoriesMenu {...p} />;
		default:
			return null;
	}
};

const getContextSearch = (pageType: PageType): ((p: {}) => ReactElement) => {
	return (p) => <ContextSearch pageType={pageType} {...p} />;
};

interface Props {
	type?: PageType;
	header?: ReactElement;
	pagination?: ReactElement;
	posts: PostData[];
	columns: number;
}

export default function ArchivesContainer({
	type,
	header = null,
	pagination = null,
	posts,
	columns,
}: Props): ReactElement {
	return (
		<>
			{header}
			<Wrapper>
				<MainSection
					posts={posts}
					className="main"
					pagination={pagination}
					columns={columns}
					pageType={type}
				/>
				{type === "category" ||
					(type === "news" && (
						<Sidebar
							contextSearch={getContextSearch(type)}
							sidebarMenu={getSidebarMenu(type)}
							className="sidebar"
						/>
					))}
			</Wrapper>
		</>
	);
}
