import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Agendamento } from '../model/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(
    protected fire: AngularFirestore
    
  ) { }

  save(agendamento) {
    return this.fire.collection("agendamento")
      .add({
        nome: agendamento.nome,
        data: agendamento.data,
        telefone: agendamento.telefone,
        horario: agendamento.horario,
        procedimento: agendamento.procedimento,
        mensagem: agendamento.mensagem
      });
  }

  getAll() {
    return this.fire.collection("agendamento").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id) {
    return this.fire.collection("agendamento").doc<Agendamento>(id).valueChanges();
  }
  update(agendamento: Agendamento, id: string ) {
    return this.fire.collection("agendamento").doc<Agendamento>(id)
    .update(agendamento);
  }

  remove(agendamento: any) {
    return this.fire.collection("agendamento").doc(agendamento.key).delete();
  }
}