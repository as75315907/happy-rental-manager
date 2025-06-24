
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">租賃管理系統儀表板</h1>
        <p className="text-gray-600">歡迎使用多物件租賃管理系統</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-blue-600">總租客數</h3>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">--</div>
            <p className="text-xs text-blue-500">等待資料載入</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-green-600">租賃物件</h3>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">--</div>
            <p className="text-xs text-green-500">等待資料載入</p>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-yellow-600">本月待繳</h3>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">--</div>
            <p className="text-xs text-yellow-500">等待資料載入</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <h3 className="text-sm font-medium text-purple-600">總收入</h3>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">--</div>
            <p className="text-xs text-purple-500">等待資料載入</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">近期租金記錄</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">租金記錄將在此顯示</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">系統狀態</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>資料庫連線</span>
                <span className="text-green-600">正常</span>
              </div>
              <div className="flex justify-between">
                <span>LINE Bot</span>
                <span className="text-yellow-600">待設定</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
