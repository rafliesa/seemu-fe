import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

interface PostCardProps {
  title: string;
  community: string;
  description?: string;
  content: string;
  actions?: { label: string; onClick?: () => void; variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" }[];
}

export default function PostCard({
  title,
  description,
  content,
  community,
  actions = [],
}: PostCardProps) {
  const [likes, setLikes] = useState(3); 
  const [liked, setLiked] = useState(false); 

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1); 
    } else {
      setLikes(likes + 1); 
    }
    setLiked(!liked); 
  };

  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex justify-between items-start align-top">
          <CardTitle className="text-s">{community}</CardTitle>
          <div className="flex flex-col items-end">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        <hr className="mt-2" />
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <Button onClick={handleLike} className={liked ? "text-green-500" : ""}>
            Like <span>{likes}</span>
          </Button>
          <Button>Comment</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
