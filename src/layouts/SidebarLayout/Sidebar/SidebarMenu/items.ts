import { ReactNode } from "react";
import HotelIcon from "@mui/icons-material/Hotel";
import {
  SupervisedUserCircleSharp,
  AdminPanelSettings,
  RoomPreferences,
  Home,
  FeaturedPlayList,
} from "@mui/icons-material";

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: "",
    items: [
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: Home,
      },
      {
        name: "Hotels",
        link: "/hotels",
        icon: HotelIcon,
      },
      {
        name: "Rooms",
        link: "/rooms",
        icon: RoomPreferences,
      },
      {
        name: "Customers",
        link: "/customers",
        icon: SupervisedUserCircleSharp,
      },
      {
        name: "Bookings",
        link: "/bookings",
        icon: FeaturedPlayList,
      },
    ],
  },
  {
    heading: "Admin",
    items: [
      {
        name: "Moderators",
        link: "/moderators",
        icon: AdminPanelSettings,
      },
    ],
  },
];

export default menuItems;
