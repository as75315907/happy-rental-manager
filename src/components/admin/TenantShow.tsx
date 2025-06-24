
import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
} from 'react-admin';

export const TenantShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" label="姓名" />
      <TextField source="phone" label="電話" />
      <TextField source="lineUserId" label="LINE 用戶ID" />
      <DateField source="createdAt" label="建立時間" />
      <DateField source="updatedAt" label="更新時間" />
    </SimpleShowLayout>
  </Show>
);
