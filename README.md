# Screenings Grid Exercise

In this exercise, screenings data is presented in a multi-grid, along with sorting and filtering controls.

![Screenshot of the Screenings Grid](/docs/screenings-grid-exercise-screenshot.jpg?raw=true "Screenshot of the Screenings Grid")

## Getting started

### Installation

Make sure you have yarn installed.

```
git clone https://github.com/jonathanconway/screenings-grid-exercise
cd screenings-grid-exercise
yarn start
```

### Tests

You can run unit tests with the following command:

```
yarn test
```

## Notes on the solution

This is by no means a complete solution. I hope that it's enough of a sketch to give the viewer some idea of my knowledge and abilities.

## Areas I tried to address

* Re-usability. You'll see that there's a /components folder, housing a suite of re-usable components and a /querying folder, housing some useful filtering/sorting functions. These could be re-used by any number of new screens being added to the application.
* Performance. From my own tests, using the data provided, performance seems to be reasonable. I took into account a number of factors, such as not performing computation-intensive activity on each render cycle and using a virtualized component to render the data, thus avoiding overloading the DOM with elements.
* Usability. I applied a few basic usability principles, such as consistency, icons to speed up comprehension, visual feedback on mouse-over, animation to indicate loading, messaging to indicate no data found and others.
* Cross-browser. Tested the application in Chrome and Firefox running on Mac. Generally works in both browsers, with a slight visual glitch in Firefox that I didn't have time to fix.
* Test-driven development. As I usually do with UI, I manually test the visual styling and structuring of the components, as this seemed more assessable visually than by writing complicated, tautological tests. By I did use tests to drive all non-trivial imperative logic, such as filtering and sorting routines. I'm definitely open to being challenged on my approach and I admit I probably could have done a better job on testing generally. The time constraint was a factor here.

## Still to be done

There are many more things I would have liked to do, if I had more time.

* Clean up and improve unit tests.
* Clean up and better document the application code.
* Extract and re-organise some of the components. For example, extract a Filter component from FilterBuilder, generalise buttons, etc.
* Test in more browsers - Safari, Edge, etc.
* Responsive design for non-Desktop devices, e.g. tablet, phone.
* Write end-to-end tests using Cypress or similar.
* Add Storybook component gallery.
* Implement keyboard shortcuts.
* Implement fast filtering by clicking on any severity icon.
* Optimize algorithms, especially around sorting and filtering.
* Test for performance.
* Load-test.
* Run an accessibility audit and add accessibility features where needed.

Also if I had re-attempted this project again, from scratch, I think I would have relied more on third-party libraries. Part of the reason it took me so long was that I did so much stuff by hand. In a real-life scenario, I would have spent much more time on planning and researching third-party libraries that could do the job with much less time/effort being spent on my part. This is a valuable learning from doing the exercise.

## Process

I worked on this project in roughly the following way:

1. Reviewed the instructions and data, thinking about what had to be done.
2. Made several exploratory sketches of the UI, experimented with various concepts.
3. Settled on a basic design and split it up into components.
4. Set up application - React, Jest/Enzyme, StyledComponents, etc.
5. Start to build shallow components, with simple, black & white color scheme.
6. Started to bring in third-party libraries, to take care of work that I would have considered to be excessive, given the time guidelines given. Wrapped these libraries in components, in order to hide their individual complexities/idiosyncrasies from the rest of the application. For example, wrapped the React-Virtualized MultiGrid in a simpler Table component.
7. Created a visual style and theme and implemented it in the styling.
8. Implemented imperative behavior, such as filtering and sorting, writing tests first then making them pass.

## Technical decisions

* I decided to re-use a third-party component for the grid. I would consider constructing my own implementation of the grid in future, tailored to the needs of the application. However, given the recommended time spend, I considered that to be beyond the scope of the exzercise.

## UI design decisions

* I went through several iterations before finally settling on a grid and flexible filter-builder.
* As there are a large number of columns, I wanted to make as much of the data visible as possible, while not making it difficult to read. So I opted for a "multi-grid" - a grid with fixed row and columns to the left. That way, as the user scrolls down to see more rows,they can still see the column headers and tell which data is which. But if they want to see more columns, they can do that too, and still see the 'Name' column of the row they're looking at.
* As there are many columns with very long column titles, but very short data (essentially just one out of a handfull of 'severity' statuses), I decided to abbreviate the column headers. The full names are in a tooltip, which can be seen if you hover the mouse pointer over the column headers.
* To cater for sorting the data, there's a very simple column sort. You just click the column once to sort ascending, again to change to descending, and once more to remove the sort. This is fairly conventional.
* To cater for advanced and flexible filtering, given the number of columns, I decided to go for a filter-builder. Basically, the user can create and combine any number of their own filtering patterns. In each filter, they choose which column to filter on, whether it's an equals, not-equals or contains filter and then the value to compare to.

## Libraries

I opted for a handful of frameworks and libraries. Here is a list of them, along with justifications for using each one.

* ReactJS for lightweight web UI rendering. Because DOM rendering is at a lower level of abstraction and shouldn't be the concern of normal application development. I did attempt to use Angular at first, as it was mentioned in the job spec and I am also very familiar with it. However, I struggled to find an Angular third-party grid component that would provide the right capabilities for presenting this kind of data-set – that is, fixed rows/columns, virtualization and customizability. Whereas React-Virtualized seemed to provide all of these and more out-of-the-box. So for that reason I ended up going with React. The notes for the exercise did mention that "you can use whatever frameworks or libraries you like, but be prepared to justify your use of them", so I took that to mean that it's Ok to use React, even though the framework being used in the role would be Angular.
* React-Virtualized for multi-grid component (multi-grid meaning, a grid where top row and left columns can be frozen while the rest of the grid remains scrollable). Because this kind of grid capability would be useful for viewing a data-set with a large number of columns, as this one is, but there's a lot of complexity in implementing it myself, quite beyond the scope of the exercise. So it made sense to delegate that effort to a library.
* LuxonJS for date formatting. Because date/time formatting would be useful for this application, but is beyond the scope of the exercise.
* MaterialUI icons for icons. Because icon design seems beyond the scope of this exercise, which is more of a coding test.
* Redux/ReactRedux. Because it's a useful way of organizing the application so that state is visible and testable.
* Jest/Enzyme. For unit testing.
* Styled Components. Allows for easy and intuitive styling of React components. Made theming easier.

## Assumptions

* Desktop-only usage. (The exercise didn't mention any other devices being used.)
* Tested only in Chrome and Firefox. Would have been good to get it working in IE and Edge as well, but I simply ran out of time. Definitely would do this if I had more time.

## Limitations

* Only renders static client-side data (see /src/data folder). Could be built to handle server-side data using REST, OData, GraphQL, etc. This would involve changes to the Screenings http file and possibly to the redux file as well.
* Hasn't been tested with very large data-sets yet (10k rows or more).