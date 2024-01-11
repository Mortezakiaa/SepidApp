// guards
import AuthGuard from '../guards/AuthGuard';
// components
import MainLayout from './main';
import DashboardLayout from './dashboard';
import LogoOnlyLayout from './LogoOnlyLayout';
import React from 'react';

// ----------------------------------------------------------------------

type propsTypes = {
  children: React.ReactNode;

  variant?: 'dashboard' | 'main' | 'logoOnly';
};

export default function Layout({ variant = 'dashboard', children }: propsTypes) {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  if (variant === 'main') {
    return <MainLayout>{children}</MainLayout>;
  }

  return (
    <AuthGuard>
      <DashboardLayout> {children} </DashboardLayout>
    </AuthGuard>
  );
}
