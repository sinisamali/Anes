import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Badge,
    Divider,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const commonButtonStyles = {
    height: '60px',
    width: '75.6px',
    border: 'none',
    borderLeft: '0.8px solid rgb(156, 130, 79)',
    borderRight: '0.8px solid rgb(156, 130, 79)',
    position: 'relative',
    overflow: 'hidden',
};

const commonHoverAnimation = {
    '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '-100%',
        left: 0,
        width: '100%',
        height: '100%',
        transition: 'bottom 0.3s ease-out',
    },
    '&:hover::before': {
        bottom: 0,
    },
};

const StyledAppBar = styled(AppBar)({
    backgroundColor: 'transparent',
    color: 'rgb(245, 241, 234)',
    borderBottom: '0.8px solid rgb(156, 130, 79)',
    borderLeft: '0.8px solid rgb(156, 130, 79)',
});

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    height: '60px',
    padding: 0,
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundColor: '#D0C6AE',
        opacity: 0.08,
        zIndex: -1,
    },
});

const StyledLogo = styled(Typography)({
    fontFamily: 'Arial',
    fontSize: '2rem',
    fontWeight: 900,
    cursor: 'pointer',
    position: 'relative',
    top: '4px',
    left: '60px',
    color: '#9C824F',
});

const StyledIconBox = styled(Box)({
    display: 'flex',
    height: '60px',
    paddingRight: '30.8px',
});

const StyledIconButton = styled(IconButton)({
    ...commonButtonStyles,
    ...commonHoverAnimation,
    borderRadius: 0,
    backgroundColor: 'transparent',
    color: 'rgb(245, 241, 234)',
    '&::before': {
        ...commonHoverAnimation['&::before'],
        backgroundColor: 'rgba(156, 130, 79, 0.1)',
    },
});

const StyledMenuButton = styled('button')({
    ...commonButtonStyles,
    ...commonHoverAnimation,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: '2px 0 0 0',
    '&::before': {
        ...commonHoverAnimation['&::before'],
        backgroundColor: '#9C824F',
        opacity: 0.1,
    },
    '&:hover .burger-line': {
        backgroundColor: '#9C824F',
    },
});

const BurgerLine = styled('span')({
    width: '30px',
    height: '1px',
    backgroundColor: 'rgb(245, 241, 234)',
    transition: 'all 0.4s ease-out',
    position: 'relative',
    zIndex: 1,
});

const StyledDivider = styled(Divider)({
    backgroundColor: '#9C824F',
    height: '1px',
    margin: '0 2px',
});

const MenuContent = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  height: '60px',  // Match navbar height
  '& .menu-links': {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      alignItems: 'center',
      height: '100%'
  },
  '& a': {
      color: 'rgb(245, 241, 234)',
      textDecoration: 'none',
      fontSize: '1.2rem',
      '&:hover': {
          color: '#9C824F',
      },
  },
});

const Navbar = () => {
    const [view, setView] = useState('default');

    const renderContent = () => {
        switch (view) {
          case 'menu':
            return (
                <MenuContent>
                    <div className="menu-links">
                        <a href="/users">SVI OGLASI</a>
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                        <IconButton 
                            onClick={() => setView('default')}
                            sx={{ color: 'rgb(245, 241, 234)' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                </MenuContent>
            );
            default:
                return (
                    <>
                        <StyledMenuButton onClick={() => setView('menu')}>
                            <BurgerLine className="burger-line" />
                            <BurgerLine className="burger-line" />
                            <BurgerLine className="burger-line" />
                        </StyledMenuButton>

                        <StyledLogo>𝓓𝓬</StyledLogo>

                        <StyledIconBox>
                            <StyledIconButton aria-label="account">
                                <PersonOutlineIcon />
                            </StyledIconButton>
                            <StyledIconButton aria-label="favorites">
                                <FavoriteBorderIcon />
                            </StyledIconButton>
                            <StyledIconButton aria-label="cart">
                                <Badge
                                    badgeContent={0}
                                    sx={{'& .MuiBadge-badge': {
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }}}
                                >
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </StyledIconButton>
                        </StyledIconBox>
                    </>
                );
        }
    };

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                {renderContent()}
            </StyledToolbar>
            <StyledDivider />
        </StyledAppBar>
    );
};

export default Navbar;