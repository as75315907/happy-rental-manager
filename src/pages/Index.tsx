
import React from 'react';
import { Admin, Resource } from 'react-admin';
import { FirebaseDataProvider } from 'ra-data-firebase-client';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import zhMessages from '../i18n/zh';
import { initializeApp } from 'firebase/app';

// Tenant components
import { TenantList } from '../components/admin/TenantList';
import { TenantEdit } from '../components/admin/TenantEdit';
import { TenantCreate } from '../components/admin/TenantCreate';
import { TenantShow } from '../components/admin/TenantShow';

// Property components
import { PropertyList } from '../components/admin/PropertyList';
import { PropertyEdit } from '../components/admin/PropertyEdit';
import { PropertyCreate } from '../components/admin/PropertyCreate';
import { PropertyShow } from '../components/admin/PropertyShow';

// Rent components
import { RentList } from '../components/admin/RentList';
import { RentEdit } from '../components/admin/RentEdit';
import { RentCreate } from '../components/admin/RentCreate';
import { RentShow } from '../components/admin/RentShow';

import Dashboard from '../components/admin/Dashboard';
import { User, Home, DollarSign } from 'lucide-react';

// Firebase 配置 - 請替換為您的實際配置
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);

const dataProvider = FirebaseDataProvider(firebaseConfig, {
  watch: [],
  dontwatch: [],
});

const i18nProvider = polyglotI18nProvider(() => zhMessages, 'zh');

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Admin
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        dashboard={Dashboard}
        title="租賃管理系統"
      >
        <Resource
          name="tenants"
          list={TenantList}
          edit={TenantEdit}
          create={TenantCreate}
          show={TenantShow}
          icon={User}
          options={{ label: '租客管理' }}
        />
        <Resource
          name="properties"
          list={PropertyList}
          edit={PropertyEdit}
          create={PropertyCreate}
          show={PropertyShow}
          icon={Home}
          options={{ label: '物件管理' }}
        />
        <Resource
          name="rents"
          list={RentList}
          edit={RentEdit}
          create={RentCreate}
          show={RentShow}
          icon={DollarSign}
          options={{ label: '租金管理' }}
        />
      </Admin>
    </div>
  );
};

export default Index;
