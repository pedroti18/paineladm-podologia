import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'perfilAgendamento/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/perfil-agendamento/perfil-agendamento.module').then(m => m.PerfilAgendamentoPageModule)
          }
        ]
      },
      {
        path: 'perfilContato/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/perfil-contato/perfil-contato.module').then(m => m.PerfilContatoPageModule)
          }
        ]
      },
      {
        path: 'perfilProfissional/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/perfil-profissional/perfil-profissional.module').then(m => m.PerfilProfissionalPageModule)
          }
        ]
      },
      {    
        path: 'addAgendamento/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/add-agendamento/add-agendamento.module').then(m => m.AddAgendamentoPageModule)
          }
        ]
      },
      {
        path: 'addAgendamento',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add-agendamento/add-agendamento.module').then(m => m.AddAgendamentoPageModule)
          }
        ]
      },
      {
        path: 'addContato',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add-contato/add-contato.module').then(m => m.AddContatoPageModule)
          }
        ]
      },
      {
        path: 'addProfissional',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add-profissional/add-profissional.module').then(m => m.AddProfissionalPageModule)
          }
        ]
      },
      {
        path: 'addProfissional/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add-profissional/add-profissional.module').then(m => m.AddProfissionalPageModule)
          }
        ]
      },
      {
        path: 'addContato/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/add-contato/add-contato.module').then(m => m.AddContatoPageModule)
          }
        ]
      },
      {
        path: 'listAgendamento',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/list-agendamento/list-agendamento.module').then(m => m.ListAgendamentoPageModule)
          }
        ]
      },
      {
        path: 'listContato',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/list-contato/list-contato.module').then(m => m.ListContatoPageModule)
          }
        ]
      },
      {
        path: 'listProfissional',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/list-profissional/list-profissional.module').then(m => m.ListProfissionalPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
