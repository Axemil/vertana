Category component example

```jsx
import Colors from "common/Colors";

<div
	style={{
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
		justifyItems: "center",
	}}
>
	<Category link="https://google.com" color={Colors.BlueDark}>
		Education
	</Category>
	<Category color={Colors.GreenDark}>Education</Category>
	<Category color={Colors.Violet}>Education</Category>
	<Category color={Colors.Orange}>Education</Category>
</div>;
```
