import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Config} from "../../class/config";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {CategorieService} from "../../services/categorie.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Categorie} from "../../class/categorie";

@Component({
  selector: 'app-dialog-create-categorie',
  templateUrl: './dialog-create-categorie.component.html',
  styleUrls: ['./dialog-create-categorie.component.scss'],
})
export class DialogCreateCategorieComponent {
  createCategorieForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private categorieService: CategorieService, public dialogRef: MatDialogRef<DialogCreateCategorieComponent>) {
    this.createCategorieForm = this.fb.group({
      Nom: ['', Validators.required],
      Image: ['', Validators.required],
      Description: [''],
      Depense: [true, Validators.required],
      Couleur: ['', Validators.required]
    });
  }
  onSubmit() {
     if (this.createCategorieForm.valid) {
      const nom = this.createCategorieForm.get('Nom')?.value;
      const image = this.createCategorieForm.get('Image')?.value;
      const description = this.createCategorieForm.get('Description')?.value;
      const depense = this.createCategorieForm.get('Depense')?.value;
      const couleur = this.createCategorieForm.get('Couleur')?.value;
      const idUser = this.accountService.getIdUser();
    //
      this.categorieService.createCategorie(nom, image, description, depense, couleur, Number(idUser)).subscribe(
        (response: any) => {
          console.log(response)
          this.dialogRef.close();
        },
        (error: any) => {
          console.error(error)
        }
      )
    }
  }

  test() {
    console.log(this.createCategorieForm.get('Depense')?.value)
  }
}
