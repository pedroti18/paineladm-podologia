
import { Component, OnInit } from '@angular/core';
import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato';
import { AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-contato',
  templateUrl: './add-contato.page.html',
  styleUrls: ['./add-contato.page.scss'],
})

export class AddContatoPage implements OnInit {

  protected contato: Contato = new Contato;
  protected id: any = null;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 0,
    speed: 0
  };

  constructor(
    protected contatoService: ContatoService,
    protected alertController: AlertController,
    protected activedRoute: ActivatedRoute,
    protected router: Router,
    protected platform: Platform
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.contatoService.get(this.id).subscribe(
        res => {
          this.contato = res
        },
        //erro => this.id = null
      )
    }
  }

  onsubmit(form) {
    if (!this.id) {
      this.contatoService.save(this.contato).then(
        res => {
          form.reset();
          this.contato = new Contato;
          //console.log("Cadastrado!");
          //this.preview = null
          this.presentAlert("Aviso", "Agendado!")
          this.router.navigate(['/tabs/perfilContato', res.id]);
        },
        erro => {
          console.log("Erro: " + erro);
          this.presentAlert("Erro", "Não foi possivel agendar!")
        }
      )
    } else {
      this.contatoService.update(this.contato, this.id).then(
        res => {
          form.reset();
          this.contato = new Contato;
          //this.preview = null
          this.presentAlert("Aviso", "Atualizado!")
          this.router.navigate(['/tabs/perfilContato', this.id]);
        },
        erro => {
          console.log("Erro: " + erro);
          this.presentAlert("Erro", "Não foi possivel atualizar!")
        }
      )
    }
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