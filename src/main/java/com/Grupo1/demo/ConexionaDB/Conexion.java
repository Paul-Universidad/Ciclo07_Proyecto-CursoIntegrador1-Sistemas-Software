
package com.Grupo1.demo.ConexionaDB;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
public class Conexion {
   
     // Parámetros de conexión para XAMPP
   
    /*
    private static final String USER = "root"; // Usuario por defecto en XAMPP
    private static final String PASS = "";     // Contraseña por defecto (vacía)
     private static final String URL = "jdbc:mysql://localhost:3306/anibd";
    */
    
    /*Contraseña de prueba en laboratoriio*/
    private static final String USER = "root"; // Usuario por defecto en XAMPP
    private static final String PASS = "";     // Contraseña por defecto (vacía)
        private static final String URL = "jdbc:mysql://localhost:3307/anibd";
    
    
    public static Connection conectar() {
        Connection conexion = null;
        try {
            // Cargar el driver JDBC (opcional en versiones modernas de Java)
            Class.forName("com.mysql.cj.jdbc.Driver"); 
            
            // Establecer la conexión
            conexion = DriverManager.getConnection(URL, USER, PASS);
            System.out.println("¡Conexión exitosa a MySQL!");
            
        } catch (ClassNotFoundException e) {
            System.out.println("Error: No se encontró el driver JDBC.");
        } catch (SQLException e) {
            System.out.println("Error al conectar: " + e.getMessage());
        }
        return conexion;
    }

    public static void main(String[] args) {
        conectar();
    }
    
    
}
