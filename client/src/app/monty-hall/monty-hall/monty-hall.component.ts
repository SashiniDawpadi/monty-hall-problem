import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SimulationResult, SimulationService } from '../../services/simulation.service';

@Component({
  selector: 'app-monty-hall',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './monty-hall.component.html',
  styleUrl: './monty-hall.component.css'
})
export class MontyHallComponent {

  loading = false;
  result: SimulationResult | null = null;
  montyHallForm: FormGroup;
  games: FormControl = new FormControl(1000); // default value
  switchDoor: any;


  constructor(private formBuilder: FormBuilder, private simulationService: SimulationService) {
    this.montyHallForm = this.formBuilder.group({
      games: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(5000000)]),
      switchDoor: new FormControl(true)
    });
  }

  // ngOnInit(): void {
  //   this.montyHallForm = this.formBuilder.group({
  //     games: new FormControl(3, [Validators.required, Validators.min(1), Validators.max(5000000)]),
  //     switchDoor: new FormControl(true, [Validators.required])
  //   })
  // }

  runSimulator() {
    if (this.montyHallForm.invalid) return
    this.loading = true
    this.result = null
    const payload = {
      games: this.montyHallForm.value.games!,
      switchDoor: this.montyHallForm.value.switchDoor!
    }

    console.log(payload)
    console.log(this.montyHallForm.value)
    alert(this.montyHallForm.value);
    this.simulationService.runSimulation(this.montyHallForm.value).subscribe({
      next: (res) => { this.result = res; this.loading = false; alert(`success`) },
      error: () => { this.loading = false; alert('Simulation failed'); }
    })

  }
}
