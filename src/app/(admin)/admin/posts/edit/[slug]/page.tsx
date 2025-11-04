import React from "react";
import { notFound } from "next/navigation";
import { getPost } from "@/app/(site)/blog/[slug]/utils";
import EditWrapper from "@/components/custom/adminPanel/posts/EditWrapper/EditWrapper";
import EditWrapperMobile from "@/components/custom/adminPanel/posts/EditWrapper/EditWrapperMobile";
import { RouteSlugParams } from "@/lib/types";

export default async function PostEditPage({ params }: RouteSlugParams) {
  const { slug } = await params;

  const article = await getPost(slug);
  if (!article) notFound();

  return (
    <div>
      <div className="hidden lg:block">
        <EditWrapper
          id={article.id}
          content={article.content}
          title={article.title}
          createdAt={article.createdAt}
          imageUrl={article.imageUrl}
          editable
        />
      </div>

      <div className="lg:hidden">
        <EditWrapperMobile
          id={article.id}
          content={article.content}
          title={article.title}
          createdAt={article.createdAt}
          imageUrl={article.imageUrl}
          editable
        />
      </div>
    </div>
  );
}
