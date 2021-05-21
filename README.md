# Vid-Tutorial

<img src="https://github.com/mikjw/vid-tutorial/blob/main/docs/screenshot-search.png" width=90% alt="screenshot">

## How to run

- Clone this repository and navigate to the root folder
- Install dependencies: 
    ```
    npm install
    ```
- Run: 
    ```
    npm start
    ```
- Visit **http://localhost:3000/** in your browser

<br>

- To run the tests:
  ```
  npm test
  ```
- To include coverage:
  ```
  npm test --collect-coverage
  ```
<br>
### Techstack  

| Name      | Purpose
| :----------------: |:-----------------------------:| 
| React.js   | Component-based UI   | 
| Create-react-app      | Project config and boilterplate | 
| Jest      | Testing  | 
| Axios  | HTTP requests   | 

<br>


### My approach - assumptions

  - The ACs raised a few questions, particularly on how the two search functions should interact (if at all). 
  - In the real world I'd discuss these with the team, but here I made a few assumptions based primarily on what would be the most natural / intuitive UX:
  
    - Search terms and tags should work together, using a single search bar with different options
    - When a search term alone is used, results will be ranked by basic relevance / number of matches
    - When tags are used, max 20 results will be shown, ranked by their average user rating as per the ACs
    - If both a search term and tags are applied, the ranking according to tags should take precedence. This should happen regardless of the order in which the functions are used
    - When the list is refreshed, to avoid replicating a standard browser refresh, search terms and tags should stay in place

<br>

### Other Considerations
- Working with React it was tempting to break components down further - the mainPage component probably does too many things - but I also wanted to be pragmatic and extract components primarily if they would be re-used

<br>

### Improvements
With more time I would like to: 
- Refine search result scoring to account for rating as well as number of matches in title and teacher name
- Add a button to user tags allowing them to be cleared individually
- Use an infinite scroll or other loading technique to limit results shown on page load
- Add integration tests to cover the scenarios in which the two search functions interact
- Refactor to use React fuctional components to make the code less verbose

