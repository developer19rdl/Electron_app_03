import { Grid, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const FooterComponent = () => {
    return (
        <div
            style={{
                backgroundColor: '#212121',
                color: 'white',
                padding: '2px',
                // textAlign: 'center',
                position: 'fixed',
                bottom: '0',
                width: '100%',
                height: '4%',
                zIndex: '1000',
                justifyContent: 'space-evenly',
                display: 'flex',
                alignItems: 'center'

            }}
        >
            {/* <span style={{ color: 'white' }}>
                &copy; {new Date().getFullYear()} RDL Technologies Pvt Ltd
            </span> */}
            <Typography style={{ color: '#FFFFFF', fontSize: '14px' }}>Copyright © 2023 RDL Technologies Pvt Ltd - All Rights Reserved.</Typography>
            <Grid item>
                <Typography style={{ color: '#FFFFFF' }}>
                    <a href='https://rdltech.in' style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                        www.rdltech.in
                    </a>
                </Typography>
            </Grid>
            <Grid item>
                <FacebookIcon style={{ color: '#FFFFFF', }} />
                <TwitterIcon style={{ color: '#FFFFFF' }} />
                <LinkedInIcon style={{ color: '#FFFFFF', marginRight: "50px" }} />
            </Grid>
            {/* <Typography style={{ color: '#ffffff', fontSize: '10px', marginRight: '200px' }}>Spark & Bloom
            </Typography> */}
        </div>

    );
};

export default FooterComponent;
