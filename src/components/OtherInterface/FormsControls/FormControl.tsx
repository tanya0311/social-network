import React from "react";
import s from "./FormControl.module.css";

const FormControl = ({ input, meta, child, ...props }: any) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <div>{props.children}</div>
      <div>{hasError && <span>{meta.error}</span>}</div>
    </div>
  );
};
export const Textarea = (props: any) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...props.input} {...restProps} />{" "}
    </FormControl>
  );
};

export const Input = (props: any) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...props.input} {...restProps} />{" "}
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
