import { APIResponse } from "./apiTypes";
import { Entity, TimeStats } from "./generics";

export type Discussion = Entity & {
  parentUUID: string;
  parentCommentIDs: Array<string>;
};

export type CommentData = {
  text: string;
};

export type ParentComment = {
  isParentComment: true;
  childComments: Array<string>;
};

export type ChildComment = {
  isParentComment: false;
};

export type Comment = Entity &
  TimeStats &
  (ParentComment | ChildComment) & {
    parentID: string;
    commentData: CommentData;
  };

export type FetchCommentsResponse = APIResponse<Array<Comment>>;
export type SaveCommentResponse = APIResponse<Comment>;
