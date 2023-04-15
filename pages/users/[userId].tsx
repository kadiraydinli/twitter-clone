import { useMemo } from "react";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";
import Header from "@/components/Header";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";

interface UserViewProps {}

const UserView: React.FC<UserViewProps> = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  const loading = isLoading || !fetchedUser;

  const loaderContent = useMemo(
    () => (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="ligthBlue" size={80} />
      </div>
    ),
    []
  );

  return (
    <>
      <Header
        showBackArrow
        label={loading ? "User Profile" : fetchedUser?.name}
      />
      {loading ? (
        loaderContent
      ) : (
        <>
          <UserHero userId={userId as string} />
          <UserBio userId={userId as string} />
        </>
      )}
    </>
  );
};

export default UserView;
