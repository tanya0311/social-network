import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { loginTC } from "../../redux/auth-reducer";
import { RootReducersType } from "../../redux/redux-store";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Input } from "../OtherInterface/FormsControls/FormControl";
import s from "../OtherInterface/FormsControls/FormControl.module.css";

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
const maxLength20 = maxLengthCreator(20);

export function LoginForm(props: InjectedFormProps<FormDataType>) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {/* <input placeholder={"Login"} /> */}
        <Field
          placeholder={"Email"}
          name={"email"}
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          name={"password"}
          type={"password"}
          component={Input}
          validate={[required, maxLength20]}
        />
      </div>
      <div>
        <Field type="checkbox" name={"rememberMe"} component={Input} />
        <span>remember me</span>
      </div>
      {props.error && <div className={s.formError}>{props.error}</div>}
      <div>
        <button>Login</button>{" "}
      </div>
    </form>
  );
}

export const LoginReduxForm = reduxForm<FormDataType>({
  form: "login",
})(LoginForm);

// contener components
type MapStateToPropsType = {
  isAuth: boolean;
};
type MapDispathToPropsType = {
  loginTC: (email: string, password: string, rememberMe: boolean) => void;
  // loginTC : (formData: FormDataType) => void;
};
export type MyPostPropsType = MapStateToPropsType & MapDispathToPropsType;
type OwnProps = {};

const mapStateToProps = (state: RootReducersType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
  };
};

function Login(props: MyPostPropsType) {
  const onSubmit = (formData: FormDataType) => {
    props.loginTC(formData.email, formData.password, formData.rememberMe);
    // console.log(formData);
  };
  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h2>Login</h2>
      {/* <LoginForm /> */}
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
}

export default connect<
  MapStateToPropsType,
  MapDispathToPropsType,
  {},
  RootReducersType
>(mapStateToProps, { loginTC })(Login);
