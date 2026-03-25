package com.slotjeakjing.backend.Service;

import com.slotjeakjing.backend.Model.User;
import com.slotjeakjing.backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return rawPassword.equals(user.getPasswd());
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
