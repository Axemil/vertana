import { gql } from "apollo-boost";

export const GET_ALL_NEWS_AND_EVENTS_CATEGORIES_COLORS = gql`
	query getAllNewsAndEventsCategoriesColors {
		newsAndEventsCategories {
			edges {
				node {
					categoryMeta {
						categoryColor
					}
					slug
				}
			}
		}
	}
`;
