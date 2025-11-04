"use client";

import Comments from "./Comments";

export default function CommentsWrapper({ postId }: { postId: number }) {
  return <Comments postId={postId} />;
}
