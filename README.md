### Bill Reference code build and validation

```javascript
console.log( build('99999 88888 77777 6666', RefType.FI) );
console.log( build('11111 22222 33333 44444 5', RefType.ISO) );

if ( verify('RF39111112222233333444445') == true ) {}
if ( verify('99999888887777766668') == true ) {}
```