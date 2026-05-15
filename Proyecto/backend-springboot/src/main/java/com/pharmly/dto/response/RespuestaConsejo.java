package com.pharmly.dto.response;

public class RespuestaConsejo {

    private final String topic;
    private final String message;
    private final String levelCode;
    private final String levelTitle;

    public RespuestaConsejo(String topic, String message, String levelCode, String levelTitle) {
        this.topic = topic;
        this.message = message;
        this.levelCode = levelCode;
        this.levelTitle = levelTitle;
    }

    public String getTopic() {
        return topic;
    }

    public String getMessage() {
        return message;
    }

    public String getLevelCode() {
        return levelCode;
    }

    public String getLevelTitle() {
        return levelTitle;
    }
}
