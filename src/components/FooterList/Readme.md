Links list located in the footer of the page

```jsx
const items = [
	{
		name: "VirtualWisdom",
		link: "https://www.virtana.com/",
	},
	{
		name: "CloudWisdom",
		link: "https://www.virtana.com/",
	},
	{
		name: "WorkloadWisdom",
		link: "https://www.virtana.com/",
	},
	{
		name: "Cloud Migration Readiness",
		link: "https://www.virtana.com/",
	},
];

<div
	style={{
		padding: 20,
		backgroundColor: "black",
	}}
>
	<FooterList title="Products" items={items} />
</div>;
```
