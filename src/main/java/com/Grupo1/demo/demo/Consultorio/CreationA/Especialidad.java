package com.Grupo1.demo.demo.Consultorio.CreationA;

import java.util.List;

public class Especialidad {

    public String Escoguido(int i, List<String> areglo) {
        switch (i) {
            case 1:
                return areglo.get(0);
               
            case 2:
                return areglo.get(1);
                
            case 3:
                return areglo.get(2);
               
            default:
                return ":3";

        }

    }

}
