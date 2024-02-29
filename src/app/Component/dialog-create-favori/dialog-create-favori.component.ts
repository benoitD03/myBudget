import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {CategorieService} from "../../services/categorie.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FavoriService} from "../../services/favori.service";
import {Categorie} from "../../class/categorie";

@Component({
  selector: 'app-dialog-create-favori',
  templateUrl: './dialog-create-favori.component.html',
  styleUrls: ['./dialog-create-favori.component.scss']
})
export class DialogCreateFavoriComponent implements OnInit{
  createFavoriForm: FormGroup;
  categories: Categorie[] = []

  constructor( private fb: FormBuilder, private accountService: AccountService, private router: Router, private favoriService: FavoriService,
               public dialogRef: MatDialogRef<DialogCreateFavoriComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private categorieService: CategorieService) {
    this.createFavoriForm = this.fb.group({
      Nom: [data.isModif ? data.favoriToModify.Nom : '', Validators.required],
      Somme: [data.isModif ? data.favoriToModify.Somme : 0, Validators.required],
      categorie: [data.isModif ? data.favoriToModify.categorie.id_Categorie : null, Validators.required],
    });
  }

  ngOnInit() {
    this.LoadCategories();
  }

  /**
   * Méthode de soumission du formaulaire
   */
  onSubmit() {
    //Création
    if (!this.data.isModif) {
      if (this.createFavoriForm.valid) {
        const nom = this.createFavoriForm.get('Nom')?.value;
        const somme = this.createFavoriForm.get('Somme')?.value;
        const categorie = this.createFavoriForm.get('Categorie')?.value;
        const idUser = this.accountService.getIdUser();
        const depense :boolean = this.categories.find(c => c.id_Categorie === categorie)?.Depense ?? false;

        this.favoriService.createFavori(nom, depense, somme, Number(idUser), categorie).subscribe({
          next :(response: any) => {
            this.dialogRef.close();
          },
          error : (error: any) => {
            console.error(error)
          }
        });
      }
    } else {
      //Modification
      const updatedFavoriData: any = {};
      const formControls = this.createFavoriForm.controls;

      if (this.createFavoriForm.valid) {

        for (const key in formControls) {
          if (formControls.hasOwnProperty(key)) {
            updatedFavoriData[key] = formControls[key].value;
          }
        }
        this.favoriService
          .updateFavori(this.data.favoriToModify.id_Favori, updatedFavoriData)
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

  LoadCategories() {
    const id_User = this.accountService.getIdUser();
    this.categorieService.getCategoriesByUserId(Number(id_User)).subscribe({
      next : (data) => {
        this.categories=data;
      },
      error : (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    });
  }
}
