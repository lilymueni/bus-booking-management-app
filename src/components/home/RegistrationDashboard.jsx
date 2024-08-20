import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminRegistration from '../AdminDashboard/AdminRegistration';
import DriverRegistration from '../DriverDashboard/DriverRegistration';
import AccessDenied from './AccessDenied';


const RegistrationDashboard = () => {
    const { userRole } = useAuth();

    const renderContent = () => {
        switch (userRole) {
            case 'driver':
                return <DriverRegistration />;
            case 'admin':
                return <AdminRegistration />;
            case 'customer':
                return <AccessDenied />;
            default:
                return <AccessDenied />    
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

export default RegistrationDashboard;