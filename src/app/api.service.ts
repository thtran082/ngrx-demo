import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs';

export interface List {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    ipAddress: string,
}

@Injectable({ providedIn: 'root' })
export class ApiService {
    private readonly http = inject(HttpClient)

    getData(firstName: string) {
        return this.http.get<List[]>('assets/jsons/list.json').pipe(
            delay(1000),
            map(result =>
                result.filter(item =>
                    item.firstName.toLowerCase().includes(firstName.toLowerCase())
                ),
            ),
        );
    }
}