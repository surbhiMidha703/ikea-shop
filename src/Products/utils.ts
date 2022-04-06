import { productInfo } from './ItemDescription'

export const displayProductInfo = (itemName: string): string => {
    const itemNameWithoutSpaces = itemName.replace(/\s/g, '')
    if (productInfo.hasOwnProperty(itemNameWithoutSpaces)) {
        // @ts-ignore
        return productInfo[itemNameWithoutSpaces]
    }
    return ''
} 