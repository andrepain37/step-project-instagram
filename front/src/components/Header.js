import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MoreHoriz } from '@material-ui/icons';
import Logo from '../theme/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { activateLogin, activateRegister, activateUploadPost, activateUploadUserAvatar } from '../store/modals/operations';
import { checkUser, sendLogOut } from '../store/user/operations';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Header() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUser())
      }, [dispatch]);

    const [anchorEl, setAnchorEl] = useState(null);

    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goLog = () => {
        setAnchorEl(null);
        dispatch(activateLogin())
    }

    const goReg = () => {
        setAnchorEl(null);
        dispatch(activateRegister())
    }

    const goUploadPost = () => {
        setAnchorEl(null);
        dispatch(activateUploadPost())
    }

    const goLogOut = () => {
        setAnchorEl(null);
        dispatch(sendLogOut())
    }

    const goUploadUserAvatar = () => {
        setAnchorEl(null);
        dispatch(activateUploadUserAvatar())
    }

    

    const isLogin = useSelector(st => st.user.isLogin)
    const user_info = useSelector(st => st.user.user_info)
    

    return (
        <header>
            <Link to="/" ><Logo></Logo></Link>
            
            <div className="header-nav-info">
                {isLogin &&
                <>
                    <Avatar
                        aria-label="recipe" 
                        src={user_info.image}
                        className="avatar"
                    >
                        {user_info.nickname[0]}
                    </Avatar>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={!!anchorEl}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={goUploadUserAvatar}>Поменять аватар</MenuItem>
                        <MenuItem onClick={goUploadPost}>Загрузить пост</MenuItem>
                        <MenuItem onClick={goLogOut}>Выйти</MenuItem>
                    </Menu>  
                </>
                }
                {!isLogin &&
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={!!anchorEl}
                    onClose={handleClose}
                >
                    <MenuItem onClick={goLog}>Войти</MenuItem>
                    <MenuItem onClick={goReg}>Зарегистрироваться</MenuItem>
                </Menu>   
                }
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MoreHoriz></MoreHoriz>
                </Button>
            </div>
        </header>
    );
}

export default Header;



