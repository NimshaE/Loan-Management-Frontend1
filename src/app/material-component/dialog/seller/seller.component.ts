import { GlobalConstents } from './../../../shared/global-constents';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SellerService } from 'src/app/services/seller.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  onAddSeller = new EventEmitter();
  onEditSeller = new EventEmitter();
  sellerform:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";

  responseMessage:any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private sellerService:SellerService,
  public dialogRef: MatDialogRef<SellerComponent>,
  private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.sellerform = this.formBuilder.group({
      name:[null,[Validators.required]]
    });
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = 'Edit'
      this.action = 'Update'
      this.sellerform.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    var formData = this.sellerform.value;
    var data = {
      name : formData.name
    }
    this.sellerService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddSeller.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error)=>{
      this.dialogRef.close();
      console.error(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstents.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstents.error);
    });
  }

  edit(){
    var formData = this.sellerform.value;
    var data = {
      id : this.dialogData.data.id,
      name : formData.name
    }
    this.sellerService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddSeller.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error)=>{
      this.dialogRef.close();
      console.error(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstents.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstents.error);
    });

  }
}
