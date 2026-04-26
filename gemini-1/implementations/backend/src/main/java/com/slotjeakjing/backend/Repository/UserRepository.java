package com.slotjeakjing.backend.Repository;

import com.slotjeakjing.backend.Domain.Model.User;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Integer> {
    Optional<User> findByEmail(String email);
}
