// chatbots.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Chat {
  id: number;
  query: string;
  response: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotsService {

  constructor(private http: HttpClient) { }

  listarChat(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.apiUrl}/api/queries/active`);
  }

  listarChatInactive(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.apiUrl}/api/queries/inactive`);
  }

  eliminarChat(chatbotsId: number): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/api/queries/delete/${chatbotsId}`, {}); // Cambiado a PUT para eliminar lógicamente
  }

  crearChat(mensajeIA: any): Observable<Chat> {
    return this.http.post<Chat>(`${environment.apiUrl}/api/queries`, mensajeIA);
  }

  actualizarChat(id: number, mensajeIA: any): Observable<Chat> {
    return this.http.put<Chat>(`${environment.apiUrl}/api/queries/${id}`, mensajeIA);
  }

  activarChat(id: number): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/api/queries/active/${id}`, {});
  }

}
