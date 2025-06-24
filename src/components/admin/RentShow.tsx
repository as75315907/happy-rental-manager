
import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  ReferenceField,
  SelectField,
} from 'react-admin';

const statusChoices = [
  { id: 'pending', name: '待繳費' },
  { id: 'paid', name: '已繳費' },
  { id: 'overdue', name: '逾期' },
];

export const RentShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField source="tenantId" reference="tenants" label="租客">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="propertyId" reference="properties" label="物件">
        <TextField source="address" />
      </ReferenceField>
      <TextField source="month" label="月份" />
      <NumberField source="amount" label="金額" />
      <SelectField source="status" choices={statusChoices} label="狀態" />
      <DateField source="paidDate" label="繳費日期" />
      <DateField source="createdAt" label="建立時間" />
      <DateField source="updatedAt" label="更新時間" />
    </SimpleShowLayout>
  </Show>
);
