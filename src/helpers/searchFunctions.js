/**
* Get tutorials by comparing user tags to tags field, returning any matches 
*/

export const getTopRatedTutorialsForTags = (tutorialsArray, tagsArray, numberToReturn) => {
  let tutorialsForTags = [];
  for (const tutorial of tutorialsArray) {
    const tagsLowerCase = tutorial.tags.map(tag => { return tag.toLowerCase() })
    for (const tag of tagsArray) {
      if (tagsLowerCase.includes(tag.toLowerCase())) {
        tutorialsForTags.push(tutorial);
        break;
      }
    }
  }
  return tutorialsForTags.sort((a, b) => {
    return b.averageUserRating - a.averageUserRating;
  }).slice(0, numberToReturn)
}
