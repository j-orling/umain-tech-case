import { Filter } from "./filter";
import { PriceRange } from "./price-range";

export interface ActiveFilters {
    filters: Filter[];
    priceRanges: PriceRange[];
    deliveryTimes: number[];
}