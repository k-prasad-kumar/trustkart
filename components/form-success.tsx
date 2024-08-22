import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FromSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FromSuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center text-emerald-500 text-sm gap-x-2">
      <CheckCircledIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
export default FormSuccess;
