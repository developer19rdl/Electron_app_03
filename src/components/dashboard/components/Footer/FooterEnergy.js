import { Grid, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterEnergy = () => {
    return (
        // <div >
        <Grid container justifyContent={'space-around'} style={{ backgroundColor: '#0c0c24', height: '33px', alignItems: 'center' }}>
            <Grid item>
                <Typography style={{ color: '#ffffff' }}>Powered by : RDL Technologies Pvt Ltd | <a href='https://rdltech.in' style={{ color: '#ffffff', textDecoration: 'none' }}>
                    www.rdltech.in
                </a> </Typography>
            </Grid>

            {/* <Grid item>
                <FacebookIcon style={{ color: '#ffffff', marginLeft: '10px', marginRight: '10px' }} />
                <TwitterIcon style={{ color: '#ffffff', marginLeft: '10px', marginRight: '10px' }} />
                <LinkedInIcon style={{ color: '#ffffff', marginLeft: '10px', marginRight: '10px' }} />
            </Grid> */}
        </Grid>
        // </div>
    )
}

export default FooterEnergy