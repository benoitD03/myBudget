import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, private accountService: AccountService, private router: Router, private sousCategorieService: SousCategorieService, public dialogRef: MatDialogRef<DialogCreateSousCategorieComponent>, private datePipe: DatePipe) {
    this.createSousCategorieForm = this.fb.group({
      Nom: ['', Validators.required],
      Image: ['', Validators.required],
      Date: [this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm:ssZ'), Validators.required],
      Somme: [0, Validators.required],
      Couleur: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createSousCategorieForm.valid) {
      const nom = this.createSousCategorieForm.get('Nom')?.value;
      const image = this.createSousCategorieForm.get('Image')?.value;
      const depense = this.data.categorie.Depense;
      const dateValue = this.createSousCategorieForm.get('Date')?.value;
      const date = this.datePipe.transform(dateValue, 'yyyy-MM-ddTHH:mm:ssZ');
      const somme = this.createSousCategorieForm.get('Somme')?.value;
      const idCategorie = this.data.categorie.id_Categorie;
      const idUser = this.accountService.getIdUser();
      const couleur = this.createSousCategorieForm.get('Couleur')?.value;
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
    } else {
      alert("Formulaire non valide.")
      console.log(this.createSousCategorieForm.valid);
    }
  }
}
