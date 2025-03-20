## Libraries & frameworks used

--Core framework--
SvelteKit

--UI & Styling--
TailwindCSS 4.0

--Testing--
Vitest
@testing-library/svelte
@testing-library/jest-dom

--Tools--
TypeScript
Vite
ESLint
Prettier

## Steps to run

Once you've cloned the repository, install the project dependencies with `npm install` (or `pnpm install` or `yarn`).

After that, you can start the development server with the command:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## What areas of the web app did you focus on?

I focused on the UI and style. Since the data fetch was straightforward and the data was already structured, I could focus on making a responsive, modern, and simple interface. To do that, I created a table component to display the fetched data and also added a pagination component to better display it.
With the user experience, I tried to make the table rows easy to understand and also added a clipboard button to copy the node public key, that way I didn't need to display the entire key.

## What was the reason for your focus? What problems were you trying to solve?

My focus was on creating a modern, simple, and user-friendly interface since the data fetching was straightforward. I solved the problem of displaying potentially large amounts of data by implementing pagination and created formatted displays for complex data like timestamps and satoshi conversion to btc.

## How long did you spend on this project?

5 hours

## Did you make any trade-offs for this project? What would you have done differently with more time?

I didn't implement filtering or sorting of any kind. When you talk about a list or table, that's one of the best features it could have. In this case, it was a time limitation, and also the API didn't have any params that I could use to filter directly on the fetch function.

With more time, I would have added more advanced filtering, maybe processing the data that is being fetched so that I could use a search bar based on the node properties. Also, a sorting implementation to be able to sort the table columns data in ascending/descending order.
I also would have added a cards view for smaller screens, which would improve the user experience even further.

## What do you think is the weakest part of your project?

No advanced filtering/sorting for the table, and the mobile responsiveness could have had a different component to view the list instead of the table, since mobile screens have smaller width.

## Is there any other information you'd like us to know?

In my opinion, the project is well-organized with clear separation between components, data fetching, and helper functions. I used SvelteKit and TailwindCSS to build a modern interface and focused on giving the user a really good experience with the pagination and data formatting.
