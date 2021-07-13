import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Input } from "../OtherInterface/FormsControls/FormControl";

type FormDataType = {
  login: string;
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
          placeholder={"Login"}
          name={"login"}
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          name={"password"}
          component={Input}
          validate={[required, maxLength20]}
        />
      </div>
      <div>
        <Field type="checkbox" name={"rememberMe"} component={Input} />
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
