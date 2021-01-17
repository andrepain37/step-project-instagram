import React, { useState } from 'react';
import {Form, withFormik} from "formik";
import schema from "../validation/comments/schema";
import { Button } from '@material-ui/core';
import Input from '../components/Input';
import { connect, useDispatch } from 'react-redux';
import { commentPost, getComments } from '../store/posts/operations';


function Comments({lastComments, postId = false, isAllComments = false}) {

    const [isloadAllComments, setIsLoadAllComments] = useState(isAllComments);
    const dispatch = useDispatch();

    const loadAllComments = () => {
        setIsLoadAllComments(true);
        dispatch(getComments(postId))
    }

    let comments = false;

    if (!!lastComments) {
        comments = lastComments.map(e => {
            return (
                <div className="comments-comment" key={e.id}>
                    <span className="comments-comment--name">{e.name}</span>
                    <span className="comments-comment--comment">{e.comment}</span>
                </div>
            )
        })

    }

    return (
        <section className="comments">
            {!isloadAllComments && lastComments && <span onClick={loadAllComments} className="comments-loader" >Загрузить все комментарии</span>}
            <div className="comments_users">
                {comments}
            </div>
            <Form noValidate autoComplete="off" className="comments-form">
                <Input label="Добавить комментарий" name="add_comment" type="text" classes="comments-form__comment" />
                <Button color="primary" type="submit">
                    Отправить
                </Button>
            </Form>
        </section>
    );
}



const mapDispatchToProps = dispatch => {
    return {
        sendComment: (postId, comment) => dispatch(commentPost(postId, comment))
    }
}

export default connect(null, mapDispatchToProps)(withFormik({
    mapPropsToValues: () => ({
        add_comment: ''
    }),
    handleSubmit: (values, {props, resetForm}) => {


        const sendData = {
            postId: props.postId,
            comment: values.add_comment,
            resetValue: resetForm
        }

        props.sendComment(sendData);
    },
    validationSchema: schema
})(Comments));