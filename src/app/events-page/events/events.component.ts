import { Component } from '@angular/core';
import { EventsService } from '../services/events.service';
import { PostsService } from '../services/posts.service';
import { OnInit } from '@angular/core';
import { Products } from '../products';
import { EventsPage } from '../events-page';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  productData: Products[] = []
  eventData: EventsPage [] = []

  constructor(private eventsService: EventsService, private postService: PostsService){

  }

  ngOnInit(): void {
      this.getAllEvents()
  }
  getAllEvents(): void{
    this.eventsService.ObtenerEventos().subscribe(
      (data: EventsPage[])=>{
        this.eventData = data
        console.log(this.eventData)
      },
      (error)=>{
        console.error('Error al obtener los eventos', error);
      }
    )


  }


}
