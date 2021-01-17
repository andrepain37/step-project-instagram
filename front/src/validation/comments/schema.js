import * as yup from 'yup';

const FIELD_REQUIRED = 'Комментарий не должен быть пустым';

const schema = yup.object().shape({
    add_comment: yup
      .string()
      .required(FIELD_REQUIRED)
      .min(1, 'Комментарий не должен быть пустым'),
});
  
export default schema;