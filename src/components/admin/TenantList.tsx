
import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  ShowButton,
} from 'react-admin';

export const TenantList = () => (
  <List>
    <Datagrid>
      <TextField source="name" label="姓名" />
      <TextField source="phone" label="電話" />
      <TextField source="lineUserId" label="LINE ID" />
      <DateField source="createdAt" label="建立時間" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
