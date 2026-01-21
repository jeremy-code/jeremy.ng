import type { ReactNode } from "react";

import { Footer } from "#components/layout/Footer";
import { Navbar } from "#components/layout/Navbar";

const StaticLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <Navbar />
      <main className="container py-4">{children}</main>
      <Footer />
    </>
  );
};

export default StaticLayout;
