
import React from 'react';
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  NumberInput,
  DateInput,
  required,
} from 'react-admin';

const statusChoices = [
  { id: 'pending', name: '待繳費' },
  { id: 'paid', name: '已繳費' },
  { id: 'overdue', name: '逾期' },
];

export const RentEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="tenantId" reference="tenants" label="租客">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="propertyId" reference="properties" label="物件">
        <SelectInput optionText="address" validate={[required()]} />
      </ReferenceInput>
      <TextInput source="month" label="月份" validate={[required()]} />
      <NumberInput source="amount" label="金額" validate={[required()]} />
      <SelectInput source="status" choices={statusChoices} label="狀態" validate={[required()]} />
      <DateInput source="paidDate" label="繳費日期" />
    </SimpleForm>
  </Edit>
);
