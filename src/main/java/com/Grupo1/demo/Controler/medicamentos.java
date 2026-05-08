
package com.Grupo1.demo.Controler;

import com.Grupo1.demo.Objetos.Medicamentos;



public class medicamentos {
    
Medicamentos m;
 int id;
   String nombre, indicaciont, eficancia, alternativa;
   String incidencia;
   double precio;

    public medicamentos() {
    }

    public medicamentos( int id, String nombre, String indicaciont, String eficancia, String alternativa, String incidencia, double precio) {
      this.precio = precio;
        this.id = id;
        this.indicaciont = indicaciont;
        this.eficancia = eficancia;
        this.alternativa = alternativa;
        this.incidencia = incidencia;
        this.nombre = nombre;
        this.m = new Medicamentos(id, nombre, indicaciont, eficancia, alternativa, incidencia, precio);
       

    }

    public Medicamentos getM() {
        return m;
    }

    public void setM(Medicamentos m) {
        this.m = m;
    }




     


    
    
}
