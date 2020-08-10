import * as React from "react";

import {Logo, LogoMode} from "../logo/logo";


interface Props {}

export const Footer: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <footer className="page-footer">
      <Logo mode={LogoMode.LIGHT} />

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};
