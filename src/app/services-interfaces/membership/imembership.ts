export interface Imembership {
    id: number;              
    plan: string | null;     
    costo: number | null;    
    contenido: { 
        cantidad: number; 
        idProducto: string; 
        nombreProducto: string | null;
    }[]; // Cambiado a un arreglo de objetos específicos
}
