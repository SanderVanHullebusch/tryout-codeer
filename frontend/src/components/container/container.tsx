import { FC, ReactNode } from "react";

import styles from './container.module.css'

interface Props extends Omit<React.HTMLProps<HTMLDivElement>, 'className'> {
    children: ReactNode;
}

export const Container: FC<Props> = ({ children, ...rest }) => {
    return (
        <div className={styles.container} {...rest}>
            {children}
        </div>
    );
};
