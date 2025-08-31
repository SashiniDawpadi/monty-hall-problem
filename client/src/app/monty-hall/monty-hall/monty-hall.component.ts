import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SimulationResult, SimulationService } from '../../services/simulation.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';


@Component({
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatCardModule],
  templateUrl: './monty-hall.component.html',
  styleUrl: './monty-hall.component.css'
})

export class MontyHallComponent implements OnInit, OnDestroy {
  loading = false;
  result: SimulationResult | null = null;
  montyHallForm: FormGroup = new FormGroup({});
  private simulationSubscription: any;

  constructor(private formBuilder: FormBuilder, private simulationService: SimulationService) { }

  ngOnInit(): void {
    this.montyHallForm = this.formBuilder.group({
      games: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5000000)]),
      switchDoor: new FormControl(true)
    });
  }

  runSimulator() {
    if (this.montyHallForm.invalid) return;
    this.loading = true
    this.result = null
    if (this.simulationSubscription) {
      this.simulationSubscription.unsubscribe();
    }
    this.simulationSubscription = this.simulationService.runSimulation(this.montyHallForm.value).subscribe({
      next: (res) => { this.result = res; this.loading = false; },
      error: () => { this.loading = false; alert('Simulation failed'); }
    })
  }

  ngOnDestroy(): void {
    if (this.simulationSubscription) {
      this.simulationSubscription.unsubscribe();
    }
  }
}
