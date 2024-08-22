import { SignUp } from "@clerk/nextjs";

const SignupPage = () => {
  return (
    <div className="w-full mx-auto h-screen flex items-center justify-center">
      <SignUp />
    </div>
  );
};
export default SignupPage;
