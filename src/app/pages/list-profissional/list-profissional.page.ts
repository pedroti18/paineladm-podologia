import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfissionalService } from 'src/app/service/profissional';

@Component({
  selector: 'app-list-profissional',
  templateUrl: './list-profissional.page.html',
  styleUrls: ['./list-profissional.page.scss'],
})

export class ListProfissionalPage implements OnInit {

  protected profissional: any;

  constructor(
    protected profissionalService: ProfissionalService,
    protected router: Router,
    protected alertController: AlertController
  ) { }

  ngOnInit() {
    this.profissionalService.getAll().subscribe(
      res => {
        this.profissional = res;
      }
    )
  }

  editar(profissional) {
    this.router.navigate(['/tabs/addProfissional/', profissional.key])
  }

  async doRefresh(event) {
    //console.log('Begin async operation');
    this.profissionalService.getAll().subscribe(
      res => {
        this.profissional = res;
        setTimeout(() => {
          //console.log('Async operation has ended');
          event.target.complete();
        }, 500);
      }
    );
  }

  async apagar(profissional) {
    const alert = await this.alertController.create({
      header: 'Apagar dados!',
      message: 'Apagar todos os dados do profissional',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.profissionalService.remove(profissional).then(
              res => {
                this.presentAlert("Aviso", "Apagado com sucesso!");
                this.refreshProfissional();
              },
              erro => {
                this.presentAlert("Erro", "Ao apagar o item!");
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }

  refreshProfissional() {
    this.profissionalService.getAll().subscribe(
      res => {
        this.profissional = res;
      }
    )
  }

  //Alerts-------------------
  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }
}