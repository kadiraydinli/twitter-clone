import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

interface SidebarLogoProps {}

const SidebarLogo: React.FC<SidebarLogoProps> = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="
        rounded-full 
        h-14 
        w-14 
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300
        hover:bg-opacity-10
        cursor-pointer
        transition
        "
    >
      <BsTwitter size={100} color="white" />
    </div>
  );
};

export default SidebarLogo;
