# 2025-ITDS361-SlotRoot25JaekJing

<div align="center">

  <img src="https://blogger.googleusercontent.com/img/a/AVvXsEg8Ei50fpMOIdLlOi3Qkqgvr_TPE6J_1zQm-87dGxfjfcp0GELnGmTwmy4EB_ro8MqRUn1UITQGkbyOgA_YgglbfDwKF6B1nom83XVMCoHkn1Aj8AaEqk6rmWl0s6F07h2YvgcU4Dr7L5G8_m0G_kDUoGtoDzpQtAguypa7a5MIC66V3OPJe5S76JDWpNAI" width="100%" style="border-radius: 10px; margin-bottom: 20px;">

  # SlotRoot25 JaekJing
  **Advanced Software Design & Implementation for Gemini-1 Project**
  
  *A high-performance web application built with Spring Boot & React, following industry-standard Design Patterns.*

  <p align="center">
    <img src="https://img.shields.io/badge/Course-ITDS361-007AFF?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Course">
    <img src="https://img.shields.io/badge/Faculty-ICT_Mahidol-8E8E93?style=for-the-badge" alt="Faculty">
    <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Backend">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="Frontend">
  </p>

  ---

[🚀 Get Started](#-how-to-run--slotroot25-jaekjing) • [🏗️ Design Patterns](#️-design-pattern-analysis--slotroot25-jaekjing-gemini-1) • [⚖️ License](#️-ลิขสิทธิ์และข้อกำหนดการใช้งาน-copyright-and-terms-of-use)

</div>

<br/>

---
โปรเจกต์นี้เป็นการพัฒนาระบบภายใต้รายวิชา **ITDS361 Software Design and Development** โดยมุ่งเน้นการนำหลักการทางวิศวกรรมซอฟต์แวร์และ Design Patterns มาประยุกต์ใช้ร่วมกับ Full-stack Technology เพื่อสร้างระบบที่มีประสิทธิภาพและง่ายต่อการบำรุงรักษา

## Group Members

| **Group Name** | **Student ID** | **Name** | **Surname** | **GitHub account** |
| --- | --- | --- | --- | --- |
| SlotRoot25JaekJing | 6687001 | Keatikun | Komkeng | keatikun |
|  | 6687013 | Yatavee | Wariyot | K-btr2004 |
|  | 6687031 | Pornpawee | Pathompornwiwat | bellpornpawee |
|  | 6687052 | Sukollapat | Pisuchpen | SukollapatPis |
|  | 6687066 | Ploy | Jomboon | PlyJB |

---
---
---
---
# 🚀 How to Run — SlotRoot25 JaekJing
## Prerequisites

| Tool | Required Version | Check | Note |
|------|-----------------|-------|------|
| **Java (JDK)** | 17 or later | `java -version` | สำหรับ Backend (Spring Boot) |
| **Node.js** | 18.x or later | `node -v` | สำหรับ Frontend (React) |
| **npm** | 9.x or later | `npm -v` | มาพร้อมกับ Node.js |
| **Git** | Any recent | `git --version` | สำหรับ Clone โปรเจกต์ |

## Project Structure

```
gemini-1/implementations/
├── backend/          ← Spring Boot application
│   ├── src/
│   ├── data/         
│   ├── build.gradle
│   └── gradlew
└── frontend/        
│   └── public/
│   └── src/    
└── data/
```
---

## 1 — Install Dependencies Backend

```bash
cd gemini-1/implementations/backend บลาๆๆๆๆ
```

## 2 — Install Dependencies Frontend
```bash
cd gemini-1/implementations/frontend บลาๆๆๆๆ
```

---

## 3 — Run the Development Server
```bash
บลาๆๆๆๆ
```

---
## 4 — Available Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/all` | List all users |
| GET | `/add-astronomer?name=X&email=Y` | Create an Astronomer user |
| GET | `/add-scienceObserver?name=X&email=Y` | Create a Science Observer user |
| POST | `/login` | Authenticate a user |

### Login request body (JSON)

```json
{
  "email": "บลาๆๆๆๆ@gmail.com",
  "password": "บลาๆๆๆๆ"
}
```

---

## 5 — Run Tests

```bash
บลาๆๆๆๆ
```

Test reports are generated at:

```
บลาๆๆๆๆ
```




---
---
---
# 🏗️ Design Pattern Analysis — SlotRoot25 JaekJing (Gemini-1)

> **Project:** 2025-ITDS361 SlotRoot25 JaekJing   
> **Date:** 25 April 2026  
> **Codebase:** `gemini-1/implementations/backend`

---

## Table of Contents Design Pattern Analysis

1. [Summary Table](#summary-table)
2. [Pattern 1 — Singleton (via Spring IoC)](#pattern-1--singleton-via-spring-ioc)
3. [Pattern 2 — Proxy (Spring Data JPA Repository)](#pattern-2--proxy-spring-data-jpa-repository)
4. [Pattern 3 — Facade (Service Layer)](#pattern-3--facade-service-layer)
5. [Pattern 4 — Factory Method (Partial — User Hierarchy)](#pattern-4--factory-method-partial--user-hierarchy)
6. [Pattern 5 — MVC Architectural Pattern](#pattern-5--mvc-architectural-pattern)
7. [Recommendations](#recommendations)
8. [Conclusion](#conclusion)

---

## Summary Table

| # | Pattern Name | Category | File(s) | Status |
|---|-------------|----------|---------|--------|
| 1 | **Singleton** | Creational | `UserService.java`, `UserController.java` | ✅ Fully Implemented |
| 2 | **Proxy** | Structural | `UserRepository.java` | ✅ Fully Implemented |
| 3 | **Facade** | Structural | `UserService.java` | ✅ Fully Implemented |
| 4 | **Factory Method** | Creational | `User.java`, `UserController.java` | ✅ Partial (product hierarchy) |
| 5 | **MVC** | Architectural | All files | ✅ Fully Implemented |

---

## Pattern 1 — Singleton (via Spring IoC)

### Category
**Creational Pattern**

### Location

| File | Line | Annotation |
|------|------|------------|
| `src/main/java/.../Service/UserService.java` | Line 9 | `@Service` |
| `src/main/java/.../Controller/UserController.java` | Line 14 | `@Controller` |

### Code Snippet

```java
// UserService.java — Lines 9–15
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
```

```java
// UserController.java — Lines 14–20
@Controller
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }
```

### เหตุผลที่เลือกใช้ Singleton

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **ประสิทธิภาพด้านทรัพยากร (Resource efficiency)** | การสร้าง `UserService` ใหม่ต่อหนึ่ง request จะเป็นการสิ้นเปลือง เนื่องจาก service ไม่มี state ที่เปลี่ยนแปลงได้ต่อ request |
| **การควบคุมสถานะที่ใช้ร่วมกัน (Shared state control)** | อินสแตนซ์ `UserService` เพียงตัวเดียวรับประกันพฤติกรรมที่สม่ำเสมอสำหรับการเรียกใช้ `login()` และ `findByEmail()` ทั้งหมด |
| **ธรรมเนียมปฏิบัติของเฟรมเวิร์ก (Framework convention)** | scope เริ่มต้นของ Spring (`singleton`) สอดคล้องกับพฤติกรรมที่ควรจะเป็นของ service components แบบ stateless ใน Web Application |


**หตุผลที่ Singleton มีความเหมาะ:** `UserService` เป็นแบบ stateless (มีเพียงการอ้างอิงแบบ final ไปยัง repository ซึ่งถูกกำหนดค่าเพียงครั้งเดียว) การใช้อินสแตนซ์ร่วมกันเพียงตัวเดียว ปลอดภัย และ มีประสิทธิภาพสูงสุด

---

## Pattern 2 — Proxy (Spring Data JPA Repository)

### Category
**Structural Pattern**

### Location

| File | Line | Code |
|------|------|------|
| `src/main/java/.../Repositories/UserRepository.java` | Lines 6–8 | `extends CrudRepository<User, Integer>` |

### Code Snippet

```java
// UserRepository.java — Lines 1–9
package com.slotjeakjing.backend.Repositories;

import com.slotjeakjing.backend.Model.User;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
```


### เหตุผลที่เลือกใช้ Proxy

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **ซ่อนความซับซ้อนของการทำงานกับฐานข้อมูล (Hides complex database operations)** | ผู้เรียกใช้ไม่จำเป็นต้องเขียน JPQL/SQL, จัดการ transactions หรือโต้ตอบกับ `EntityManager` โดยตรง |
| **การสร้างออบเจกต์แบบ Lazy (Lazy object generation)** | การอิมพลีเมนต์จริง (proxy class) จะถูกสร้างขึ้นเมื่อ application context โหลดเท่านั้น ไม่ใช่ในขณะคอมไพล์ (compile-time) |
| **แหล่งความจริงเดียว (Single source of truth)** | การประกาศ `findByEmail` ในอินเทอร์เฟซเดียวช่วยป้องกันความซ้ำซ้อนของ logic การ query |
| **ความสามารถในการขยาย (Extensibility)** | สามารถเพิ่ม query ใหม่ๆ ได้โดยการประกาศเมธอดโดยไม่ต้องเขียนโค้ดอิมพลีเมนต์ |


**เหตุผลที่ Proxy มีความเหมาะสม:** การสร้าง proxy ของ Spring Data เป็นวิธีที่เป็นแบบแผน (idiomatic) และ ช่วยลดโค้ดที่ซ้ำซากในการอิมพลีเมนต์ data access layer ใน Spring Boot ซึ่งให้ประโยชน์ทั้งหมดของแพตเทิร์น Proxy (การควบคุมการเข้าถึง, การซ่อนความซับซ้อนของออบเจกต์จริง) โดยอัตโนมัติ

---

## Pattern 3 — Facade (Service Layer)

### Category
**Structural Pattern**

### Location

| File | Lines | Role |
|------|-------|------|
| `src/main/java/.../Service/UserService.java` | All | Facade provider |
| `src/main/java/.../Controller/UserController.java` | Lines 48–75 | Facade consumer |

### Code Snippet

```java
// UserService.java — The Facade
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Facade method: hides "find user → check password" orchestration
    public boolean login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return rawPassword.equals(user.getPasswd());
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
```

```java
// UserController.java — Calls Facade, not subsystem directly
@PostMapping("/login")
public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
    String email = body.get("email");
    String password = body.get("password");

    // Controller calls simple Facade methods — not repository directly
    Optional<User> optionalUser = userService.findByEmail(email);
    if (optionalUser.isPresent()) {
        User user = optionalUser.get();
        if (userService.login(email, password)) {  // ← Facade hides find+compare logic
            // ...
        }
    }
}
```

### เหตุผลที่เลือกใช้ Facade

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **ลดความซับซ้อนของคอนโทรลเลอร์ (Reduced controller complexity)** | เอนด์พอยต์การเข้าสู่ระบบมีความสะอาดและอ่านง่าย โดยไม่มีตรรกะทางธุรกิจปะปนอยู่ |
| **ความสามารถในการทดสอบ (Testability)** | คอนโทรลเลอร์สามารถถูกทดสอบได้ด้วย mock `UserService` โดยไม่ต้องพึ่งพาฐานข้อมูลจริง |
| **การแยกส่วนความรับผิดชอบ (Separation of concerns)** | Business rules (authentication logic) จะอยู่ใน service ไม่ใช่อยู่ในตัวจัดการ HTTP |

**เหตุผลที่ Facade มีความเหมาะสมกว่า:** service layer ถือเป็นแนวทางปฏิบัติที่ดีที่สุดที่ได้รับการยอมรับสำหรับสถาปัตยกรรมแบบแบ่งชั้นในแอปพลิเคชัน Spring Boot ซึ่งช่วยแยกเรื่องของการจัดการ HTTP (คอนโทรลเลอร์) ออกจากตรรกะของโดเมน (service) และการจัดเก็บข้อมูล (repository) ได้อย่างชัดเจน

---

## Pattern 4 — Factory Method (Partial — User Hierarchy)

### Category
**Creational Pattern**

### Location

| File | Lines | Role |
|------|-------|------|
| `src/main/java/.../Model/User.java` | Lines 1–50 | Abstract product + concrete products |
| `src/main/java/.../Controller/UserController.java` | Lines 23–39 | Direct instantiation (no factory) |

### Code Snippet

```java
// User.java — Abstract "Product" with concrete subtypes
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
public abstract class User {       // ← Abstract Product
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String passwd;
    private String email;
    // ... getters/setters ...

    @Entity
    @DiscriminatorValue("ASTRONOMER")
    public static class Astronomer extends User { }    // ← Concrete Product A

    @Entity
    @DiscriminatorValue("OBSERVER")
    public static class ScienceObserver extends User { }  // ← Concrete Product B
}
```


```java
// UserController.java — Lines 56–63: instanceof check (anti-pattern for Factory Method)
String role = "USER";
if (user instanceof User.Astronomer) {
    role = "ASTRONOMER";
} else if (user instanceof User.ScienceObserver) {
    role = "SCIENCE_OBSERVER";
}
```


### เหตุใดจึงใช้ Singleton/การสร้างอินสแตนซ์โดยตรงแทน

โปรเจกต์ในปัจจุบันมีขนาดเล็ก (มี entity ประเภทเดียว, สอง endpoints) จึงเลือกที่จะรักษาความเรียบง่าย โดยการสร้างอินสแตนซ์ของคลาสย่อยโดยตรงในคอนโทรลเลอร์ สำหรับขอบเขตปัจจุบัน วิธีนี้สามารถทำงานได้

---

## Pattern 5 — MVC Architectural Pattern

### Category
**Architectural / Behavioral Pattern**

### Location

| File | MVC Role |
|------|----------|
| `src/main/java/.../Model/User.java` | **Model** — domain entity |
| `src/main/java/.../Controller/UserController.java` | **Controller** — handles HTTP requests |
| JSON `ResponseEntity` bodies | **View** — REST API responses |
| `src/main/java/.../Service/UserService.java` | Business logic layer (between C and M) |
| `src/main/java/.../Repositories/UserRepository.java` | Data access (below Model) |

### Code Snippet

```
HTTP Request
    │
    ▼
UserController  ──── @Controller ────► Handles request, calls service
    │
    ▼
UserService  ──── @Service ──────────► Business logic (Facade)
    │
    ▼
UserRepository  ── @Repository ──────► Data access (Proxy)
    │
    ▼
User (H2 Database)  ── @Entity ──────► Persistent model
```

### วิธีการนำ MVC มาใช้งาน

- **Model (`User.java`):** กำหนดโครงสร้างข้อมูล ใช้ JPA Annotation สำหรับการจัดเก็บข้อมูล (persistence) เป็นแหล่งความจริงเดียว (single source of truth) ของนิยามคำว่า "ผู้ใช้"
- **View:** ไม่มี HTML template นี่คือ REST API ดังนั้น "วิว" จึงเป็นเนื้อหา JSON ที่ส่งกลับมาผ่าน `ResponseEntity` โดยnAnnotation `@ResponseBody` ของ Spring จะทำการแปลง Java objects ให้เป็น JSON โดยอัตโนมัติ
- **Controller (`UserController.java`):** รับ HTTP requests ผ่าน `@GetMapping` / `@PostMapping`, สกัดเอาข้อมูลนำเข้า, มอบหมายการทำงานให้กับ service, และจัดรูปแบบการตอบกลับ

รูปแบบ MVC ดั้งเดิมถูกขยายเพิ่มเติมด้วย **Service Layer** ที่คั่นระหว่าง Controller และ Model ซึ่งถือเป็นมาตรฐานในแอปพลิเคชัน Spring ระดับ enterprise (บางครั้งเรียกว่า MVC+S หรือ layered architecture)

### เหตุผลที่เลือกใช้ MVC

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **การแยกส่วนความรับผิดชอบ (Separation of concerns)** | การจัดการ HTTP, business logic และ การจัดเก็บข้อมูลถูกแยกออกจากกันอย่างเป็นอิสระ |
| **ความสามารถในการทดสอบแยกอิสระ (Independent testability)** | แต่ละชั้นสามารถทำ unit-test แบบแยกอิสระได้ |
| **ความสอดคล้องกับเฟรมเวิร์ก (Framework alignment)** | Spring Boot ถูกสร้างขึ้นโดยมีพื้นฐานมาจาก MVC การพยายามฝืนใช้รูปแบบอื่นจะเพิ่มความซับซ้อนโดยไม่จำเป็น |
| **ความสามารถในการบำรุงรักษา (Maintainability)** | การเพิ่ม endpoint ใหม่ ต้องการเพียงการเปลี่ยนแปลงในค Controller เท่านั้น ไม่ใช่ใน โมเดล หรือ service |

---
---
---


## Conclusion

### Overall Assessment

| Dimension | Coverage| Comment |
|-----------|--------|---------|
| **ความครอบคลุมของแพตเทิร์น (Pattern Coverage)** | ✅ | MVC, Singleton, Proxy, และ Facade มีความแข็งแกร่ง |
| **ความถูกต้องของแพตเทิร์น (Pattern Correctness)** | ✅ | มี Factory Method ครบ |
| **คุณภาพของโค้ด (Code Quality)** | ✅ | การใช้ `instanceof` ต่อเนื่องกันและรหัสผ่านแบบข้อความธรรมดาจำเป็นต้องได้รับการดูแล |
| **ความสามารถในการบำรุงรักษา (Maintainability)** | ✅ | Structure ต่างๆ เขียนตามหลัก Software Design Principles ทำให้ดูและรักษาง่าย |

### Summary

โปรเจกต์นี้แสดงให้เห็นถึง **ความเข้าใจพื้นฐานที่แข็งแกร่งเกี่ยวกับดีไซน์แพตเทิร์นด้านโครงสร้างและการสร้าง** ซึ่งประยุกต์ใช้ผ่านเฟรมเวิร์ก Spring Boot:

- แพตเทิร์น **Singleton**, **Proxy**, และ **Facade** ถูกนำมาใช้งานอย่างถูกต้องและเป็นไปตามแบบแผน โดยใช้ประโยชน์จากการสนับสนุนที่มีอยู่แล้วในระบบของ Spring
- **แพตเทิร์นสถาปัตยกรรม MVC** ถูกประยุกต์ใช้อย่างเหมาะสมด้วยการแบ่งชั้นการทำงานสามชั้นที่ชัดเจน
- ลำดับชั้นของผลิตภัณฑ์ใน **Factory Method** ได้ถูกจัดเตรียมไว้แล้ว (`User` → `Astronomer` / `ScienceObserver`) แต่ตัว factory เองยังไม่ได้รับการอิมพลีเมนต์ — คอนโทรลเลอร์ข้ามขั้นตอนดังกล่าวด้วยการเรียกใช้ `new` โดยตรง และใช้การตรวจสอบด้วย `instanceof`

การเปลี่ยนแปลงเหล่านี้ จะยกระดับฐานโค้ดจากต้นแบบที่ใช้งานได้ ไปสู่ Web Application ที่มีสถาปัตยกรรมที่ดี และ สามารถบำรุงรักษาได้ง่ายในระยะยาว

---
---
---
---

## ⚖️ ลิขสิทธิ์และข้อกำหนดการใช้งาน (Copyright and Terms of Use)

เนื้อหา ซอร์สโค้ด และทรัพยากรทั้งหมดใน Repository นี้เป็น**ลิขสิทธิ์ของผู้จัดกลุ่มนี้ทำแต่เพียงผู้เดียว** โดยเป็นส่วนหนึ่งของรายวิชา **ITDS361 Software Design and Development** คณะเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) มหาวิทยาลัยมหิดล

### ข้อห้ามและเงื่อนไข:
* **ไม่อนุญาต**ให้ทำซ้ำ ดัดแปลง หรือคัดลอกส่วนใดส่วนหนึ่งของโปรเจกต์นี้โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
* **ไม่อนุญาต**ให้นำไปใช้ในเชิงพาณิชย์ (Commercial Use) โดยเด็ดขาด
* การนำไปใช้เพื่อการศึกษาหรือการอ้างอิง กรุณาให้เครดิตและระบุแหล่งที่มาอย่างชัดเจน

---
---

## Academic Integrity & Copyright Notice

All code and content within this repository are the sole property of the author. This project was developed as part of the course **ITDS361 Software Design and Development**, Faculty of ICT, Mahidol University.

### Terms of Use:
* **No Redistribution:** Reproduction, modification, or distribution of this work without explicit permission is strictly prohibited.
* **Non-Commercial Use Only:** This software and its assets must not be used for any commercial purposes.
* **Attribution:** Any academic use or reference must provide proper credit to the original author.

---
---
---
---
---
