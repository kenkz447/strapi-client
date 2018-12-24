import { Input } from 'antd';
import debounce from 'lodash/debounce';
import * as React from 'react';
import styled from 'styled-components';

import { text } from '@/i18n';

const KeywordFiltererWrapper = styled.div`
    max-width: 200px;
`;

export interface KeywordFiltererProps {
    readonly onSearch: (searchTerm: string) => void;
    readonly placeholder?: string;
}

export class KeywordFilterer extends React.PureComponent<KeywordFiltererProps> {
    readonly onSearch = debounce(this.props.onSearch, 250);

    public render() {
        const { placeholder } = this.props;
        return (
            <KeywordFiltererWrapper className="keyword-filterer">
                <Input
                    placeholder={placeholder ? placeholder : text('search...')}
                    onChange={(e) => this.onSearch(e.target.value)}
                />
            </KeywordFiltererWrapper>
        );
    }
}