package com.Grupo1.demo.ConexionaDB;

import com.Grupo1.demo.Controler.medicamentos;
import com.Grupo1.demo.Controler.medlist;
import com.Grupo1.demo.Objetos.Medicamentos;
import java.sql.*;

public class CargarDatos {

    public medlist Entregar() {
        medlist mlist = new medlist();
        int contador = 0;
        String sql = "select * from medicamento";
        
        /*Personal*/
        /*
         String USER = "root"; // Usuario por defecto en XAMPP
     String  String PASS = "";     // Contraseña por defecto (vacía)
        */
            /*Contraseña de prueba en laboratoriio*/
 String USER = "root"; // Usuario por defecto en XAMPP
  String PASS = "";     // Contraseña por defecto (vacía)
        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3307/anibd", USER, PASS); Statement st = con.createStatement(); ResultSet rs = st.executeQuery(sql);) {
            while (rs.next()) {
                medicamentos m = new medicamentos(rs.getInt("id"),
                        rs.getString("nombre"),
                        rs.getString("indicaciont"),
                        rs.getString("eficancia"),
                        rs.getString("alternativa"),
                        rs.getString("incidencia"),
                        rs.getDouble("precio")
                );

                /* Medicamentos(id, nombre, indicaciont, eficancia, alternativa, incidencia, precio);*/
                mlist.Agregar(contador, m);
                contador = contador + 1;
            }

            System.out.println("El numero de todos los datos: "+mlist.tamanno());
            
        } catch (SQLException e) {
            System.out.println("Error al carar: "+e.getMessage());
        }
 return mlist;
    }

}
