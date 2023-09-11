import { List } from '../api.service';

export interface ListState {
    list: List[],
    search: {
        firstName: string,
    },
    loadingState: {
        list: boolean
    },
}