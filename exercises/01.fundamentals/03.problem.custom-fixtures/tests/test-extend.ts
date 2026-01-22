// 🐨 Import `test` and `expect` from the "@playwright/test" package.
// Alias the `test` import as `testBase`, you will need it in the future.
// 💰 import { this as that, another } from 'package'
//
// 🐨 Import `href` and `type Register` from "react-router".
// 💰 import { this, typeof that } from 'package'
//
// 🐨 Declare a new interface called "Fixtures".
// In that interface, declare a "navigate" function with the following type:
// 💰 navigate: <T extends keyof Register['pages']>(...args: Parameters<typeof href<T>>) => Promise<void>
// 💰 interface Fixtures {}
//
// 🐨 Declare and export a new variable called "test".
// Assign it the result of calling `testBase.extend()`.
// Provide the `Fixtures` interface as a type argument to the `testBase.extend()` call.
// 💰 export const test = value
// 💰 testBase.extend<Arg>()
//
// 🐨 Provide an object as the first argument to the `testBase.extend()`.
// In that object, declare an asynchronous function called "navigate"
// with the following call signature:
// 💰 { async navigate({ page }, use) {} }
//
// 🐨 Inside the `navigate` function, call and await the `use()` function.
// 💰 await use()
//
// 📜 The `use()` function expects the implementation of your custom fixture.
// Whatever you provide it as an argument will be exposed as the value of "navigate"
// in your tests.
// 🐨 Provide the implementation of the fixture as the first argument to the
// `use()` function. The fixture must do the following:
// - Get the arguments past by it as "...args";
// - Call `page.goto()` and await that call.
// - Pass `href(...args)` as the argument to `page.goto()`.
//
// 🐨 Finally, export the `expect` function from this module.
// 💰 export { something }
