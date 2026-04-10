# Introduction
This is quick coding exercise to allow the user to create a random assortment of lego bricks, display them and then allow the user to sort and filter the bricks based on the overall number of studs.

Mostly being used as a playground to run various coding assistants through their paces.

# Instructions
* Run `npm run dev`
* Once the page opens:
    * Enter the number of bricks (1-25) and hit generate bricks to get a random assortment of bricks from 1x1 to 10x10.
    * Once bricks are generated, the user is able to enter the minimum desired amount of studs (1-100) and then filter.
    * This user is also able to sort the results by height, width, number of studs, color in ascending or descending value.

## Notes 
* The colour is dynamically assigned when drawing the brick based on it's position, if you sort, it might reassign a new colour.
* Any filtered bricks are lost, you cannot reclaim them by changing the minimum stud number to a smaller value.

# Proposed next steps
* Add tests
* Clean up the styling
* Having the sorting and filtering form inside of the "BrickCollection" seems wrong, maybe segregate it that up.
* Have the bricks hold onto their colours
* Add ability to reclaim filtered bricks if the minimum stud is reduced enough to re-include them in the set.

# Generated below:
This project was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  Later updated to run in Vite 8 and React 19 using Claude.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open browser on the location given by Vite in the console.
(Usually: [http://localhost:5173](http://localhost:5173))

<img width="298" height="121" alt="Screenshot 2026-04-05 at 3 38 28 PM" src="https://github.com/user-attachments/assets/b77e14a2-b895-4328-8093-3bcc9fe46369" />

The page will reload if you make edits.<br />

### `npm run test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run preview`

Runs the the production app locally.
