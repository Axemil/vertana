Styleguide colors:

```jsx
import styled from "styled-components";
import Colors from "common/Colors";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 135px);
`;

<>
	<Wrapper>
		<ColorSample color={Colors.Black} />
		<ColorSample color={Colors.Gray900} />
		<ColorSample color={Colors.Gray700} />
		<ColorSample color={Colors.Gray600} />
		<ColorSample
			color={Colors.Gray200}
			textColor={Colors.Gray900}
			borderColor={Colors.Gray200}
		/>
		<ColorSample color={Colors.Gray100} textColor={Colors.Gray900} />
		<ColorSample color={Colors.White} textColor={Colors.Gray900} />

		<ColorSample color={Colors.GreenMedium} />
		<ColorSample color={Colors.GreenDark} />
		<ColorSample
			color={Colors.GreenLight}
			textColor={Colors.Gray900}
			borderColor={Colors.Gray200}
		/>
		<ColorSample color={Colors.BlueMedium} />
		<ColorSample color={Colors.BlueDark} />
		<ColorSample
			color={Colors.Sky}
			textColor={Colors.Gray900}
			borderColor={Colors.Gray200}
		/>
		<ColorSample color={Colors.Orange} />
		<ColorSample color={Colors.Violet} />
	</Wrapper>
</>;
```
