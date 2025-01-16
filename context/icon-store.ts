import { allIconsArray } from "@/components/appTable/sim-dialog/icons";
import { create } from "zustand";

export const useIconStore = create((set) => ({
  allIcons: allIconsArray,
  selectedIcon: null,
  updateSelectedIcon: (icon: any) =>
    set((state: any) => ({
      allIcons: state.allIcons.map((item: any) => ({
        ...item,
        isSelected: item.icon === icon,
      })),
      selectedIcon: icon,
    })),
}));
