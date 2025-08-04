import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto" />
                <h1 className="text-xl font-semibold mt-4 text-gray-700">Loading...</h1>
                <p className="text-gray-500 mt-2">Please wait while we load the content.</p>
            </div>
        </div>
    );
};

export default Loading;