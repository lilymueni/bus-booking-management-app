import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import DriverDashboard from '../DriverDashboard/DriverDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AccessDenied from './AccessDenied';

const UserDashboard = () => {
    const { userRole } = useAuth();

    const renderContent = () => {
        switch (userRole) {
            case 'driver':
                return <DriverDashboard />;
            case 'admin':
                return <AdminDashboard />;
            case 'customer':
                return <AccessDenied />;
        }
    };
    return (
        <div className="dashboard">
            <div className="content-card">
                {renderContent()}
            </div>
        </div>
    );
};

export default UserDashboard;