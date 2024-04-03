import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navigation from "@/components/ui/site/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <Navigation />
        {children}
      </ClerkProvider>
    </main>
  );
};

export default layout;
