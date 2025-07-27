import { Loader2 } from 'lucide-react'; 

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin h-10 w-10 text-[#0075de]" />
        <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
