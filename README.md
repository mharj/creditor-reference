### Bill Reference code build and validation [![Build Status](https://travis-ci.org/mharj/creditor-reference.svg?branch=master)](https://travis-ci.org/mharj/creditor-reference)

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
