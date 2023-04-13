import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";

interface SidebarProps {}

type SidebarItemsType = {
  label: string;
  href: string;
  icon: IconType;
};

const Sidebar: React.FC<SidebarProps> = () => {
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
    },
    {
      label: "Profile",
      href: "/profile/123",
      icon: FaUser,
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
            />
          ))}
          <SidebarItem
            onClick={() => {}}
            label={"Logout"}
            href={"/"}
            icon={BiLogOut}
          />
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
