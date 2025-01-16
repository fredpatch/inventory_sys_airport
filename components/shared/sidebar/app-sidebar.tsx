"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { DatePicker } from "./date-picker";
import { Calendars } from "./calendar";

import { NavMain } from "@/components/shared/sidebar/nav-main";
import { NavProjects } from "@/components/shared/sidebar/nav-project";
import { NavUser } from "@/components/shared/sidebar/nav-user";
import { TeamSwitcher } from "@/components/shared/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { toast } from "@/hooks/use-toast";
import { LoginButton } from "../auth/login-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-provider";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const access_token = user?.access_token;



  // Ensure the user object matches the expected `User` type
  const refineUser = {
    profile_img: user?.profile_img ?? "",
    access_token: user?.access_token ?? "",
    username: user?.username ?? "",
    fullname: user?.fullname ?? "",
    role: user?.role ?? "",
  };

  const data = {
    user: refineUser,
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Inventory Management",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Inventory",
            url: "/",
          },
          {
            title: "Transactions",
            url: "/transaction",
          },
          /* Add more items */
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          // {
          //   title: "General",
          //   url: "#",
          // },
          {
            title: "User Management",
            url: "/settings/teams",
          },
          // {
          //   title: "Billing",
          //   url: "#",
          // },
          // {
          //   title: "Limits",
          //   url: "#",
          // },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={data.user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
