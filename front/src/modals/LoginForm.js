

import React from 'react';
import {Form, withFormik} from "formik";
import schema from "../validation/login/schema";
import { Button, Paper } from '@material-ui/core';
import Input from '../components/Input';
import { connect } from 'react-redux';
import { sendLogin } from '../store/user/operations';

function LoginForm() {


    return (
        
    <Paper>          
        <Form noValidate autoComplete="off" className="modal-form">
            <h3 className="modal-form-title">Авторизация</h3>   
            <Input label="Ваш email" name="email" type="text" />
            <Input label="Ваш пароль" name="password" type="password" />
            <Button color="primary" type="submit">
                Отправить
            </Button>
        </Form>
    </Paper>
        
    );
}

const mapDispatchToProps = dispatch => {
    return {
        sendLog: values => dispatch(sendLogin(values))
    }
}

export default connect(null, mapDispatchToProps)(withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
    }),
    handleSubmit: (values, {props, setFieldError}) => {
    
        const sendData = {
            values,
            setError: setFieldError
        }
        props.sendLog(sendData);
        
    },
    validationSchema: schema
  })(LoginForm));