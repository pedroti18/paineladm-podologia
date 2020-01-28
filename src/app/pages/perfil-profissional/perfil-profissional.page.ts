import { Component, OnInit } from '@angular/core';
import { Profissional } from 'src/app/model/profissional';
import { ProfissionalService } from 'src/app/service/profissional';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-perfil-profissional',
  templateUrl: './perfil-profissional.page.html',
  styleUrls: ['./perfil-profissional.page.scss'],
})
export class PerfilProfissionalPage implements OnInit {

  protected profissional: Profissional = new Profissional;
  private id: string = null;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    speed: 400
  };
  constructor(
    protected profissionalService: ProfissionalService,
    protected activatedRoute: ActivatedRoute,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.profissionalService.get(this.id).subscribe(
        res => {
          this.profissional = res
        }
      )
    }
  }
}