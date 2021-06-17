import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

type FormDataType = {
  login: string;
  password: string;
  rememberMe: boolean;
};
export function LoginForm(props: InjectedFormProps<FormDataType>) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {/* <input placeholder={"Login"} /> */}
        <Field placeholder={"Login"} name={"login"} component={"input"} />
      </div>
      <div>
        <Field placeholder={"Password"} name={"password"} component={"input"} />
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"} component={"input"} />{" "}
        <span>remember me</span>
      </div>
      <div>
        <button>Login</button>{" "}
      </div>
    </form>
  );
}

export const LoginReduxForm = reduxForm<FormDataType>({
  form: "login",
})(LoginForm);

export function Login() {
  const onSubmit = (formData: FormDataType) => {
    console.log(formData);
  };
  return (
    <div>
      <h2>Login</h2>
      {/* <LoginForm /> */}
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
}
