import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";

interface EditModalProps {}

const EditModal: React.FC<EditModalProps> = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

  const editModal = useEditModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [currentUser]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateFetchedUser();

      toast.success("Updated");

      editModal.onClose();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    coverImage,
    editModal,
    mutateFetchedUser,
    name,
    profileImage,
    username,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        disabled={isLoading}
        label="Upload Profile Image"
        value={profileImage}
        onChange={(image) => setProfileImage(image)}
      />
      <ImageUpload
        disabled={isLoading}
        label="Upload Cover Image"
        value={coverImage}
        onChange={(image) => setCoverImage(image)}
      />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        disabled={isLoading}
      />
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        disabled={isLoading}
      />
      <Input
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
