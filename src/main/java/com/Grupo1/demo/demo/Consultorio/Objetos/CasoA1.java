
package com.Grupo1.demo.demo.Consultorio.Objetos;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
public class CasoA1 implements Objetogeneral  {

    @Override
    public String generarobject() {
  try(
          
          InputStream is = getClass().getClassLoader().getResourceAsStream("Hojas/CaseA.txt");
         BufferedReader br = new BufferedReader(new InputStreamReader(is)))

      {
  String linea;
  String cadena = "";
  while ((linea = br.readLine()) != null){
  cadena = cadena + linea;
  
  }
      return cadena;
  }catch(Exception e)
  {
  return e.getMessage();
  }    
    

    }
    
}
