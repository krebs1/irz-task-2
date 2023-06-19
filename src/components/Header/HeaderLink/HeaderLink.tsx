import React, {FC} from 'react';
import Style from "./HeaderLink.module.scss";

interface IProps {
    icon?: React.ReactNode,
    text?: string,
    classname?: string,
    isActive: boolean,
}

const HeaderLink: FC<IProps> = ({icon, text = '', classname = '', isActive = false}) => {
    return (
        <li className={`${Style.link} ${classname}`}
            style={{
                color: isActive?`var(--text-primary-color)`:`var(--text-inactive-color)`,
            }}
        >
            {icon}
            <span className={`pl-2`}>{text}</span>
        </li>
    );
};

export default HeaderLink;