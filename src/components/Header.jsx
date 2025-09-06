import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Music,LogOut, User, Crown, Shield } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'premium':
        return <Shield className="w-4 h-4 text-purple-500" />;
      default:
        return <User className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'premium':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Music className="w-8 h-8 text-blue-300" />
            <span className="text-2xl font-semibold text-blue-500">
              JammiFy
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Info (desktop) */}
            {user && (
              <div className="hidden sm:flex items-center space-x-3 px-3 py-1 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                {getRoleIcon(user.role)}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.username}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </div>
            )}

            {/* Auth Actions */}
            {user ? (
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile User Info */}
        {user && (
          <div className="sm:hidden py-2">
            <div className="flex items-center justify-between px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                {getRoleIcon(user.role)}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.username}
                </span>
              </div>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                {user.role}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
