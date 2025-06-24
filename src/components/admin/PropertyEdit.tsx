
import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
} from 'react-admin';

export const PropertyEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="address" label="地址" validate={[required()]} />
      <TextInput source="landlordName" label="房東姓名" validate={[required()]} />
      <TextInput source="landlordPhone" label="房東電話" validate={[required()]} />
      <NumberInput source="monthlyRent" label="月租金" validate={[required()]} />
    </SimpleForm>
  </Edit>
);
