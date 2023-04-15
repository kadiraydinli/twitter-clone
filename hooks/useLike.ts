import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

interface UserLikeProps {
    postId: string;
    userId?: string;
}

const useLike = ({ postId, userId }: UserLikeProps) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutatePost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likeIds || [];

        return list.includes(currentUser?.id);
    }, [currentUser?.id, fetchedPost?.likeIds]);

    const toggleLike = useCallback(async () => {
        if (!currentUser) return loginModal.onOpen();

        try {
            let request;

            if (hasLiked) {
                request = () => axios.delete('/api/like', { data: { postId } });
            } else {
                request = () => axios.post('/api/like', { postId });
            }

            await request();

            mutatePost();
            mutateFetchedPosts();

            toast.success('Success!');
        } catch (err) {
            toast.error('Something went wrong!');
        }
    }, [currentUser, hasLiked, loginModal, mutateFetchedPosts, mutatePost, postId]);

    return {
        hasLiked,
        toggleLike
    };
};

export default useLike;