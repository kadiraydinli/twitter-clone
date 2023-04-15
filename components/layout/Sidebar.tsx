import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";

import useCurrentUser from "@/hooks/useCurrentUser";

interface SidebarProps {}

type SidebarItemsType = {
  label: string;
  href: string;
  icon: IconType;
  auth?: boolean;
  alert?: boolean;
};

const Sidebar: React.FC<SidebarProps> = () => {
  const { data: currentUser } = useCurrentUser();

  const items: SidebarItemsType[] = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col item-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item, index) => (
            <SidebarItem
              key={`sidebar-${index}`}
              label={item.label}
              href={item.href}
              icon={item.icon}
              auth={item.auth}
              alert={item.alert}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={signOut}
              label={"Logout"}
              href={"/"}
              icon={BiLogOut}
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
