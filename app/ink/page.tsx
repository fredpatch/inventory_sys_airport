"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import InkTable from "./_components/ink-table";

export default function InkPage() {
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="p-3 h-full">
      <Card className="flex flex-col shadow-none p-5">
        {/* <DeleteDialog /> */}
        <InkTable />
      </Card>
    </div>
  );
}
