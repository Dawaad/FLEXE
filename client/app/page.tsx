import { Navbar } from "@/components/navbar";
import FeaturedSnippets from "@/components/ui/FeaturedSnippets";
import { BackgroundGrid } from "@/components/ui/GridBackground";
import { CreationParallaxWrapper } from "@/components/ui/UserProjectHome/CreatorShowcase";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <Navbar />
      <BackgroundGrid />
      <CreationParallaxWrapper>
        <div className=" px-12 lg:px-24 max-w-screen-lg h-full flex flex-col justify-center  z-[30]">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 ">
            Developing projects <br /> doesn't need to be difficult
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl md:ml-2 mt-6 md:mt-12 max-w-screen-sm text-secondary-header">
            Find design inspiration easy and fast through our gallery of curated
            projects and portfolios sourced from developers and designers from
            around the world.
          </h2>
        </div>
      </CreationParallaxWrapper>
      <FeaturedSnippets />
    </>
  );
}
