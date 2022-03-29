import * as React from 'react';
import '../css/Navbar.css';
import {Navbar,Container,Nav,Row,Col,Image as img} from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import logo from '../static/images/logo.png'
import team_pic from '../static/images/team.jpg'
import player_pic from '../static/images/player.jpg'
import home_pic from '../static/images/home.jpg'
import profile_pic from '../static/images/profile.jpg'
const images = [
    {
      url: home_pic,
      title: 'Home',
      width: '25%',
    },
    {
      url: player_pic,
      title: 'Search players',
      width: '25%',
    },
    {
      url: team_pic,
      title: 'Search teams',
      width: '25%',
    },
    {
        url: profile_pic,
        title: 'Your profile',
        width: '25%',
      },
  ];
const urls = {
    'Home':'/',
    'Search players':'/search',
    'Search teams':'/searcht',
    'Your profile':'/your_profile'
}
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 70,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 60%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

function Navbaro(props) {

    const handleLogout = () => {
        props.removeToken();
    }

    if(props.token){
        return (
            <div>
                 <Row id="outliner"></Row>
                <Row className='text-left' id="main_row">
                <Col></Col>
                

                <Col className='d-flex p-2 justify-content-center'><img src={logo} id="logo_img"/><h1 id="main_header">Buddy2Play</h1>
                </Col>

                <Col>
                    <div id="Nav">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button href='/logout' sx={{
                        width: 170,
                        height:50,
                        
                    }} onClick={handleLogout}>logout</Button>

                    </ButtonGroup>
                    </div>
                </Col>
                
                </Row>
                <Row id="outliner"></Row>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                    {images.map((image) => (
                        <ImageButton
                        href={urls[image.title]}
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                        >
                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={{
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
                            >
                            {image.title}
                            <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                        </ImageButton>
                    ))}
                </Box>
            </div>
        )

    }else{
        return (
            <div>
                <Row id="outliner"></Row>
                <Row className='text-left' id="main_row">
                <Col></Col>
                

                <Col className='d-flex p-2 justify-content-center'><img src={logo} id="logo_img"/><h1 id="main_header">Buddy2Play</h1>
                </Col>
                <Col>
                    <div id="Nav">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button href='/' sx={{
                        width: 170,
                        height:50,
                        
                    }}>Home</Button>

                    <Button href='/login' sx={{
                        width: 170,
                        height:50,
                        
                    }}>Login</Button>

                    <Button href='register' sx={{
                        width: 170,
                        height:50,
                        
                    }}>Register</Button>
                    </ButtonGroup>
                    </div>
                </Col>
                
                </Row>
                <Col></Col>
                
                
                <Row id="outliner"></Row>
                
            </div>
        )
    }
    
}

export default Navbaro
