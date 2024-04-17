import { ChildNodeProps } from "@/lib/interface";
import React from "react";

const Layout = ({ children }: Readonly<ChildNodeProps>) => {
  return <div>{children}</div>;
};

export default Layout;
