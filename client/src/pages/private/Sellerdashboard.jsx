import {useState} from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { DashboardSidebar } from '../../components/dashboardsidebar';
import { DataTable } from '../../components/datatable';

export function SellerDashboard() {
    const recentSalesColumns = ['Order ID', 'Product', 'Qty', 'Amount', 'Status'];
    const recentSalesData = [];
    const [activeMenu, setActiveMenu] = useState('overview');


    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="flex pt-20">
                <DashboardSidebar userType="seller" activeMenu={activeMenu} onMenuClick={setActiveMenu}/>
                
                <div className="flex-1 p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Seller Dashboard</h1>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold">$12,458</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                            <p className="text-2xl font-bold">379</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Active Products</p>
                            <p className="text-2xl font-bold">28</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Avg. Order Value</p>
                            <p className="text-2xl font-bold">$34.45</p>
                        </div>
                    </div>

                    {/* Recent Sales and Top Product */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
                            <DataTable columns={recentSalesColumns} data={recentSalesData} />
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-bold mb-4">Top Product</h2>
                            <div className="bg-white rounded-lg p-6 border border-gray-200 h-64">
                                <p className="text-gray-500 text-center mt-20">No data available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}