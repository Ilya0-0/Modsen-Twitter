export interface FileData {
  id: number;
  file: File;
}

export interface TweetData {
  tweetText: string;
  images: FileData[];
}
