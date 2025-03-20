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

Once you've cloned the repository, install the project depencendies with `npm install` (or `pnpm install` or `yarn`);

After that you can start the developement server with the command:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## What areas of the web app did you focus on?

I focused on the UI and Style, since the data fetch was easy and the data was already structured, I could focus on making a responsive, modern and simple interface. To do that I created a table component to display the fetched data and also added a pagination component to better display it.
With the user experience I try to make the table rows easy to understand and also added a clipboard button to copy the node public key, that way I didn't need to display the entire key.

## What was the reason for your focus? What problems were you trying to solve?

My focus was on creating a modern, simple and user-friendly interface since the data fetching was straightfoward. I solved the problem of displaying potencially large amounts of data by implementing pagination and created formatted displays for complex data like timestamps and crypto amounts.

## How long did you spend on this project?

5 hours

## Did you make any trade-offs for this project? What would you have done differently with more time?

I didnt implemented filtering or sorting of any kind, when you talk about a list or table thats one of the best features it could have, In this case was a time limitation and also the API didnt had any params that i could use to filter directly on the fectch function.

With more time, I would have added more advanced filtering, maybe treating the data that is being fetched so that I could use a seach bar based on the nodes props. Also a sorting implementation to be able to asc/desc the table columns data.
I also would have added a cards view for smaller screens, that would improve even better the user experience.

## What do you think is the weakest part of your project?

No advanced filtering/sorting for the table and the mobile responsiveness could had a different component to see the list instead of the table, since the screen has smaller width.

## Is there any other information you’d like us to know?

In my opnion the project is organized with clear separation between components, data fetching and helper functions. I used the SvelteKit and TailwindCSS to build a modern interface a focused on given the user a really good experience with the pagination and data formating.
