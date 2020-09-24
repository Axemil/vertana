import React, { ReactElement, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import SidebarMenuItem from "./SidebarMenuItem";
import client from "util/gql-client";
import { stripTags, isReactSnap, log } from "util/helpers";
import { WPCategory } from "typings/app-types";
import AppContext from "util/AppContext";
import { gql } from "apollo-boost";
import { saveCategories } from "util/actions";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import CategoriesMenuContainer from "containers/CategoriesMenuContainer";

declare const VI_BLOG_BASE_URL: string;
declare const VI_NEWS_BASE_URL: string;

export const GET_ALL_CATEGORIES = gql`
	query getAllNewsAndEventsCategories {
		newsAndEventsCategories {
			edges {
				node {
					name
					count
					slug
					categoryMeta {
						categoryColor
					}
				}
			}
		}
	}
`;

export interface AllCategoriesData {
	newsAndEventsCategories: {
		edges: CategoryData[];
	};
}

export interface CategoryData {
	node: {
		count?: number;
		categoryId?: number;
		slug?: string;
		name?: string;
		categoryMeta?: {
			categoryColor?: string;
		};
	};
}

export const getTotalCategories = (c: WPCategory[]) =>
	c.reduce((total, category) => (total += category.count), 0);

export const mapCategoryDataToWPCategoryArray = (
	data: AllCategoriesData,
): WPCategory[] => {
	return data.newsAndEventsCategories.edges.map(
		({
			node: {
				count,
				slug,
				name,
				categoryMeta: { categoryColor },
			},
		}) => ({
			name,
			count,
			slug,
			categoryColor,
		}),
	);
};

interface Props {
	className?: string;
}

export default function NewsAndEventsCategoriesMenu({
	className,
}: Props): ReactElement {
	const { data } = useQuery<AllCategoriesData>(GET_ALL_CATEGORIES);
	if (!data) return null;

	log("News & Events categories:", data);

	const categories = mapCategoryDataToWPCategoryArray(data);

	return (
		<CategoriesMenuContainer
			className={className}
			data={categories}
			basePath={VI_NEWS_BASE_URL}
			allItemsName="All News & Events"
			pageType="news"
		/>
	);
}
