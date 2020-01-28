import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamentoService } from 'src/app/service/agendamento.service';

@Component({
  selector: 'app-list-agendamento',
  templateUrl: './list-agendamento.page.html',
  styleUrls: ['./list-agendamento.page.scss'],
})

export class ListAgendamentoPage implements OnInit {

  protected agendamento: any;

  constructor(
    protected agendamentoService: AgendamentoService,
    protected router: Router,
    protected alertController: AlertController
  ) { }

  ngOnInit() {
    this.agendamentoService.getAll().subscribe(
      res => {
        this.agendamento = res;
      }
    )
  }

  editar(agendamento) {
    this.router.navigate(['/tabs/addAgendamento/', agendamento.key])
  }

  async doRefresh(event) {
    //console.log('Begin async operation');
    this.agendamentoService.getAll().subscribe(
      res => {
        this.agendamento = res;
        setTimeout(() => {
          //console.log('Async operation has ended');
          event.target.complete();
        }, 500);
      }
    );
  }

  async apagar(agendamento) {
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
            this.agendamentoService.remove(agendamento).then(
              res => {
                this.presentAlert("Aviso", "Apagado com sucesso!");
                this.refreshAgendamento();
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

  refreshAgendamento() {
    this.agendamentoService.getAll().subscribe(
      res => {
        this.agendamento = res;
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