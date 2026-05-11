package com.Grupo1.demo.endpoint;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.Grupo1.demo.demo.Consultorio.CreationA.Especialidad;
import com.Grupo1.demo.demo.Consultorio.Filtrado.FiltradoCasoInicio;
import com.Grupo1.demo.demo.Consultorio.Objetos.CasoGeneral;

@RestController
public class PuntoConsultorio {
private String vv;


    @CrossOrigin(origins = "*")
    @GetMapping("/paciente1/{caso}/{index}")
public String Estudiar(@PathVariable String caso, @PathVariable int index){
   String caso2 = caso+".txt";
   CasoGeneral c = new CasoGeneral();
   this.vv = c.generarobject(caso2);
 FiltradoCasoInicio fi = new FiltradoCasoInicio();
     List<String> a =fi.CrearLista(vv);
       Especialidad especialidad = new Especialidad();
      return especialidad.Escoguido(index, a);


   }
   
       @CrossOrigin(origins = "*")
    @GetMapping("/paciente1")
    public String comp(){

      return "Todo en orden";
    } 


}
