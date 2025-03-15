import { APIResponse } from "./apiTypes";
import { Entity, TimeStats } from "./generics";

export enum CommentAccociatedToType {
  EVENT = "EVENT",
  GROUP = "GROUP",
}

export type CommentData = {
  text: string;
};

export type ParentComment = {
  isParentComment: true;
  childComments: Array<string>;
};

export type ChildComment = {
  isParentComment: false;
  parentId: string;
};

export type Comment = Entity &
  TimeStats &
  (ParentComment | ChildComment) & {
    author: string;
    commentData: CommentData;
  };

export type FetchCommentsResponse = APIResponse<Array<Comment>>;
export type SaveCommentResponse = APIResponse<{ id: string }>;
