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

export const GET_ALL_CATEGORIES = gql`
	query allCategories {
		categories {
			edges {
				node {
					count
					categoryId
					slug
					name
					categoryMeta {
						categoryColor
					}
				}
			}
		}
	}
`;

export interface AllCategoriesData {
	categories: {
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
	return data.categories.edges.map(
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

export default function CategoriesMenu({ className }: Props): ReactElement {
	const { data } = useQuery<AllCategoriesData>(GET_ALL_CATEGORIES);
	if (!data) return null;

	const categories = mapCategoryDataToWPCategoryArray(data);

	return (
		<CategoriesMenuContainer
			allItemsName="All Categories"
			className={className}
			data={categories}
			basePath={VI_BLOG_BASE_URL}
		/>
	);
}
