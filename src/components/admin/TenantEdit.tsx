
import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';

export const TenantEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="姓名" validate={[required()]} />
      <TextInput source="phone" label="電話" validate={[required()]} />
      <TextInput source="lineUserId" label="LINE 用戶ID" />
    </SimpleForm>
  </Edit>
);
