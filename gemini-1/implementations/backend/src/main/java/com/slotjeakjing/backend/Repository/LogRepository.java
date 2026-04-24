package com.slotjeakjing.backend.Repository;

import com.slotjeakjing.backend.Domain.Model.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends JpaRepository<LogEntry, String> {
}
