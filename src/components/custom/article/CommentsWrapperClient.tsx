"use client";

import dynamic from "next/dynamic";

const CommentsWrapperClient = dynamic(
  () => import("@/components/custom/article/CommentsWrapper"),
  {
    ssr: false,
  }
);

export default CommentsWrapperClient;
