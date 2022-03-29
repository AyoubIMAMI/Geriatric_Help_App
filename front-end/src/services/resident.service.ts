import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Resident } from 'src/models/resident.model';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  /*
   The list of resident.
   */
  private residents: Resident[] = [];

  /*
   Observable which contains the list of the resident.
   */
  public resident$: BehaviorSubject<Resident[]>
    = new BehaviorSubject([]);

  public residentSelected$: Subject<Resident> = new Subject();

  private residentUrl = serverUrl + '/resident';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveResident();
  }

  retrieveResident(): void {
    this.http.get<Resident[]>(this.residentUrl).subscribe((userList) => {
      this.residents = userList;
      this.resident$.next(this.residents);
    });
  }

  addUser(resident: Resident): void {
    this.http.post<Resident>(this.residentUrl, resident, this.httpOptions).subscribe(() => this.retrieveResident());
  }

  setSelectedResident(residentId: string): void {
    const urlWithId = this.residentUrl + '/' + residentId;
    this.http.get<Resident>(urlWithId).subscribe((resident) => {
      this.residentSelected$.next(resident);
    });
  }

  deleteResident(resident: Resident): void {
    const urlWithId = this.residentUrl + '/' + resident.id;
    this.http.delete<Resident>(urlWithId, this.httpOptions).subscribe(() => this.retrieveResident());
  }
}
