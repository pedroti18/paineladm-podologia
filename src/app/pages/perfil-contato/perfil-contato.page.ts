import { Component, OnInit } from '@angular/core';
import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-perfil-contato',
  templateUrl: './perfil-contato.page.html',
  styleUrls: ['./perfil-contato.page.scss'],
})
export class PerfilContatoPage implements OnInit {

  protected contato: Contato = new Contato;
  private id: string = null;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    speed: 400
  };
  constructor(
    protected contatoService: ContatoService,
    protected activatedRoute: ActivatedRoute,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.contatoService.get(this.id).subscribe(
        res => {
          this.contato = res
        }
      )
    }
  }
}