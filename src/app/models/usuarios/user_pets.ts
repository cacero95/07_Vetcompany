export interface User_pets {
    name:string;
    apellido?:string;
    email:string;
    password?:string;
    direccion?:string;
    telefono?:string;
    mascotas?:Mascotas[];
    nMascotas?:number;
    Tasks?:Eventos[];
    type:string;
    veterinarias?:Veterinarias[];
}
export interface Mascotas {
    name:string;
    edad?:number;
    raza?:string;
    url?:string;
}
export interface Eventos {
    title:string;
    descripcion:string;
    startime:Date;
    endtime:Date;
}

export interface Veterinarias {
    name:string;
    direccion?:string;
    telefono?:string;
    email:string;
    imagen?:string;
    type:string;
    services?:string[];
    usuarios?:User_pets[];
    eventos?:Eventos[];
}
export interface Google_login{
    displayName:string;
    email:string;
    photoURL:string;
    phoneNumber:any;
}
