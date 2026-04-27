package com.slotjeakjing.backend.Domain.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "audit_logs")
public class LogEntry {
    @Id
    private String logId;
    private LocalDateTime timestamp;
    private String level;
    private String eventType;
    @Column(columnDefinition = "TEXT")
    private String message;
    private String userId;
    private int targetId;

    public LogEntry() {}

    public LogEntry(String eventType, String level, String message, String userId, int targetId) {
        this.logId = UUID.randomUUID().toString();
        this.timestamp = LocalDateTime.now();
        this.eventType = eventType;
        this.level = level;
        this.message = message;
        this.userId = userId;
        this.targetId = targetId;
    }

    public String getLogId() {
        return logId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getLevel() {
        return level;
    }

    public String getEventType() {
        return eventType;
    }

    public String getMessage() {
        return message;
    }

    public String getUserId() {
        return userId;
    }

    public int getTargetId() {
        return targetId;
    }
}