import { getTopRatedTutorialsForTags } from "../helpers/searchFunctions";
import { data } from "./mocks/tutorialData";

describe("getTopRatedTutorialsForTags", () => {
  test("it returns an array with a single match when passed Interactive", () => {
    const result = getTopRatedTutorialsForTags(data, ["Interactive"], 20)
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual("95b389a7-ab9e-4209-a5e4-ada56886410e");
  })

  test("it returns an array with three matches when passed Moving", () => {
    const result = getTopRatedTutorialsForTags(data, ["Moving"], 20)
    expect(result.length).toEqual(3);
  })

  test("it returns an empty array when passed an invalid tag", () => {
    const result = getTopRatedTutorialsForTags(data, ["NotATag"], 20)
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toEqual(0);
  })

  test("it returns combined matches for both when passed two tags", () => {
    const result = getTopRatedTutorialsForTags(data, ["Interactive", "Moving"], 20)
    expect(result.length).toEqual(4);
  })

  test("it ranks tags by their average user rating", () => {
    const result = getTopRatedTutorialsForTags(data, ["Hard", "Exciting"], 20)
    expect(result[0].averageUserRating > result[1].averageUserRating >
           result[2].averageUserRating > result[3].averageUserRating).toBeTruthy()
  })

  test("it limits results to the passed numberToReturn", () => {
    const result = getTopRatedTutorialsForTags(data, ["Interactive", "Moving"], 2)
    expect(result.length).toEqual(2);
  })

  test("it returns all tutorials when numberToReturn is greater than total matched", () => {
    const tagsArray = ["Exciting", "Hard", "Passive", "Engaging", "Energetic"];
    const result = getTopRatedTutorialsForTags(data, tagsArray, 20)
    expect(result.length).toEqual(10);
  })

  test("it matches tags regardless of casing", () => {
    const result = getTopRatedTutorialsForTags(data, ["hard", "inTeraCtivE", "EASY"], 20)
    expect(result[0].tags.includes("Hard") &&
           result[1].tags.includes("Interactive") &&
           result[1].tags.includes("Easy")).toBeTruthy();
  })
})
