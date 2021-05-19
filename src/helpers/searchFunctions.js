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

/**
* Get tutorials by comparing search terms to title and teacher name, ranking results 
*/

export const searchForTutorials = (tutorialsArray, searchTermString) => {
  const searchWordsArray = convertSearchString(searchTermString);
  let tutorialsForSearchTerms = [];
  for (const tutorial of tutorialsArray) {  
    tutorial.searchRankingScore = 0;
    tutorial.alreadyAddedToReturnArray = false;
    // Check title, add tutorial if matched and increment search score
    const titleArray = convertSearchString(tutorial.videoTitle)
    for (const searchTerm of searchWordsArray) {
      if (titleArray.includes(searchTerm)) {
        tutorial.searchRankingScore += 1
        if (!tutorial.alreadyAddedToReturnArray) {
          tutorialsForSearchTerms.push(tutorial);
          tutorial.alreadyAddedToReturnArray = true;
        }
      }
    }
    // Check teacher name, add tutorial if matched and increment search score
    const teacherNameLowerCase = tutorial.teacherName.toLowerCase()
    for (const searchTerm of searchWordsArray) {
      if (searchTerm === teacherNameLowerCase) {
        tutorial.searchRankingScore += 1
        if (!tutorial.alreadyAddedToReturnArray) {
          tutorialsForSearchTerms.push(tutorial);
          tutorial.alreadyAddedToReturnArray = true;
        }
      }
    }
  }

  // sort by search ranking score
  return tutorialsForSearchTerms.sort((a, b) => { return b.searchRankingScore - a.searchRankingScore });
}


/**
* Convert search string to array of lowercase words without punctuation 
*/

const convertSearchString = (string) => {
  return string.replace(/[^a-zA-Z_ ]/g, "").toLowerCase().split(" ");
}
