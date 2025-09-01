import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { SimulationService } from './simulation.service';

describe('SimulationService', () => {
  let service: SimulationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      providers: [SimulationService,
        provideHttpClient(),
        provideHttpClientTesting()]
    });
    service = TestBed.inject(SimulationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should POST to run  simulation', () => {
    const payload = {games:10000,switchDoor:true}
    service.runSimulation(payload).subscribe(res => {
      expect(res.games).toBe(10000);
      expect(res.switchDoor).toBeTrue();
    })
    const req = httpTestingController.expectOne('http://localhost:5078/api/Simulations');
    expect(req.request.method).toBe('POST');
    req.flush({ games: 10000, switchDoor: true, wins: 6666, losses: 3334, winRatePercent: 66.66 })
  });
});
