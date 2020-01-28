import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListContatoPage } from './list-contato.page';

describe('ListContatoPage', () => {
  let component: ListContatoPage;
  let fixture: ComponentFixture<ListContatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListContatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
