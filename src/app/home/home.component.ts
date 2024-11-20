import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  titleHero: string = `Organizacion Nutriendo A Todos`
  paragramAbount: string = `
  Nosotros somos una página que facilita el acceso a organizaciones benéficas
  o sin fines de lucro en difundir publicaciones hacía el publico en general
  para solicitar un apoyo económico para seguir brindado la seguridad e
  integridad de las personas en situaciones vulnerables.
  `
  contactoNumero: string = `(55) 1234-5678`
  contactoCorreo: string = `onat@gmail.com`


  subtitleHero: string =`
    con el apoyo de todos lograremos
    que todos y todas alimentemos nuestros
    sueños y estomagos para prosperar en la vida
    y seguir luchando un día más 
  `

}
