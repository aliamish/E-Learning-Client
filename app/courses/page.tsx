import React, { Suspense } from "react";
import PageContent from "./PageContent";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
