import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const token = localStorage.getItem('token');

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
 
