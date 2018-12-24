import { Dropdown, Icon, Menu, Popover } from 'antd';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';
import styled from 'styled-components';

import { DomainContext } from '@/domain';
import { avaliableLanguages, text } from '@/i18n';

type HeaderSelectLanguageContext = Pick<DomainContext, 'currentLanguage'>;

const SymbolLang = styled.span`
    width: 17px;
    display: inline-block;
`;

function HeaderSelectLanguage(props: WithContextProps<HeaderSelectLanguageContext>) {
    const { setContext, currentLanguage } = props;
    return (
        <Dropdown
            placement="bottomRight"
            overlay={(
                <Menu
                    selectedKeys={[currentLanguage]}
                    onClick={({ key }) => setContext({
                        currentLanguage: key
                    })}
                >
                    {
                        avaliableLanguages.map(lang => {
                            return (
                                <Menu.Item key={lang.name}>
                                    <SymbolLang>{lang.symbol}</SymbolLang> {lang.label}
                                </Menu.Item>
                            );
                        })
                    }
                </Menu>
            )}
        >
            <Icon className="header-action" type="global" title={text('Language')} />
        </Dropdown>
    );
}

export default withContext<HeaderSelectLanguageContext>('currentLanguage')(HeaderSelectLanguage);