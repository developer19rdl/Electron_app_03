import './navbar.scss';
import {
  ChatBubbleOutlineOutlined,
  AccountCircle,
  ErrorOutlineOutlined,
  WarningAmber,
  Fullscreen,
  FullscreenExit,
  PriorityHigh,
  InfoOutlined,
  Info,
  BrowserUpdatedRounded,
  CalendarMonthRounded,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  IconButton, Toolbar, Menu, MenuItem, ListSubheader, ListItemAvatar, ListItemText, ListItem, Typography, Tooltip, Zoom, Chip, createTheme, ThemeProvider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { LogoutService } from '../../services/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';
import ApplicationStore from '../../utils/localStorageUtil';
import LogIntervalSetting from './LogIntervalSettingComponent';

// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";
/* eslint-disable no-nested-ternary */

function Navbar(props) {
  // const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const { userDetails, intervalDetails, applicationDetails } = ApplicationStore().getStorage('userDetails');
  const userRole = userDetails?.userRole;
  const [userDisplayName, setUserDisplayName] = useState('');

  const [customerDisplayName, setCustomerDisplayName] = useState('Company Name Here...');
  const [currentVersion, setCurrentVersion] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);
  const [openNotification, setNotification] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [alertList, setAlertList] = useState(props.notificationList || []);
  const [uniqueAlert, setUniqueAlert] = useState([]);

  // console.log("userDetails==", userDetails)
  useEffect(() => {
    if (userDetails.name) {

      setUserDisplayName(userDetails.userName);
      setCustomerDisplayName(userDetails.name);
      setCurrentVersion(applicationDetails?.applicationVersion || '');
      setReleaseDate(() => {
        if (applicationDetails?.releaseDate) {
          var date = applicationDetails.releaseDate.split("T");
          return date[0];
        }
        return ''
      }
      );
    }
    setInterval(() => {
    }, 1000);
  }, []);

  useEffect(() => {
    setAlertList(props.notificationList || []);

    // Set unique id for alerts
    const currentTime = new Date();

    var timeStamp = currentTime.toLocaleDateString('es-CL') + '_' + currentTime.toLocaleTimeString('en', {
      hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric',
    });

    let uniqueIdList = props.notificationList?.map((data, index) => {
      return { id: data.id, uniqueAlertId: data.id + '_' + userDisplayName + '_' + timeStamp }
    });

    // console.log(uniqueIdList || []);
    // console.log(timeStamp);

    // setUniqueAlert(uniqueIdList);
  }, [props.notificationList]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInfoMenu = (event) => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setInfoAnchorEl(null);
  };

  const handleNotificationMenu = (event) => {
    props.setAnchorElNotification(event.currentTarget);
    // assigning unique Id for top most alert list
    let uniqueAlert = [];
    uniqueAlert.push(alertList[0]);
    console.log(uniqueAlert[0]);
  };

  const handleClose = () => {
    setAnchorEl(null);
    props.setAnchorElNotification(null);
    setTimeout(() => {
      setAlertList([]);
    }, 500);
  };

  const logout = () => {
    LogoutService(logoutSuccessCallback, logoutErrorCallBack);
    handleClose();
  };

  const logoutSuccessCallback = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message,
    });

    setTimeout(() => {
      handleNotificationClose();
      // ApplicationStore().setStorage('userDetails', '');
      // ApplicationStore().setStorage('siteDetails', '');
      // ApplicationStore().setStorage('alertDetails', '');
      // ApplicationStore().setStorage('notificationDetails', '');
      // ApplicationStore().setStorage('navigateDashboard', '');
      ApplicationStore().clearStorage();
      navigate('/login');
    }, 2000);
  };

  const logoutErrorCallBack = () => { };

  const handleNotificationClose = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };

  const alertIcon = (alertType) => {
    console.log("alertIcon", alertType)
    switch (alertType) {
      case 'Critical': return (<ErrorOutlineOutlined sx={{ color: 'red', fontSize: 30 }} />);
      case 'Warning': return (<ErrorOutlineOutlined style={{ color: 'yellow', fontSize: 30 }} />);
      case 'outOfRange': return (<ErrorOutlineOutlined sx={{ color: '#ba68c8', fontSize: 30 }} />);
      case 'Stel': return (<ErrorOutlineOutlined sx={{ color: 'red', fontSize: 30 }} />);
      case 'TWA': return (<ErrorOutlineOutlined sx={{ color: 'yellow', fontSize: 30 }} />);
      case 'deviceDisconnected': return (<ErrorOutlineOutlined sx={{ color: 'gray', fontSize: 30 }} />);
      default: return (<ErrorOutlineOutlined sx={{ color: 'yellow', fontSize: 30 }} />)
    }
  }

  const theme = createTheme({
    components: {
      // Name of the component
      MuiPopover: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '1rem',
          },
          paper: {
            // border: '2px solid blue',
            borderRadius: '5px',
            boxShadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)`
          },
          list: {
            padding: '0px'
          }
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: '0px'
          }
        }
      }
    },
  });

  return (
    <div className="navbar" style={{
      height: '8vh',
      minHeight: '50px',
      backgroundColor: '#212121', width: '100%'
    }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'flex', color: 'white' } }}
        >
          <MenuIcon sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }} />
          {props.mobileMenu
            ? <Fullscreen sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} />
            : <FullscreenExit sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} />}
        </IconButton>
      </Toolbar>
      <div className="wrapper">
        <div
          className="wrapper"
          style={{

          }}
        >
          <Typography sx={{ color: 'white', alignItems: 'center', justifyContent: 'flex-end' }} variant="h7" component="div">
            {props.mobileMenu ? customerDisplayName : ''}
          </Typography>

        </div>
        <div className="items">
          {userDetails.userRole !== 'superAdmin' &&
            <>
              {/* <Tooltip title="Notifications" placement="bottom" TransitionComponent={Zoom} arrow>
                <div className="item">
                  <ChatBubbleOutlineOutlined
                    className="icon"
                    onClick={handleNotificationMenu}
                    style={{
                      cursor: 'pointer', color: 'white'
                    }}
                  />
                  <div className="counter">{props.notificationCount}</div>
                </div>
              </Tooltip> */}
              <Menu
                id="menu-appbar1"
                anchorEl={props.anchorElNotification}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(props.anchorElNotification)}
                onClose={handleClose}
                sx={{ height: 'auto', maxHeight: '60vh', width: '100%' }}
                style={{ overflow: 'none', marginTop: 28 }}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 145,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
              >
                <div style={{ overflow: 'auto', maxHeight: '50vh' }}>
                  {alertList?.length !== 0
                    ? alertList?.map(({
                      id, sensorTag, a_date, a_time, msg, alertType, deviceName, labDepName,
                      floorName, buildingName, facilityName, branchName, stateName,
                    }) => (
                      <div key={id}>
                        <ListSubheader
                          sx={{ bgcolor: 'background.paper', height: '20px' }}
                          style={{ backgroundColor: 'white', paddingTop: '0px', lineHeight: 'inherit' }}
                        >
                          {a_date}
                          <div style={{ float: 'right', height: '20px' }}>
                            {a_time}
                          </div>
                        </ListSubheader>
                        <ListItem
                          button
                          onClick={handleClose}
                          style={{
                            maxWidth: 500, minWidth: '300px', paddingTop: '0px', paddingBottom: '0px',
                          }}
                        >
                          <ListItemAvatar>
                            {/* {alertType === 'Critical' ? <ErrorOutlineOutlined sx={{ color: 'red', fontSize: 30 }} /> :
                          alertType === 'Warning' ?  <PriorityHigh style={{ color: 'yellow', fontSize: 30 }}/> :
                          <WarningAmber sx={{ color: '#ba68c8', fontSize: 30 }} />} */}
                            {alertIcon(alertType)}
                          </ListItemAvatar>
                          <ListItemText
                            primary={<div>
                              <div><span style={{ fontWeight: 'bold' }}>
                                {
                                  sensorTag === deviceName ?
                                    'Device Name:' :
                                    'Sensor Name:'
                                }
                              </span>
                                <span style={{ fontWeight: 'none' }}>{sensorTag}</span></div>
                            </div>}
                            secondary={<div>
                              <div>Message : {msg}</div>
                              {
                                sensorTag !== deviceName &&
                                <div>Device Name : {deviceName} </div>
                              }

                              <div>Lab : {labDepName} </div>
                              <div>Floor : {floorName} </div>
                              <div>Building : {buildingName} </div>
                              <div>Facility : {facilityName} </div>
                              <div>Branch : {branchName} </div>
                              <div>State : {stateName} </div>
                            </div>} />
                        </ListItem>
                      </div>
                    ))
                    : (
                      <div>
                        <ListItem button onClick={handleClose} style={{ maxWidth: 500, minWidth: '300px', textAlign: 'center' }}>
                          <ListItemText primary="" secondary="No Notifications found" />
                        </ListItem>
                      </div>
                    )}
                </div>
              </Menu>
            </>}
          <IconButton
            size="small"
            aria-label="account of current user"
            // aria-controls="menu-appbar"
            // aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <div className="item" style={{ marginRight: 0, color: 'white' }}>
              <AccountCircle />
            </div>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* {(userRole === 'systemSpecialist' || userRole === 'superAdmin' || userRole === 'Admin' || userRole === 'Manager')
              && (
                <MenuItem onClick={() => {
                  handleClose();
                  setOpen((oldValue) => !oldValue);
                }}
                >
                  Settings
                </MenuItem>
              )} */}
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
          <div className="item">
            {userDisplayName}
          </div>
          {/* <IconButton aria-label="delete" onClick={handleInfoMenu}>
            <Info />
          </IconButton> */}
          <ThemeProvider theme={theme} >
            <Menu
              id="menu-appbar"
              anchorEl={infoAnchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(infoAnchorEl)}
              onClose={handleInfoClose}
            >
              <div style={{
                padding: '10px'
              }}>
                <div style={{
                  display: 'flex',
                  width: '100%',
                  gap: '5px'
                }}>
                  <BrowserUpdatedRounded />
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 'inherit',
                    justifyContent: 'space-between',
                    flexWrap: 'nowrap'
                  }}>
                    <span style={{
                      fontWeight: 600
                    }}>
                      App version :
                    </span>
                    <span>
                      {currentVersion}
                    </span>
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  width: '100%',
                  gap: '5px'
                }}>
                  <CalendarMonthRounded />
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 'inherit',
                    justifyContent: 'space-between',
                    flexWrap: 'nowrap'
                  }}>
                    <span style={{
                      fontWeight: 600
                    }}>
                      Release Date :
                    </span>
                    <span>
                      {releaseDate}
                    </span>
                  </div>
                </div>
              </div>
            </Menu>
          </ThemeProvider>
        </div>
      </div>

      <LogIntervalSetting
        open={open}
        setOpen={setOpen}
        setNotification={setNotification}
        handleClose={handleClose}
        intervalDetails={intervalDetails}
        userRole={userRole}
      />
      <NotificationBar
        handleClose={handleNotificationClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </div>
  );
}

export default Navbar;