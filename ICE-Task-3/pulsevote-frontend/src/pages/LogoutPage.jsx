import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return (
    <Layout>
      <p>You’ve been logged out.</p>
    </Layout>
  );
};

export default LogoutPage;
 
