import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConsumers } from 'app/shared/model/consumers.model';

import { PostsService } from 'app/entities/posts/posts.service';

type EntityResponseType = HttpResponse<IConsumers>;
type EntityArrayResponseType = HttpResponse<IConsumers[]>;

@Injectable({ providedIn: 'root' })
export class ConsumersService {
    public resourceUrl = SERVER_API_URL + 'api/consumers';

    constructor(private http: HttpClient, private postsService: PostsService) {}

    create(consumers: IConsumers): Observable<EntityResponseType> {
        return this.http.post<IConsumers>(this.resourceUrl, consumers, { observe: 'response' });
    }

    update(consumers: IConsumers): Observable<EntityResponseType> {
        return this.http.put<IConsumers>(this.resourceUrl, consumers, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IConsumers>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IConsumers[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
