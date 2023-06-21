import React, {FC, FormEvent} from 'react';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "./Form.module.scss";
import {Link} from "react-router-dom";

interface IProps {
    children?: React.ReactNode | string | null,
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void | null,
    formTitle?: string | number,
    buttonText?: string | number,
    canSubmit?: boolean,
    links?: { name: string, link: string, path: string }[] | null,
}

const Form: FC<IProps> = ({
                              children = null,
                              onSubmit = null,
                              formTitle = '',
                              buttonText = '',
                              canSubmit = true,
                              links = null,
                          }) => {
    return (
        <div className={`${Style.wrapper}`}>
            <div className={`${Style.wrapper__form}`}>
                <form className={`mb-20`}
                      onSubmit={(e) => {
                          if (onSubmit) onSubmit(e);
                      }}
                >
                    <h2 className={`${Style.title} text_type_main-medium mb-6`}>
                        {formTitle}
                    </h2>
                    {
                        children
                    }
                    <div className={`pt-6`}></div>
                    <Button htmlType="submit"
                            type="primary"
                            size="large"
                            disabled={!canSubmit}
                    >
                        {buttonText}
                    </Button>
                </form>
                {
                    links &&
                    <div className={`${Style.links}`}>
                        {
                            links.map(({name, link, path}) => {
                                return (
                                    <div className={`${Style.links__linkWrapper}`}
                                         key={path}
                                    >
                                        <span className={`${Style.links__linkWrapper__name} text_type_main-default`}>
                                            {name}
                                        </span>
                                        <span className={`pr-2`}></span>
                                        <Link className={`${Style.links__linkWrapper__link} text_type_main-default`}
                                              to={path}
                                        >
                                            {link}
                                        </Link>
                                    </div>
                                );
                            })
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Form;