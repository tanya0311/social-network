import React from "react";
import s from "./Preloader.module.css";

export type PreloaderPropsType = {};

export const Preloader = (props: PreloaderPropsType) => {
  return (
    <div className={s.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
