"use client";

import React, { useEffect, useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useUserStore from "@/context/user-store";
import { users_columns } from "./table/users-columns";
import { TeamTableDef } from "./table/team-table";
import UserDialog from "../user-dialog/user-dialog";
import { DeleteDialogUser } from "../user-dialog/delete-user-dialog";
import { redirect } from "next/navigation";
import { debounce, set } from "lodash";

const TeamTable = () => {
  const { users, roles, error, isLoading, getUsers } = useUserStore();
  const [isClient, setIsClient] = React.useState(false);

  // Memorize the debounced loadUsers function
  const debouncedLoadUsers = useMemo(() => debounce(getUsers, 1000), []);

  useEffect(() => {
    if (roles) {
      console.log("User is an admin");
    } else {
      console.log("User is not an admin");
    }
    setIsClient(true);
    debouncedLoadUsers();
  }, [debouncedLoadUsers, roles, isClient]);

  if (!isClient) {
    return null; // Prevent SSR-related issues
  }

  return (
    <>
      {error && <div>Error: {error}</div>}
      {!users && <div>No users found</div>}
      {!isLoading ? (
        roles ? (
          <Card className="mt-5 flex flex-col shadow-none poppins border-none">
            <CardHeader className="flex justify-between p-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="font-bold text-[32px]">
                    {"Team Management"}
                  </CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-200">
                    {users.length} members
                  </p>
                </div>
                <UserDialog />
                <DeleteDialogUser />
              </div>
            </CardHeader>

            <CardContent>
              <TeamTableDef data={users} columns={users_columns} />
            </CardContent>
          </Card>
        ) : (
          <div>{redirect("/access-denied")}</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default TeamTable;
