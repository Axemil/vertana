import React, { ReactElement, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import client from "util/gql-client";
import { stripTags, isReactSnap, log } from "util/helpers";
import { WPCategory, PageType } from "typings/app-types";
import AppContext from "util/AppContext";
import { gql } from "apollo-boost";
import { saveCategories } from "util/actions";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import SidebarMenuItem from "app/CategoriesMenu/SidebarMenuItem";

declare const VI_BLOG_BASE_URL: string;

const Wrapper = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

export const getTotalCategories = (c: WPCategory[]) =>
	c.reduce((total, category) => (total += category.count), 0);

interface Props {
	className?: string;
	data: WPCategory[];
	basePath: string;
	allItemsName: string;
	pageType?: PageType;
}

export default function CategoriesMenuContainer({
	className,
	data,
	basePath,
	allItemsName,
	pageType,
}: Props): ReactElement {
	const { slug: slugFromLocation } = useParams();

	return (
		<Wrapper className={className}>
			<SidebarMenuItem
				key={1}
				className="item"
				active={!slugFromLocation}
				name={allItemsName}
				count={getTotalCategories(data)}
				href={basePath}
			/>
			{data
				.filter(({ count }) => !!count)
				.map(({ name, slug, count }, key) => (
					<SidebarMenuItem
						key={key + 1}
						className="item"
						name={name}
						href={
							pageType === "news"
								? `/news-and-events-category/${slug}`
								: `${basePath}/category/${slug}`
						}
						count={count}
						active={slug === slugFromLocation}
					/>
				))}
		</Wrapper>
	);
}
