import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private readonly http = inject(HttpClient)

    getData() {
        return this.http.get<any[]>('assets/jsons/list.json');
    }
}