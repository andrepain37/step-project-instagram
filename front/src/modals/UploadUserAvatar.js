

import React, { useRef, useState } from 'react';
import { Button, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Send, CloudUpload } from '@material-ui/icons';
import { sendSettingImage } from '../store/user/operations';

function UploadUserAvatar() {

    const isLogin = useSelector(st => st.user.isLogin)

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const fileInput = useRef(null);


    const onFileChange = (e) => { 
     
      const img_src = window.URL.createObjectURL(e.target.files[0]);
      setFile(e.target.files[0]); 
      setImage(img_src)

    }; 

    const handleOpenFileInput = () => {
      fileInput.current.click();
    };

    

    const handleUploadImage = () => {

      dispatch(sendSettingImage(file));
      setFile(null); 
      setImage(null)
    };

    if (!isLogin) {
      return 'Error';
    }


    return (
        <Paper>
            <h3 className="modal-form-title">Загрузить аватар!</h3>
            <div className="modal-form-post"> 

                <Button
                    onClick={handleOpenFileInput}
                    variant="contained"
                    color="default"
                    startIcon={<CloudUpload />}
                  >
                    Загрузить
                </Button>
                <input ref={fileInput} style={{display: 'none'}} name="upload_post" id="upload_post" type="file" onChange={onFileChange} /> 

                
                
                {image && 
                file && 
                <div className="modal-form-post__preview">  
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Send />}
                    onClick={handleUploadImage}
                  >
                    Поменять аватар!
                  </Button>
                  <hr />
                  <h4>Предварительный просмотр!</h4>
                  <img src={image} alt={file.name} />
                </div>}
            </div> 
        </Paper>
    );
}


export default UploadUserAvatar;