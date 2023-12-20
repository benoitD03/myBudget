import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SousCategorieService} from "../../services/sous-categorie.service";
import {DatePipe} from "@angular/common";
import {TotauxService} from "../../services/totaux.service";

@Component({
  selector: 'app-dialog-create-sous-categorie',
  templateUrl: './dialog-create-sous-categorie.component.html',
  styleUrls: ['./dialog-create-sous-categorie.component.scss']
})
export class DialogCreateSousCategorieComponent implements OnInit{
  createSousCategorieForm: FormGroup;
  Image = new FormControl();
  oldSommme!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, private accountService: AccountService,
              private router: Router, private sousCategorieService: SousCategorieService, public dialogRef: MatDialogRef<DialogCreateSousCategorieComponent>,
              private datePipe: DatePipe, private totauxService : TotauxService) {
    this.createSousCategorieForm = this.fb.group({
      Nom: [data.isModif ? data.sousCategorieToModify.Nom : '', Validators.required],
      Date: [data.isModif ? data.sousCategorieToModify.Date : this.datePipe.transform(Date.now(), 'yyyy-MM-ddTHH:mm:ssZ'), Validators.required],
      Somme: [data.isModif ? data.sousCategorieToModify.Somme : 0, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.isModif) {
      this.oldSommme = this.data.sousCategorieToModify.Somme;
    }
  }

  onSubmit() {
    if (!this.data.isModif) {
      if (this.createSousCategorieForm.valid) {
        const nom = this.createSousCategorieForm.get('Nom')?.value;
        const image = this.data.categorie.Image;
        const depense = this.data.categorie.Depense;
        const dateValue = this.createSousCategorieForm.get('Date')?.value;
        const date = this.datePipe.transform(dateValue, 'yyyy-MM-ddTHH:mm:ssZ');
        const somme = this.createSousCategorieForm.get('Somme')?.value;
        const idCategorie = this.data.categorie.id_Categorie;
        const idUser = this.accountService.getIdUser();
        const couleur = this.data.categorie.Couleur;
        this.sousCategorieService.createSousCategorie(nom, image, depense, date, somme, Number(idUser), Number(idCategorie), couleur).subscribe({
          next : (response: any) => {
            this.totauxService.calculateTotals();
            this.dialogRef.close('valid');
          },
          error : (error: any) => {
            console.error(error)
          }
        });
      } else {
        alert("Formulaire non valide.")
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

        const dateValue = this.createSousCategorieForm.get('Date')?.value;
        updatedSousCategorieData.Date = this.datePipe.transform(dateValue, 'yyyy-MM-ddTHH:mm:ssZ');

        this.sousCategorieService
          .updateSousCategorie(this.data.sousCategorieToModify.id_Sous_Categorie, updatedSousCategorieData)
          .subscribe({
            next : (response: any) => {
              if (this.oldSommme !== updatedSousCategorieData.Somme) {
                //On recalcul les totaux uniquement si la somme a changée
                this.totauxService.calculateTotals();
              }
              this.dialogRef.close();
            },
            error : (error: any) => {
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
