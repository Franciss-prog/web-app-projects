import { aboutContent } from "@/content/rootContent";
import { AboutContentProps, RefProps } from "@/types/type";
import React, { FC } from "react";

const About: FC<RefProps> = ({ section }) => {
  return (
    <section className="h-[80vh] bg-softGray py-10" ref={section}>
      {/* header division */}
      <div className="text-center text-lg  max-md:text-md max-sm:text-sm flex flex-col gap-5">
        <span className="text-5xl font-extrabold">Explore our Brewcode</span>
        <p className="text-md text-slateGray">
          Discover Brewcode – creating simple, effective solutions to make your{" "}
          <br />
          life easier and more efficient.
        </p>
      </div>

      <section className="flex flex-row justify-between px-20 py-10 items-center h-[60vh] gap-20">
        {aboutContent.map((about: AboutContentProps) => {
          // deconstruct here
          const { title, description, id, iconName: Icon, buttonContent } = about;
          return (
            <div
              className="bg-white h-[300px] w-[500px] flex flex-col items-center justify-between rounded-3xl p-4"
              key={id}
            >
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <span className="font-bold text-xl">{title}</span>
                <p className="text-sm text-slateGray">{description}</p>
              </div>
              <Icon
                className="text-slateGray flex justify-center items-center"
                size={90}
              />
              <button className="w-fit bg-obsidian text-softMist font-bold px-7 py-2 rounded-2xl">
                {buttonContent}
              </button>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default About;
