import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContatoService } from 'src/app/service/contato';

@Component({
  selector: 'app-list-contato',
  templateUrl: './list-contato.page.html',
  styleUrls: ['./list-contato.page.scss'],
})

export class ListContatoPage implements OnInit {

  protected contato: any;

  constructor(
    protected contatoService: ContatoService,
    protected router: Router,
    protected alertController: AlertController
  ) { }

  ngOnInit() {
    this.contatoService.getAll().subscribe(
      res => {
        this.contato = res;
      }
    )
  }

  editar(contato) {
    this.router.navigate(['/tabs/addContato/', contato.key])
  }

  async doRefresh(event) {
    //console.log('Begin async operation');
    this.contatoService.getAll().subscribe(
      res => {
        this.contato = res;
        setTimeout(() => {
          //console.log('Async operation has ended');
          event.target.complete();
        }, 500);
      }
    );
  }

  async apagar(contato) {
    const alert = await this.alertController.create({
      header: 'Apagar dados!',
      message: 'Apagar todos os dados da filial',
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
            this.contatoService.remove(contato).then(
              res => {
                this.presentAlert("Aviso", "Apagado com sucesso!");
                this.refreshContato();
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

  refreshContato() {
    this.contatoService.getAll().subscribe(
      res => {
        this.contato = res;
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