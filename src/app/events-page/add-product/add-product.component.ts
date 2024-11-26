import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { productsService } from '../services/products.service';
import { Products } from '../products';
import { OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  productsForm: FormGroup;
  productsData: Products[] = [];
  selectProducts: string[] = [];
  orgId: any;
  @Output() productosSeleccionados = new EventEmitter<string[]>();

  constructor(
    private fb: FormBuilder,
    private PostsService: PostsService,
    private productsService: productsService
  ) {
    this.productsForm = this.fb.group({
      orgId: [''],
    });
  }

  ngOnInit(): void {
    this.mostrarProductos();
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
  
  
  onCheckboxChange(event: any): void {
    const productosIds = event.target.value;
    if (event.target.checked) {
      this.selectProducts.push(productosIds); 
    } else {
      const index = this.selectProducts.indexOf(productosIds);
      if (index > -1) {
        this.selectProducts.splice(index, 1); 
      }
    }
    console.log('Productos seleccionados:', this.selectProducts);
    this.productosSeleccionados.emit(this.selectProducts);
  }


  onProductsSelect() {
    this.productsService.verCatalogo().subscribe(
      (data: Products[]) =>{
        this.productsData = data
      },
      (error) => {
        console.log('error al obtener los producto seleccionado', error)
      }
    )

  }


  decodeToken(token: string): any {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
}
