import ArticleList from "@/components/custom/article/ArticleList";
import Domains from "@/components/custom/domains/DomainsList";
import HeroSection from "@/components/HeroSection";
import Values from "@/components/custom/values/Values";

export default function Home() {
  return (
    <div className="w-full">
      <main className=" flex flex-col">
        <HeroSection />
        <Values />
        <Domains max={6} iconSize={50} />
        <ArticleList />
      </main>
    </div>
  );
}
