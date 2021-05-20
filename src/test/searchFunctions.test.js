import { getTopRatedTutorialsForTags } from "../helpers/searchFunctions";
import { searchForTutorials } from '../helpers/searchFunctions';
import { data } from "./mocks/tutorialData";

describe("Search Helper Functions", () => {
  describe("getTopRatedTutorialsForTags Function", () => {
    test("it returns an array with a single match when passed an array with Interactive", () => {
      const result = getTopRatedTutorialsForTags(data, ["Interactive"], 20);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0].tags.includes("Interactive")).toBeTruthy();
    })

    test("it returns an array with three matches when passed Moving", () => {
      const result = getTopRatedTutorialsForTags(data, ["Moving"], 20);
      expect(result.length).toEqual(3);
    })

    test("it returns an empty array when passed an invalid tag", () => {
      const result = getTopRatedTutorialsForTags(data, ["NotATag"], 20);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(0);
    })

    test("it returns combined matches for both when passed two tags", () => {
      const result = getTopRatedTutorialsForTags(data, ["Interactive", "Moving"], 20);
      expect(result.length).toEqual(4);
    })

    test("it limits results to the passed numberToReturn", () => {
      const result = getTopRatedTutorialsForTags(data, ["Interactive", "Moving"], 2)
      expect(result.length).toEqual(2);
    })

    test("it ranks tags by their average user rating", () => { 
      const result = getTopRatedTutorialsForTags(data, ["Hard", "Exciting"], 20)
      expect(result[0].averageUserRating > result[1].averageUserRating &&
             result[1].averageUserRating > result[2].averageUserRating).toBeTruthy();
    })

    test("it returns all matches when numberToReturn is greater than total matched", () => {
      const tagsArray = ["Exciting", "Hard", "Passive", "Engaging", "Energetic"];
      const result = getTopRatedTutorialsForTags(data, tagsArray, 20);
      expect(result.length).toEqual(10);
    })

    test("it matches tags regardless of casing", () => {
      const result = getTopRatedTutorialsForTags(data, ["hard", "inTeraCtivE", "EASY"], 20)
      expect(result[0].tags.includes("Hard") &&
            result[1].tags.includes("Interactive") &&
            result[1].tags.includes("Easy")).toBeTruthy();
    })
  })

  
  describe("searchForTutorials Function", () => {
    test("it returns an array with a single match when passed the string 'Food'", () => {
      const result = searchForTutorials(data, "Food");
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0].videoTitle).toEqual("Practice: Food"); 
    })

    test("it returns an array with 3 matches when passed the string 'Practice'", () => {
      const result = searchForTutorials(data, "Practice");
      expect(result[2].videoTitle).toEqual("Practice: Food");
    })

    test("it splits the search string to find matches for each word", () => {
      const result = searchForTutorials(data, "Learn: Vehicles");
      expect(result[0].videoTitle).toEqual("Learn: Vehicles");
      expect(result[1].videoTitle).toEqual("Learn: School");
      expect(result[2].videoTitle).toEqual("Review: Vehicles");
    })

    test("it finds matches regardless of casing", () => {
      const result = searchForTutorials(data, "pracTICe");
      expect(result[0].videoTitle).toEqual("Practice: Places");
    })

    test("it finds matches regardless of punctuation", () => {
      const result = searchForTutorials(data, "Practice:,. Food!");
      expect(result[0].videoTitle).toEqual("Practice: Food");
    })

    test("it finds matches in the teacher name field as well as the title", () => {
      const result = searchForTutorials(data, "Katy");
      expect(result[0].teacherName).toEqual("Katy");
    });

    test("it returns matches for both teacher name and title", () => {
      const result = searchForTutorials(data, "Katy practice")
      expect(result[0].teacherName).toEqual("Katy");
      expect(result[1].videoTitle).toEqual("Practice: Places");
    })

    test("it assigns a search ranking score of 1 for 1 match", () => {
      const result = searchForTutorials(data, "places katy practice");
      expect(result[3].videoTitle).toEqual("Practice: Food");
      expect(result[3].teacherName).toEqual("Jane");
      expect(result[3].searchRankingScore).toEqual(1);
    })

    test("it assigns a search ranking score of 3 for 3 matches", () => {
      const result = searchForTutorials(data, "places katy practice");
      expect(result[0].videoTitle).toEqual("Practice: Places");
      expect(result[0].teacherName).toEqual("Katy");
      expect(result[0].searchRankingScore).toEqual(3);
    })

    test("it sorts the return array based on the search score", () => {
      const result = searchForTutorials(data, "places katy practice");
      expect(result[0].searchRankingScore > result[1].searchRankingScore && 
        result[1].searchRankingScore > result[2].searchRankingScore).toBeTruthy();
    })
  })
})
