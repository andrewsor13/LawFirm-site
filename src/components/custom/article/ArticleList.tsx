"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CardBox from "./CardBox";
import Link from "next/link";

type Article = {
  title: string;
  imageUrl: string;
  description: string;
  slug: string;
  createdAt: string;
};

export default function ArticleList() {
  const [data, setData] = useState<Article[] | null>(null);
  const [isData, setIsData] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("/api/posts?fields=basic");
        if (!res.ok) {
          console.error("Fetch error", await res.text());
          return;
        }
        const data: Article[] = await res.json();
        console.log(data);

        setData(data);
        if (data && data.length > 0) {
          setIsData(true);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    getPosts();
  }, []);

  return isData ? (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <section
        ref={ref}
        className="overflow-x-hidden max-w-8xl mt-10 mb-10 mx-auto text-center"
      >
        <h2 className="text-center text-3xl font-bold mb-4 text-[var(--color-primary)]">
          Articole
        </h2>
        <div className=" w-full flex justify-center items-center ">
          <Carousel className="w-5/8 max-w-xs sm:hidden">
            <CarouselContent className="flex flex-row gap-5">
              {data?.slice(0, 6).map((article, index) => (
                <CarouselItem key={index}>
                  <Link href={`/blog/${article.slug}`}>
                    <CardBox
                      title={article.title}
                      image={article.imageUrl}
                      description={article.description}
                      createdAt={article.createdAt}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Carousel className="w-xl hidden  sm:flex lg:hidden">
            <CarouselContent className="-ml-1">
              {data?.slice(0, 6).map((article, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <Link href={`/blog/${article.slug}`}>
                    <CardBox
                      title={article.title}
                      image={article.imageUrl}
                      description={article.description}
                      createdAt={article.createdAt}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Carousel className="w-4xl  hidden lg:flex ">
            <CarouselContent className="-ml-1">
              {data?.slice(0, 6).map((article, index) => (
                <CarouselItem key={index} className="basis-1/3">
                  <Link href={`/blog/${article.slug}`}>
                    <CardBox
                      title={article.title}
                      image={article.imageUrl}
                      description={article.description}
                      createdAt={article.createdAt}
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </motion.div>
  ) : null;
}
