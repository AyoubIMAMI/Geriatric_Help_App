import {Injectable} from "@angular/core";
import {Resident} from "../models/resident.model";
import {ClickData} from "../models/clickData.model";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatsHandicapService {
  private clickData: ClickData[] = [];
  //stocker la heatmap
  //stocker les stats pour chaque quiz par résident en fonction de son handicap
  //pour le quiz Hello, le résident Michel avec le handicap loadingMode -> peut-être un nouveau modèle pour stocker les données

  //Pour tout le modes
      //nbr de chargement/click/selection de chaque réponse


  //MissCLick
      //HeatMap
      //stats de cliques à coté (% de click à coté)
  //Loading mode
      //nbr de fois de ou on charge une réponse par question
  //MouseSelection
      //nbr de selection avant de valider la réponse

  private clickDataUrl = serverUrl + '/clickData';

  private httpOptions = httpOptionsBase;

  public clickData$: BehaviorSubject<ClickData[]>
    = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
  }

  retrieveClicks(residentId : string): void {
    const urlWithId = this.clickDataUrl + '/' + residentId;
    this.http.get<ClickData[]>(urlWithId).subscribe((clickDataList) => {
      this.clickData = clickDataList;
      this.clickData$.next(this.clickData);
      console.log(urlWithId, clickDataList)
    });
  }

  addData(clickData: ClickData): void {
    this.http.post<ClickData>(this.clickDataUrl, clickData, this.httpOptions).subscribe(
      () => this.retrieveClicks(clickData.residentId)
    );
  }

}
