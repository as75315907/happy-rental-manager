
import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  EditButton,
  DeleteButton,
  ShowButton,
} from 'react-admin';

export const PropertyList = () => (
  <List>
    <Datagrid>
      <TextField source="address" label="地址" />
      <TextField source="landlordName" label="房東姓名" />
      <TextField source="landlordPhone" label="房東電話" />
      <NumberField source="monthlyRent" label="月租金" />
      <DateField source="createdAt" label="建立時間" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
