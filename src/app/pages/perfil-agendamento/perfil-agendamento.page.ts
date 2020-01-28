import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/model/agendamento';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-perfil-agendamento',
  templateUrl: './perfil-agendamento.page.html',
  styleUrls: ['./perfil-agendamento.page.scss'],
})
export class PerfilAgendamentoPage implements OnInit {

  protected agendamento: Agendamento = new Agendamento;
  private id: string = null;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    speed: 400
  };
  constructor(
    protected agendamentoService: AgendamentoService,
    protected activatedRoute: ActivatedRoute,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.agendamentoService.get(this.id).subscribe(
        res => {
          this.agendamento = res
        }
      )
    }
  }
}