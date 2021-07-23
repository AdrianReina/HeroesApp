import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.heroesService.getHeroePorId(id)))
        .subscribe((heroe) => (this.heroe = heroe));
    }
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe((res) => {
        this.mostrarSnackbar('Registro actualizado');
      });
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/heroes/editar', res.id]);
        this.mostrarSnackbar('Registro creado');
      });
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.heroe,
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe((res) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500,
    });
  }
}
