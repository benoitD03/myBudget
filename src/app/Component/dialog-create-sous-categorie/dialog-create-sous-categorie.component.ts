import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SousCategorieService} from "../../services/sous-categorie.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dialog-create-sous-categorie',
  templateUrl: './dialog-create-sous-categorie.component.html',
  styleUrls: ['./dialog-create-sous-categorie.component.scss']
})
export class DialogCreateSousCategorieComponent {
  createSousCategorieForm: FormGroup;
  Image = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, private accountService: AccountService, private router: Router, private sousCategorieService: SousCategorieService, public dialogRef: MatDialogRef<DialogCreateSousCategorieComponent>, private datePipe: DatePipe) {
    this.createSousCategorieForm = this.fb.group({
      Nom: [data.isModif ? data.sousCategorieToModify.Nom : '', Validators.required],
      Image: [this.Image],
      Date: [data.isModif ? data.sousCategorieToModify.Date : this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm:ssZ'), Validators.required],
      Somme: [data.isModif ? data.sousCategorieToModify.Somme : 0, Validators.required],
      Couleur: [data.isModif ? data.sousCategorieToModify.Couleur.substring(1) : null, Validators.required]
    });
  }

  onSubmit() {
    if (!this.data.isModif) {
      if (this.createSousCategorieForm.valid) {
        const nom = this.createSousCategorieForm.get('Nom')?.value;
        const image = this.Image.value;
        const depense = this.data.categorie.Depense;
        const dateValue = this.createSousCategorieForm.get('Date')?.value;
        const date = this.datePipe.transform(dateValue, 'yyyy-MM-ddTHH:mm:ssZ');
        const somme = this.createSousCategorieForm.get('Somme')?.value;
        const idCategorie = this.data.categorie.id_Categorie;
        const idUser = this.accountService.getIdUser();
        const couleurValue = this.createSousCategorieForm.get('Couleur')?.value;
        const couleur = "#" + couleurValue.hex;
        //
        this.sousCategorieService.createSousCategorie(nom, image, depense, date, somme, Number(idUser), Number(idCategorie), couleur).subscribe(
          (response: any) => {
            console.log(response)
            this.dialogRef.close();
          },
          (error: any) => {
            console.error(error)
          }
        )
        this.dialogRef.close('valid');
      } else {
        alert("Formulaire non valide.")
        console.log(this.createSousCategorieForm.valid);
      }
    } else {
      //Modification
      const updatedSousCategorieData: any = {};
      const formControls = this.createSousCategorieForm.controls;

      if (this.createSousCategorieForm.valid) {

        for (const key in formControls) {
          if (formControls.hasOwnProperty(key)) {
            updatedSousCategorieData[key] = formControls[key].value;
          }
        }

        const couleurValue = this.createSousCategorieForm.get('Couleur')?.value;
        updatedSousCategorieData.Couleur = "#" + couleurValue.hex;

        this.sousCategorieService
          .updateSousCategorie(this.data.sousCategorieToModify.id_Sous_Categorie, updatedSousCategorieData)
          .subscribe(
            (response: any) => {
              this.dialogRef.close();
            },
            (error: any) => {
              console.log(error)
            }
          );
      }
    }
  }

  onIconPickerSelect(icon: string): void {
    this.Image.setValue(icon);
    console.log(this.Image.value);
  }
}
