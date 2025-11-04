import React from "react";
import PostsDesktop from "./PostsDesktop";
import PostsMobile from "./PostsMobile";

export default function PostsWrapper() {
  return (
    <div>
      <div className="hidden lg:block">
        <PostsDesktop />
      </div>
      <div className=" lg:hidden">
        <PostsMobile />
      </div>
    </div>
  );
}
