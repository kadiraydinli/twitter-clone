import { useMemo } from "react";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import Form from "@/components/Form";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  const loading = isLoading || !fetchedPost;

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
      <Header showBackArrow label="Tweet" />
      {loading ? (
        loaderContent
      ) : (
        <>
          <PostItem data={fetchedPost} />
          <Form
            postId={postId as string}
            isComment
            placeholder="Tweet your reply"
          />
          <CommentFeed comments={fetchedPost?.comments} />
        </>
      )}
    </>
  );
};

export default PostView;
