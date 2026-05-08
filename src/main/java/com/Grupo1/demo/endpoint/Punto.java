
package com.Grupo1.demo.endpoint;

import com.Grupo1.demo.ConexionaDB.CargarDatos;
import com.Grupo1.demo.Controler.medlist;
import com.Grupo1.demo.Objetos.Medicamentos;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Punto {
    @CrossOrigin(origins = "*") 
   @GetMapping("/Act1")
   public List enviar(){
       CargarDatos datos = new CargarDatos();
       medlist m = datos.Entregar();
       
   return m.getLista();
   
   }
    
    
}
