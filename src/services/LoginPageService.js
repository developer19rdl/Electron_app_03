/* eslint-disable max-len */
import ApplicationStore from '../utils/localStorageUtil';

const successCaseCode = [200, 201];

const _fetchService = (PATH, serviceMethod, data, successCallback, errorCallBack) => {
  const { token, userDetails } = ApplicationStore().getStorage('userDetails');
  // const END_POINT = 'https://varmatrix.com/InfiniteUptime/api/';
  // const END_POINT = 'https://wisething.in/InfiniteUptime/api/';
  // const END_POINT = 'http://192.168.1.94:8000/api/';
  // const END_POINT = 'http://192.168.1.17:8001/api/';
  // const END_POINT = 'https://insightsx.in/SparkBloomServer/api/';
  // const END_POINT = 'https://www.wisething.in:8000/api/';
  // const END_POINT = 'http://192.168.1.4:8000/api/'
  // const END_POINT = 'https://wisething.in/api/'
  // const END_POINT = 'http://192.168.1.9:8002/api/'
  const END_POINT = process.env.REACT_APP_API_URL;




  const { email, userRole, companyCode } = userDetails;

  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
    companyCode: `${companyCode}`,
    userId: `${email}`,
    userRole: `${userRole}`,
  };
  const body = (serviceMethod === 'GET') || (serviceMethod === 'DELETE') ? {} : { body: JSON.stringify(data) };

  const bodyParameters = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers,
    ...body,
  };

  const bodyObject = {
    method: serviceMethod,
    ...bodyParameters,
  };

  return fetch(END_POINT + PATH, bodyObject)
    .then((response) => {
      if (successCaseCode.indexOf(response.status) > -1) {
        return response.json();
      }
      // eslint-disable-next-line no-throw-literal
      throw {
        errorStatus: response.status,
        errorObject: response.json(),
      };
    })
    .then((dataResponse) => successCallback(dataResponse))
    .catch((error) => {
      error.errorObject.then((errorResponse) => {
        if (error.errorStatus === 401 && errorResponse.message === 'Unable to access the page, Token Expired') {
          ApplicationStore().clearStorage();
          location.reload();
        }
        errorCallBack(error.errorStatus, errorResponse.message);
      });
    });
};

export const LoginService = (data) => {
  const PATH = 'users/login';
  // const END_POINT = 'https://wisething.in/InfiniteUptime/api/';
  // const END_POINT = 'http://192.168.1.4:8000/api/'
  // const END_POINT = 'https://wisething.in/api/'
  const END_POINT = process.env.REACT_APP_API_URL;
  // const END_POINT = 'http://192.168.1.22:8003/api/'
  // const END_POINT = 'http://192.168.1.9:8002/api/'
  // const END_POINT = 'https://www.wisething.in:8000/api/';

  // const END_POINT = 'https://insightsx.in/SparkBloomServer/api/';

  const SERVICE_METHOD = 'POST';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return fetch(END_POINT + PATH, {
    method: SERVICE_METHOD,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
};

export const LogoutService = (successCallback, errorCallBack) => _fetchService('logout', 'POST', {}, successCallback, errorCallBack);

export const ReceiveOTPService = (data, successCallback, errorCallBack) => _fetchService('user/sendOtp', 'POST', data, successCallback, errorCallBack);

export const ValidateOTPService = (data, successCallback, errorCallBack) => _fetchService('user/validateOtp', 'POST', data, successCallback, errorCallBack);

export const FetchCustomerService = (successCallback, errorCallBack) => _fetchService('customer/showData', 'GET', {}, successCallback, errorCallBack);

export const FetchEmployees = (successCallback, errorCallBack) => _fetchService('empuser', 'GET', {}, successCallback, errorCallBack);

// --------- User--------------//
export const FetchUserService = (successCallback, errorCallBack) => _fetchService('users', 'GET', {}, successCallback, errorCallBack);

export const UserAddService = (data, successCallback, errorCallBack) => _fetchService('users', 'POST', data, successCallback, errorCallBack);

export const UserUpdateService = (data, successCallback, errorCallBack) => _fetchService(`users/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const UserDeleteService = (data, successCallback, errorCallBack) => _fetchService(`users/${data.id}`, 'DELETE', data, successCallback, errorCallBack);

// --- Unblock user ----//
export const UnblockUserService = (data, successCallback, errorCallBack) => _fetchService('blockedUserPasswordAutogenerate', 'POST', data, successCallback, errorCallBack);

// ------------- Customer -----------//
export const CustomerAddService = (data, successCallback, errorCallBack) => _fetchService('customer/add', 'POST', data, successCallback, errorCallBack);

export const CustomerEditService = (data, successCallback, errorCallBack) => _fetchService(`customer/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const CustomerDeleteService = (data, successCallback, errorCallBack) => _fetchService(`customer/${data.id}/delete`, 'POST', data, successCallback, errorCallBack);

export const PasswordResetService = (data, successCallback, errorCallBack) => _fetchService('users/changePassword', 'POST', data, successCallback, errorCallBack);

// ---------------------- Location -----------------
export const FetchLocationService = (successCallback, errorCallBack) => _fetchService('search', 'POST', {}, successCallback, errorCallBack);

export const LocationAddService = (data, successCallback, errorCallBack) => _fetchService('location', 'POST', data, successCallback, errorCallBack);

export const LocationEditService = (data, successCallback, errorCallBack) => _fetchService(`location/${data.locationId}`, 'Put', data, successCallback, errorCallBack);

export const LocationDeleteService = (id, successCallback, errorCallBack) => _fetchService(`location/${id}`, 'Delete', {}, successCallback, errorCallBack);

// -------------------- Branch ----------------------
export const FetchBranchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const BranchAddService = (data, successCallback, errorCallBack) => _fetchService('branch', 'POST', data, successCallback, errorCallBack);

export const BranchEditService = (data, successCallback, errorCallBack) => _fetchService(`branch/${data.branchId}`, 'Put', data, successCallback, errorCallBack);

export const BranchDeleteService = (id, successCallback, errorCallBack) => _fetchService(`branch/${id}`, 'Delete', {}, successCallback, errorCallBack);

// --------------- Facility ---------------
export const FetchFacilitiyService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const FacilitiyAddService = (data, successCallback, errorCallBack) => _fetchService('facility', 'POST', data, successCallback, errorCallBack);

export const FacilityEditService = (data, successCallback, errorCallBack) => _fetchService(`facility/${data.facilityId}`, 'Put', data, successCallback, errorCallBack);

export const FacilityDeleteService = (id, successCallback, errorCallBack) => _fetchService(`facility/${id}`, 'Delete', {}, successCallback, errorCallBack);

// ----------- Building -------------
export const BuildingFetchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const BuildingAddService = (data, successCallback, errorCallBack) => _fetchService('buildings', 'POST', data, successCallback, errorCallBack);

export const BuildingEditService = (data, successCallback, errorCallBack) => _fetchService(`buildings/${data.buildingId}`, 'Put', data, successCallback, errorCallBack);

export const BuildingDeleteService = (id, successCallback, errorCallBack) => _fetchService(`buildings/${id}`, 'Delete', {}, successCallback, errorCallBack);

// ----------- Floor -------------
export const FloorfetchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const FloorAddService = (data, successCallback, errorCallBack) => _fetchService('floor', 'POST', data, successCallback, errorCallBack);

export const FloorEditService = (data, successCallback, errorCallBack) => _fetchService(`floor/${data.floorId}`, 'Put', data, successCallback, errorCallBack);

export const FloorDeleteService = (id, successCallback, errorCallBack) => _fetchService(`floor/${id}`, 'Delete', {}, successCallback, errorCallBack);

// ------------ Lab --------------
export const LabfetchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const LabAddService = (data, successCallback, errorCallBack) => _fetchService('zone', 'POST', data, successCallback, errorCallBack);

export const LabEditService = (data, successCallback, errorCallBack) => _fetchService(`zone/${data.zoneId}`, 'Put', data, successCallback, errorCallBack);

export const LabDeleteService = (id, successCallback, errorCallBack) => _fetchService(`zone/${id}`, 'Delete', {}, successCallback, errorCallBack);

export const FetchCategoryService = (successCallback, errorCallBack) => _fetchService('category', 'GET', {}, successCallback, errorCallBack);

export const FetchDeviceLocationService = (successCallback, errorCallBack) => _fetchService('deviceloc', 'GET', {}, successCallback, errorCallBack);

export const AddDeviceLocationService = (data, successCallback, errorCallBack) => _fetchService('deviceloc/add', 'POST', data, successCallback, errorCallBack);

export const EditDeviceLocationService = (data, successCallback, errorCallBack) => _fetchService(`deviceloc/${data.devicelocationId}/update`, 'POST', data, successCallback, errorCallBack);

export const DeleteDeviceLocationService = (successCallback, errorCallBack, data) => _fetchService(`deviceloc/${data.id}/delete`, 'POST', {}, successCallback, errorCallBack);



// -------- Category -------------
export const CategoryFetchService = (successCallback, errorCallBack) => _fetchService('category', 'GET', {}, successCallback, errorCallBack);

export const CategoryAddService = (data, successCallback, errorCallBack) => _fetchService('category/add', 'POST', data, successCallback, errorCallBack);

export const CategoryEditService = (data, successCallback, errorCallBack) => _fetchService(`category/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const CategoryDeleteService = (id, successCallback, errorCallBack) => _fetchService(`category/${id}/delete`, 'POST', {}, successCallback, errorCallBack);

// --------Device Category -------------
export const DeviceCategoryFetchService = (successCallback, errorCallBack) => _fetchService('deviceCategory', 'GET', {}, successCallback, errorCallBack);

export const DeviceCategoryAddService = (data, successCallback, errorCallBack) => _fetchService('deviceCategory', 'POST', data, successCallback, errorCallBack);

export const DeviceCategoryEditService = (data, successCallback, errorCallBack) => _fetchService(`deviceCategory/${data.id}`, 'Put', data, successCallback, errorCallBack);

export const DeviceCategoryDeleteService = (id, successCallback, errorCallBack) => _fetchService(`deviceCategory/${id}`, 'Delete', {}, successCallback, errorCallBack);

export const ZoneDeviceFetchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

// -------- Asset Type -------------
export const AssetTypeFetchService = (successCallback, errorCallBack) => _fetchService('assetType', 'GET', {}, successCallback, errorCallBack);

export const AssetTypeAddService = (data, successCallback, errorCallBack) => _fetchService('assetType', 'POST', data, successCallback, errorCallBack);

export const AssetTypeEditService = (data, successCallback, errorCallBack) => _fetchService(`assetType/${data.id}`, 'Put', data, successCallback, errorCallBack);

export const AssetTypeDeleteService = (id, successCallback, errorCallBack) => _fetchService(`assetType/${id}`, 'Delete', {}, successCallback, errorCallBack);


// ---------- Device ---------
export const DeviceFetchService = (data, successCallback, errorCallBack) => _fetchService('devices', 'POST', data, successCallback, errorCallBack);

export const SearchDevicesFetchService = (data, successCallback, errorCallBack) => _fetchService('devices', 'POST', data, successCallback, errorCallBack);


export const DeviceAddService = (data, successCallback, errorCallBack) => _fetchService('devices/add', 'POST', data, successCallback, errorCallBack);

export const DeviceEditService = (data, successCallback, errorCallBack) => _fetchService(`devices/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const DeviceUpdateService = (data, successCallback, errorCallBack) => _fetchService(`devices/${data.id}/mode`, 'PUT', data, successCallback, errorCallBack);

export const DeviceDeleteService = (id, successCallback, errorCallBack) => _fetchService(`devices/${id}`, 'DELETE', {}, successCallback, errorCallBack);

// ------------ Vendor --------
export const VendorDeleteService = (id, successCallback, errorCallBack) => _fetchService(`vendor/${id}/delete`, 'POST', {}, successCallback, errorCallBack);

export const VendorEditService = (data, successCallback, errorCallBack) => _fetchService(`vendor/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const FetchVendorService = (successCallback, errorCallBack) => _fetchService('vendor', 'GET', {}, successCallback, errorCallBack);

export const VendorAddService = (data, successCallback, errorCallBack) => _fetchService('vendor/add', 'POST', data, successCallback, errorCallBack);

// ------- Sensor category ---------------//
export const SensorCategoryFetchService = (successCallback, errorCallBack) => _fetchService('sensorCategory', 'GET', {}, successCallback, errorCallBack);

export const SensorCategoryAddService = (data, successCallback, errorCallBack) => _fetchService('sensorCategory/add', 'POST', data, successCallback, errorCallBack);

export const SensorCategoryEditService = (data, successCallback, errorCallBack) => _fetchService(`sensorCategory/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const SensorCategoryDeleteService = (id, successCallback, errorCallBack) => _fetchService(`sensorCategory/${id}/delete`, 'POST', {}, successCallback, errorCallBack);

export const SensorgetSensorUnitervice = (id, successCallback, errorCallBack) => _fetchService(`getSensorUnit`, 'POST', id, successCallback, errorCallBack);


// --------------- Sensor Adding ---------------------//

export const SensorAddService = (data, successCallback, errorCallBack) => _fetchService('sensorUnit/add', 'POST', data, successCallback, errorCallBack);

export const SensorEditService = (data, successCallback, errorCallBack) => _fetchService(`sensorUnit/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const SensorFetchService = (data, successCallback, errorCallBack) => _fetchService(`sensorUnit/${data}`, 'GET', {}, successCallback, errorCallBack);

export const SensorDeleteService = (id, successCallback, errorCallBack) => _fetchService(`sensorUnit/${id}/delete`, 'POST', {}, successCallback, errorCallBack);

export const SensorListFetchService = (successCallback, errorCallBack) => _fetchService('sensorUnit', 'GET', {}, successCallback, errorCallBack);

// ------------ Sensor deploying ------------------//
export const SensorDeployAddService = (data, successCallback, errorCallBack) => _fetchService('sensor/add', 'POST', data, successCallback, errorCallBack);

export const SensorDeployEditService = (data, successCallback, errorCallBack) => _fetchService(`sensor/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const SensorDeployDeleteService = (id, successCallback, errorCallBack) => _fetchService(`sensor/${id}/delete`, 'POST', {}, successCallback, errorCallBack);

export const SensorDeployFetchService = (data, successCallback, errorCallBack) => _fetchService('search', 'POST', data, successCallback, errorCallBack);

export const SensorPropertiesUpdateService = (data, successCallback, errorCallBack) => _fetchService(`sensorProperties/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const SensorPropertiesGetSensorRefValues = (data, successCallback, errorCallBack) => _fetchService(`getSensorRefValues/${data.id}`, 'GET', {}, successCallback, errorCallBack);


// ------------ Meter deploying ------------------//
export const MeterDeployAddService = (data, successCallback, errorCallBack) => _fetchService('meters/add', 'POST', data, successCallback, errorCallBack);

export const MeterDeployEditService = (data, successCallback, errorCallBack) => _fetchService(`meters/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const MeterDeployDeleteService = (id, successCallback, errorCallBack) => _fetchService(`meters/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const MeterDeployFetchService = (data, successCallback, errorCallBack) => _fetchService('meters', 'POST', data, successCallback, errorCallBack);

export const MeterPropertiesUpdateService = (data, successCallback, errorCallBack) => _fetchService(`sensorProperties/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const MeterPropertiesGetSensorRefValues = (data, successCallback, errorCallBack) => _fetchService(`getSensorRefValues/${data.id}`, 'GET', {}, successCallback, errorCallBack);

export const FetchMeterService = (data, successCallback, errorCallBack) => _fetchService('meterList', 'POST', data, successCallback, errorCallBack);

export const Showtagdata = (successCallback, errorCallBack) => _fetchService(`tags`, 'GET', {}, successCallback, errorCallBack);




// ------------ Asset Fetch service ------------------//

export const AssetFetchService = (successCallback, errorCallBack) => _fetchService('assets', 'GET', {}, successCallback, errorCallBack);

export const AssetAddService = (data, successCallback, errorCallBack) => _fetchService('assets', 'POST', data, successCallback, errorCallBack);

export const AssetEditService = (data, successCallback, errorCallBack) => _fetchService(`assets/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const AssetDeleteService = (id, successCallback, errorCallBack) => _fetchService(`assets/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const AssetFetchCategoryBasedService = (data, successCallback, errorCallBack) => _fetchService('meters/postAssetNamesByCategory', 'POST', data, successCallback, errorCallBack);


// ------------ Device Config setup ------------------//

export const DeviceConfigSetupAddService = (data, successCallback, errorCallBack) => _fetchService('DeviceConfigSetup/add', 'POST', data, successCallback, errorCallBack);

export const DeviceConfigSetupFetchService = (data, successCallback, errorCallBack) => { return _fetchService(`DeviceConfigSetup/${data.id}/getDeviceConfigData`, 'GET', {}, successCallback, errorCallBack); };

// ----------- STEL & TWA setup -----------------------//

export const StelEditService = (data, successCallback, errorCallBack) => { return _fetchService(`stel/${data.id}/update`, 'POST', data, successCallback, errorCallBack); };

// ------------ Change Device Mode -------------------//

export const ChangeDeviceMode = (data, successCallback, errorCallBack) => { return _fetchService(`deviceMode/${data.id}/update`, 'POST', data, successCallback, errorCallBack); };

// ------------- Dashboard Chart Display ------------//

export const DisplayLineChart = (successCallback, errorCallBack) => { return _fetchService('aqmiSensorValues', 'POST', {}, successCallback, errorCallBack); };

// ------------- Calibration Result ---------------//

export const CalibrationAddService = (data, successCallback, errorCallBack) => _fetchService('calibrationTestResult/add', 'POST', data, successCallback, errorCallBack);

// -------------DeployedSensor List --------------//
export const deviceDeployedSensors = (id, successCallback, errorCallBack) => _fetchService(`deviceDeployedSensors/${id}`, 'GET', {}, successCallback, errorCallBack);

// -------------DeployedSensorTable List --------------//
export const DeployedSensorsDetailsList = (data, successCallback, errorCallBack) => _fetchService('calibrationTestResult', 'POST', data, successCallback, errorCallBack);

// -------------BumpTest enabled sensors List --------------//
export const BumpTestEnabledSensors = (id, successCallback, errorCallBack) => _fetchService(`bumptestDeviceDeployedSensors/${id}`, 'GET', {}, successCallback, errorCallBack);

// ------------- Bump Test ----------------------------//
export const BumpTestAddService = (data, successCallback, errorCallBack) => _fetchService('bumpTestResult/add', 'POST', data, successCallback, errorCallBack);

export const BumpTestFetchService = (data, successCallback, errorCallBack) => _fetchService('bumpTestResult', 'POST', data, successCallback, errorCallBack);

// --------------User Logs ---------------------------//
export const FetchUserLogService = (data, successCallback, errorCallBack) => _fetchService('userListDetails', 'POST', data, successCallback, errorCallBack);

export const FetchUserLogDetails = (data, successCallback, errorCallBack) => _fetchService('userLog', 'POST', data, successCallback, errorCallBack);

// ----- Dashboard API ------------------------------- //

export const DashboardSensorListDetails = (data, successCallback, errorCallBack) => _fetchService('meterData', 'POST', data, successCallback, errorCallBack);

export const DashboardIndividualSensorDetails = (data, successCallback, errorCallBack) => _fetchService('sensorTagIdData', 'POST', data, successCallback, errorCallBack);

export const DeviceIdAlerts = (successCallback, errorCallBack) => _fetchService('graphs/showAlertsData ', 'GET', {}, successCallback, errorCallBack);

export const SensorIdAlertUpdate = (data, successCallback, errorCallBack) => _fetchService('alertDataUpdate', 'POST', data, successCallback, errorCallBack);

//-------------- Reports API-------------------------------//

export const FetchBumpTestReportDetails = (data, successCallback, errorCallBack) => _fetchService('reportBumpTest', 'POST', data, successCallback, errorCallBack);

export const FetchAlarmReportDetails = (data, successCallback, errorCallBack) => _fetchService('alarmReport', 'POST', data, successCallback, errorCallBack);

export const FetchSensorLogReportDetails = (data, successCallback, errorCallBack) => _fetchService('SensorLog', 'POST', data, successCallback, errorCallBack);

export const FetCalibrationReport = (data, successCallback, errorCallBack) => _fetchService('calibrationReport', 'POST', data, successCallback, errorCallBack);

export const FetShowEventLogReport = (data, successCallback, errorCallBack) => _fetchService('showEventLog', 'POST', data, successCallback, errorCallBack);


// export const FetchAqiStatusReportDetails = (data, successCallback, errorCallBack) => _fetchService('SiteDeviceReport', 'POST', data, successCallback, errorCallBack);

export const FetchFirmwareVersionReportDetails = (data, successCallback, errorCallBack) => _fetchService('FirmwareVersionReport', 'POST', data, successCallback, errorCallBack);

export const FetchHardwareVersionReportDetails = (data, successCallback, errorCallBack) => _fetchService('hardwareVersionLogsReports', 'POST', data, successCallback, errorCallBack);

export const FetchApplicationVersionReportDetails = (data, successCallback, errorCallBack) => _fetchService('appVersion', 'GET', data, successCallback, errorCallBack);

export const FetchAqiStatusReportDetails = (data, successCallback, errorCallBack) => _fetchService('DeviceAqiReport', 'POST', data, successCallback, errorCallBack);

export const FetchServerUsageReportDetails = (data, successCallback, errorCallBack) => _fetchService('serverUsage', 'POST', data, successCallback, errorCallBack);

export const FetchSensorStatusReportDetails = (data, successCallback, errorCallBack) => _fetchService('sensorStatusReport', 'POST', data, successCallback, errorCallBack);

// ---------- Alert Notification --------------------------//

export const NotificationAlerts = (data, successCallback, errorCallBack) => _fetchService('getAlerts', 'POST', data, successCallback, errorCallBack);

export const UpdateNotification = (data, successCallback, errorCallBack) => _fetchService('updateNotification', 'POST', data, successCallback, errorCallBack);


// ------------ Company Log Interval ---------------------//

export const CompanyLogInterval = (data, successCallback, errorCallBack) => { return _fetchService(`updateCustomerSettings`, 'POST', data, successCallback, errorCallBack); };

// ----------- Hooter Relay -----------------------------//

export const HooterRelayService = (data, successCallback, errorCallBack) => { return _fetchService(`labHooterRelay`, 'POST', data, successCallback, errorCallBack); };

export const TestHooterRelay = (data, successCallback, errorCallBack) => { return _fetchService(`testLabHooterRealay`, 'POST', data, successCallback, errorCallBack); };

// -------------Dynamic Unit listing --------------//
export const DynamicUnitListService = (id, successCallback, errorCallBack) => _fetchService(`sensorCategoryUnitsDisplay/${id}`, 'GET', {}, successCallback, errorCallBack);

// ------------ Application Version --------------//
export const AppVersionAddService = (data, successCallback, errorCallBack) => _fetchService('appVersion/add', 'POST', data, successCallback, errorCallBack);

export const AppVersionFetchService = (successCallback, errorCallBack) => _fetchService('appVersion', 'GET', {}, successCallback, errorCallBack);

export const AppVersionEditService = (data, successCallback, errorCallBack) => _fetchService(`appVersion/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const AppVersionDeleteService = (id, successCallback, errorCallBack) => _fetchService(`appVersion/${id}/delete`, 'POST', {}, successCallback, errorCallBack);

// ----------- Device Configuration / Firmware Upgradation / Debug --------//
export const TestModeChangeInitiator = (data, successCallback, errorCallBack) => { return _fetchService(`configurationStatus`, 'POST', data, successCallback, errorCallBack); };

export const ConfigUpgradeModeResult = (data, successCallback, errorCallBack) => { return _fetchService(`configurationProcessStatus`, 'POST', data, successCallback, errorCallBack); };

// ---------- Gas Cylinder ----------------//
export const GasCylinderFetchService = (successCallback, errorCallBack) => _fetchService('gasCylinder', 'GET', {}, successCallback, errorCallBack);

export const GasCylinderAddService = (data, successCallback, errorCallBack) => _fetchService('gasCylinder/add', 'POST', data, successCallback, errorCallBack);

export const GasCylinderEditService = (data, successCallback, errorCallBack) => _fetchService(`gasCylinder/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const GasCylinderDeleteService = (id, successCallback, errorCallBack) => _fetchService(`gasCylinder/${id}/delete`, 'POST', {}, successCallback, errorCallBack);


// --------- Email Template -------------//
export const EmailTemplateFetchService = (successCallback, errorCallBack) => _fetchService('emailTemplate', 'GET', {}, successCallback, errorCallBack);

export const EmailTemplateUpdateService = (data, successCallback, errorCallBack) => _fetchService('emailTemplate/update', 'POST', data, successCallback, errorCallBack);

// ------------ Back Up Configuration ---------------------//

export const BackUpConfigurationservice = (data, successCallback, errorCallBack) => { return _fetchService(`aidealabCompany/update`, 'POST', data, successCallback, errorCallBack); };

// ------------ Device Debug Result ---------------------//
export const DeviceDebugResultService = (data, successCallback, errorCallBack) => { return _fetchService(`DeviceDebugConfigData`, 'POST', data, successCallback, errorCallBack); };

// ------------ Fetch Device for Report ----------------//
export const SearchDeviceDataService = (data, successCallback, errorCallBack) => _fetchService('devices', 'POST', data, successCallback, errorCallBack);

// ------------ Fetch Sensor AQI for Dashboard ----------------//
export const FetchSensorAQIService = (data, successCallback, errorCallBack) => _fetchService('getAqiReport', 'POST', data, successCallback, errorCallBack);


//-----------calibration Report Email ------------//


export const EmailcalibrationReportService = (data, successCallback, errorCallBack) => _fetchService('calibrationReport/email', 'POST', data, successCallback, errorCallBack);

export const EmaileventLogMailService = (data, successCallback, errorCallBack) => _fetchService('eventLogMail', 'POST', data, successCallback, errorCallBack);

export const FetchTotalEnergyPerHourValueBarChart = (data, successCallback, errorCallBack) => _fetchService('BarChartPerHour', 'POST', data, successCallback, errorCallBack);

export const FetchTotalEnergyValueBarChart = (data, successCallback, errorCallBack) => _fetchService('energyBarChart', 'POST', data, successCallback, errorCallBack);


export const DashboardMeterListDetails = (data, successCallback, errorCallBack) => _fetchService('meterData', 'POST', data, successCallback, errorCallBack);

export const FetchVoltageRYB = (data, successCallback, errorCallBack) => _fetchService('lineChartVoltageRYB', 'POST', data, successCallback, errorCallBack);

export const FetchKwhLoad = (data, successCallback, errorCallBack) => _fetchService('AreaChartLoad', 'POST', data, successCallback, errorCallBack);

export const FetchCurrentRYBPF = (data, successCallback, errorCallBack) => _fetchService('lineChartCurrentRYB', 'POST', data, successCallback, errorCallBack);


// building Meters
export const BuildingMeterListDetails = (data, successCallback, errorCallBack) => _fetchService('BuildingMeterData', 'POST', data, successCallback, errorCallBack);



// Energy Meter Report
export const FetchEnergyReportDetails = (data, successCallback, errorCallBack) => _fetchService('energyDataReport', 'POST', data, successCallback, errorCallBack);

export const PlantAlertAddService = (data, successCallback, errorCallBack) => _fetchService('plantAlert/add', 'POST', data, successCallback, errorCallBack);

export const PlantAlertSettingsFetchService = (successCallback, errorCallBack) => _fetchService('plantAlertSettingList', 'GET', {}, successCallback, errorCallBack);

export const PlantAlertSettingsEditService = (data, successCallback, errorCallBack) => _fetchService(`plantAlert/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const PlantAlertSettingsDeleteService = (id, successCallback, errorCallBack) => _fetchService(`plantAlert/${id}/delete`, 'POST', {}, successCallback, errorCallBack);

export const FetchEnergyAlarmReportDetails = (data, successCallback, errorCallBack) => _fetchService('showAlertReport', 'POST', data, successCallback, errorCallBack);



export const AvgBalanceAddService = (data, successCallback, errorCallBack) => _fetchService('avgBalance/add', 'POST', data, successCallback, errorCallBack);

export const AvgBalanceAddServiceFetchService = (successCallback, errorCallBack) => _fetchService('AvgBalanceSettingList', 'GET', {}, successCallback, errorCallBack);

export const AvgBalanceAddServiceEditService = (data, successCallback, errorCallBack) => _fetchService(`avgBalance/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const AvgBalanceAddServiceDeleteService = (id, successCallback, errorCallBack) => _fetchService(`avgBalance/${id}/delete`, 'POST', {}, successCallback, errorCallBack);
export const EnergyDashboardInform = (data, successCallback, errorCallBack) => _fetchService('energyInformation', 'POST', data, successCallback, errorCallBack);

// export const FftSpectrumService = (successCallback, errorCallBack) => _fetchService('getCsvFileInfo', 'GET', {}, successCallback, errorCallBack);

export const CorrectiveActionAddService = (data, successCallback, errorCallBack) => _fetchService('correctiveAction/add', 'POST', data, successCallback, errorCallBack);

export const CorrectiveActionFetchService = (successCallback, errorCallBack) => _fetchService('correctiveAction/showData', 'GET', {}, successCallback, errorCallBack);

export const CorrectiveActionEditService = (data, successCallback, errorCallBack) => _fetchService(`correctiveAction/${data.id}/update`, 'POST', data, successCallback, errorCallBack);

export const CorrectiveActionDeleteService = (id, successCallback, errorCallBack) => _fetchService(`correctiveAction/${id}/delete`, 'POST', {}, successCallback, errorCallBack);

// export const CorrectiveActionAssetService = (data, successCallback, errorCallBack) => _fetchService('assetList', 'POST', data, successCallback, errorCallBack);

export const CorrectiveActionAssetService = (data, successCallback, errorCallBack) => _fetchService('AssetMeterList', 'POST', data, successCallback, errorCallBack);

export const MachineEnergySavedFetchService = (successCallback, errorCallBack) => _fetchService('MachineLevelEnergySavedData', 'GET', {}, successCallback, errorCallBack);

export const FetchlineChartCurrentRYBUnBalance = (data, successCallback, errorCallBack) => _fetchService('CurrentUnbalance', 'POST', data, successCallback, errorCallBack);

export const FetchVoltageRYBUnBalance = (data, successCallback, errorCallBack) => _fetchService('VoltageUnbalance', 'POST', data, successCallback, errorCallBack);

export const FetchSpectrumdata = (data, successCallback, errorCallBack) => _fetchService('getSpectrumData', 'POST', data, successCallback, errorCallBack);

export const FftSpectrumService = (data, successCallback, errorCallBack) => _fetchService('getCsvFileInfo', 'POST', data, successCallback, errorCallBack);

export const DeviceForSensorList = (data, successCallback, errorCallBack) => _fetchService(`devices/${data.id}/meters`, 'GET', {}, successCallback, errorCallBack);

export const SensorUpdateMode = (data, successCallback, errorCallBack) => _fetchService(`devices/${data.id}/Sensormode`, 'PUT', data, successCallback, errorCallBack);

export const ProjectAddService = (data, successCallback, errorCallBack) => _fetchService('master', 'POST', data, successCallback, errorCallBack);

export const ProjectEditService = (data, successCallback, errorCallBack) => _fetchService(`master/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const ProjectDeleteService = (id, successCallback, errorCallBack) => _fetchService(`master/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const ProjectShowService = (successCallback, errorCallBack) => _fetchService('master', 'GET', {}, successCallback, errorCallBack);

////////Device Management////////
export const DeviceManageService = (data, successCallback, errorCallBack) => _fetchService('motors', 'POST', data, successCallback, errorCallBack);

export const DeviceManageEdit = (data, successCallback, errorCallBack) => _fetchService(`motors/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const DeviceManageDelete = (id, successCallback, errorCallBack) => _fetchService(`motors/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const DeviceManageAdd = (data, successCallback, errorCallBack) => _fetchService('motors/add', 'POST', data, successCallback, errorCallBack);

export const UploadManageMovableXl = (data, successCallback, errorCallBack) => _fetchService('motors/uploadMovable', 'POST', data, successCallback, errorCallBack);
export const UploadTagsXl = (data, successCallback, errorCallBack) => _fetchService('tags/upload', 'POST', data, successCallback, errorCallBack);

export const UploadStandAloneXl = (data, successCallback, errorCallBack) => _fetchService('motors/upload', 'POST', data, successCallback, errorCallBack);

///////////
export const DeviceMasterCategory = (successCallback, errorCallBack) => _fetchService('motorassets', 'GET', {}, successCallback, errorCallBack);

export const DeviceMasterAdd = (data, successCallback, errorCallBack) => _fetchService('motorassets', 'POST', data, successCallback, errorCallBack);

export const DeviceMasterEdit = (data, successCallback, errorCallBack) => _fetchService(`motorassets/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const DeviceMasterDelete = (id, successCallback, errorCallBack) => _fetchService(`motorassets/${id}`, 'DELETE', {}, successCallback, errorCallBack);

/////
export const SensorMasterCategory = (successCallback, errorCallBack) => _fetchService('sensorassets', 'GET', {}, successCallback, errorCallBack);

export const SensorMasterAdd = (data, successCallback, errorCallBack) => _fetchService('sensorassets', 'POST', data, successCallback, errorCallBack);

export const SensorMasterEdit = (data, successCallback, errorCallBack) => _fetchService(`sensorassets/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const SensorMasterDelete = (id, successCallback, errorCallBack) => _fetchService(`sensorassets/${id}`, 'DELETE', {}, successCallback, errorCallBack);

///////
export const unitsMasterCategory = (successCallback, errorCallBack) => _fetchService('units', 'GET', {}, successCallback, errorCallBack);

export const unitsMasterAdd = (data, successCallback, errorCallBack) => _fetchService('units/add', 'POST', data, successCallback, errorCallBack);

export const unitsMasterEdit = (data, successCallback, errorCallBack) => _fetchService(`units/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const unitsMasterDelete = (id, successCallback, errorCallBack) => _fetchService(`units/${id}`, 'DELETE', {}, successCallback, errorCallBack);

///EnableManage Device
export const DeviceManagementStatus = (data, successCallback, errorCallBack) => _fetchService('motors/updateMotorStatus', 'POST', data, successCallback, errorCallBack);

///
export const DevcieCategorylist = (successCallback, errorCallBack) => _fetchService('movableAssets', 'GET', {}, successCallback, errorCallBack);

export const DeviceNameListShow = (data, successCallback, errorCallBack) => _fetchService('movableAssets', 'POST', data, successCallback, errorCallBack);

///////movableAsset///
export const movableAssetsShow = (successCallback, errorCallBack) => _fetchService('movableAssets/showdata ', 'GET', {}, successCallback, errorCallBack);

export const movableAssetsAdd = (data, successCallback, errorCallBack) => _fetchService('movableAssets/add ', 'POST', data, successCallback, errorCallBack);

export const movableAssetsEdit = (data, successCallback, errorCallBack) => _fetchService(`movableAssets/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const movableAssetsDelete = (id, successCallback, errorCallBack) => _fetchService(`movableAssets/${id}`, 'DELETE', {}, successCallback, errorCallBack);

//////Sensors///
export const SensorManageService = (successCallback, errorCallBack) => _fetchService('sensors', 'GET', {}, successCallback, errorCallBack);

export const SensorManageEdit = (data, successCallback, errorCallBack) => _fetchService(`sensors/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const SensorManageDelete = (id, successCallback, errorCallBack) => _fetchService(`sensors/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const SensorManageAdd = (data, successCallback, errorCallBack) => _fetchService('sensors', 'POST', data, successCallback, errorCallBack);

export const ProjectSensorManage = (data, successCallback, errorCallBack) => _fetchService('sensors/sensorsByProject', 'POST', data, successCallback, errorCallBack);

///////sensor Status////
export const DeviceSensorStatus = (data, successCallback, errorCallBack) => _fetchService('sensors/status', 'POST', data, successCallback, errorCallBack);

//////
export const UploadSensorAloneXl = (data, successCallback, errorCallBack) => _fetchService('sensors/uplaodTemplateADM', 'POST', data, successCallback, errorCallBack);

/////sensors list for device///
export const SensorDeviceList = (data, successCallback, errorCallBack) => _fetchService(`motors/getSensorsBymotorId/${data.motorId}`, 'GET', {}, successCallback, errorCallBack);

///ADDTagAllocation//
export const AddTagShow = (successCallback, errorCallBack) => _fetchService('deviceCategory', 'GET', {}, successCallback, errorCallBack);
export const DeviceTAgName = (data, successCallback, errorCallBack) => _fetchService('deviceCategory/postDeviceCategory', 'POST', data, successCallback, errorCallBack);

export const TagManageEdit = (data, successCallback, errorCallBack) => _fetchService(`tags/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const TagManageDelete = (id, successCallback, errorCallBack) => _fetchService(`tags/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const TagManageAdd = (data, successCallback, errorCallBack) => _fetchService('tags/add', 'POST', data, successCallback, errorCallBack);


export const AssetsDeviceShow = (successCallback, errorCallBack) => _fetchService('deviceCategory/getAssetDevices', 'GET', {}, successCallback, errorCallBack);


export const TagAllocationeEdit = (data, successCallback, errorCallBack) => _fetchService(`deviceCategory/updateAssetDevice/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const TagAllocationDelete = (id, successCallback, errorCallBack) => _fetchService(`deviceCategory/deleteAssetDevice/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const TagAllocationeAdd = (data, successCallback, errorCallBack) => _fetchService('deviceCategory/createAssetDevice', 'POST', data, successCallback, errorCallBack);

export const assetTypeShow = (successCallback, errorCallBack) => _fetchService('assetType', 'GET', {}, successCallback, errorCallBack);

export const assetunitsShow = (successCallback, errorCallBack) => _fetchService('units', 'GET', {}, successCallback, errorCallBack);

export const DeviceCategoryName = (data, successCallback, errorCallBack) => _fetchService('deviceCategory/postDeviceCategory', 'POST', data, successCallback, errorCallBack);

export const graphForSensor = (data, successCallback, errorCallBack) => _fetchService(`graphs/showgrapghdata`, 'POST', data, successCallback, errorCallBack);

////
export const UploadTagAlone = (data, successCallback, errorCallBack) => _fetchService('tags/upload', 'POST', data, successCallback, errorCallBack);

///MQTT
export const FetchMQTTUrl = (successCallback, errorCallBack) => _fetchService('mqttConfiguration/createmqttUrl', 'POST', {}, successCallback, errorCallBack);

export const SubmitMQTTUrl = (data, successCallback, errorCallBack) => _fetchService('mqttConfiguration/storeUrl', 'POST', data, successCallback, errorCallBack);

export const DeviceassetName = (data, successCallback, errorCallBack) => _fetchService('assets/getAssetsByAssetType', 'POST', data, successCallback, errorCallBack);


export const DeviceModeStatus = (data, successCallback, errorCallBack) => _fetchService('devices/updateDeviceModes', 'POST', data, successCallback, errorCallBack);

//Email Alert/////
export const ShowEmailAlert = (successCallback, errorCallBack) => _fetchService('emailAlerts/showEmails', 'GET', {}, successCallback, errorCallBack);

export const EmailAlertAddEdit = (data, successCallback, errorCallBack) => _fetchService(`emailAlerts/updateEmailSettings/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const EmailAlertDelete = (id, successCallback, errorCallBack) => _fetchService(`emailAlerts/deleteEmailSettings/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const EmailAlertAdd = (data, successCallback, errorCallBack) => _fetchService('emailAlerts/createEmailSettings', 'POST', data, successCallback, errorCallBack);

////Alert Type Settings//
export const ShowSettingAlert = (successCallback, errorCallBack) => _fetchService('emailAlerts/showAlertSettings', 'GET', {}, successCallback, errorCallBack);

export const SettingAlertAddEdit = (data, successCallback, errorCallBack) => _fetchService(`emailAlerts/updateAlertSettings/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const SettingAlertDelete = (id, successCallback, errorCallBack) => _fetchService(`emailAlerts/deleteAlertSettings/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const SettingAlertAdd = (data, successCallback, errorCallBack) => _fetchService('emailAlerts/createAlertSettings', 'POST', data, successCallback, errorCallBack);

//////insideCardApi////
export const ShowSelectDropDown = (data, successCallback, errorCallBack) => _fetchService('sensorschart/showSelectAllDropdownValues', 'POST', data, successCallback, errorCallBack);

export const GetChartData = (data, successCallback, errorCallBack) => _fetchService('graphData/ChartData1', 'POST', data, successCallback, errorCallBack);

export const GetChartTwoData = (data, successCallback, errorCallBack) => _fetchService('graphData/ChartData2', 'POST', data, successCallback, errorCallBack);

export const GetChartThreeData = (data, successCallback, errorCallBack) => _fetchService('graphData/ChartData3', 'POST', data, successCallback, errorCallBack);

/////Header Api///
export const GetHeaderDeviceIdDropdown = (data, successCallback, errorCallBack) => _fetchService('sensorschart/getSlaveIdDashBoardDropDown', 'POST', data, successCallback, errorCallBack);

export const GetHeaderTagIdDropdown = (data, successCallback, errorCallBack) => _fetchService('sensorschart/showSelectAllDropdownValues', 'POST', data, successCallback, errorCallBack);

export const GetMachineDeviceHeaderData = (data, successCallback, errorCallBack) => _fetchService('sensorschart/show', 'POST', data, successCallback, errorCallBack);

export const UpdateMachineHeaderData = (data, successCallback, errorCallBack) => _fetchService(`sensorschart/update/${data.locationId}`, 'PUT', data, successCallback, errorCallBack);

export const GetgetSlaveIdDropdown = (data, successCallback, errorCallBack) => _fetchService('sensorschart/getSlaveIdDropdown', 'POST', data, successCallback, errorCallBack);

export const GetSensorDropdown = (data, successCallback, errorCallBack) => _fetchService('sensorschart/showdropdown', 'POST', data, successCallback, errorCallBack);

export const UpdateSlaveIdDropdown = (data, successCallback, errorCallBack) => _fetchService('sensorschart/updateSlaveId', 'PUT', data, successCallback, errorCallBack);

export const UpdateSensorDropdown = (data, successCallback, errorCallBack) => _fetchService('sensorschart/showupdatedropdown', 'POST', data, successCallback, errorCallBack);

export const UpdateGraphDisplayName = (data, successCallback, errorCallBack) => _fetchService('sensorschart/updateDisplayName', 'POST', data, successCallback, errorCallBack);

export const GetDeviceAlertData = (data, successCallback, errorCallBack) => _fetchService('sensorschart/showgrid', 'POST', data, successCallback, errorCallBack);


export const AddGraphSettings = (data, successCallback, errorCallBack) => _fetchService('newDashboardCharts/addNewChartDashboard', 'POST', data, successCallback, errorCallBack);

export const AddGraphShowList = (data, successCallback, errorCallBack) => _fetchService(`newDashboardCharts/ChartDataDashboard1/${data.locId}`, 'GET', {}, successCallback, errorCallBack);

export const AddGraphShowDelete = (id, successCallback, errorCallBack) => _fetchService(`newDashboardCharts/deleteChartDataDash/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const UpdateGraphShowListData = (data, successCallback, errorCallBack) => _fetchService(`newDashboardCharts/updateChartDataDashboard1/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const FetchReportLocationService = (successCallback, errorCallBack) => _fetchService('reports/getLocation', 'GET', {}, successCallback, errorCallBack);

export const SearchDevicesReportService = (data, successCallback, errorCallBack) => _fetchService('reports/getDevicebyId', 'POST', data, successCallback, errorCallBack);
export const UserDeviceReport = (data, successCallback, errorCallBack) => _fetchService('reports/getReport', 'POST', data, successCallback, errorCallBack);

export const DevicesFetchShowService = (data, successCallback, errorCallBack) => _fetchService('scada/getDevicesByUser', 'POST', data, successCallback, errorCallBack);

export const ShowSelectSensors = (data, successCallback, errorCallBack) => _fetchService('scada/getTagsByDevice', 'POST', data, successCallback, errorCallBack);

export const AddScadaService = (data, successCallback, errorCallBack) => _fetchService('scada/addScada', 'POST', data, successCallback, errorCallBack);
export const ShowScadaServiceList = (data, successCallback, errorCallBack) => _fetchService('scada/getScadaWithSensorValues', 'POST', data, successCallback, errorCallBack);
export const DeleteScadaService = (id, successCallback, errorCallBack) => _fetchService(`scada/${id}`, 'DELETE', {}, successCallback, errorCallBack);
export const UpdateScadaService = (id, data, successCallback, errorCallBack) => _fetchService(`scada/${id}`, 'PUT', data, successCallback, errorCallBack);

//////Mqtt Settings////
export const MqttSettingsList = (successCallback, errorCallBack) => _fetchService('mqttSettings', 'GET', {}, successCallback, errorCallBack);

export const MqttSettingsUpdate = (data, successCallback, errorCallBack) => _fetchService(`mqttSettings/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const MqttSettingsDelete = (id, successCallback, errorCallBack) => _fetchService(`mqttSettings/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const MqttSettingsAdd = (data, successCallback, errorCallBack) => _fetchService('mqttSettings', 'POST', data, successCallback, errorCallBack);

export const AnalyticsAdd = (data, successCallback, errorCallBack) => _fetchService('chart/store', 'POST', data, successCallback, errorCallBack);

export const AnalyticsList = (data, successCallback, errorCallBack) => _fetchService(`chart/analytics?locId=${data.locationId}`, 'GET', {}, successCallback, errorCallBack);


////cutomerId////
export const customerIdShow = (successCallback, errorCallBack) => _fetchService('customer/generate-id', 'GET', {}, successCallback, errorCallBack);

export const customerShowList = (successCallback, errorCallBack) => _fetchService('customer', 'GET', {}, successCallback, errorCallBack);

export const CustomerAdd = (data, successCallback, errorCallBack) => _fetchService('customer', 'POST', data, successCallback, errorCallBack);

export const CustomerEdit = (data, successCallback, errorCallBack) => _fetchService(`customer/${data.id}`, 'PUT', data, successCallback, errorCallBack);

export const CustomerDelete = (id, successCallback, errorCallBack) => _fetchService(`customer/${id}`, 'DELETE', {}, successCallback, errorCallBack);

export const AnalyticsDeleteService = (id, successCallback, errorCallBack) => _fetchService(`chart/delete?analyticId=${id}`, 'DELETE', {}, successCallback, errorCallBack);
