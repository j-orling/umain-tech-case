import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureFilterComponent } from './picture-filter.component';

describe('PictureFilterComponent', () => {
  let component: PictureFilterComponent;
  let fixture: ComponentFixture<PictureFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PictureFilterComponent]
    });
    fixture = TestBed.createComponent(PictureFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
