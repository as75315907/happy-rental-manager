
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'date';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  showWhen?: { field: string; value: string | string[] };
}

interface DynamicFormProps {
  formType: 'tenant' | 'landlord' | 'property' | 'rent' | 'rental';
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const DynamicForm = ({ formType, initialData, onSubmit, onCancel }: DynamicFormProps) => {
  const [formData, setFormData] = useState<any>(initialData || {});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const formConfigs = {
    tenant: [
      { key: 'name', label: '租客姓名', type: 'text' as const, required: true },
      { key: 'phone', label: '聯絡電話', type: 'tel' as const, required: true },
      { key: 'email', label: '電子郵件', type: 'email' as const },
      { key: 'lineUserId', label: 'LINE ID', type: 'text' as const },
      { key: 'idNumber', label: '身分證字號', type: 'text' as const, required: true },
      { key: 'emergencyContact', label: '緊急聯絡人', type: 'text' as const },
      { key: 'emergencyPhone', label: '緊急聯絡電話', type: 'tel' as const },
      { key: 'occupation', label: '職業', type: 'text' as const },
      { key: 'notes', label: '備註', type: 'textarea' as const },
    ],
    landlord: [
      { key: 'name', label: '房東姓名', type: 'text' as const, required: true },
      { key: 'phone', label: '聯絡電話', type: 'tel' as const, required: true },
      { key: 'email', label: '電子郵件', type: 'email' as const },
      { key: 'bankAccount', label: '銀行帳號', type: 'text' as const },
      { key: 'taxId', label: '統一編號', type: 'text' as const },
      { key: 'address', label: '通訊地址', type: 'textarea' as const },
    ],
    property: [
      { key: 'address', label: '物件地址', type: 'text' as const, required: true },
      { 
        key: 'type', 
        label: '物件類型', 
        type: 'select' as const, 
        required: true,
        options: [
          { value: '套房', label: '套房' },
          { value: '雅房', label: '雅房' },
          { value: '整層', label: '整層' },
        ]
      },
      { key: 'monthlyRent', label: '月租金', type: 'number' as const, required: true },
      { key: 'deposit', label: '押金', type: 'number' as const },
      { key: 'area', label: '坪數', type: 'number' as const },
      { key: 'floor', label: '樓層', type: 'text' as const },
      { 
        key: 'hasParking', 
        label: '含停車位', 
        type: 'checkbox' as const,
        showWhen: { field: 'type', value: ['套房', '整層'] }
      },
      { 
        key: 'hasBalcony', 
        label: '含陽台', 
        type: 'checkbox' as const,
        showWhen: { field: 'type', value: ['套房', '整層'] }
      },
      { 
        key: 'roomCount', 
        label: '房間數', 
        type: 'number' as const,
        showWhen: { field: 'type', value: ['整層'] }
      },
      { 
        key: 'bathroomCount', 
        label: '衛浴數', 
        type: 'number' as const,
        showWhen: { field: 'type', value: ['整層'] }
      },
      { key: 'facilities', label: '設備說明', type: 'textarea' as const },
      { key: 'notes', label: '備註', type: 'textarea' as const },
    ],
    rental: [
      { key: 'tenantName', label: '租客姓名', type: 'text' as const, required: true },
      { key: 'tenantPhone', label: '租客電話', type: 'tel' as const, required: true },
      { key: 'propertyAddress', label: '承租地址', type: 'text' as const, required: true },
      { key: 'rent', label: '月租金', type: 'number' as const, required: true },
      { key: 'managementFee', label: '管理費', type: 'number' as const, required: true },
      { key: 'parkingFee', label: '車位費', type: 'number' as const },
      { key: 'leaseStart', label: '租期開始', type: 'date' as const, required: true },
      { key: 'leaseEnd', label: '租期結束', type: 'date' as const, required: true },
      { key: 'paymentDate', label: '每月繳租日', type: 'number' as const, required: true, placeholder: '請輸入1-31的數字' },
      { 
        key: 'status', 
        label: '租賃狀態', 
        type: 'select' as const, 
        required: true,
        options: [
          { value: '正常', label: '正常' },
          { value: '待續約', label: '待續約' },
          { value: '已解約', label: '已解約' },
        ]
      },
      { key: 'notes', label: '備註', type: 'textarea' as const },
    ],
    rent: [
      { key: 'tenantId', label: '租客', type: 'text' as const, required: true },
      { key: 'propertyId', label: '物件', type: 'text' as const, required: true },
      { key: 'month', label: '繳租月份', type: 'date' as const, required: true },
      { key: 'amount', label: '租金金額', type: 'number' as const, required: true },
      { key: 'paidDate', label: '繳費日期', type: 'date' as const },
      { 
        key: 'status', 
        label: '繳費狀態', 
        type: 'select' as const, 
        required: true,
        options: [
          { value: '待繳費', label: '待繳費' },
          { value: '已繳費', label: '已繳費' },
          { value: '逾期', label: '逾期' },
        ]
      },
      { key: 'paymentMethod', label: '付款方式', type: 'text' as const },
      { key: 'notes', label: '備註', type: 'textarea' as const },
    ],
  };

  const currentFields = formConfigs[formType];

  const shouldShowField = (field: FormField) => {
    if (!field.showWhen) return true;
    
    const { field: dependentField, value: requiredValues } = field.showWhen;
    const currentValue = formData[dependentField];
    
    if (Array.isArray(requiredValues)) {
      return requiredValues.includes(currentValue);
    }
    
    return currentValue === requiredValues;
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev: any) => {
      const newData = {
        ...prev,
        [key]: value
      };
      
      // 如果是租期開始日，自動計算結束日（一年後的前一天）
      if (key === 'leaseStart' && value && formType === 'rental') {
        const startDate = new Date(value);
        const endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 1);
        endDate.setDate(endDate.getDate() - 1); // 減一天
        newData.leaseEnd = endDate;
      }
      
      return newData;
    });
    setHasUnsavedChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 驗證必填欄位
    const visibleFields = currentFields.filter(shouldShowField);
    const requiredFields = visibleFields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.key]);
    
    if (missingFields.length > 0) {
      alert(`請填寫必填欄位：${missingFields.map(f => f.label).join('、')}`);
      return;
    }
    
    // 為新增項目生成 ID
    const submitData = {
      ...formData,
      id: initialData?.id || Date.now()
    };
    
    onSubmit(submitData);
    setHasUnsavedChanges(false);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (confirm('您有未儲存的變更，確定要放棄編輯嗎？')) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeUnload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const renderField = (field: FormField) => {
    if (!shouldShowField(field)) return null;

    const commonProps = {
      id: field.key,
      value: formData[field.key] || '',
    };

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            placeholder={field.placeholder}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
          />
        );

      case 'select':
        return (
          <Select
            value={formData[field.key] || ''}
            onValueChange={(value) => handleInputChange(field.key, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `選擇${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.key}
              checked={formData[field.key] || false}
              onCheckedChange={(checked) => handleInputChange(field.key, checked)}
            />
            <Label htmlFor={field.key}>{field.label}</Label>
          </div>
        );

      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !formData[field.key] && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData[field.key] ? format(new Date(formData[field.key]), "yyyy年MM月dd日", { locale: zhTW }) : `選擇${field.label}`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData[field.key] ? new Date(formData[field.key]) : undefined}
                onSelect={(date) => date && handleInputChange(field.key, date)}
                initialFocus
                className="pointer-events-auto"
                locale={zhTW}
              />
            </PopoverContent>
          </Popover>
        );

      default:
        return (
          <Input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
          />
        );
    }
  };

  const getFormTitle = () => {
    const titles = {
      tenant: '租客',
      landlord: '房東',
      property: '物件',
      rental: '租賃物件',
      rent: '租金記錄'
    };
    return `${initialData ? '編輯' : '新增'}${titles[formType]}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getFormTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentFields.map((field) => (
              <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                {field.type !== 'checkbox' && (
                  <Label htmlFor={field.key}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                )}
                {renderField(field)}
              </div>
            ))}
          </div>
          
          <div className="flex gap-3 pt-4 border-t">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              儲存
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicForm;
