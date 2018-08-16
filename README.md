ES6 Lambda
---

This is a skeleton project designed to give you a leg up in developing
for lambda with whatever language forms Babel supports.

Build
---
`npm run build`

Deploy
---
First, change `CHANGEME` in your `package.json` to the name of your lambda function.
It must have been created already.

`npm run deploy`

Test
---
npm t

Test your babelified code
---
You can pass in an event via command line and emulate a lambda run with your built code

`node bin/run.js funmodule.handler '{"option": "value"}'`


