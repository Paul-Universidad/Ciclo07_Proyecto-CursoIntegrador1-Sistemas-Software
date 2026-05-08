package com.medfacil.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medfacil.api.dto.AdviceRequest;
import com.medfacil.api.dto.AdviceResponse;
import com.medfacil.application.service.AdviceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/advice")
public class AdviceController {

    private final AdviceService adviceService;

    public AdviceController(AdviceService adviceService) {
        this.adviceService = adviceService;
    }

    @PostMapping
    public AdviceResponse advice(@Valid @RequestBody AdviceRequest request) {
        return adviceService.advice(request);
    }
}
