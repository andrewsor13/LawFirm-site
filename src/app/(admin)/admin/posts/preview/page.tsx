"use client";

import Article from "@/components/custom/article/Article";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

export default function PreviewPage() {
  const [data, setData] = useState<{
    title: string;
    content: string;
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("preview-article");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) return <Loader sizeClass="w-1/3 h-1/3" color="fill-white" />;

  return (
    <div className="pb-20">
      <Article
        article={{
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl,
        }}
      />
    </div>
  );
}
