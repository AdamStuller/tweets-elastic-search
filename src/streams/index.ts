import { postgresStreamPromise } from "./dbReadable";
import { updateTweet } from "./mapTweets";
import { map } from "../util/transforms";

export const mapTweet = map(updateTweet);
export { postgresStreamPromise };
