package com.slotjeakjing.backend.Controller;

import com.slotjeakjing.backend.Domain.Model.User;
import com.slotjeakjing.backend.Repository.UserRepository;
import com.slotjeakjing.backend.Application.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@Controller
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/add-astronomer")
    public @ResponseBody String addAstronomer(@RequestParam String name, @RequestParam String email) {
        User.Astronomer a = new User.Astronomer();
        a.setName(name);
        a.setEmail(email);
        a.setPasswd("1234");
        userRepository.save(a);
        return "Astronomer Saved";
    }

    @GetMapping("/add-scienceObserver")
    public @ResponseBody String addScienceObserver(@RequestParam String name, @RequestParam String email) {
        User.ScienceObserver a = new User.ScienceObserver();
        a.setName(name);
        a.setEmail(email);
        a.setPasswd("1234");
        userRepository.save(a);
        return "ScienceObserver Saved";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body, HttpSession session) {
        String email = body.get("email");
        String password = body.get("password");

        Optional<User> optionalUser = userService.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            session.setAttribute("currentUser", user);
            if (userService.login(email, password)) {

                String role = "USER";
                if (user instanceof User.Astronomer) {
                    role = "ASTRONOMER";
                } else if (user instanceof User.ScienceObserver) {
                    role = "SCIENCE_OBSERVER";
                }

                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "role", role,
                        "userId", user.getId(),
                        "name", user.getName()
                ));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("success", false, "message", "Invalid credentials"));
    }

}