import React, { ReactComponentElement } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="max-w-[1200px] m-auto">{children}</main>;
}
