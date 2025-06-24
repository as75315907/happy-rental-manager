
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, X, Search, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string | Date;
}

interface FilterFormProps {
  onApplyFilters: (filters: FilterCondition[]) => void;
  onClearFilters: () => void;
}

const FilterForm = ({ onApplyFilters, onClearFilters }: FilterFormProps) => {
  const [conditions, setConditions] = useState<FilterCondition[]>([
    { id: '1', field: '', operator: 'contains', value: '' }
  ]);

  const fieldOptions = [
    { value: 'address', label: '物件地址' },
    { value: 'tenantName', label: '租客姓名' },
    { value: 'landlordName', label: '房東姓名' },
    { value: 'rentStatus', label: '繳租狀態' },
    { value: 'monthlyRent', label: '月租金' },
    { value: 'month', label: '月份' },
    { value: 'propertyType', label: '物件類型' },
  ];

  const operatorOptions = [
    { value: 'contains', label: '包含' },
    { value: 'equals', label: '等於' },
    { value: 'greaterThan', label: '大於' },
    { value: 'lessThan', label: '小於' },
    { value: 'between', label: '介於' },
    { value: 'startsWith', label: '開始於' },
    { value: 'endsWith', label: '結束於' },
  ];

  const statusOptions = [
    { value: '已繳費', label: '已繳費' },
    { value: '待繳費', label: '待繳費' },
    { value: '逾期', label: '逾期' },
  ];

  const propertyTypeOptions = [
    { value: '套房', label: '套房' },
    { value: '雅房', label: '雅房' },
    { value: '整層', label: '整層' },
  ];

  const addCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: '',
      operator: 'contains',
      value: ''
    };
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(condition => condition.id !== id));
    }
  };

  const updateCondition = (id: string, field: keyof FilterCondition, value: any) => {
    setConditions(conditions.map(condition =>
      condition.id === id ? { ...condition, [field]: value } : condition
    ));
  };

  const handleApplyFilters = () => {
    const validConditions = conditions.filter(condition => 
      condition.field && condition.value
    );
    onApplyFilters(validConditions);
  };

  const handleClearFilters = () => {
    setConditions([{ id: '1', field: '', operator: 'contains', value: '' }]);
    onClearFilters();
  };

  const renderValueInput = (condition: FilterCondition) => {
    if (condition.field === 'rentStatus') {
      return (
        <Select
          value={condition.value as string}
          onValueChange={(value) => updateCondition(condition.id, 'value', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="選擇狀態" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (condition.field === 'propertyType') {
      return (
        <Select
          value={condition.value as string}
          onValueChange={(value) => updateCondition(condition.id, 'value', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="選擇類型" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (condition.field === 'month') {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !condition.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {condition.value ? format(condition.value as Date, "yyyy-MM") : "選擇月份"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={condition.value as Date}
              onSelect={(date) => date && updateCondition(condition.id, 'value', date)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <Input
        type={condition.field === 'monthlyRent' ? 'number' : 'text'}
        placeholder="輸入值..."
        value={condition.value as string}
        onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          進階篩選
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {conditions.map((condition, index) => (
          <div key={condition.id} className="flex gap-3 items-end">
            <div className="flex-1 space-y-2">
              <Label>欄位</Label>
              <Select
                value={condition.field}
                onValueChange={(value) => updateCondition(condition.id, 'field', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇欄位" />
                </SelectTrigger>
                <SelectContent>
                  {fieldOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-2">
              <Label>條件</Label>
              <Select
                value={condition.operator}
                onValueChange={(value) => updateCondition(condition.id, 'operator', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {operatorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-2">
              <Label>值</Label>
              {renderValueInput(condition)}
            </div>

            <div className="flex gap-2">
              {index === conditions.length - 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addCondition}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
              
              {conditions.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeCondition(condition.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}

        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleApplyFilters} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            套用篩選
          </Button>
          <Button variant="outline" onClick={handleClearFilters}>
            <RotateCcw className="h-4 w-4 mr-2" />
            清除篩選
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterForm;
