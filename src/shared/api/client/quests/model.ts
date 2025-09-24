export type QuestId = string;

export type QuestType =
  | "followOnX"
  | "addSella"
  | "retweetOnX"
  | "likeOnX"
  | "commentOnX"
  | "followOnTelegram"
  | "createFirstStore"
  | "referFriends"
  | "commentOnMedium"
  | "commeOnReddit"
  | "upvoteOnReddit"
  | "likeOnMedium";

export interface QuestAttribute {
  url?: string;
  xId?: string;
  postId?: string;
  friends?: number;
}

export interface Quest {
  id: QuestId;
  title: string;
  description: string;
  type: QuestType;
  questRequired: Quest | null;
  attribute?: QuestAttribute;
  points: number;
  createdAt: string;
}
