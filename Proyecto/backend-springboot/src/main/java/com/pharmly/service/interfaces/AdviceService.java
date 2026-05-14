package com.pharmly.service.interfaces;

import com.pharmly.dto.request.AdviceRequest;
import com.pharmly.dto.response.AdviceResponse;

public interface AdviceService {

    AdviceResponse advice(AdviceRequest request);
}
