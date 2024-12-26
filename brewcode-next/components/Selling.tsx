import { RefProps } from "@/types/type";
import React, { FC } from "react";

const Selling: FC<RefProps> = ({ section }) => {
  return (
    <section className="h-screen" ref={section}>
      Selling
    </section>
  );
};

export default Selling;
