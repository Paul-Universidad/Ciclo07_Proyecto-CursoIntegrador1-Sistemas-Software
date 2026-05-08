
package com.Grupo1.demo.Controler;
import java.util.List;
import java.util.ArrayList;
public class medlist {
    List<medicamentos>  lista = new ArrayList<>();
    
    public void Agregar(int posicion,medicamentos m){
     this.lista.add(posicion,m);
    }
     public void borrar(){
     this.lista.clear();
     }
    
    public int tamanno(){
    
    return lista.size();
    }
    
    
    public void borrarespecifico(int i){
    
        this.lista.remove(i);
        
    }

    public List<medicamentos> getLista() {
        return lista;
    }
    
    
   
    
}
