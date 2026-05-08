package com.medfacil.application.service;

import com.medfacil.api.dto.AdviceRequest;
import com.medfacil.api.dto.AdviceResponse;

public interface AdviceService {

    AdviceResponse advice(AdviceRequest request);
}
