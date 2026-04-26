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
├── backend/                          ← Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/slotjeakjing/backend/
│   │   │   │   ├── Application/               ← Service layer
│   │   │   │   │   ├── SciencePlanService.java        (interface)
│   │   │   │   │   ├── SciencePlanServiceImpl.java    (real subject)
│   │   │   │   │   ├── SciencePlanServiceProxy.java   (proxy)
│   │   │   │   │   └── UserService.java
│   │   │   │   ├── Controller/                ← HTTP handlers
│   │   │   │   │   ├── SciencePlanController.java
│   │   │   │   │   └── UserController.java
│   │   │   │   ├── Domain/
│   │   │   │   │   ├── DTO/
│   │   │   │   │   │   └── SciencePlanDTO.java
│   │   │   │   │   └── Model/
│   │   │   │   │       ├── DataProcessingRequirements.java
│   │   │   │   │       ├── LogEntry.java
│   │   │   │   │       ├── SciencePlan.java
│   │   │   │   │       ├── StarSystem.java
│   │   │   │   │       └── User.java
│   │   │   │   ├── Enum/                      ← Enumerations
│   │   │   │   │   ├── ColorType.java
│   │   │   │   │   ├── FileQuality.java
│   │   │   │   │   ├── FileType.java
│   │   │   │   │   ├── PlanStatus.java
│   │   │   │   │   └── TelescopeSite.java
│   │   │   │   ├── Factory/
│   │   │   │   │   └── SciencePlanFactory.java        (static factory)
│   │   │   │   ├── Repository/                ← Spring Data JPA
│   │   │   │   │   ├── LogRepository.java
│   │   │   │   │   ├── SciencePlanRepository.java
│   │   │   │   │   └── UserRepository.java
│   │   │   │   ├── infrastructure/
│   │   │   │   │   ├── OCS/                   ← Adapter to legacy OCS
│   │   │   │   │   │   ├── OCSClient.java         (target interface)
│   │   │   │   │   │   ├── LegacyOCSAdapter.java  (adapter)
│   │   │   │   │   │   └── LegacyOCSService.java  (adaptee)
│   │   │   │   │   ├── logging/
│   │   │   │   │   │   └── AuditLogger.java
│   │   │   │   │   └── security/
│   │   │   │   │       └── AccessControlService.java
│   │   │   │   └── BackendApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── schema.sql
│   │   └── test/
│   │       └── java/com/slotjeakjing/backend/
│   │           ├── BackendApplicationTests.java
│   │           └── SciencePlanTests.java
│   ├── build.gradle
│   ├── gradlew
│   └── data/
│       └── test.db.mv.db
└── frontend/                         ← React application
    ├── src/
    │   ├── components/
    │   │   └── auth/
    │   │       └── LoginForm.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   └── LoginPage.jsx
    │   ├── services/
    │   │   └── authService.js
    │   ├── utils/
    │   │   └── validators.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    ├── index.html
    └── package.json
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

| Method | Path | Description | Required Parameters / Body |
|:---:|:---|:---|:---|
| `GET` | `/...` | ... | ... |
| `GET` | `/...` | ... | ... |
| `POST` | `/...` | ... | ... |
| `...` | `/...` | ... | ... |

---

### Request Body Format (Mockup)
สำหรับ Endpoint ที่ต้องส่งข้อมูลแบบ JSON กรุณาใส่ตัวอย่างด้านล่างนี้:

```json
{
  "key": "value",
  "key": "value"
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
> **Date:** 26 April 2026  
> **Codebase:** `gemini-1/implementations/backend`

---

## Table of Contents Design Pattern Analysis

1. [Summary Table](#summary-table)
2. [Pattern 1 — Singleton (via Spring IoC)](#pattern-1--singleton-via-spring-ioc)
3. [Pattern 2 — Proxy (SciencePlanServiceProxy)](#pattern-2--proxy-scienceplanserviceproxy)
4. [Pattern 3 — Adapter (LegacyOCSAdapter)](#pattern-3--adapter-legacyocsadapter)
5. [Pattern 4 — Factory (SciencePlanFactory)](#pattern-4--factory-static-factory-method)
6. [Pattern 5 — MVC Architectural Pattern](#pattern-5--mvc-architectural-pattern)
7. [Conclusion](#conclusion)


---

## Pattern 1 — Singleton (via Spring IoC)

### Category
**Creational Pattern**


### เหตุผลที่เลือกใช้ Singleton

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **ประสิทธิภาพด้านทรัพยากร (Resource efficiency)** | การสร้าง Service ใหม่ต่อหนึ่ง request จะเป็นการสิ้นเปลือง เนื่องจาก service ไม่มี state ที่เปลี่ยนแปลงได้ต่อ request |
| **การควบคุมสถานะที่ใช้ร่วมกัน (Shared state control)** | อินสแตนซ์ service เพียงตัวเดียวรับประกันพฤติกรรมที่สม่ำเสมอสำหรับทุก operation |
| **ธรรมเนียมปฏิบัติของเฟรมเวิร์ก (Framework convention)** | scope เริ่มต้นของ Spring (`singleton`) สอดคล้องกับพฤติกรรมที่ควรจะเป็นของ service components แบบ stateless ใน Web Application |

**เหตุผลที่ Singleton มีความเหมาะสม:** `UserService`, `SciencePlanServiceProxy`, `SciencePlanServiceImpl`, และ `AuditLogger` ล้วนเป็น stateless (ไม่มี mutable instance state) Spring IoC Container จัดการ lifecycle และรับประกัน instance เดียวต่อ application context โดยอัตโนมัติผ่าน annotation ต่างๆ โดยเฉพาะ `AuditLogger` ที่ annotated ด้วย `@Component` ทำให้ถูก inject เป็น singleton เดียวกันในทุก class ที่ต้องการใช้งาน

---

## Pattern 2 — Proxy (SciencePlanServiceProxy)

### Category
**Structural Pattern**


### เหตุผลที่เลือกใช้ Proxy

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **การควบคุมการเข้าถึง (Access control)** | `SciencePlanServiceProxy` ตรวจสอบสิทธิ์ผ่าน `AccessControlService` ก่อนทุก operation โดยที่ Real Subject (`SciencePlanServiceImpl`) ไม่ต้องสนใจ |
| **Audit logging** | `AuditLogger` บันทึกทุก event ก่อนและหลังการเรียกใช้ Real Subject โดยไม่แทรกซึมเข้า Business Logic |
| **Single Responsibility** | `SciencePlanServiceImpl` มุ่งเน้นที่ Business Logic ส่วน Proxy ดูแลเรื่อง Cross-cutting Concerns (security, logging) แยกต่างหาก |

**เหตุผลที่ Proxy มีความเหมาะสม:** `SciencePlanServiceProxy` เป็น textbook Proxy pattern โดยมี interface เหมือน Real Subject ทุกประการ (`implements SciencePlanService`) แต่ดักทำงานพิเศษ (access control + audit logging) ก่อนส่งต่อให้ `SciencePlanServiceImpl` จัดการ Business Logic จริง

---

## Pattern 3 — Adapter (LegacyOCSAdapter)

### Category
**Structural Pattern**


### เหตุผลที่เลือกใช้ Adapter

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **แยก Legacy API ออกจากโค้ดหลัก (Isolation of Legacy API)** | โค้ดใน Application layer ใช้แค่ `OCSClient` interface โดยไม่รู้ว่าข้างหลังคือ Legacy OCS หรือไม่ |
| **แปลง Type และ Format อัตโนมัติ (Type/format translation)** | Adapter แปลง `SciencePlanDTO` (ระบบใหม่) ไปเป็น `edu.gemini.app.ocs.model.SciencePlan` (ระบบ Legacy) รวมถึงแปลง enum และ date format |
| **ความสามารถในการเปลี่ยนระบบ (Replaceability)** | หากต้องการเปลี่ยนระบบ OCS ในอนาคต เพียงสร้าง Adapter ใหม่ที่ implement `OCSClient` โดยไม่ต้องแก้ไขโค้ดส่วนอื่น |

**เหตุผลที่ Adapter มีความเหมาะสม:** ระบบต้องติดต่อกับ Gemini OCS Library ซึ่งเป็นระบบภายนอก (Legacy) ที่มี API แตกต่างจากระบบใหม่ทั้งหมด `LegacyOCSAdapter` ทำหน้าที่เป็นตัวกลางแปลงภาษาระหว่าง modern DTO-based API กับ legacy API โดยที่ทั้ง Application layer และ OCS Library ไม่ต้องรู้จักกันตรงๆ

---

## Pattern 4 — Factory (Static Factory Method)

### Category
**Creational Pattern**



### เหตุผลที่เลือกใช้ Factory

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **รวม object creation logic (Centralized creation logic)** | ตรรกะการแปลง DTO → Entity อยู่ที่เดียวใน `SciencePlanFactory` ไม่กระจายใน Service หรือ Controller |
| **ลด code duplication** | `createPlan()` และ `updateEntityFromDTO()` ถูกใช้ซ้ำใน `SciencePlanServiceImpl` และ `SciencePlanServiceProxy` ทำให้ไม่ต้องเขียน mapping ซ้ำ |
| **ตั้งค่า Default State (Default state initialization)** | Factory กำหนด `PlanStatus.CREATED` และ `lastModified` ให้อัตโนมัติ ผู้เรียกใช้ไม่ต้องกังวล |

**เหตุผลที่ Factory มีความเหมาะสม:** `SciencePlanFactory` รวม object creation logic ของ `SciencePlan` ไว้ที่เดียว รวมถึงการตั้งค่า initial state และการแมป enum/date จาก DTO โดยที่ Service layer ไม่ต้องรู้รายละเอียดการสร้าง object

---

## Pattern 5 — MVC Architectural Pattern

### Category
**Architectural / Behavioral Pattern**


### วิธีการนำ MVC มาใช้งาน

- **Model (`User.java`, `SciencePlan.java`, `DataProcessingRequirements.java`):** กำหนดโครงสร้างข้อมูล ใช้ JPA Annotation สำหรับการจัดเก็บข้อมูล (persistence) เป็นแหล่งความจริงเดียว (single source of truth) ของนิยามข้อมูลในระบบ
- **View:** ไม่มี HTML template นี่คือ REST API ดังนั้น "วิว" จึงเป็นเนื้อหา JSON ที่ส่งกลับมาผ่าน `ResponseEntity` โดย Annotation `@ResponseBody` ของ Spring จะทำการแปลง Java objects ให้เป็น JSON โดยอัตโนมัติ
- **Controller (`UserController.java`, `SciencePlanController.java`):** รับ HTTP requests ผ่าน `@GetMapping` / `@PostMapping` / `@PutMapping`, สกัดเอาข้อมูลนำเข้า, มอบหมายการทำงานให้กับ service, และจัดรูปแบบการตอบกลับ

รูปแบบ MVC ดั้งเดิมถูกขยายเพิ่มเติมด้วย **Service Layer + Proxy** ที่คั่นระหว่าง Controller และ Model ซึ่งถือเป็นมาตรฐานในแอปพลิเคชัน Spring ระดับ enterprise (บางครั้งเรียกว่า MVC+S หรือ layered architecture)

### เหตุผลที่เลือกใช้ MVC

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **การแยกส่วนความรับผิดชอบ (Separation of concerns)** | การจัดการ HTTP, business logic และ การจัดเก็บข้อมูลถูกแยกออกจากกันอย่างเป็นอิสระ |
| **ความสามารถในการทดสอบแยกอิสระ (Independent testability)** | แต่ละชั้นสามารถทำ unit-test แบบแยกอิสระได้ |
| **ความสอดคล้องกับเฟรมเวิร์ก (Framework alignment)** | Spring Boot ถูกสร้างขึ้นโดยมีพื้นฐานมาจาก MVC การพยายามฝืนใช้รูปแบบอื่นจะเพิ่มความซับซ้อนโดยไม่จำเป็น |
| **ความสามารถในการบำรุงรักษา (Maintainability)** | การเพิ่ม endpoint ใหม่ต้องการเพียงการเปลี่ยนแปลงใน Controller เท่านั้น ไม่ใช่ใน Model หรือ Service |

---
---
---


## Conclusion

### Summary

- แพตเทิร์น **Singleton** ถูกนำมาใช้งานผ่าน Spring IoC Container สำหรับ service และ controller ทุกตัว
- **Proxy Pattern** ถูก implement อย่างชัดเจนผ่าน `SciencePlanServiceProxy` ซึ่งทำหน้าที่เป็น Access Control และ Audit Logging layer ก่อนส่งต่อให้ `SciencePlanServiceImpl` — นอกจากนี้ Spring Data JPA repositories ก็เป็น Proxy เช่นกัน
- **Adapter Pattern** ถูก implement ผ่าน `LegacyOCSAdapter` เพื่อเชื่อมระบบใหม่กับ Gemini OCS Library ที่มี API format แตกต่างกัน
- **Factory Pattern** ถูก implement ผ่าน `SciencePlanFactory` ที่รวม object creation logic และ DTO-to-Entity mapping ไว้ที่เดียว
- **MVC Architectural Pattern** ถูกประยุกต์ใช้อย่างเหมาะสมด้วยการแบ่งชั้นการทำงานที่ชัดเจน ครอบคลุมทั้ง `UserController`, `SciencePlanController`, domain models, และ repositories

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
