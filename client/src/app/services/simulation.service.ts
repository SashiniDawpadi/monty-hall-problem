import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SimulationRequest{
  games: number;
  switchDoor: boolean
}

export interface SimulationResult{
  games: number
  switchDoor: boolean
  wins: number
  losses: number
  winRatePercent: number
}

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private baseUrl = 'http://localhost:5078/api/Simulations'
  private http = inject(HttpClient);
  
  constructor() { }

  runSimulation(request: SimulationRequest): Observable<SimulationResult> {
    return this.http.post<SimulationResult>(this.baseUrl, request);
 
  }
}
