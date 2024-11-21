import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsServiceService } from '../services/products-service.service';
import { Products } from '../products';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-products',
  templateUrl: './catalog-products.component.html',
  styleUrl: './catalog-products.component.css'
})
export class CatalogProductsComponent implements OnInit {
  productsForm: FormGroup;
  productsData: Products[] = [];
  orgId: any;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsServiceService
  ) {
    this.productsForm = this.fb.group({
      nombreProducto: ['', Validators.required],
      precioBase: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getIdOrg();
    this.mostrarProductos();
  }

  getIdOrg() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      this.orgId = decodedToken.userId;
    }
  }

  mostrarProductos(): void {
    this.productsService.verCatalogo().subscribe(
      (data: Products[]) => {
        this.productsData = data;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }
  decodeToken(token: string): any {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
}
