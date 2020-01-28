import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Profissional } from '../model/profissional';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  constructor(
    protected fire: AngularFirestore
    
  ) { }

  save(profissional) {
    return this.fire.collection("profissional")
      .add({
        codigo: profissional.codigo,
        nome: profissional.nome,
        sobrenome: profissional.sobrenome,
        rg: profissional.rg,
        cpf: profissional.cpf,
        telefone: profissional.telefone,
        endereco: profissional.endereco,
        bairro: profissional.bairro,
        admissao: profissional.admissao,
        funcao: profissional.funcao,

      });
  }

  getAll() {
    return this.fire.collection("profissional").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id) {
    return this.fire.collection("profissional").doc<Profissional>(id).valueChanges();
  }
  update(profissional: Profissional, id: string ) {
    return this.fire.collection("profissional").doc<Profissional>(id)
    .update(profissional);
  }

  remove(profissional: any) {
    return this.fire.collection("profissional").doc(profissional.key).delete();
  }
}