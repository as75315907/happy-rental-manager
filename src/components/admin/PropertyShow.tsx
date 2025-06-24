
import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
} from 'react-admin';

export const PropertyShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="address" label="地址" />
      <TextField source="landlordName" label="房東姓名" />
      <TextField source="landlordPhone" label="房東電話" />
      <NumberField source="monthlyRent" label="月租金" />
      <DateField source="createdAt" label="建立時間" />
      <DateField source="updatedAt" label="更新時間" />
    </SimpleShowLayout>
  </Show>
);
