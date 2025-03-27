# Bill Reference code build and validation ![CI](https://github.com/mharj/creditor-reference/actions/workflows/main.yml/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/133d7273f46a087fba52/maintainability)](https://codeclimate.com/github/mharj/creditor-reference/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/6613d01045f626d38df7/test_coverage)](https://codeclimate.com/github/mharj/creditor-reference/test_coverage)


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

### NpmJS

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

### Browser UMD (Legacy browsers, 0.1.6 last UMD build)

```html
<html>
	<head>
		<script crossorigin="anonymous" src="https://unpkg.com/creditor-reference@0.1.6/dist/umd/index.js"></script>
	</head>
	<body>
		<script>
			console.log('verify', CreditorReference.verify('RF39111112222233333444445'));
		</script>
	</body>
</html>
```
