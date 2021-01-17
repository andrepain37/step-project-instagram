import * as yup from 'yup';
import { emailRegExp } from '../reg-exp';

const FIELD_REQUIRED = 'Поле не должно быть пустым';

const schema = yup.object().shape({
    nickname: yup
      .string()
      .required(FIELD_REQUIRED)
      .min(3, 'У никнейма должно быть минимум 3 символа')
      .max(20, 'У никнейма должно быть максимум 20 символов'),
    email: yup
      .string()
      .required(FIELD_REQUIRED)
      .matches(emailRegExp, 'Введенный Email не корректный!'),
    password: yup
      .string()
      .required(FIELD_REQUIRED),
    repeat: yup
      .string()
      .required(FIELD_REQUIRED)
      .oneOf([yup.ref("password"), null], "Пароли не совпадают!")
});
  
export default schema;