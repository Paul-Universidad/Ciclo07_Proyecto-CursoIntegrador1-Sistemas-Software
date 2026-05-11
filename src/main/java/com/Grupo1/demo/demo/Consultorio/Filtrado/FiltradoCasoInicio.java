package com.Grupo1.demo.demo.Consultorio.Filtrado;

import java.util.ArrayList;
import java.util.List;

public class FiltradoCasoInicio implements FiltroGeneral{

    @Override
    public List<String> CrearLista(String objeto) {
if(objeto == null || objeto.isEmpty()){
return new ArrayList<>();

}



String[] areglo = objeto.split("\\.");

List<String> entrega = new ArrayList<>();
for(String g : areglo){
    entrega.add(g);
}
return entrega;

    }
  
    
    
}
