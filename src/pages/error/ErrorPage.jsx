import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate= useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold text-[#1F1A5F]">404</h1>

        <p className="text-xl text-[#808080]">
          Oops! The page you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-3 bg-[#6976EB] text-white rounded-lg hover:bg-[#1F1A5F] transition"
        >
           Back To Safety
        </button>
      </div>
    </div>
  );
}