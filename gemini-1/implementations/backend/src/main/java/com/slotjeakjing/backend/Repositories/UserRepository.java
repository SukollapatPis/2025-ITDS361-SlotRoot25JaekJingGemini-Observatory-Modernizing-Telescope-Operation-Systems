package com.slotjeakjing.backend.Repositories;

import com.slotjeakjing.backend.Model.User;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Integer> {
    Optional<User> findByEmail(String email);
}
