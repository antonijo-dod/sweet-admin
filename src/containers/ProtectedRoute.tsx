import { Layout } from '@/components/layout';
import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks/auth';

const ProtectedRoute = ({ redirectPath = '/login' }): ReactElement => {
  //const { user } = useAuthContext();
  const { isLoading, user } = useAuthContext();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Layout />;
};

export default ProtectedRoute;
