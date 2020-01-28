import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddContatoPage } from './add-contato.page';

describe('AddContatoPage', () => {
  let component: AddContatoPage;
  let fixture: ComponentFixture<AddContatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddContatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
