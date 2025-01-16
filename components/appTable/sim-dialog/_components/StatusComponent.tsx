"use client";

import { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";
import { SimHolder } from "@/lib/helpers";

export default function StatusComponent({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<SimHolder["status"]>>;
}) {
  // console.log(selectedTab);

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Label className="text-slate-700">
        Status
        <p className="text-[12px] mt-1 text-gray-500 font-light">
          Selectionnez le statut de la sim.
        </p>
      </Label>
      <Tabs
        value={selectedTab}
        onValueChange={(value: string) =>
          setSelectedTab(value as SimHolder["status"])
        }
        className="mt-1"
      >
        <TabsList className="h-11 px-2">
          <TabsTrigger
            className={`h-8 ${selectedTab === "Active" ? "text-red-500" : ""}`}
            value="Active"
          >
            <FaCheck className="pr-1" />
            Active
          </TabsTrigger>
          <TabsTrigger
            className={`h-8 ${
              selectedTab === "Inactive" ? "text-red-500" : ""
            }`}
            value="Inactive"
          >
            <IoClose />
            Inactive
          </TabsTrigger>
          <TabsTrigger
            className={`h-8 ${selectedTab === "Draft" ? "text-red-500" : ""}`}
            value="Draft"
          >
            <FaInbox className="pr-1" />
            Draft
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
