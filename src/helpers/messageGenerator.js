export const createSearchMessage= (searchApplied, tagsApplied, numberOfResults, searchString) => {
  let searchMessage = "";
  if (searchApplied || tagsApplied) { searchMessage += `Showing top ${numberOfResults} results for` }
  if (searchApplied) { searchMessage += ` "${searchString}"`}
  if (searchApplied && tagsApplied) { searchMessage += " with" }
  if (tagsApplied) { searchMessage += " tags:" }
  return searchMessage;
}