import { List } from '../api.service';

export interface Search {
    firstName: string,
} 
export interface ListState {
    list: List[],
    search: Search,
    loadingState: {
        list: boolean
    },
}