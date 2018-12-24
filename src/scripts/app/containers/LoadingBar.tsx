import 'react-loading-bar/dist/index.css';

import * as React from 'react';
import Loading from 'react-loading-bar';

import { COLOR_PRIMARY_600 } from '@/configs';
import { FetchEventArgs } from '@/restful';

import { eventEmitter, FETCH_FAIL, FETCH_START, FETCH_SUCCESS } from '../core';

type LoadingBarProps = {
    readonly color?: string;
};

type LoadingBarState = {
    readonly activeRequests: number
};

export class LoadingBar extends React.PureComponent<LoadingBarProps, LoadingBarState> {
    static readonly defaultProps = {
        color: COLOR_PRIMARY_600
    };

    readonly state = {
        activeRequests: 0
    };

    componentDidMount() {
        eventEmitter.on(FETCH_START, (e: FetchEventArgs) => {
            if (e.method !== 'GET') {
                return;
            }

            this.setState({
                activeRequests: this.state.activeRequests + 1
            });
        });

        eventEmitter.on(FETCH_SUCCESS, (e: FetchEventArgs) => {
            if (e.method !== 'GET') {
                return;
            }

            this.setState({
                activeRequests: this.state.activeRequests - 1
            });
        });

        eventEmitter.on(FETCH_FAIL, (e: FetchEventArgs) => {
            if (e.method !== 'GET') {
                return;
            }

            this.setState({
                activeRequests: this.state.activeRequests - 1
            });
        });
    }

    render() {
        return (
            <Loading
                show={this.state.activeRequests > 0}
                color={this.props.color}
            />
        );
    }
}