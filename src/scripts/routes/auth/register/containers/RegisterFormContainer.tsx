import { Alert, Divider } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { BusinessController } from '@/business';
import { registerUser } from '@/business/user';
import { SlideUp } from '@/components';
import { LOGIN_URL } from '@/configs';
import { RegisterFormControl } from '@/forms/auth';
import { text } from '@/i18n';
import { AuthLoginResponseBody } from '@/restful';
import { Reflink } from '@/restful/resources/Reflink';

import { AuthCard } from '../../shared';

interface RegisterFormContainerProps {
    readonly reflink: Reflink;
    readonly error?: string;
}

interface RegisterFormContainerState {
    readonly registered: boolean;
}

export class RegisterFormContainer extends React.PureComponent<RegisterFormContainerProps, RegisterFormContainerState> {
    constructor(props: RegisterFormContainerProps) {
        super(props);

        this.state = {
            registered: false
        };
    }

    public render() {
        const { reflink, error } = this.props;
        const { registered } = this.state;

        return (
            <SlideUp>
                {
                    registered
                        ? (
                            <AuthCard
                                title={text('Registration')}
                                description={text('Registration_Successful')}
                            />
                        )
                        : (
                            <AuthCard
                                title={text('Registration')}
                                description={text('Registration_Basic')}
                            >
                                {
                                    error && (
                                        <div>
                                            <Alert type="error" showIcon={true} message={error} />
                                            <div className="white-space-2" />
                                        </div>
                                    )
                                }
                                <BusinessController
                                    action={registerUser}
                                    onSuccess={({ jwt }: AuthLoginResponseBody) => {
                                        localStorage.setItem('tempJWT', jwt);
                                        this.setState({
                                            registered: true
                                        });
                                    }}
                                >
                                    {({ doBusiness }) => {
                                        return (
                                            <RegisterFormControl
                                                initialValues={{
                                                    reflink: reflink
                                                }}
                                                submit={doBusiness}
                                            />
                                        );
                                    }}
                                </BusinessController>
                            </AuthCard>
                        )
                }
                <Divider dashed={true} />
                <div className="register-link">
                    <Link to={LOGIN_URL}>
                        <u>{text('To login page')}</u>
                    </Link>
                </div>
            </SlideUp>
        );
    }
}
