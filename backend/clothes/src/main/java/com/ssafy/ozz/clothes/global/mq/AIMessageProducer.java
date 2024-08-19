package com.ssafy.ozz.clothes.global.mq;

import org.springframework.cloud.stream.function.StreamBridge;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AIMessageProducer {
    private final StreamBridge streamBridge;

    public AIMessageProducer(StreamBridge streamBridge) {
        this.streamBridge = streamBridge;
    }

    public void sendMessage(String imageUrl) {
        Map<String, String> message = new HashMap<>();
        message.put("imageUrl", imageUrl);
        streamBridge.send("output", MessageBuilder.withPayload(message).build());
    }
}
