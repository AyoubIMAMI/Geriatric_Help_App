import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
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
  public residents$: BehaviorSubject<Resident[]>
    = new BehaviorSubject([]);

  public residentSelected$: Subject<Resident> = new Subject();

  private residentUrl = serverUrl + '/residents';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveResident();
  }

  retrieveResident(): void {
    this.http.get<Resident[]>(this.residentUrl).subscribe((residentList) => {
      this.residents = residentList;
      this.residents$.next(this.residents);
    });
  }

  addResident(resident: Resident): void {
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

  updateResident(resident: Resident): void{
    const urlWithId = this.residentUrl + '/' + resident.id;
    this.http.put(urlWithId,resident, this.httpOptions).subscribe(() => this.retrieveResident());
  }
}
