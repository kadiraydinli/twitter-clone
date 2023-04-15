import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import useCurrentUser from "./useCurrentUser";


const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);
    }, [currentUser?.followingIds, userId]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if (isFollowing) {
                request = () => axios.delete('/api/follow', { data: { userId } });
            } else {
                request = () => axios.post('/api/follow', { userId });
            }

            await request();

            mutateCurrentUser();
            mutateFetchedUser();

            toast.success('Success!');
        } catch (err) {
            toast.error("Something went wrong!");
        }
    }, [currentUser, isFollowing, loginModal, mutateCurrentUser, mutateFetchedUser, userId]);

    return {
        toggleFollow,
        isFollowing
    };
}

export default useFollow;