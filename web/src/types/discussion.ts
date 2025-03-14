import { APIResponse } from "./apiTypes";
import { Entity, TimeStats } from "./generics";
import { GlanceUser } from "./user";

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
    author: GlanceUser;
    parentId: string;
    commentData: CommentData;
  };

export type FetchCommentsResponse = APIResponse<Array<Comment>>;
export type SaveCommentResponse = APIResponse<Comment>;
