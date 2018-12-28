import { ProductModule } from '@/restful';

export const getProductModulesPrice = (props: {
    readonly productModules: ProductModule[];
    readonly startPrice: number;
}) => {
    const {
        productModules,
        startPrice = 0
    } = props;

    const reducer = (currentTotalPrice: number, currentModule: ProductModule) => {
        currentTotalPrice += currentModule.componentPrice + currentModule.materialPrice;
        return currentTotalPrice;
    };

    return productModules.reduce(reducer, startPrice);
};