import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cars } from '../shared/car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // p:any; //for pagination
  carDetail:any;

  formValue!:FormGroup;
  carsDetails:cars = new cars();

  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private carsService: CarsService, private fb:FormBuilder) { }

  ngOnInit(){
    this.formValue = this.fb.group({
      id:[''],
      car:[''],
      car_model:[''],
      car_color:[''],
      car_model_year:[''],
      price:[''],
      availability:['']
    })
    // this.carsForm();
    this.getCar();
    
  }

  AddCar(){
    this.formValue.reset();
    this.showAdd= true;
    this.showUpdate= false;
  }

  //form
  // carsForm(){
    
  // }
  //get method
  getCar(){
    this.carsService.getCars().subscribe(res =>{
      console.log(res);
      this.carDetail = res;
    })
  }

  //post method
  postCar(){
    this.carsDetails.car = this.formValue.value.car;
    this.carsDetails.car_model = this.formValue.value.car_model;
    this.carsDetails.car_color = this.formValue.value.car_color;
    this.carsDetails.car_model_year = this.formValue.value.car_model_year;
    this.carsDetails.price = this.formValue.value.price;
    this.carsDetails.availability = this.formValue.value.availability;


    this.carsService.postCars(this.carsDetails).subscribe(res=>{
      console.log(res);
      this.formValue.reset();
      let ref = document.getElementById('close')
      ref?.click();
    this.getCar();
    })
  }

  //delete method
  deleteCar(car:any){
    this.carsService.deleteCars(car.id).subscribe(res=>{
      this.getCar();
    })
  }

  //put method
  onEdit(car:any){
    this.showAdd= false;
    this.showUpdate= true;

    this.carsDetails.id = car.id;

    this.formValue.controls['car'].setValue(car.car);
    this.formValue.controls['car_model'].setValue(car.car_model);
    this.formValue.controls['car_color'].setValue(car.car_color);
    this.formValue.controls['car_model_year'].setValue(car.car_model_year);
    this.formValue.controls['price'].setValue(car.price);
    this.formValue.controls['availability'].setValue(car.availability);

  }

  updateCar(){
    this.carsDetails.car = this.formValue.value.car;
    this.carsDetails.car_model = this.formValue.value.car_model;
    this.carsDetails.car_color = this.formValue.value.car_color;
    this.carsDetails.car_model_year = this.formValue.value.car_model_year;
    this.carsDetails.price = this.formValue.value.price;
    this.carsDetails.availability = this.formValue.value.availability;

    this.carsService.updateCars(this.carsDetails, this.carsDetails.id).subscribe(res =>{
      alert("updated");
      this.formValue.reset();
      let ref = document.getElementById('close')
      ref?.click();
      this.getCar();
    })
  }

}
