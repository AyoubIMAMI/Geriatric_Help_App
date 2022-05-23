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
   The list of stats.
   */
  private stats: Stat[] = [];

  /*
   Observable which contains the list of the resident.
   */
  public stats$: BehaviorSubject<Stat[]>
    = new BehaviorSubject(this.stats);



  public statSelected$: Subject<Stat> = new Subject();

  private statUrl = serverUrl + '/stats';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveStat();
  }

  retrieveStat(): void {
    this.http.get<Stat[]>(this.statUrl).subscribe((statList) => {
      this.stats = statList;
      this.stats$.next(this.stats);
      //console.log("service", this.stats);
    });
  }

  addStat(stat: Stat): void {
    this.http.post<Stat>(this.statUrl, stat, this.httpOptions).subscribe(() => this.retrieveStat());
  }

  setSelectedStat(statId: string): void {
    const urlWithId = this.statUrl + '/' + statId;
    this.http.get<Stat>(urlWithId).subscribe((stat) => {
      this.statSelected$.next(stat);
    });
  }

}
