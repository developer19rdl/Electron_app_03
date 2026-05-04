/* eslint-disable max-len */
import React from 'react';
import {
  HashRouter as Router, Routes, Route, Outlet, Navigate, useNavigate,
} from 'react-router-dom';
import './App.css';
import { LoadScript } from '@react-google-maps/api';
import LoginPage from './pages/LoginPageComponent';
import OneTimePassword from './pages/OneTimePasswordComponent';
import HomePage from './pages/HomePageComponent';
import VendorManagement from './pages/VendorComponent';
import ForcePasswordReset from './pages/ForcePasswordResetComponent';
import CustomerManagement from './pages/CustomerComponent';
import UserManagement from './pages/UserComponent';
import SiteDetails from './pages/SiteDetailsComponent';
import Dashboard from './components/DashboardComponent';
import Branch from './components/BranchComponent';
import Facility from './components/FacilityComponent';
import Building from './components/BuildingComponent';
import Floor from './components/FloorComponent';
import Lab from './components/LabComponent';
import UserResetPassword from './components/UserResetPassword';
import ApplicationStore from './utils/localStorageUtil';
import ManagementReportTab from './components/reportSectionComponents/ManagementReportTab';
import GasCylinder from './pages/GasCylinderComponent';
import AddDevice from './components/AddDeviceManagement';
import CategoryManagement from './pages/CategoryManagementComponent';
import MeterGeneralAlertSettings from './pages/MeterGeneralAlertSettings';
import EnergySave from './components/navbarComponent/EnergySaved/EnergySave';
import FooterComponent from './components/FooterComponent';
import ProjectModule from './components/Master/ProjectModule';
import ManageDeviceresult from './components/dashboard/components/ManageDevice/ManageDeviceresult';
import ManageMovableResult from './components/dashboard/components/ManageMovable/ManageMovableResult';
import MasterManageCom from './components/Master/MasterManageCom';
import ManageSensorDeviceresult from './components/dashboard/components/ManageSensor/ManageSensorDeviceresult';
import ProtocolJSONResult from './components/dashboard/components/ProtocolJSON/ProtocolJSONResult';
import CronJobData from './components/dashboard/components/CronJobDataSave/CronJobData';
import EmailConfigList from './components/EmailRecipients/EmailConfigList';
import DragGraph from './components/dashboard/subComponent/deviceCard/DragGraph';
import AlertHistoryLog from './components/dashboard/components/AlertHistoryLog';
import ReportUserList from './components/Reports/ReportUserList';
import ScadaView from './components/ScadaDashBoard/ScadaView';

function ProtectedRoutes() {
  const navigate = useNavigate();
  const { token, userDetails } = ApplicationStore().getStorage('userDetails');
  if (token) {
    // if (userDetails?.secondLevelAuthorization === 'true' || userDetails?.forcePasswordReset === 1) {
    //   navigate('/login');
    // }
    if (userDetails?.secondLevelAuthorization === 'true') {
      navigate('/otp');
    }
    return <Outlet />;
  }
  return <Navigate replace to="/login" />;
}

function App() {
  React.useEffect(() => {
    const isElectron = window.process && window.process.type === 'renderer';
    if (isElectron) {
      console.log('🚀 Running in Electron environment');
      document.title = 'Mardah Pump - Desktop';
    } else {
      console.log('🌐 Running in Web Browser');
    }
  }, []);

  return (
    <div className="App">
      {/* <LoadScript googleMapsApiKey="AIzaSyBBv6shA-pBM0e9KydvwubSY55chq0gqS8"> */}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/otp" element={<OneTimePassword />} />
            <Route path="/passwordReset" element={<ForcePasswordReset />} />
            <Route path="/" element={<HomePage />}>
              <Route path="CustomerManagement/*" element={<CustomerManagement />} />
              <Route path="UserManagement/*" element={<UserManagement />} />
              <Route path="Vendor/*" element={<VendorManagement />} />
              <Route path="GasCylinder" element={<GasCylinder />} />
              <Route path="Report/*" element={<ManagementReportTab />} />
              <Route path="EnergySaved/*" element={<EnergySave />} />
              <Route path="ChangePassword/*" element={<UserResetPassword />} />
              <Route path="Dashboard/*" element={<Dashboard />} />
              <Route path="Location/*" element={<SiteDetails />} />
              <Route path="Location/:locationId" element={<Branch />} />
              <Route path="Location/:locationId/:locationId" element={<Facility />} />
              <Route path="Location/:locationId/:locationId/:locationId/*" element={<Building />} />
              <Route path="Location/:locationId/:locationId/:locationId/:locationId/*" element={<Floor />} />
              <Route path="Location/:locationId/:locationId/:locationId/:locationId/:locationId/*" element={<Lab />} />
              <Route path="DeviceConfiguration/*" element={<AddDevice />} />
              <Route path="MeterGeneralAlert/*" element={<MeterGeneralAlertSettings />} />
              <Route path="Device/*" element={<CategoryManagement />} />
              <Route path="MasterManageCom/*" element={<MasterManageCom />} />
              <Route path="ManageDeviceresult/*" element={<ManageDeviceresult />} />
              <Route path="ManageMovableResult/*" element={<ManageMovableResult />} />
              <Route path="ProtocolJSONResult/*" element={<ProtocolJSONResult />} />
              <Route path="EmailConfigList/*" element={<EmailConfigList />} />
              <Route path="CronJobData/*" element={<CronJobData />} />
              <Route path="DragGraph/*" element={<DragGraph />} />
              <Route path="ReportUserList/*" element={<ReportUserList />} />
              <Route path="AlertHistoryLog/*" element={<AlertHistoryLog />} />
              <Route path="ScadaView/*" element={<ScadaView />} />


            </Route>
          </Route>
        </Routes>

      </Router>
      {/* </LoadScript> */}
    </div>
  );
}

export default App;
