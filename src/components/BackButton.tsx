import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  text: string;
  to: string;
}

function BackButton({ text, to }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to); // Navigate to the specified path
  };

  return (
    <div className="mb-2">
      <button
        onClick={handleClick}
        className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
      >
        <ArrowBigLeft size={30} strokeWidth={1.5} className="mr-2" />
        {text}
      </button>
    </div>
  );
}
export default BackButton;
