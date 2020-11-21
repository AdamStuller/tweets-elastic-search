import { Tweet } from "../types";
/**
 * Maps incoming tweets from db to required shape
 * @param tweets Tweets from which country id is removed
 */
export const updateTweet = ({ country, ...rest }: Tweet): Tweet => ({
  ...rest,
  country: {
    name: country == null ? null : country.name,
    code: country == null ? null : country.code,
  },
});
