import { withContext, WithContextProps } from 'react-context-service';

import { AppCoreContext, Policy } from '../core';

interface AccessControlProps {
    readonly funcKey?: string;
    readonly policy: Array<Policy | string> | Policy | string;
    readonly children: React.ReactNode | ((canAccess: boolean) => React.ReactNode);
}

type WithPolicies = Pick<AppCoreContext, 'policies'>;

function policyIsAllowed(
    policies: WithPolicies['policies'],
    funcKey: string | undefined,
    policy: string | Policy,
    appContext: {}
) {
    if (typeof policy === 'function') {
        return policy(appContext, funcKey);
    }

    return policies![policy] ? policies![policy](appContext, funcKey) : false;
}

function AccessControl(props: WithContextProps<WithPolicies, AccessControlProps>) {
    const { funcKey, policy, children, policies, getContext } = props;
    if (!policies) {
        if (typeof children === 'function') {
            return children(false);
        }

        return null;
    }

    const appContext = getContext();

    let isAllowed: boolean = true;
    if (Array.isArray(policy)) {
        for (const policyName of policy) {
            isAllowed = policyIsAllowed(policies, funcKey, policyName, appContext);
        }
    } else {
        isAllowed = policyIsAllowed(policies, funcKey, policy, appContext);
    }

    if (typeof children === 'function') {
        return children(isAllowed);
    }

    if (!isAllowed) {
        return null;
    }

    return children;
}

export default withContext<AppCoreContext, AccessControlProps>('policies')(AccessControl);