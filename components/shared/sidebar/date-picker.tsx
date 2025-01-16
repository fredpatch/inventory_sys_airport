import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";

export function DatePicker() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden px-0">
      <SidebarGroupContent>
        <Calendar className="[&_[role=gridcell].bg-accent]:dark:bg-primary [&_[role=gridcell].bg-accent]:bg-black [&_[role=gridcell].bg-accent]:text-white [&_[role=gridcell]]:w-[33px]" />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
