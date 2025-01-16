"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { LuGitPullRequestDraft } from "react-icons/lu";

import { useSimStore } from "@/context/sim-store";

type SubscriptionsDropDownProps = {
  selectedSubscriptions: string[];
  setSelectedSubscriptions: React.Dispatch<React.SetStateAction<string[]>>;
};

export const CategoryDropdown = ({
  selectedSubscriptions,
  setSelectedSubscriptions,
}: SubscriptionsDropDownProps) => {
  const [open, setOpen] = React.useState(false);
  const { allSubscriptions, loadSubscriptions } = useSimStore();

  React.useEffect(() => {
    loadSubscriptions();
  }, []);

  // Debug: log selected categories to see if it's updating
  // console.log("Subscriptions -> :", allSubscriptions);

  const handleCheckboxChange = (value: string) => {
    console.log("Handling change for subscriptions:", value);
    setSelectedSubscriptions((prev) => {
      const updatedSubscriptions = prev.includes(value)
        ? prev.filter((subscription) => subscription !== value)
        : [...prev, value];

      // console.log("Updated Subscriptions:", updatedSubscriptions); // Debug log for updated state
      return updatedSubscriptions;
    });
  };

  const ClearFilters = () => {
    setSelectedSubscriptions([]);
  };

  return (
    <div className="flex items-center space-x-4 poppins">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"secondary"} className="h-10">
            <LuGitPullRequestDraft />
            Abonnements
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-56 poppins" side="bottom" align="end">
          <Command className="p-1">
            <CommandInput placeholder="Subscriptions ..." />
            <CommandList>
              <CommandEmpty className="text-slate-500 text-sm text-center p-5">
                No Subscriptions found.
              </CommandEmpty>
              <CommandGroup>
                {allSubscriptions.map((subscription: any, index: number) => (
                  <CommandItem
                    className="h-full mx-auto"
                    key={index}
                    value={subscription.label}
                  >
                    <Checkbox
                      className="size-4 rounded-[4px]"
                      checked={selectedSubscriptions.includes(
                        subscription.label
                      )}
                      onClick={() => handleCheckboxChange(subscription.label)}
                    />
                    <div
                      className={`flex items-center gap-1 p-1 rounded-lg px-3 text-[14px]`}
                    >
                      {subscription.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex flex-col gap-2 text-[23px]">
              <Separator />
              <Button
                onClick={ClearFilters}
                className="mb-1 text-[12px]"
                variant={"ghost"}
              >
                Remove all filters
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
