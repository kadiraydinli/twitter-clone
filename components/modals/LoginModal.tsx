import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import Input from "../Input";
import Modal from "../Modal";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

interface LoginModalProps {}

const LoginModal: React.FC<LoginModalProps> = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await signIn("credentials", {
        email,
        password,
      });
      loginModal.onOpen();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [email, loginModal, password]);

  const onToggle = useCallback(() => {
    if (isLoading) return null;

    loginModal.onClose();
    registerModal.onOpen();
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
        First time using Twitter?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Create an Account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      disabled={isLoading}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
