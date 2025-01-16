"use client";

import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { toast } from "@/hooks/use-toast";
import { SimHolder } from "@/lib/helpers";
import { useSimStore } from "@/context/sim-store";
import { useFormContext } from "react-hook-form";

export function SubscriptionComponent({
  selectedSubscriptions,
  setSelectedSubscription,
}: {
  selectedSubscriptions: string[];
  setSelectedSubscription: Dispatch<SetStateAction<SimHolder["subscriptions"]>>;
}) {
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);
  const { allSubscriptions } = useSimStore();
  const {
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setIsClient(true);
    // setSelectedSubscription([]);
  }, []);

  const handleSubscriptionChange = (subscription: string) => {
    if (selectedSubscriptions.includes(subscription)) {
      // If the subscription is already selected, remove it
      setSelectedSubscription((prev) =>
        prev.filter((cat) => cat !== subscription)
      );
    } else {
      // If the subscription is not selected, check if the limit of 2 is reached
      if (selectedSubscriptions.length >= 2) {
        // Show a toast message or alert to inform the user
        toast({
          description: "Vous avez atteint la limite de 2 abonnements.",
          variant: "destructive",
        });
        return; // Exit the function without adding the new subscription
      }
      // Add the new subscription
      setSelectedSubscription((prev) => [...prev, subscription]);
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-700">
        {`Abonnements`}
        <p className="text-[12px] mt-1 text-gray-500 font-light">
          Selectionnez les abonnements de l'utilisateur
        </p>
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-[45px] shadow-none"
          >
            {selectedSubscriptions.length > 0
              ? selectedSubscriptions.join(", ")
              : "Selectionnez les abonnements"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0 max-h-80 overflow-y-auto">
          <Command>
            <CommandInput placeholder="Rechercher un abonnement..." />
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              {allSubscriptions.map((category: any, index) => (
                <CommandItem
                  key={index}
                  value={category.label}
                  onSelect={() => {
                    handleSubscriptionChange(category.label);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Check
                      className={`h-4 w-4 ${
                        selectedSubscriptions.includes(category.label)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    {category.label}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* error message */}
      {/* {errors.subscriptions && (
        <p className="text-red-500 text-sm">
          <>{errors.subscriptions.message}</>
        </p>
      )} */}
    </div>
  );
}
