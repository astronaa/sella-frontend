## Used stack
* [next.js](https://nextjs.org)
* [park-ui](https://park-ui.com/) for the styled-system
* [tailwind](https://tailwindcss.com/) as a css framework
* methodology: [FSD](https://feature-sliced.design/docs/get-started/overview). If you are not familiar, then just follow at least the rules below in `Development guidelines`

## Development guidelines
Based on the FSD principles:
1. Do not create any folders on `src/` folder
2. Use `shared` folder for utilities, ui-kit and etc
3. Use `pages` to composite full-fledged pages that are ready to connect to the router
4. Follow the order of imports by layer priority. 
	* Module in `pages` can only import `widgets`, `features`, `entities`, `shared` modules
	* Module in `widgets` can only import `features`, `entities`,`shared` modules
	* Module in `features` can only import `entities`, `shared` modules
	* Module in `entities` can only import `shared` modules
	* You can import anything you want from `app` folder

Based on clean code principles:
1. Follow DRY. Strive to split your code into components
2. Reuse your styles with tailwind. Extend tailwind.config.ts with new tokens and use `@layer utilities` if necessary
3. When describing styles, try to separate them according to their purpose within a single component. 
For example, one string is className for the base style, another string is for the `hocus` state

Based on responsive design principles:
1. Use only `rem` units for layout or `1px` for minimal possible unit

Based on linting principles:
1. Solve the eslint rules wisely. If you have any questions about how to solve them, please contact the lead
2. Do not bypass husky. It's checks your commit for building and compliance with the eslint rules

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding components
We are use [Park-UI component library](https://park-ui.com/docs/tailwind/components/accordion), so first of all explore if a required component present in this library
After you have found it, use the `ui` command:

```bash
yarn ui add button # or something else instead of button
```

Use snake-case to write the component name.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
