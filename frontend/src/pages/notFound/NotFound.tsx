import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-center p-6">
      <h1 className="text-5xl font-bold text-[#0075de] mb-4">404</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-[#0075de] text-white px-4 py-2 rounded hover:bg-[#005bb5] transition cursor-pointer"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
