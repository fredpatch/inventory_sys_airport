"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Helper function to generate breadcrumb items
const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split("/").filter((segment) => segment);

  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return { name: segment, href };
  });
};

export const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Dynamic segments */}
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={crumb.href}>
            <BreadcrumbLink href={crumb.href}>
              {crumb.name.replace(/-/g, " ")} {/* Replace dashes with spaces */}
            </BreadcrumbLink>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
