import * as yup from 'yup';
import { emailRegExp } from '../reg-exp';

const FIELD_REQUIRED = 'Поле не должно быть пустым';

const schema = yup.object().shape({
    email: yup
      .string()
      .required(FIELD_REQUIRED)
      .matches(emailRegExp, 'Введенный Email не корректный!'),
    password: yup
      .string()
      .required(FIELD_REQUIRED),
});
  
export default schema;