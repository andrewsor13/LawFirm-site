// "use client";

// import Article from "@/components/custom/article/Article";
// import DomainWrapper from "@/components/custom/domains/DomainWrapper";
// import { useEffect, useState } from "react";

// export default function PreviewPage() {
//   const [data, setData] = useState<{
//     title: string;
//     content: string;
//     imageUrl: string;
//   } | null>(null);

//   useEffect(() => {
//     const stored = sessionStorage.getItem("preview-article");
//     if (stored) {
//       setData(JSON.parse(stored));
//     }
//   }, []);

//   if (!data) return <p>Loading preview...</p>;

//   return <DomainWrapper domain={domain} />;
// }

import React from "react";

export default function page() {
  return <div>page</div>;
}
