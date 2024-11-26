export interface Imembership {
    id: number;              
    plan: string | null;     
    costo: number | null;    
    contenido: Record<string, string>;
}
