package com.pharmly.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharmly.dto.response.HomeSummaryResponse;
import com.pharmly.service.interfaces.HomeApplicationService;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    private final HomeApplicationService homeApplicationService;

    public HomeController(HomeApplicationService homeApplicationService) {
        this.homeApplicationService = homeApplicationService;
    }

    @GetMapping("/summary")
    public HomeSummaryResponse summary() {
        return homeApplicationService.summary();
    }
}
