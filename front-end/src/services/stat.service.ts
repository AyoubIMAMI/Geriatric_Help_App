import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Stat } from 'src/models/stat.model';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  /*
   The list of resident.
   */
  private residents: Stat[] = [];

  /*
   Observable which contains the list of the resident.
   */
  public stats$: BehaviorSubject<Stat[]>
    = new BehaviorSubject([]);

  public residentSelected$: Subject<Stat> = new Subject();

  private residentUrl = serverUrl + '/residents';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveResident();
  }

  retrieveResident(): void {
    this.http.get<Stat[]>(this.residentUrl).subscribe((statList) => {
      this.residents = statList;
      this.stats$.next(this.residents);
    });
  }

  addResident(stat: Stat): void {
    this.http.post<Stat>(this.residentUrl, stat, this.httpOptions).subscribe(() => this.retrieveResident());
  }

  setSelectedResident(statId: string): void {
    const urlWithId = this.residentUrl + '/' + statId;
    this.http.get<Stat>(urlWithId).subscribe((resident) => {
      this.residentSelected$.next(resident);
    });
  }

  deleteResident(stat: Stat): void {
    const urlWithId = this.residentUrl + '/' + stat.id;
    this.http.delete<Stat>(urlWithId, this.httpOptions).subscribe(() => this.retrieveResident());
  }
}
