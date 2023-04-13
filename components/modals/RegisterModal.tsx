import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";

interface RegisterModalProps {}

const RegisterModal: React.FC<RegisterModalProps> = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/register", {
        email,
        password,
        name,
        username,
      });

      toast.success("Account created!");

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onOpen();
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [email, name, password, registerModal, username]);

  const onToggle = useCallback(() => {
    if (isLoading) return null;

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      disabled={isLoading}
      title="Create an Account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
