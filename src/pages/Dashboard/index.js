import React from 'react';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
 
export const Dashboard = () => {

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar />
                <h1>Dashboard</h1>
            </div>
            
        </div>
    );
}