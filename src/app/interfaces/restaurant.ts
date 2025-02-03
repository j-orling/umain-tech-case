export interface Restaurant {
    id: string;
    name: string;
    rating: number;
    filterIds: string[];
    image_url: string;
    delivery_time_minutes: number;
}