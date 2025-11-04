"use client";
import React from "react";
import { FileText } from "lucide-react";
import type { BlogStatsProps, Comment, Posts } from "./types";

function BlogStatistics({ posts, comments }: BlogStatsProps) {
  const totalComments = comments.filter((c: Comment) => c.isAccepted).length;
  const averageCommentsPerPost =
    posts.length > 0 && totalComments > 0
      ? (totalComments / posts.length).toFixed(1)
      : "0";
  const mostCommentedPost: Posts | null =
    posts.length > 0
      ? posts.reduce(
          (prev, current) =>
            prev._count.comments > current._count.comments ? prev : current,
          posts[0]
        )
      : null;

  return (
    <div
      className="
        rounded-2xl p-6 border shadow-lg
            bg-gradient-to-br from-white to-[#f9f9f9] border-[rgba(203,173,141,0.2)]

      "
    >
      <div className="flex items-center mb-6">
        <div
          className="
            p-2.5 rounded-xl mr-3 shadow-md
            bg-gradient-to-br from-[#9c6b56] to-[#835745]
          "
        >
          <FileText className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-[#2c1d16] tracking-tight">
          Statistici Blog
        </h3>
      </div>

      <div className="space-y-4">
        <div
          className="
            flex justify-between items-center p-3 rounded-lg border
            border-[#d1b9a9]/40 bg-white/70 backdrop-blur-sm
            hover:bg-[#fff9f3] transition-colors
          "
        >
          <span className="text-sm font-medium text-[#4b3b34]">
            Total articole:
          </span>
          <span className="text-sm font-bold text-[#2c1d16]">
            {posts.length}
          </span>
        </div>

        <div
          className="
            flex justify-between items-center p-3 rounded-lg border
            border-[#d1b9a9]/40 bg-white/70 backdrop-blur-sm
            hover:bg-[#fff9f3] transition-colors
          "
        >
          <span className="text-sm font-medium text-[#4b3b34]">
            Total comentarii:
          </span>
          <span className="text-sm font-bold text-[#2c1d16]">
            {totalComments}
          </span>
        </div>

        <div
          className="
            flex justify-between items-center p-3 rounded-lg border
            border-[#d1b9a9]/40 bg-white/70 backdrop-blur-sm
            hover:bg-[#fff9f3] transition-colors
          "
        >
          <span className="text-sm font-medium text-[#4b3b34]">
            Comentarii medii/articol:
          </span>
          <span className="text-sm font-semibold text-[#2c1d16]">
            {averageCommentsPerPost}
          </span>
        </div>

        {mostCommentedPost && (
          <div
            className="
              p-3 rounded-lg border border-[#d1b9a9]/40
              bg-white/70 backdrop-blur-sm
              hover:bg-[#fff9f3] transition-colors
            "
          >
            <span className="text-sm font-medium text-[#4b3b34]">
              Cel mai comentat:
            </span>
            <p className="text-sm font-semibold text-[#2c1d16] mt-1">
              {mostCommentedPost.title}
            </p>
            <p className="text-xs text-[#7c6355]">
              {mostCommentedPost._count.comments} comentarii
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogStatistics;
