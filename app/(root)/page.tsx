"use client";

import AppTable from "@/components/shared/app-table";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";

export default function Home() {
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <AppContent />
    </>
  );
}

const AppContent = () => {
  return (
    <div className="bg-secondary p-3 h-full">
      <Card className="flex flex-col shadow-none p-5">
        <DeleteDialog />
        <AppTable />
      </Card>
    </div>
  );
};
