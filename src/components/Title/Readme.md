Styleguide Title component:

Blogpost title

```jsx
import styled from "styled-components";
import Colors from "common/Colors";

const Wrapper = styled.div`
	padding: 20px;
	background-color: #7f7f7f;
`;

<>
	<Wrapper>
		<Title type="post title">Mission-critical Hybrid Capacity Management</Title>
	</Wrapper>
</>;
```

Hero image title

```jsx
import styled from "styled-components";
import Colors from "common/Colors";

const Wrapper = styled.div`
	padding: 20px;
	background-color: #7f7f7f;
`;

<Wrapper>
	<Title type="hero title">Mission-critical Hybrid Capacity Management</Title>
</Wrapper>;
```

Section title

```jsx
<Title type="section title">Mission-critical Hybrid Capacity Management</Title>
```

Section sub-title

```jsx
<Title type="section subtitle">
	Mission-critical Hybrid Capacity Management
</Title>
```

Aside title

```jsx
<Title type="aside title">Mission-critical Hybrid Capacity Management</Title>
```

Aside title light

```jsx
import styled from "styled-components";
import Colors from "common/Colors";

const Wrapper = styled.div`
	padding: 20px;
	background-color: #7f7f7f;
`;

<Wrapper>
	<Title type="aside title light">
		Mission-critical Hybrid Capacity Management
	</Title>
</Wrapper>;
```
