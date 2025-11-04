import React from "react";
import CommentsData from "./CommentsData";

export default function CommentsClient() {
  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl">
      <CommentsData />
    </div>
  );
}
