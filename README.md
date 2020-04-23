# timeout-watcher
A component to watch until TRUE or to timeout.

*Concept*: The component will take the following properties:
- iterations: the maximum number of iterations to make
- interval: the number of milliseconds to sleep after each iteration
- watch: the function to execute after each iteration; if it returns true, then exit loop; if false, continue to next iteration
- timeout: the function to exectute if maximum iterations is reached

## Process Setup

Article showing how to use Typescript and Styleguidist [here](https://medium.com/@mukuljainx/setup-a-react-component-library-using-create-react-app-react-styleguidist-and-typescript-b24608cb097e)

1. first create repo in Github with a README and LICENSE.
2. cloned locally
3. moved the README out of the folder
4. ran CRA command: `yarn create react-app timeout-watcher --template typescript`
5. merged CRA README with original one
6. verified working by: `yarn start`
7. add styleguidist: `yarn add -D react-styleguidist`
8. since this is a React component library (RCL), replace scripts from CRA with:
```
"start": "npx styleguidist server",
"build": "npx styleguidist build",
"test": "react-scripts test",
"eject": "react-scripts eject"
```
9. Now start again to verify working: `yarn start`
10. Worked thru the rest of tutorial, then...
11. add Typescript support into Styleguidist
```
yarn add -D react-docgen-typescript
```
12. configure a TS parser for the properties, adding to `styleguide.config.js`:
```
module.exports = {
  components: "src/components/**/*.tsx",
  propsParser: require("react-docgen-typescript").parse
};
```
13. NOTE: add documentation via JSDoc above the properties, see [here](https://en.wikipedia.org/wiki/JSDoc).
For example, in `Button.tsx`:
```
interface IProps {
  /** Size of the button */
  size: "regular" | "large";
}
```










# README created by CRA

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
