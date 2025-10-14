import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

const CategoryCaraosel = () => {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Software Developer",
    "Artificial Intelligence Intern",
    "FullStack Developer",
    "MERN stack Developer",
    "PHP Developer",
    
  ];
  return (
    <div>
      <Carousel className="overflow-hidden">
        <CarouselContent className="mx-auto my-12">
  {category.map((cat, index) => (
    <CarouselItem key={index} className=" flex justify-center items-center p-2 
          basis-1/2      /* mobile default: 2 items per view */
          sm:basis-1/3   /* small screens: 3 items per view */
          md:basis-1/4   /* medium screens: 4 items per view */
          lg:basis-1/6   /* large screens: 6 items per view */ " >
      <Button className="rounded-full text-sm bg-purple-100 text-purple-950" variant="outline">
        {cat}
      </Button>
    </CarouselItem>
  ))}
</CarouselContent>

        <CarouselPrevious className="absolute top-1/2 left-0 -translate-y-1/2 z-10"/>
        <CarouselNext  className="absolute top-1/2 right-0 -translate-y-1/2 z-10"/>
      </Carousel>
    </div>
  );
};

export default CategoryCaraosel;
