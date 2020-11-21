export type Country = {
  code: string;
  name: string;
  id?: number;
};

export type Author = {
  id: number;
  screen_name: string;
  name: string;
  description?: string;
  followers_count?: number;
  friends_count?: number;
  statuses_count?: number;
};

export type Tweet = {
  id: string;
  content: string;
  location?: string;
  retweet_count: number;
  favorite_count: number;
  happened_at: string;
  author: Author,
  country?: Country
  tags: string[],
  tweet_mentions: Author[] 
};
