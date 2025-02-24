import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

// Comments Section Component
export const Comments = ({ comments }) => {
  const [newComment, setNewComment] = useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Add a comment or question..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1"
            aria-label="Add comment"
          />
          <Button className="self-end" aria-label="Post comment">
            Post
          </Button>
        </div>
        {comments.map((comment, index) => (
          <Card key={index}>
            <CardContent className="pt-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.name} />
                  <AvatarFallback>{comment.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="font-medium">{comment.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {comment.date}
                  </p>
                  <p className="mt-2">{comment.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
