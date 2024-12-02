import { Component, OnInit } from '@angular/core';
import { SmembershipService } from '../../services-interfaces/membership/smembership.service';
import { Imembership } from '../../services-interfaces/membership/imembership';
import { productsService } from '../../events-page/services/products.service';
import { Router } from '@angular/router';
import { Products } from '../../events-page/products';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css',
})
export class MembershipComponent implements OnInit {
  memberships: Imembership[] = [];

  constructor(
    private membershipService: SmembershipService,
    private router: Router,
    private productService: productsService
  ) {}

  ngOnInit(): void {
    this.mostrarMembresias();
  }

  mostrarMembresias(): void {
    this.membershipService.getMembresias().subscribe({
        next: (data: Imembership[]) => {
            this.memberships = data;

            // Iterar sobre memberships y contenido
            this.memberships.forEach((membership) => {
                const contenidos = membership.contenido; // Acceder al contenido

                contenidos.forEach((contenido) => {
                    // Llamar al servicio con idProducto
                    this.productService.mostrarProductos(contenido.idProducto).subscribe({
                        next: (producto: Products) => {
                            // console.log(producto);
                            // Asignar nombreProducto al contenido correspondiente
                            contenido.nombreProducto = producto.nombreProducto; // Ajusta según la estructura de `Products`
                        },
                        error: (error) => {
                            console.error(`Error obteniendo producto ${contenido.idProducto}:`, error);
                        }
                    });
                });
            });

            console.log('Membresías procesadas: ', this.memberships);
        },
        error: (error) => {
            console.error('No se pudieron mostrar las membresías: ', error);
        },
    });
}


  obtenerBeneficios(membership: Imembership): string[] {
    return membership.contenido
      ? membership.contenido.map(
          (contenido) =>
            `Producto ID: ${contenido.idProducto}, Cantidad: ${contenido.cantidad}`
        )
      : [];
  }

  irADonacion(id: number) {
    this.router.navigate(['/membershipdonation'], {
      queryParams: { id_membresia: id },
    });
  }
}
