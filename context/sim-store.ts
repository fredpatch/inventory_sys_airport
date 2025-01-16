import { create } from "zustand";
import axios from "axios";
import {
  convertIconToString,
  convertStringToIcon,
} from "@/components/appTable/sim-dialog/icon-selector";
import { icons } from "@/components/appTable/sim-dialog/icons";
import {
  SimFormDataToSend,
  SimFormDataToUpdate,
  SimHolder,
} from "@/lib/helpers";
import { getStatusBreakdown } from "@/components/sim-section/stats/getStatusBreakdown";
import { getSimsPerDepartment } from "@/components/sim-section/stats/getSimsPerDepartment";
import { getSubscriptionCostPerDepartment } from "@/components/sim-section/stats/getSubscripptionCostPerDepartment";

const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API as string;

// Structure of the overall state of the app
interface ProductState {
  allSims: SimHolder[];
  setAllSims: (allSims: SimHolder[]) => void;
  //
  allSubscriptions: string[];
  setAllSubscriptions: (allSubscriptions: string[]) => void;
  //
  isLoading: boolean;
  //
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  //
  openSimDialog: boolean;
  setOpenSimDialog: (openProductDialog: boolean) => void;
  //
  selectedSim: SimFormDataToUpdate | null;
  setSelectedSim: (sim: SimFormDataToUpdate | null) => void;
  //
  loadSims: () => Promise<{ success: boolean }>;
  loadSubscriptions: () => Promise<void>;
  addSim: (
    sim: SimFormDataToSend
    // access_token: string
  ) => Promise<{ success: boolean; message: string }>;
  deleteSim: (simCardId: string) => Promise<{ success: boolean }>;
  updateSim: (updatedSim: SimFormDataToSend) => Promise<{ success: boolean }>;
  //
  totalCost: () => number;

  // KPIs
  totalSims: number;
  activeSims: number;
  inactiveSims: number;
  draftSims: number;
  averageCost: number;
  updateKPIs: () => void;
  simStats: () => void;
}

export const useSimStore = create<ProductState>((set, get) => ({
  allSims: [],
  allSubscriptions: [],
  isLoading: false,
  selectedSim: null,
  openDialog: false,
  setAllSubscriptions: (allSubscriptions: string[]) => {
    set({ allSubscriptions });
  },

  totalCost: () => {
    return get().allSims.reduce((total, sim) => total + sim.cost, 0);
  },

  setOpenDialog: (openDialog) => {
    set({ openDialog: openDialog });
  },
  openSimDialog: false,
  setOpenSimDialog: (openSimDialog) => {
    set({ openSimDialog: openSimDialog });
  },
  setSelectedSim: (sim: SimFormDataToUpdate | null) => {
    set({ selectedSim: sim });
  },
  setAllSims: (allSims) => {
    set({ allSims: allSims });
  },

  // KPIs
  totalSims: 0,
  activeSims: 0,
  inactiveSims: 0,
  draftSims: 0,
  averageCost: 0,
  updateKPIs: () => {
    const { allSims } = get();
    const totalSims = allSims.length;
    const activeSims = allSims.filter((sim) => sim.status === "Active").length;
    const inactiveSims = allSims.filter(
      (sim) => sim.status === "Inactive"
    ).length;
    const draftSims = allSims.filter((sim) => sim.status === "Draft").length;
    const totalCost = allSims.reduce((total, sim) => total + sim.cost, 0);
    const averageCost = totalSims > 0 ? totalCost / totalSims : 0;

    set({ totalSims, activeSims, inactiveSims, draftSims, averageCost });
  },
  // Sim Stats
  simStats: () => {
    const allSims = get().allSims;

    return {
      statusBreakdown: getStatusBreakdown(allSims),
    };
  },
  loadSubscriptions: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_DOMAIN}/api/v1/subscriptions/get-subscriptions`
      );

      // console.log("RESPONSE ==>", response.data);
      const subscriptions: string[] = response.data.map(
        (subscription: any) => ({
          label: subscription.label,
          price: subscription.price,
        })
      );

      set({ allSubscriptions: subscriptions, isLoading: false });
    } catch (error) {
      console.error("Failed to load subscriptions:", error);
      set({ isLoading: false });
    }
  },
  loadSims: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_DOMAIN}/api/v1/sims/get-sim-card`
      );

      // console.log("RESPONSE ==>", response.data);

      if (response.data) {
        const sims = response.data.map((sim: any) => ({
          ...sim,
          icon: convertStringToIcon(sim.icon, icons),
        }));
        set({ allSims: sims, isLoading: false });
        return sims;
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addSim: async (sim: SimFormDataToSend) => {
    set({ isLoading: true });

    try {
      const simToSave = {
        ...sim,
        icon: convertIconToString(sim.icon),
        // quantityInStock: sim.quantityInStock - sim.quantitySold,
      };
      const response = await axios.post(
        `${NEXT_PUBLIC_API_DOMAIN}/api/v1/sims/add-sim-card`,
        simToSave,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.status === 203) {
        return { success: false, message: response.data.message };
      }

      const newSim = {
        ...response.data,
        icon: convertStringToIcon(response.data.icon, icons),
      };
      set((state) => ({
        allSims: [...state.allSims, newSim],
        isLoading: false,
      }));
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Failed to add product:", error);
      return { success: false, message: "Failed to add product" };
    } finally {
      set({ isLoading: false });
    }
  },

  updateSim: async (updatedSim: SimFormDataToSend) => {
    set({ isLoading: true });
    try {
      const updatedSimCard = {
        ...updatedSim,
        icon: convertIconToString(updatedSim.icon),
      };

      // api call
      const response = await axios.patch(
        `${NEXT_PUBLIC_API_DOMAIN}/api/v1/sims/update-sim-card`,
        updatedSimCard,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // console.log("RESPONSE ==>", response.data);
      if (response.data) {
        const updatedCardSim = {
          ...response.data,
          icon: convertStringToIcon(response.data.icon, icons),
        };
        set((state) => ({
          allSims: state.allSims.map((sim) =>
            sim.id === updatedCardSim.id ? updatedCardSim : sim
          ),
          isLoading: false,
        }));
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      console.error("Failed to update product:", error);
      return { success: false };
    } finally {
      set({ isLoading: false });
      set({ openSimDialog: false });
    }
  },

  deleteSim: async (simId: string) => {
    set({ isLoading: true });
    try {
      // Simulate the deletion process with a delay
      const response = await axios.delete(
        `${NEXT_PUBLIC_API_DOMAIN}/api/v1/sims/delete-sim/${simId}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.status === 200) {
        // Remove the deleted sim card from the state
        set((state) => ({
          allSims: state.allSims.filter((sim) => sim.id !== parseInt(simId)),
          isLoading: false,
        }));

        return { success: true, message: "Sim Card deleted" };
      }

      return { success: false };
    } catch (error) {
      console.error("Failed to delete product:", error);
      return { success: false };
    } finally {
      set({ isLoading: false });
      set({ openDialog: false });
      set({ selectedSim: null });
    }
  },
}));

export const useSimStats = () => {
  const { allSims, allSubscriptions } = useSimStore();
  return {
    statusBreakdown: getStatusBreakdown(allSims),
    simsPerDepartment: getSimsPerDepartment(allSims),
    subscriptionCostPerDepartment: getSubscriptionCostPerDepartment(
      allSims
      // allSubscriptions
    ),
  };
};
