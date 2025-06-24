
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Home, DollarSign, Plus, Search } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // 示範資料
  const mockTenants = [
    { id: 1, name: '王小明', phone: '0912-345-678', lineUserId: 'user123' },
    { id: 2, name: '李小華', phone: '0923-456-789', lineUserId: 'user456' },
  ];

  const mockProperties = [
    { id: 1, address: '台北市大安區信義路100號', landlordName: '張房東', landlordPhone: '0934-567-890', monthlyRent: 25000 },
    { id: 2, address: '新北市板橋區中山路200號', landlordName: '林房東', landlordPhone: '0945-678-901', monthlyRent: 18000 },
  ];

  const mockRents = [
    { id: 1, tenantName: '王小明', propertyAddress: '台北市大安區信義路100號', month: '2024-01', amount: 25000, status: '已繳費' },
    { id: 2, tenantName: '李小華', propertyAddress: '新北市板橋區中山路200號', month: '2024-01', amount: 18000, status: '待繳費' },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 flex items-center gap-2">
              <User className="h-4 w-4" />
              總租客數
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{mockTenants.length}</div>
            <p className="text-xs text-blue-500">活躍租客</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
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
        
        <Card className="bg-yellow-50 border-yellow-200">
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
        
        <Card className="bg-purple-50 border-purple-200">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>近期租金記錄</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRents.map(rent => (
                <div key={rent.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{rent.tenantName}</p>
                    <p className="text-sm text-gray-500">{rent.month}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">NT$ {rent.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      rent.status === '已繳費' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {rent.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
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

  const renderTenants = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">租客管理</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          新增租客
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Search className="h-4 w-4" />
            <Input placeholder="搜尋租客姓名或電話..." className="max-w-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">姓名</th>
                  <th className="text-left p-3">電話</th>
                  <th className="text-left p-3">LINE ID</th>
                  <th className="text-left p-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {mockTenants.map(tenant => (
                  <tr key={tenant.id} className="border-b">
                    <td className="p-3">{tenant.name}</td>
                    <td className="p-3">{tenant.phone}</td>
                    <td className="p-3">{tenant.lineUserId}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">編輯</Button>
                        <Button variant="outline" size="sm">刪除</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">物件管理</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          新增物件
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">地址</th>
                  <th className="text-left p-3">房東姓名</th>
                  <th className="text-left p-3">房東電話</th>
                  <th className="text-left p-3">月租金</th>
                  <th className="text-left p-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {mockProperties.map(property => (
                  <tr key={property.id} className="border-b">
                    <td className="p-3">{property.address}</td>
                    <td className="p-3">{property.landlordName}</td>
                    <td className="p-3">{property.landlordPhone}</td>
                    <td className="p-3">NT$ {property.monthlyRent.toLocaleString()}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">編輯</Button>
                        <Button variant="outline" size="sm">刪除</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">租金管理</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          新增記錄
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">租客</th>
                  <th className="text-left p-3">物件地址</th>
                  <th className="text-left p-3">月份</th>
                  <th className="text-left p-3">金額</th>
                  <th className="text-left p-3">狀態</th>
                  <th className="text-left p-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {mockRents.map(rent => (
                  <tr key={rent.id} className="border-b">
                    <td className="p-3">{rent.tenantName}</td>
                    <td className="p-3">{rent.propertyAddress}</td>
                    <td className="p-3">{rent.month}</td>
                    <td className="p-3">NT$ {rent.amount.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        rent.status === '已繳費' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {rent.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">編輯</Button>
                        <Button variant="outline" size="sm">刪除</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頂部導航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">租賃管理系統</h1>
            <div className="text-sm text-gray-500">歡迎使用多物件租賃管理平台</div>
          </div>
        </div>
      </div>

      {/* 側邊導航 */}
      <div className="flex">
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Home className="h-5 w-5" />
                儀表板
              </button>
              <button
                onClick={() => setActiveTab('tenants')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === 'tenants' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5" />
                租客管理
              </button>
              <button
                onClick={() => setActiveTab('properties')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === 'properties' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Home className="h-5 w-5" />
                物件管理
              </button>
              <button
                onClick={() => setActiveTab('rents')}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg transition-colors ${
                  activeTab === 'rents' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
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
          {activeTab === 'tenants' && renderTenants()}
          {activeTab === 'properties' && renderProperties()}
          {activeTab === 'rents' && renderRents()}
        </div>
      </div>
    </div>
  );
};

export default Index;
