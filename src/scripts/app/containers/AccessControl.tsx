import { withContext, WithContextProps } from 'react-context-service';

import { AppCoreContext, Policy } from '../core/Types';

interface AccessControlProps {
    readonly allowFor: string | string[] | Policy | Policy[];
    readonly children: (canAccess: boolean) => JSX.Element | null;
}

type WithPolicies = Pick<AppCoreContext, 'policies'>;

function policyIsAllowed(policies: WithPolicies['policies'], policy: string | Policy, appContext: {}) {
    if (typeof policy === 'function') {
        return policy(appContext);
    }

    return policies![policy] ? policies![policy](appContext) : false;
}

function AccessControl(props: WithContextProps<WithPolicies, AccessControlProps>) {
    const { allowFor, children, policies, getContext } = props;
    if (!policies) {
        return children(false);
    }

    const appContext = getContext();

    let isAllowed: boolean = true;
    if (Array.isArray(allowFor)) {
        for (const policyName of allowFor) {
            isAllowed = policyIsAllowed(policies, policyName, appContext);
        }
    } else {
        isAllowed = policyIsAllowed(policies, allowFor, appContext);
    }

    return children(isAllowed);
}

export default withContext<AppCoreContext, AccessControlProps>('policies')(AccessControl);