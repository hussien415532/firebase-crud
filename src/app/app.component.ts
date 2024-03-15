import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './Services/http.service';
import { formData } from './Model/form-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private api: HttpService) { }
  selected:any
  editMode: boolean = false;
  data: formData[] = [];
  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),

  });
  ngOnInit() {
    this.getAll();
  }
  submit() {
    if (this.editMode) {
      this.updateData(this.selected.id, this.myForm.value);
    }
    else {
      this.api.addData(this.myForm.value).subscribe((_) => {
        this.getAll();
      });
      this.myForm.reset();
    }


  }
  getAll() {
    this.api.getAll().subscribe((d) => {
      this.data = d;
    });
  }
  deleteTask(id: string | undefined) {
    this.api.deleteData(id).subscribe(_ => this.getAll())
  }
  edit(id:any) {
    this.editMode = true;
    this.selected=this.data.find(task=>{return task.id===id});
    this.myForm.setValue(this.selected);
  }
  updateData(id: string | undefined, data: any) {
    this.api.updateData(id, data).subscribe(_ => this.getAll());
    this.editMode = false;
    this.myForm.reset();
  }

}