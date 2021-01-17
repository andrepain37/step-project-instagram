

import React from 'react';
import {Form, withFormik} from "formik";
import schema from "../validation/register/schema";
import { Button, Paper } from '@material-ui/core';
import Input from '../components/Input';
import { connect } from 'react-redux';
import { sendRegister } from '../store/user/operations';

function RegisterForm() {


    return (
        
        <Paper>
            <Form noValidate autoComplete="off" className="modal-form">
                <h3 className="modal-form-title">Регистрация</h3>   
                <Input label="Ваш никнейм" name="nickname" type="text" />
                <Input label="Ваш email" name="email" type="text" />
                <Input label="Ваш пароль" name="password" type="password" />
                <Input label="Повторите пароль" name="repeat" type="password" />
                <Button color="primary" type="submit">
                    Отправить
                </Button>
            </Form>
        </Paper>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        sendReg: values => dispatch(sendRegister(values))
    }
}

export default connect(null, mapDispatchToProps)(withFormik({
    mapPropsToValues: () => ({
        nickname: '',
        email: '',
        password: '',
        repeat: ''
    }),
    handleSubmit: (values, {props, setFieldError}) => {
        const sendData = {
            values,
            setError: setFieldError
        }
        
        props.sendReg(sendData);
        
   
    },
    validationSchema: schema
  })(RegisterForm));