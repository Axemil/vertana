import { TOCTopItemData } from ".";
import slugify from "slugify";

const LINK_PLACEHOLDER = "#";

const data: TOCTopItemData[] = [
	{
		title: "How we got there?",
		selected: false,
		items: [
			{
				title: "Keep in mind",
				selected: false,
			},
		],
	},
	{
		title: "Where we are today?",
		selected: false,
		items: [
			{
				title: "Digital transformation",
				selected: true,
			},
			{
				title: "First factors",
				selected: false,
			},
			{
				title: "Second factors",
				selected: false,
			},
		],
	},
	{
		title: "Changes for capacity management?",
		selected: false,
		items: [
			{
				title: "Context",
				selected: false,
			},
			{
				title: "Discovery",
				selected: false,
			},
			{
				title: "Siloed tools",
				selected: false,
			},
			{
				title: "Performance",
				selected: false,
			},
		],
	},
];

export default data;
