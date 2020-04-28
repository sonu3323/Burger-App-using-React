import React from 'react';
import Au from "../../hoc/Au";

import styles from "./Layout.module.css";

const  Layout=(props) => {
return (
      <Au>
    <div>Toolbar , SlideBar , Backdrop</div>
    <main className={styles.Content}>
        {props.children}
    </main>
     </Au>
)
};

export default Layout
