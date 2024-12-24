import { getUserData } from "@/url/urlPath";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// import { signOut } from "next-auth/react";

export interface IAddress {
  _id: string;
  street: string;
  city: string;
  state: string;
  buildingNo: string;
  landmark: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  userMobile:string;
  userName:string;

}

interface User {
  id?: string;
  username?: string;
  email: string;
  mobile?: string;
  isAdmin?: boolean;
  otp?: string;
  isVerified?: boolean;
  preference?: string;
  isBlocked?: boolean;
  wishlist?: string[];
  address?:IAddress[]
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  // userToken: string | null;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  isLoggedIn: false,
  loading: false,
  error: null,
};




export const fetchUserDetails = createAsyncThunk(
  "admin/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getUserData, { withCredentials: true });
      if (response.data.success === true) {
        console.log(response.data);
        return response.data.user;
      } else {
        return rejectWithValue("Failed to fetch admin details");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
    }
  }
);


const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setUserLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setUserDataState:(state,action:PayloadAction<User>) => {
      state.user = action.payload;
    },
   
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null; // Clear error on successful fetch
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Cast action.payload to string
      })
     
  },
});

export const { logoutSuccess, setUserLogin, setUserDataState } = authSlice.actions;
export const selectUser = (state:any) => state.user.user;
export const selectIsUserLoggedIn = (state:any) => state.user.isLoggedIn;
export const selectLoading = (state:any) => state.user.loading;
export const selectError = (state:any) => state.user.error;
export default authSlice.reducer;
