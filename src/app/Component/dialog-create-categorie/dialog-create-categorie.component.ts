import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  Image = new FormControl();

  constructor( private fb: FormBuilder, private accountService: AccountService, private router: Router, private categorieService: CategorieService, public dialogRef: MatDialogRef<DialogCreateCategorieComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createCategorieForm = this.fb.group({
      Nom: [data.isModif ? data.categorieToModify.Nom : '', Validators.required],
      Image: [data.isModif ? data.categorieToModify.Image : this.Image.value],
      Description: [data.isModif ? data.categorieToModify.Description : ''],
      Depense: [data.isModif ? data.categorieToModify.Depense : true, Validators.required],
      Couleur: [data.isModif ? data.categorieToModify.Couleur : null, Validators.required],
    });
  }

  /**
   * Méthode de soumission du formaulaire
   */
  onSubmit() {
    //Création
    if (!this.data.isModif) {
      if (this.createCategorieForm.valid) {
        const nom = this.createCategorieForm.get('Nom')?.value;
        const image = this.Image.value;
        const description = this.createCategorieForm.get('Description')?.value;
        const depense = this.createCategorieForm.get('Depense')?.value;
        const couleurValue = this.createCategorieForm.get('Couleur')?.value;
        const couleur = "#" + couleurValue.hex;
        const idUser = this.accountService.getIdUser();

        this.categorieService.createCategorie(nom, image, description, depense, couleur, Number(idUser)).subscribe({
          next :(response: any) => {
            console.log(response)
            this.dialogRef.close();
          },
          error : (error: any) => {
            console.error(error)
          }
        });
      }
    } else {
      //Modification
      const updatedCategorieData: any = {};
      const formControls = this.createCategorieForm.controls;

      if (this.createCategorieForm.valid) {

      for (const key in formControls) {
        if (formControls.hasOwnProperty(key)) {
          updatedCategorieData[key] = formControls[key].value;
        }
      }

      if (this.data.categorieToModify.Couleur !== this.createCategorieForm.get('Couleur')?.value) {
        const couleurValue = this.createCategorieForm.get('Couleur')?.value;
        updatedCategorieData.Couleur = "#" + couleurValue.hex;
      }

      updatedCategorieData.Image = this.Image.value;

        this.categorieService
          .updateCategorie(this.data.categorieToModify.id_Categorie, updatedCategorieData)
          .subscribe({
            next: (response: any) => {
              this.dialogRef.close();
            },
            error: (error: any) => {
              console.log(error)
            }
          });
      }
    }
  }
  onIconPickerSelect(icon: string): void {
    this.Image.setValue(icon);
  }
}
