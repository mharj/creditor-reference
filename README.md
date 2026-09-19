# Bill Reference code build and validation 
![CICD](https://github.com/mharj/creditor-reference/actions/workflows/main.yml/badge.svg)
[![Maintainability](https://qlty.sh/gh/mharj/projects/creditor-reference/maintainability.svg)](https://qlty.sh/gh/mharj/projects/creditor-reference)
[![Code Coverage](https://qlty.sh/gh/mharj/projects/creditor-reference/coverage.svg)](https://qlty.sh/gh/mharj/projects/creditor-reference)

```javascript
console.log(build('99999 88888 77777 6666', 'FI'));
console.log(build('11111 22222 33333 44444 5', 'ISO'));

if (verify('RF39111112222233333444445') === true) {
}
if (verify('99999888887777766668') === true) {
}

if (type('RF32S0METE5T') === 'ISO') {
}
if (type('99999888887777766668') === 'FI') {
}
```

### NodeJS

```typescript
import {verify} from 'creditor-reference';
console.log('verify', verify('RF39111112222233333444445'));
```

### Browser ESM

```html
<html>
	<head></head>
	<body>
		<script type="module">
			import {verify} from 'https://unpkg.com/creditor-reference@latest/dist/index.mjs';
			console.log('verify', verify('RF39111112222233333444445'));
		</script>
	</body>
</html>
```
