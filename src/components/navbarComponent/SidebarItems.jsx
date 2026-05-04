import {
  Dashboard, Group, BusinessOutlined, LockReset, Map,
  Storefront, BrowserUpdated,
  ChatBubbleOutline,
  Email,
  Groups,
  Diversity3, AddLocation,
  Devices,
  DeviceHub
} from '@mui/icons-material';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Link } from 'react-router-dom';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { useEffect, useState } from 'react';
import allowedSidebarItems from '../../utils/accessRoleUtil';
import ApplicationStore from '../../utils/localStorageUtil';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import defaultCompanyLogo from '../../images/defaultCompanyLogo.png';
import PortraitIcon from '@mui/icons-material/Portrait';
import LogoRBSI from "../../../src/images/mardah.jpg"
import GradingIcon from '@mui/icons-material/Grading';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SensorsIcon from '@mui/icons-material/Sensors';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import DvrIcon from '@mui/icons-material/Dvr';

const SidebarItems = {
  'Dashboard Management': [
    {
      name: 'Dashboard',
      route: 'Dashboard',
      icon: <Dashboard className="sidebarIcon" />,
    },
    {
      name: 'User',
      route: 'UserManagement',
      icon: <Group className="sidebarIcon" />,
    },
    {
      name: 'SCADA',
      route: 'ScadaView',
      icon: <DvrIcon className="sidebarIcon" />,
    },

    {
      name: 'Vendor',
      route: 'Vendor',
      icon: <Diversity3 className="sidebarIcon" />,
    },
    {
      name: 'Gas Cylinder',
      route: 'GasCylinder',
      icon: <Storefront className="sidebarIcon" />,
    },
    // {
    //   name: 'Report',
    //   route: 'Report',
    //   icon: <SummarizeIcon className="sidebarIcon" />,
    // },
    // {
    //   name: 'Energy Savings',
    //   route: 'EnergySaved',
    //   icon: <EnergySavingsLeafIcon className="sidebarIcon" />,
    // }
  ],
  'Customer Management': [{
    name: 'Customer',
    route: 'CustomerManagement',
    icon: <BusinessOutlined className="sidebarIcon" />,
  }],
  'Profile Settings': [{
    name: 'Change Password ',
    route: 'ChangePassword',
    icon: <LockReset className="sidebarIcon" />,
  },
    // {
    //   name: 'App Version ',
    //   route: 'AppVersion',
    //   icon: <BrowserUpdated className="sidebarIcon" />,
    // }
  ],

  'Configuration Management': [{
    name: 'Add Location',
    route: 'Location',
    icon: <AddLocation className="sidebarIcon" />,
  },
  {
    name: 'Add Device',
    route: 'DeviceConfiguration',
    icon: <Devices className="sidebarIcon" />,
  },
    // {
    //   name: 'Settings',
    //   route: 'MeterGeneralAlert',
    //   icon: <EditNotificationsIcon className="sidebarIcon" />,
    // }

  ],

  'Device Management': [{
    name: 'Masters',
    route: 'Device',
    icon: <GradingIcon className="sidebarIcon" />,

  },
  {
    name: 'Settings',
    route: 'EmailConfigList',
    icon: <SettingsSuggestIcon className="sidebarIcon" />,

  },
    // {
    //   name: 'Protocol',
    //   route: 'ProtocolJSONResult',
    //   icon: <DeviceHub className="sidebarIcon" />,

    // },
    // {
    //   name: 'CronJob',
    //   route: 'CronJobData',
    //   icon: <MoreTimeIcon className="sidebarIcon" />,
    // }

  ],
  // 'Project Management ': [{
  //   name: 'Masters',
  //   route: 'MasterManageCom',
  //   icon: <PortraitIcon className="sidebarIcon" />,
  // },
  // {
  //   name: 'Device Manage',
  //   route: 'ManageDeviceresult',
  //   icon: <Storefront className="sidebarIcon" />,
  // },
  // {
  //   name: ' Manage Movable Asset',
  //   route: 'ManageMovableResult',
  //   icon: <Storefront className="sidebarIcon" />,
  // },
  // {
  //   name: ' Manage Sensor',
  //   route: 'ManageSensorDeviceresult',
  //   icon: <SensorOccupiedIcon className="sidebarIcon" />,
  // },
  // ],
  'Reports': [{
    name: 'Sensor Log',
    route: 'ReportUserList',
    icon: <SensorsIcon className="sidebarIcon" />,
  },
    // {
    //   name: 'Alert Log',
    //   route: 'AlertHistoryLog',
    //   icon: <AddAlertIcon className="sidebarIcon" />,
    // },

  ],

};


function DrawerObject(props) {
  const allowedItems = allowedSidebarItems();
  const sectionCollection = {};
  for (const section in SidebarItems) {
    const allowedCollection = SidebarItems[section].filter((item) => (allowedItems.indexOf(item.route) > -1));

    if (allowedCollection.length > 0) {
      sectionCollection[section] = allowedCollection;
    }
  }

  const fetchSideBar = (sideBarObject) => {
    const returnObj = [];
    for (const section in sideBarObject) {
      returnObj.push(<div className="sidebarMenu" key={`${section}01`}>
        {props.mobileMenu && <h3 className="sidebarTitle">{section}</h3>}

        <ul className="sidebarList">
          {sideBarObject[section].map((item, liIndex) => (
            <Link to={item.route} className="link" key={item.name + liIndex}>
              <li className="sidebarListItem" title={item.name}>
                {item.icon}
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>);
    }
    return returnObj;
  };

  const [companyLogo, setCompanyLogo] = useState(defaultCompanyLogo);
  const { userDetails } = ApplicationStore().getStorage('userDetails');

  useEffect(() => {
    if (userDetails.companyLogo) {
      // setCompanyLogo(`http://wisething.in/Aqms/blog/public/${userDetails.companyLogo}?${new Date().getTime()}`);
      // setCompanyLogo(`https://wisething.in/aideaLabs/blog/public/${userDetails.companyLogo}`);

      setCompanyLogo(`${process.env.REACT_APP_IMAGE_BASE_URL}/${userDetails.companyLogo}`);

    }
  }, []);

  return (
    <div className="block" >
      <div className="wrapper" style={{ display: 'flex' }}>
        <div className="items">
          <div className="">
            <Link to="Dashboard">
              <img
                src={LogoRBSI}
                alt=""
                className="avatar"
                style={{ width: 200, height: '8vh' }}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="sidebar" style={{ top: 0 }}>
        <div className="sidebarWrapper">
          {fetchSideBar(sectionCollection)}
        </div>
      </div>
    </div>
  );
}

export { DrawerObject, SidebarItems };
