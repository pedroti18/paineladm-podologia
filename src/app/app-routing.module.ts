import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'list-agendamento',
    loadChildren: () => import('./pages/list-agendamento/list-agendamento.module').then( m => m.ListAgendamentoPageModule)
  },
  {
    path: 'add-agendamento',
    loadChildren: () => import('./pages/add-agendamento/add-agendamento.module').then( m => m.AddAgendamentoPageModule)
  },
  {
    path: 'perfil-agendamento',
    loadChildren: () => import('./pages/perfil-agendamento/perfil-agendamento.module').then( m => m.PerfilAgendamentoPageModule)
  },
  {
    path: 'list-contato',
    loadChildren: () => import('./pages/list-contato/list-contato.module').then( m => m.ListContatoPageModule)
  },
  {
    path: 'add-contato',
    loadChildren: () => import('./pages/add-contato/add-contato.module').then( m => m.AddContatoPageModule)
  },
  {
    path: 'perfil-contato',
    loadChildren: () => import('./pages/perfil-contato/perfil-contato.module').then( m => m.PerfilContatoPageModule)
  },
  {
    path: 'list-profissional',
    loadChildren: () => import('./pages/list-profissional/list-profissional.module').then( m => m.ListProfissionalPageModule)
  },
  {
    path: 'add-profissional',
    loadChildren: () => import('./pages/add-profissional/add-profissional.module').then( m => m.AddProfissionalPageModule)
  },
  {
    path: 'perfil-profissional',
    loadChildren: () => import('./pages/perfil-profissional/perfil-profissional.module').then( m => m.PerfilProfissionalPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
