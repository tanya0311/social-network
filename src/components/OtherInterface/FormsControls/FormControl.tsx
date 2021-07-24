import React from "react";
import { WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import s from "./FormControl.module.css";


const FormControl = ({ meta,  children }:  any) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <div>{children}</div>
      <div>{hasError && <span>{meta.error}</span>}</div>
    </div>
  );
};
export const Textarea = (props: WrappedFieldProps) => {
  const { input, meta,  ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />{" "}
    </FormControl>
  );
};

export const Input = (props: WrappedFieldProps) => {
  const { input, meta,  ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />{" "}
    </FormControl>
  );
};

// export const Textarea = (props: any) => {
//   // debugger
//   const hasError=props.meta.touched && props.meta.error
//   return (
//     <div className={s.formControl + " " + (hasError ? s.error : '')}>
//       <div>
//         <textarea {...props.input} />
//       </div>
//       <div>
//         { hasError && <span>{props.meta.error}</span>}
//       </div>
//     </div>
//   );
// };

// export const Input= ({input, meta, ...props}: any) => {
//   // debugger
//   const hasError=meta.touched && meta.error
//   return (
//     <div className={s.formControl + " " + (hasError ? s.error : '')}>
//       <div>
//         <input {...input} {...props}/>
//       </div>
//       <div>
//         { hasError && <span>{meta.error}</span>}
//       </div>
//     </div>
//   );
// };
