import s from './Login.module.css'
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validators";


const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.inputForm} placeholder={'login'} name={'login'} component={'input'} validate={[required]}/>
            </div>
            <div>
                <Field className={s.inputForm} placeholder={'password'} name={'password'} component={'input'} validate={[required]}/>
            </div>
            <div>
                <Field className={s.checkbox} name={'rememberMe'} component={'input'} type={'checkbox'} />
            </div>
            <div className={s.divButton}>
                <button className={s.button}>LOGIN</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm)

const Login = (props) => {
    let loginUser = (value) => {
        props.login(value.login, value.password)
    }
    return(
        <div className={s.loginContainer}>
            <LoginReduxForm onSubmit={loginUser}
                            initialValues={{login: 'mayakovskiy89@inbox.ru',password: 240666}}
            />
        </div>
    )
}



export default Login