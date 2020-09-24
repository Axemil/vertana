import { gql } from "apollo-boost";
import { ImageSize } from "pages/Post";

export const NEWS_AND_EVENTS_DATA_FRAGMENT = gql`
	fragment newsAndEventsDataFragment on NewsAndEvent {
		id
		title
		excerpt
		slug
		timeToRead
		date
		author {
			name
			slug
		}
		newsAndEventsCategories(first: 1) {
			edges {
				node {
					name
					slug
				}
			}
		}
		featuredImage {
			mediaDetails {
				sizes {
					sourceUrl
					name
				}
			}
		}
	}
`;
