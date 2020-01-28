
import { Component, OnInit } from '@angular/core';
import { Profissional } from 'src/app/model/profissional';
import { ProfissionalService } from 'src/app/service/profissional';
import { AlertController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-profissional',
  templateUrl: './add-profissional.page.html',
  styleUrls: ['./add-profissional.page.scss'],
})

export class AddProfissionalPage implements OnInit {

  protected profissional: Profissional = new Profissional;
  protected id: any = null;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 0,
    speed: 0
  };

  constructor(
    protected profissionalService: ProfissionalService,
    protected alertController: AlertController,
    protected activedRoute: ActivatedRoute,
    protected router: Router,
    protected platform: Platform
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.profissionalService.get(this.id).subscribe(
        res => {
          this.profissional = res
        },
        //erro => this.id = null
      )
    }
  }

  onsubmit(form) {
    if (!this.id) {
      this.profissionalService.save(this.profissional).then(
        res => {
          form.reset();
          this.profissional = new Profissional;
          //console.log("Cadastrado!");
          //this.preview = null
          this.presentAlert("Aviso", "Agendado!")
          this.router.navigate(['/tabs/perfilProfissional', res.id]);
        },
        erro => {
          console.log("Erro: " + erro);
          this.presentAlert("Erro", "Não foi possivel agendar!")
        }
      )
    } else {
      this.profissionalService.update(this.profissional, this.id).then(
        res => {
          form.reset();
          this.profissional = new Profissional;
          //this.preview = null
          this.presentAlert("Aviso", "Atualizado!")
          this.router.navigate(['/tabs/perfilProfissional', this.id]);
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