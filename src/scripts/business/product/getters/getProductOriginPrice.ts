import { ProductExtended, ProductModule } from '@/restful';

export const getProductOriginPrice = (product: ProductExtended) => {
    if (product.totalPrice) {
        return product.totalPrice;
    }

    return product.modules.reduce(
        (currentValue, productModule: ProductModule) => {
            const { component, material } = productModule;

            return currentValue += (component.price + material.price) || 0;
        },
        0
    );
};