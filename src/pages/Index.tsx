import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Home, DollarSign, Plus, Search, Settings, LogOut, Users, Building } from 'lucide-react';
import PropertyMap from '@/components/PropertyMap';
import DataTable from '@/components/rental/DataTable';
import FilterForm from '@/components/rental/FilterForm';
import DynamicForm from '@/components/rental/DynamicForm';
import ThemeToggle from '@/components/rental/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [showRentForm, setShowRentForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('已安全登出');
    navigate('/login');
  };

  // 整合的租賃記錄數據
  const mockRentalRecords = [
    {
      id: 1,
      tenantName: '王小明',
      tenantPhone: '0912-345-678',
      propertyAddress: '台北市大安區信義路100號',
      managementFee: 2000,
      parkingFee: 3000,
      rent: 25000,
      leaseStart: '2024-01-01',
      leaseEnd: '2024-12-31',
      paymentDate: 5, // 每月5號繳費
      status: '正常'
    },
    {
      id: 2,
      tenantName: '李小華',
      tenantPhone: '0923-456-789',
      propertyAddress: '新北市板橋區中山路200號',
      managementFee: 1500,
      parkingFee: 0,
      rent: 18000,
      leaseStart: '2023-12-01',
      leaseEnd: '2024-11-30',
      paymentDate: 10, // 每月10號繳費
      status: '正常'
    },
    {
      id: 3,
      tenantName: '張大明',
      tenantPhone: '0934-567-890',
      propertyAddress: '台中市西屯區台灣大道300號',
      managementFee: 1800,
      parkingFee: 2500,
      rent: 22000,
      leaseStart: '2024-03-01',
      leaseEnd: '2025-02-28',
      paymentDate: 15, // 每月15號繳費
      status: '正常'
    }
  ];

  const mockProperties = [
    { 
      id: 1, 
      address: '台北市大安區信義路100號', 
      landlordName: '張房東', 
      landlordPhone: '0934-567-890', 
      monthlyRent: 25000,
      type: '套房',
      deposit: 50000,
      area: 10,
      floor: '3F',
      hasParking: true,
      hasBalcony: false,
      coordinates: { lat: 25.0340, lng: 121.5645 }
    },
    { 
      id: 2, 
      address: '新北市板橋區中山路200號', 
      landlordName: '林房東', 
      landlordPhone: '0945-678-901', 
      monthlyRent: 18000,
      type: '雅房',
      deposit: 36000,
      area: 6,
      floor: '2F',
      hasParking: false,
      hasBalcony: false,
      coordinates: { lat: 25.0280, lng: 121.5700 }
    },
  ];

  const mockRents = [
    { 
      id: 1, 
      tenantName: '王小明', 
      propertyAddress: '台北市大安區信義路100號', 
      month: '2024-01', 
      amount: 25000, 
      status: '已繳費',
      paidDate: '2024-01-05',
      paymentMethod: '銀行轉帳'
    },
    { 
      id: 2, 
      tenantName: '李小華', 
      propertyAddress: '新北市板橋區中山路200號', 
      month: '2024-01', 
      amount: 18000, 
      status: '待繳費',
      paidDate: null,
      paymentMethod: null
    },
  ];

  // 租賃記錄的欄位定義
  const rentalColumns = [
    { key: 'tenantName', title: '租客姓名', sortable: true },
    { key: 'tenantPhone', title: '租客電話', sortable: true },
    { key: 'propertyAddress', title: '承租地址', sortable: true },
    { 
      key: 'propertyDetails', 
      title: '費用明細', 
      sortable: false,
      render: (item: any) => (
        <div className="space-y-1 text-sm">
          <div>租金: NT$ {item.rent?.toLocaleString()}</div>
          <div>管理費: NT$ {item.managementFee?.toLocaleString()}</div>
          {item.parkingFee > 0 && <div>車位費: NT$ {item.parkingFee?.toLocaleString()}</div>}
          <div className="font-medium text-blue-600">
            總計: NT$ {(item.rent + item.managementFee + item.parkingFee)?.toLocaleString()}
          </div>
        </div>
      )
    },
    { 
      key: 'leasePeriod', 
      title: '租期', 
      sortable: true,
      render: (item: any) => (
        <div className="text-sm">
          <div>{item.leaseStart}</div>
          <div>至</div>
          <div>{item.leaseEnd}</div>
        </div>
      )
    },
    { 
      key: 'paymentDate', 
      title: '繳租日', 
      sortable: true,
      render: (item: any) => `每月 ${item.paymentDate} 號`
    },
    { 
      key: 'status', 
      title: '狀態', 
      sortable: true,
      render: (item: any) => (
        <span className={`px-2 py-1 rounded text-xs ${
          item.status === '正常' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.status}
        </span>
      )
    }
  ];

  const tenantColumns = [
    { key: 'name', title: '姓名', sortable: true, editable: true },
    { key: 'phone', title: '電話', sortable: true, editable: true },
    { key: 'email', title: '電子郵件', sortable: true, editable: true },
    { key: 'occupation', title: '職業', sortable: true, editable: true },
  ];

  const propertyColumns = [
    { key: 'address', title: '地址', sortable: true },
    { key: 'type', title: '類型', sortable: true },
    { key: 'landlordName', title: '房東', sortable: true },
    { key: 'monthlyRent', title: '月租金', sortable: true, editable: true },
  ];

  const rentColumns = [
    { key: 'tenantName', title: '租客', sortable: true },
    { key: 'propertyAddress', title: '物件', sortable: true },
    { key: 'month', title: '月份', sortable: true },
    { key: 'amount', title: '金額', sortable: true },
    { key: 'status', title: '狀態', sortable: true },
  ];

  const handleFormSubmit = (data: any) => {
    console.log('表單提交:', data);
    setShowRentalForm(false);
    setShowRentForm(false);
    setEditingItem(null);
  };

  const handleFormCancel = () => {
    setShowRentalForm(false);
    setShowRentForm(false);
    setEditingItem(null);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rental-card bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 flex items-center gap-2">
              <User className="h-4 w-4" />
              總租客數
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{mockRentalRecords.length}</div>
            <p className="text-xs text-blue-500">活躍租客</p>
          </CardContent>
        </Card>
        
        <Card className="rental-card bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600 flex items-center gap-2">
              <Home className="h-4 w-4" />
              租賃物件
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{mockProperties.length}</div>
            <p className="text-xs text-green-500">出租中</p>
          </CardContent>
        </Card>
        
        <Card className="rental-card bg-yellow-50 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              本月待繳
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">1</div>
            <p className="text-xs text-yellow-500">筆租金記錄</p>
          </CardContent>
        </Card>
        
        <Card className="rental-card bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              本月收入
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">NT$ 25,000</div>
            <p className="text-xs text-purple-500">已收租金</p>
          </CardContent>
        </Card>
      </div>
      
      {/* 物件分佈地圖 */}
      <PropertyMap properties={mockProperties} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rental-card">
          <CardHeader>
            <CardTitle>近期租金記錄</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRents.map(rent => (
                <div key={rent.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <div>
                    <p className="font-medium">{rent.tenantName}</p>
                    <p className="text-sm text-gray-500">{rent.month}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">NT$ {rent.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      rent.status === '已繳費' ? 'status-paid' : 'status-pending'
                    }`}>
                      {rent.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="rental-card">
          <CardHeader>
            <CardTitle>系統狀態</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>資料庫連線</span>
                <span className="text-green-600 text-sm">正常</span>
              </div>
              <div className="flex justify-between items-center">
                <span>LINE Bot</span>
                <span className="text-yellow-600 text-sm">待設定</span>
              </div>
              <div className="flex justify-between items-center">
                <span>自動通知</span>
                <span className="text-blue-600 text-sm">準備中</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">租賃管理</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFilterForm(!showFilterForm)}
          >
            <Search className="h-4 w-4 mr-2" />
            進階篩選
          </Button>
          <Button onClick={() => setShowRentalForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新增租賃物件
          </Button>
        </div>
      </div>
      
      {showFilterForm && (
        <FilterForm
          onApplyFilters={(filters) => console.log('套用篩選:', filters)}
          onClearFilters={() => console.log('清除篩選')}
        />
      )}

      {showRentalForm && (
        <DynamicForm
          formType="rental"
          initialData={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
      
      <DataTable
        data={mockRentalRecords}
        columns={rentalColumns}
        title="租賃記錄列表"
        onEdit={(item) => {
          setEditingItem(item);
          setShowRentalForm(true);
        }}
        onDelete={(item) => console.log('刪除租賃記錄:', item)}
        onBulkAction={(items, action) => console.log('批次操作:', items, action)}
      />
    </div>
  );

  const renderRents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">租金管理</h2>
        <Button onClick={() => setShowRentForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          新增繳租記錄
        </Button>
      </div>
      
      {showRentForm && (
        <DynamicForm
          formType="rent"
          initialData={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
      
      <DataTable
        data={mockRents}
        columns={rentColumns}
        title="租金記錄"
        onEdit={(item) => {
          setEditingItem(item);
          setShowRentForm(true);
        }}
        onDelete={(item) => console.log('刪除租金記錄:', item)}
        onBulkAction={(items, action) => console.log('批次操作:', items, action)}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* 頂部導航 */}
      <div className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-foreground">租賃管理系統</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                設定
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                登出
              </Button>
              <div className="text-sm text-muted-foreground">管理員後台</div>
            </div>
          </div>
        </div>
      </div>

      {/* 側邊導航 */}
      <div className="flex">
        <div className="w-64 bg-sidebar shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === 'dashboard' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <Home className="h-5 w-5" />
                儀表板
              </button>
              <button
                onClick={() => setActiveTab('management')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === 'management' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <User className="h-5 w-5" />
                租賃管理
              </button>
              <button
                onClick={() => setActiveTab('rents')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === 'rents' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <DollarSign className="h-5 w-5" />
                租金管理
              </button>
            </div>
          </nav>
        </div>

        {/* 主要內容區域 */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'management' && renderManagement()}
          {activeTab === 'rents' && renderRents()}
        </div>
      </div>
    </div>
  );
};

export default Index;
