import axios from "axios";
import { create } from "zustand";

const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API as string;

// Define the structure for a User object
export interface User {
  identities: any;
  email: string;
  user_metadata: {
    phone: string;
    sku: string;
  };
  blocked: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  app_metadata: {};

  given_name: string;
  family_name: string;
  name: string;
  nickname: string;
  picture: string;
  user_id?: string;
  connection: string;
  password: string;
  verify_email: boolean;
  username: string;
}

// interface User {
//   access_token: string;
//   username: string;
//   fullname: string;
//   role: string;
// }

export interface SaveUser {
  email: string;
  identities: any;
  user_metadata: {
    phone: string;
    sku: string;
  };
  blocked: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  app_metadata: {};

  given_name: string;
  family_name: string;
  name: string;
  nickname: string;
  picture: string;
  connection: string;
  password: string;
  username: string;
  verify_email: boolean;
}

type Role = {
  id: string;
  name: string;
  description: string;
};

// Structure of the overall state of the app
interface UserState {
  users: User[];
  lastUpdated: number;
  setAllUsers: (users: any) => void;
  isLoading: boolean;
  error: string | null;
  //
  roles: any;
  setRoles: (roles: any) => void;
  //
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  //
  openUserDialog: boolean;
  setOpenUserDialog: (openUserDialog: boolean) => void;
  //
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  //
  loadUsers: () => Promise<void>;
  loadRoles: (user_id: any) => Promise<void>;
  addUser: (user: SaveUser) => Promise<{ success: boolean }>;
  updateUser: (user: User) => Promise<{ success: boolean }>;
  deleteUser: (user_id: string) => Promise<{ success: boolean }>;
  getUsers: () => Promise<User[]>;
}
// Create the Zustand store
const useUserStore = create<UserState>((set, get) => {
  return {
    users: [],
    lastUpdated: 0,
    roles: [],
    openDialog: false,
    openUserDialog: false,
    selectedUser: null,
    isLoading: false,
    error: null,
    setRoles: (roles) => {
      set({ roles });
    },
    setSelectedUser: (user: User | null) => {
      set({ selectedUser: user });
    },
    setOpenDialog: (openDialog) => {
      set({ openDialog: openDialog });
    },
    setAllUsers: (allUsers) => {
      set({ users: allUsers });
    },
    setOpenUserDialog: (openUserDialog) => {
      set({ openUserDialog: openUserDialog });
    },
    // Fetch and cache users
    loadUsers: async () => {
      const now = Date.now();

      // Skip fetching if data is fresh (less than 5 minutes old)
      // if (now - get().lastUpdated < 60000 * 5 ) {
      //   console.log("Data already exist, using cached users data");
      //   return;
      // }

      set({ isLoading: true, error: null });

      try {
        const response = await axios.post(
          `${NEXT_PUBLIC_API_DOMAIN}/api/v1/users/get-users`
        ); // Replace with your API endpoint

        // console.log("RESPONSE ==>", response);

        set({ users: response.data, isLoading: false, lastUpdated: now });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
    getUsers: async () => {
      // Prevent duplicate fetch
      const initialUsers = get().users;

      if (initialUsers.length === 0) {
        console.log("Fetching users from API");
        await get().loadUsers();
      }
      console.log("Users already exist, using cached users data");
      return get().users;
    },

    loadRoles: async (user_id: any) => {
      set({ isLoading: true, error: null });
      try {
        const role = await axios.get(
          `${NEXT_PUBLIC_API_DOMAIN}/api/v1/users/user-roles/${user_id}`
        );
        // console.log("ROLES FROM USER STORE ==>", role.data.isAdmin);

        set({ roles: role.data.isAdmin, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
        console.error("Failed to load roles:", error);
      }
    },
    addUser: async (user: SaveUser) => {
      set({ isLoading: true, error: null });
      // console.log("User data to be added:", user);

      try {
        const newUser = await axios.post(
          `${NEXT_PUBLIC_API_DOMAIN}/api/v1/users/add-user`,
          user
        );

        set((state) => ({
          users: [...state.users, newUser.data],
          isLoading: false,
          openUserDialog: false, // close the dialog
        }));

        return { success: true };
      } catch (error: any) {
        console.error("Failed to add user:", error);
        set({ isLoading: false, error: error.message });
        // return { success: false };
        return { success: false };
      }
    },
    updateUser: async (user: User) => {
      set({ isLoading: true, error: null });
      try {
        const result = await axios.patch(
          `
          ${NEXT_PUBLIC_API_DOMAIN}/api/v1/users/update-user`,
          user
        );

        if (result.data.success === true && result.data.user) {
          set((state) => ({
            users: state.users.map((u) =>
              u.user_id === user.user_id ? result.data.user : u
            ),
            isLoading: false,
            openUserDialog: false,
          }));
        } else {
          set({ isLoading: false });
        }

        return result.data;
      } catch (error: any) {
        console.error("Failed to update user:", error);
        set({ isLoading: false, error: error.message });
        return { success: false };
      }
    },

    deleteUser: async (user_id: any) => {
      set({ isLoading: true, error: null });
      try {
        // console.log("User ID to be deleted:", userId);
        const response = await axios.delete(
          `${NEXT_PUBLIC_API_DOMAIN}/api/v1/users/delete-user/${user_id}`
        ); // Replace with your API endpoint
        // console.log("RESPONSE ==>", response);
        if (response?.data.success == false) {
          return { success: false };
        }

        set((state) => ({
          users: state.users.filter((u) => u.user_id !== user_id),
          isLoading: false,
        }));

        return { success: true };
      } catch (error: any) {
        console.error("Failed to delete user:", error);
        set({ isLoading: false, error: error.message });
        return { success: false };
      }
    },
  };
});

export default useUserStore;
