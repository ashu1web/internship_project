import { Link, useNavigate } from 'react-router-dom';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../api/Auth'; // adjust path as needed

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  console.log("Navbar user id:", user?._id || "No user");




  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate('/login');
    },
    onError: (err) => {
      console.error('Logout failed:', err);
    },
  });

  return (
    <nav className="bg-white shadow px-6 py-4 mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MiniLinkedIn
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Home
          </Link>

          {user && (
            <Link to={`/profile/${user._id}`} className="text-gray-700 hover:text-blue-600 font-medium transition">
              Profile
            </Link>
          )}

        

          {user && (
            <button
              onClick={() => logout()}
              disabled={isLoading}
              className="bg-red-100 text-red-600 px-4 py-1 rounded hover:bg-red-200 text-sm transition disabled:opacity-50"
            >
              {isLoading ? 'Logging out...' : 'Logout'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
