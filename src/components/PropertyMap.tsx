
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Home, DollarSign, Phone, X } from 'lucide-react';

interface Property {
  id: number;
  address: string;
  landlordName: string;
  landlordPhone: string;
  monthlyRent: number;
  coordinates: { lat: number; lng: number };
}

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap = ({ properties }: PropertyMapProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // 模擬地圖區域 - 台北市中心周圍
  const mapCenter = { lat: 25.0330, lng: 121.5654 };
  const mapSize = { width: 600, height: 400 };

  // 將經緯度轉換為地圖上的像素位置
  const coordinateToPixel = (lat: number, lng: number) => {
    const latRange = 0.05; // 約5.5公里範圍
    const lngRange = 0.05;
    
    const x = ((lng - (mapCenter.lng - lngRange/2)) / lngRange) * mapSize.width;
    const y = ((mapCenter.lat + latRange/2 - lat) / latRange) * mapSize.height;
    
    return {
      x: Math.max(20, Math.min(mapSize.width - 20, x)),
      y: Math.max(20, Math.min(mapSize.height - 20, y))
    };
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            物件分佈地圖
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* 簡化的地圖背景 */}
            <div 
              className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-gray-200"
              style={{ width: mapSize.width, height: mapSize.height }}
            >
              {/* 地圖網格線 */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              
              {/* 台北市標示 */}
              <div className="absolute top-4 left-4 bg-white/80 px-2 py-1 rounded text-xs font-medium">
                台北市中心區域
              </div>
              
              {/* 物件標記點 */}
              {properties.map((property) => {
                const { x, y } = coordinateToPixel(property.coordinates.lat, property.coordinates.lng);
                return (
                  <button
                    key={property.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: x, top: y }}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div className="relative">
                      <MapPin 
                        className="h-8 w-8 text-red-500 drop-shadow-lg transition-transform group-hover:scale-110" 
                        fill="currentColor"
                      />
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {property.id}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* 圖例 */}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500" fill="currentColor" />
                <span>租賃物件位置</span>
              </div>
              <div className="text-xs">
                點擊標記查看詳細資訊
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 物件詳細資訊彈窗 */}
      {selectedProperty && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" />
                物件詳細資訊
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedProperty(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">地址</label>
              <p className="text-gray-900">{selectedProperty.address}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">房東姓名</label>
                <p className="text-gray-900">{selectedProperty.landlordName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  聯絡電話
                </label>
                <p className="text-gray-900">{selectedProperty.landlordPhone}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                月租金
              </label>
              <p className="text-lg font-bold text-green-600">
                NT$ {selectedProperty.monthlyRent.toLocaleString()}
              </p>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline">編輯物件</Button>
              <Button size="sm" variant="outline">查看租客</Button>
              <Button size="sm" variant="outline">租金記錄</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyMap;
