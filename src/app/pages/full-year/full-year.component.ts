import {AfterViewInit, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {SousCategorie} from "../../class/sous-categorie";
import * as moment from "moment";
import {SousCategorieService} from "../../services/sous-categorie.service";
import {Chart, ChartConfiguration, ChartData, ChartOptions} from 'chart.js';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {AccountService} from "../../services/account.service";


@Component({
  selector: 'app-full-year',
  templateUrl: './full-year.component.html',
  styleUrls: ['./full-year.component.scss']
})
export class FullYearComponent implements OnInit, AfterViewInit{
  sousCategoriesDepenses!: SousCategorie[];
  sousCategoriesRevenus!: SousCategorie[];
  totalDepenses!: number;
  totalRevenus!: number;
  totalEpargne!: number;
  depensesCategories: { categoryName: string; total: number }[] = [];
  epargneMensuelle: { mois: string; revenus: number; depenses: number; epargne: number }[] = [];
  Columns: string[] = this.accountService.isMobile() ? ['Image', 'Nom', 'Date', 'Somme'] : ['Image', 'Categorie', 'Nom', 'Date', 'Somme'];
  dataSource!: MatTableDataSource<SousCategorie>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild('savingsChart', { static: false }) savingsChartRef!: ElementRef<HTMLCanvasElement>;
  
  private chartInitialized = false;


  constructor(private sousCategorieService: SousCategorieService, public accountService : AccountService) {

  }

  ngOnInit() {
    this.loadList()
  }

  loadList() {
    const year = moment().year();
    const id_User: string | null = this.accountService.getIdUser();

    this.sousCategorieService.getAllByYear(year, Number(id_User)).subscribe({
      next : (data) => {
        this.sousCategoriesDepenses=data.filter((sousCategorie : SousCategorie )=> sousCategorie.Depense).sort((a : any, b: any) => (a.Date > b.Date) ? -1 : 1);
        this.sousCategoriesRevenus=data.filter((sousCategorie : SousCategorie )=> !sousCategorie.Depense).sort((a : any, b: any) => (a.Date > b.Date) ? -1 : 1);
        this.totalRevenus = this.sousCategoriesRevenus.reduce((acc, value) => acc + value.Somme, 0);
        this.depensesCategories = this.depensesTotalesParCategories(this.sousCategoriesDepenses).sort((a, b) => b.total - a.total);;
        this.epargneMensuelle = this.calculerEpargneMensuelle(data);
        this.dataSource = new MatTableDataSource<SousCategorie>(this.sousCategoriesDepenses);
        this.dataSource.paginator = this.paginator;
        this.totalEpargne = this.totalRevenus - this.totalDepenses;
        console.log("Dépenses : " + this.totalDepenses + " Revenus : " + this.totalRevenus + " Epargne : " + this.totalEpargne);
        console.log("Données d'épargne mensuelle calculées:", this.epargneMensuelle);
        
        // Initialiser les graphiques après le chargement des données
        this.initializeChartsWhenReady();
      },
      error : (error) => {
        console.error('Erreur lors de la récupération des transactions :', error);
      }
    });
  }

  /**
   * Méthode permettant de faire la somme des dépenses pour chaques catégories de dépenses.
   * @param depenses
   * @private
   */
  private depensesTotalesParCategories(depenses: SousCategorie[]): { categoryName: string; total: number }[] {
    const depensesMap = new Map<string, number>();


    depenses.forEach((sousCategorie) => {
      const categoryName = sousCategorie.categorie.Nom;

      if (depensesMap.has(categoryName)) {
        //Si le nom de la catégorie existe déjà, on incrémente notre somme totale
        depensesMap.set(categoryName, depensesMap.get(categoryName)! + sousCategorie.Somme);
      } else {
        //Sinon on créer une nouvelle paire Nom / Somme
        depensesMap.set(categoryName, sousCategorie.Somme);
      }
    });
    this.totalDepenses = Array.from(depensesMap.values()).reduce((acc, value) => acc + value, 0);

    // On converti la map en tableau pour l'affichage dans le graphique
    return Array.from(depensesMap.entries()).map(([categoryName, total]) => ({ categoryName, total }));
  }

  /**
   * Méthode permettant de calculer l'épargne mensuelle (revenus - dépenses) pour chaque mois de l'année
   * @param data toutes les sous-catégories (dépenses et revenus)
   * @private
   */
  private calculerEpargneMensuelle(data: SousCategorie[]): { mois: string; revenus: number; depenses: number; epargne: number }[] {
    const moisEpargne = new Map<string, { revenus: number; depenses: number }>();
    
    // Initialiser tous les mois de l'année
    const nomsMois = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    
    nomsMois.forEach(mois => {
      moisEpargne.set(mois, { revenus: 0, depenses: 0 });
    });

    // Calculer les totaux par mois
    data.forEach((sousCategorie) => {
      const date = moment(sousCategorie.Date);
      const moisNom = nomsMois[date.month()];
      const current = moisEpargne.get(moisNom)!;
      
      if (sousCategorie.Depense) {
        current.depenses += sousCategorie.Somme;
      } else {
        current.revenus += sousCategorie.Somme;
      }
    });

    // Convertir en tableau avec calcul de l'épargne
    return nomsMois.map(mois => {
      const monthData = moisEpargne.get(mois)!;
      return {
        mois: mois,
        revenus: monthData.revenus,
        depenses: monthData.depenses,
        epargne: monthData.revenus - monthData.depenses
      };
    });
  }

  ngAfterViewInit() {
    // Initialiser les graphiques si les données sont déjà chargées
    if (this.epargneMensuelle && this.epargneMensuelle.length > 0 && !this.chartInitialized) {
      setTimeout(() => {
        this.initializeChart();
      }, 200);
    }
  }

  private initializeChartsWhenReady() {
    // Attendre que la vue soit rendue avant d'initialiser les graphiques
    setTimeout(() => {
      if (!this.chartInitialized) {
        this.initializeChart();
      }
    }, 500);
  }

  private initializeChart() {
    if (this.chartInitialized) {
      return;
    }

    const ctxEpargne = document.getElementById('savingsChart') as HTMLCanvasElement;

    console.log('Tentative d\'initialisation du graphique d\'épargne...');
    console.log('ctxEpargne:', ctxEpargne);
    console.log('epargneMensuelle:', this.epargneMensuelle);

    if (!ctxEpargne) {
      console.error('Element savingsChart non trouvé');
      return;
    }

    if (!this.epargneMensuelle || this.epargneMensuelle.length === 0) {
      console.error('Données epargneMensuelle non disponibles');
      return;
    }

    this.chartInitialized = true;

    // Graphique pour l'épargne mensuelle
    console.log('Création du graphique d\'épargne...');
    new Chart(ctxEpargne, {
      type: 'bar',
      data: {
        labels: this.epargneMensuelle.map((item) => item.mois),
        datasets: [
          {
            label: 'Dépenses (€)',
            data: this.epargneMensuelle.map((item) => item.depenses),
            backgroundColor: '#F44336',
            borderColor: '#D32F2F',
            borderWidth: 1
          },
          {
            label: 'Épargne (€)',
            data: this.epargneMensuelle.map((item) => item.epargne),
            backgroundColor: '#4CAF50',
            borderColor: '#388E3C',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15
            }
          },
          title: {
            display: false
          },
          tooltip: {
            callbacks: {
              afterLabel: (context) => {
                const dataIndex = context.dataIndex;
                const revenus = this.epargneMensuelle[dataIndex].revenus;
                return `Revenus totaux: ${revenus} €`;
              },
              footer: (tooltipItems) => {
                const dataIndex = tooltipItems[0].dataIndex;
                const monthData = this.epargneMensuelle[dataIndex];
                const total = monthData.depenses + monthData.epargne;
                return `Total: ${total} € | Revenus: ${monthData.revenus} €`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            display: true,
            title: {
              display: !this.accountService.isMobile(),
              text: 'Mois'
            },
            ticks: {
              maxRotation: this.accountService.isMobile() ? 45 : 0,
              minRotation: 0
            }
          },
          y: {
            stacked: true,
            display: true,
            beginAtZero: true,
            title: {
              display: !this.accountService.isMobile(),
              text: 'Montant (€)'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });

    console.log('Graphique d\'épargne créé avec succès !');
  }

  applyFilterSousCategories(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
