"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import { useSimStore } from "@/context/sim-store";
import { icons } from "./icons";

import { NameComponent } from "./_components/NameComponent";
import { SimFormDataToSend, SimHolder } from "@/lib/helpers";
import { DepartmentComponent } from "./_components/DepartmentComponent";
import { PhoneNumberComponent } from "./_components/PhoneNumberComponent";
import { SubscriptionComponent } from "./_components/SubscriptionComponent";
import StatusComponent from "./_components/StatusComponent";

const SimCardSchema = z.object({
  name: z.string().optional(),

  department: z
    .string()
    .min(1, "Departement est obligatoire")
    .max(50, "Departement ne doit pas dépasser 50 caractères")
    .optional(),

  simNumber: z
    .string()
    .min(10, "Le numéro de la Sim est obligatoire (10 chiffres)")
    .regex(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Le numéro de la Sim doit être composé de 10 chiffres"
    ), // E.164 format,

  status: z.string().min(1, "Le statut est obligatoire").optional(),

  subscriptions: z.array(z.string()),
  cost: z.number().min(1, "Le coût est obligatoire").optional(),
});

export type SimFormData = z.infer<typeof SimCardSchema>;

const AddItemDialog = () => {
  const methods = useForm<SimFormData>({
    resolver: zodResolver(SimCardSchema),
    defaultValues: {
      department: "",
      name: "",
      simNumber: "",
    },
  });

  const { reset, watch, setValue } = methods;

  const [selectedTab, setSelectedTab] = useState<SimHolder["status"]>("Active");
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<
    SimHolder["subscriptions"]
  >([]);

  const [selectedIcon, setSelectedIcon] = useState<null | ReactNode>(
    icons.find((icon) => icon.isSelected === true)?.icon
  );

  const {
    addSim,
    isLoading,
    openSimDialog,
    setOpenSimDialog,
    setSelectedSim,
    selectedSim,
    updateSim,
    allSubscriptions,
  } = useSimStore();
  const { toast } = useToast();
  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);

  const selectedSubscriptionsWatch = watch(
    "subscriptions",
    selectedSubscriptions
  );

  // Calculate the total price based on selected subscriptions
  const calculateTotalPrice = (subscriptions: string[]) => {
    return subscriptions.reduce((total: any, subscription: any) => {
      const subs: any = allSubscriptions.find(
        (cat: any) => cat.label === subscription
      );

      // console.log("Subscription dialog: ", subs);
      return total + (subs ? subs.price : 0);
    }, 0);
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice(selectedSubscriptions);
    setValue("cost", totalPrice);
  }, [selectedSubscriptions, setValue]);

  useEffect(() => {
    if (selectedSim) {
      /* Update form with selected product details when dialog opens */
      reset({
        department: selectedSim.department,
        name: selectedSim.name,
        simNumber: selectedSim.simNumber,
        status: selectedSim.status,
        subscriptions: selectedSim.subscriptions.map((sub: any) => sub.label),
        cost: selectedSim.cost,
      });
      setSelectedTab(selectedSim.status);
      setSelectedSubscriptions(
        selectedSim.subscriptions.map((sub: any) => sub.label) || []
      );
    } else {
      reset({
        department: "",
        name: "",
        simNumber: "",
        status: "Draft",
        subscriptions: [],
        cost: 0,
      });

      setSelectedTab("Draft");
      setSelectedSubscriptions([]);
      // setSelectedIcon(icons.find((icon) => icon.isSelected === true)?.icon);
    }
  }, [selectedSim, openSimDialog, reset]);

  const onSubmit = async (data: SimFormData) => {
    // console.log("Form Data:", data); // Log 2
    try {
      const newSim: SimFormDataToSend = {
        department: data.department ?? "Undefined",
        name: data.name ?? "Undefined",
        simNumber: data.simNumber,
        status: selectedTab,
        subscriptions: selectedSubscriptions,
        cost: calculateTotalPrice(selectedSubscriptions),
      };

      const result = selectedSim
        ? await updateSim(newSim)
        : await addSim(newSim);

      // console.log("Result: ", result);

      if (result.success === true) {
        toast({
          description: `La Sim ${data.simNumber} a été [${
            selectedSim ? "mis à jour" : "ajoutée"
          }] avec succès`,
        });
        dialogCloseRef.current?.click();
      }
      toast({
        // @ts-ignore
        description: `${result?.message}`,
      });
    } catch (error) {
      console.log("Error: ", error);
      toast({
        title: "Error",
        description: "Failed to add or update Sim",
      });
    }
  };

  function handleReset() {
    reset();
    setSelectedSim(null);
  }

  function onSelectedIcon(icon: ReactNode) {
    // console.log(`Selected Icon: ${icon}`);

    // ensuring that the state update happens outside of the render cycle
    setTimeout(() => {
      setSelectedIcon(icon);
    }, 0);
  }
  return (
    <Dialog open={openSimDialog} onOpenChange={setOpenSimDialog}>
      <DialogTrigger asChild>
        <Button className="h-10">Ajouter une Sim</Button>
      </DialogTrigger>
      <DialogContent className="p-7 px-8 poppins max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle className="text-[22px]">
            {selectedSim ? "Modifier Sim" : "Ajouter une Sim"}
          </DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour{" "}
            {selectedSim ? "modifier" : "ajouter"} une Sim
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {/* Form */}
        <FormProvider {...methods}>
          {/* {console.log("Current Form Values:", methods.watch())} Log 13 */}
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-1">
              {/* First Row */}
              <div className="grid grid-cols-2 gap-7">
                <NameComponent
                // onSelectedIcon={onSelectedIcon}
                />
                <DepartmentComponent />
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-2 gap-5 items-start mt-4">
                <PhoneNumberComponent />
                <StatusComponent
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              </div>

              {/* Third Row */}
              <div className="mt-3 grid grid-cols-3 gap-7 lg:grid-cols-1 max-lg:grid-cols-1 max-sm:grid-cols-1">
                <SubscriptionComponent
                  selectedSubscriptions={selectedSubscriptions}
                  setSelectedSubscription={setSelectedSubscriptions}
                />
              </div>
            </div>

            <DialogFooter className="mt-9 mb-4 flex items-center gap-4">
              <DialogClose
                asChild
                ref={dialogCloseRef}
                onClick={() => {
                  handleReset();
                }}
              >
                <Button variant={"secondary"} className="h-11 px-11">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="h-11 px-11">
                {isLoading
                  ? "Chargement..."
                  : `${selectedSim ? "Modifier Sim" : "Ajouter une Sim"}`}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
