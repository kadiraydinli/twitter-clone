import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";

interface SidebarTweetButtonProps {}

const SidebarTweetButton: React.FC<SidebarTweetButtonProps> = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/")}>
      <div className="rounded-full lg:hidden mt-6 w-14 h-14 p-4 flex items-center justify-center bg-sky-300 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-300 hover:bg-opacity-80 transition cursor-pointer">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;