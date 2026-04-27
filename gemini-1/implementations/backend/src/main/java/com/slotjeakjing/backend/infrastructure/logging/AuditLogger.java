package com.slotjeakjing.backend.infrastructure.logging;

import com.slotjeakjing.backend.Domain.Model.LogEntry;
import com.slotjeakjing.backend.Repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuditLogger {

    private final LogRepository logRepository;

    @Autowired
    public AuditLogger(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public void log(String eventType, String level, String message, String userId, int targetId) {
        LogEntry entry = new LogEntry(eventType, level, message, userId, targetId);

        System.out.println("LOGGING: " + message);
        if (logRepository != null) {
            logRepository.save(entry);
        }
    }
}