import { convertStringToIcon } from "@/components/appTable/sim-dialog/icon-selector";
import { icons } from "@/components/appTable/sim-dialog/icons";
import { InkModel } from "@/lib/helpers";
import axios from "axios";
import { create } from "zustand";

const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API as string;

interface InkState {
  allInks: InkModel[];
  setAllInks: (allInks: InkModel[]) => void;
  //
  isLoading: boolean;
  //
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  //
  openInkDialog: boolean;
  setOpenInkDialog: (openInkDialog: boolean) => void;
  //
  selectedInk: InkModel | null;
  setSelectedInk: (ink: InkModel | null) => void;
  //
  loadInks: () => void;
  updateInk: (updatedInk: InkModel) => Promise<{ success: boolean }>;
  addInk: (ink: InkModel) => Promise<{ success: boolean }>;
  deleteInk: (inkId: string) => Promise<{ success: boolean }>;
  //
  totalInks: number;
  setTotalInks: () => void;
  //
  model: number;
  setModel: () => void;
}

export const useInkStore = create<InkState>((set, get) => ({
  allInks: [],
  isLoading: false,
  selectedInk: null,
  openDialog: false,
  openInkDialog: false,
  totalInks: 0,
  model: 0,
  setModel: () => {
    const { allInks } = get();

    // Get unique models by grouping them
    const uniqueModels = new Set(allInks.map((ink) => ink.model));
    const totalModelType = uniqueModels.size;

    // If you want to also see the count of each model, you can do:
    const modelCounts = allInks.reduce((acc, ink) => {
      acc[ink.model] = (acc[ink.model] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // console.log("Model counts:", modelCounts); // This will show you how many of each model you have

    set({ model: totalModelType });
  },
  setTotalInks: () => {
    const { allInks } = get();

    // Calculate the total number of inks in stock
    const totalInksInStock = allInks.reduce((total, ink) => {
      return total + ink.quantity;
    }, 0);

    set({ totalInks: totalInksInStock });
  },
  setOpenDialog: (openDialog: boolean) => {
    set({ openDialog: openDialog });
  },
  setAllInks: (allInks: InkModel[]) => {
    set({ allInks });
  },
  setOpenInkDialog: (openInkDialog: boolean) => {
    set({ openInkDialog: openInkDialog });
  },
  setSelectedInk: (ink: InkModel | null) => {
    set({ selectedInk: ink });
  },
  loadInks: async () => {
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_DOMAIN}/api/v1/inks/get-inks`
      );

      if (response.status === 200) {
        throw new Error("Failed to fetch inks");
      }

      // const inks = response.data.map((ink: any) => ({
      //   ...ink,
      //   icon: convertStringToIcon(ink.icon, icons),
      // }));

      set({ allInks: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      console.error("Error loading inks:", error);
      throw error;
    }
  },
  updateInk: async (updatedInk: InkModel) => {
    return { success: true };
  },
  addInk: async (ink: InkModel) => {
    return { success: true };
  },
  deleteInk: async (inkId: string) => {
    return { success: true };
  },
}));
