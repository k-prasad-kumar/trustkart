import { SignIn } from "@clerk/nextjs";

const SigninPage = () => {
  return (
    <div className="w-full mx-auto h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
};
export default SigninPage;
