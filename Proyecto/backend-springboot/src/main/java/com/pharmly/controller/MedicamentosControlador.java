package com.pharmly.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pharmly.dto.request.MedicamentoFormulario;
import com.pharmly.dto.response.MedicamentoRespuesta;
import com.pharmly.service.interfaces.MedicamentosServicio;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medicamentos")
public class MedicamentosControlador {

    private final MedicamentosServicio medicamentosServicio;

    public MedicamentosControlador(MedicamentosServicio medicamentosServicio) {
        this.medicamentosServicio = medicamentosServicio;
    }

    @GetMapping("/buscar")
    public List<MedicamentoRespuesta> buscar(@RequestParam("q") String q) {
        return medicamentosServicio.search(q);
    }

    @GetMapping
    public List<MedicamentoRespuesta> listar() {
        return medicamentosServicio.listAll();
    }

    @GetMapping("/{id}")
    public MedicamentoRespuesta obtener(@PathVariable Long id) {
        return medicamentosServicio.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MedicamentoRespuesta crear(@Valid @RequestBody MedicamentoFormulario formulario) {
        return medicamentosServicio.create(formulario);
    }

    @PutMapping("/{id}")
    public MedicamentoRespuesta actualizar(@PathVariable Long id, @Valid @RequestBody MedicamentoFormulario formulario) {
        return medicamentosServicio.update(id, formulario);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        medicamentosServicio.deleteById(id);
    }
}
