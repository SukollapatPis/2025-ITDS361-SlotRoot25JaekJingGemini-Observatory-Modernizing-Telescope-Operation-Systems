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
2. [Pattern 1 — Singleton](#pattern-1--singleton)
3. [Pattern 2 — Proxy](#pattern-2--proxy)
4. [Pattern 3 — Adapter](#pattern-3--adapter)
5. [Pattern 4 — Factory](#pattern-4--factory)
6. [Conclusion](#conclusion)

---

## Summary Table

| # | Pattern Name | Category | Where It Is Used |
|---|-------------|----------|-----------------|
| 1 | **Singleton** | Creational | Service layer, Controllers, Logging component |
| 2 | **Proxy** | Structural | Service layer (access control & logging wrapper) |
| 3 | **Adapter** | Structural | Legacy OCS integration layer |
| 4 | **Factory** | Creational | Science Plan creation logic |

---

## Pattern 1 — Singleton

### Category
**Creational Pattern**

### แนวคิด
ควบคุมให้คลาสหนึ่งๆ มี Object เพียงตัวเดียวในระบบ

### เหตุผลที่เลือกใช้ Singleton

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **ประสิทธิภาพด้านทรัพยากร** | ไม่จำเป็นต้องสร้าง Object ใหม่ทุก request เนื่องจาก service ไม่มีข้อมูลส่วนตัวที่เปลี่ยนแปลงเฉพาะต่อ request |
| **พฤติกรรมที่สม่ำเสมอ** | Object เดียวกันถูกใช้ร่วมกันทั่วระบบ ทำให้การทำงานสอดคล้องกันเสมอ |

**สรุป:** Services, Controllers, และ Logging component ในระบบล้วนเป็น Singleton ที่ Spring Boot จัดการให้โดยอัตโนมัติ ทำให้ประหยัดทรัพยากรและมีพฤติกรรมที่คาดเดาได้

---

## Pattern 2 — Proxy

### Category
**Structural Pattern**

### แนวคิด
สร้างตัวแทนมาคั่นกลาง เพื่อควบคุมการเข้าถึง object จริง โดยเพิ่มการตรวจสอบสิทธิ์และการบันทึก log ก่อนส่งต่อคำสั่ง

### เหตุผลที่เลือกใช้ Proxy

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **การควบคุมการเข้าถึง** | ตรวจสอบสิทธิ์ของผู้ใช้ก่อนทุก operation โดยที่ไม่ต้องสนใจ business logic หลัก |
| **การบันทึก Audit Log** | บันทึกทุก event ก่อนและหลังการทำงานจริง โดยไม่ยุ่งเกี่ยวกับ business logic |
| **การแยกหน้าที่** | ส่วน business logic มุ่งเน้นที่การทำงานหลัก ส่วน Proxy ดูแลเรื่อง security และ logging แยกต่างหาก |

**สรุป:** ระบบใช้ Proxy layer คั่นกลางระหว่าง Controller กับ Service จริง เพื่อตรวจสอบสิทธิ์และบันทึก log ทุก operation โดยอัตโนมัติ

---

## Pattern 3 — Adapter

### Category
**Structural Pattern**

### แนวคิด
สร้างตัวกลางแปลง Interface เพื่อให้ระบบใหม่กับระบบเก่า (Legacy) ที่มี API แตกต่างกันสามารถทำงานร่วมกันได้

### เหตุผลที่เลือกใช้ Adapter

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **แยก Legacy API ออกจากโค้ดหลัก** | โค้ดหลักไม่ต้องรู้จัก format หรือ API ของระบบเก่า |
| **แปลง format ข้อมูลอัตโนมัติ** | Adapter แปลงข้อมูลจาก format ของระบบใหม่ไปเป็น format ที่ระบบ Legacy OCS เข้าใจ |
| **ความยืดหยุ่นในอนาคต** | หากต้องการเปลี่ยนระบบ OCS เพียงสร้าง Adapter ใหม่ โดยไม่ต้องแก้ไขโค้ดส่วนอื่น |

**สรุป:** ระบบต้องติดต่อกับ Gemini OCS ซึ่งเป็นระบบ Legacy ที่มี API ต่างออกไป Adapter ทำหน้าที่แปลงข้อมูลระหว่างสองระบบ ทำให้ทั้งสองฝ่ายไม่ต้องรู้จักกันโดยตรง

---

## Pattern 4 — Factory

### Category
**Creational Pattern**

### แนวคิด
รวม logic การสร้าง Object ไว้ที่เดียว แทนที่จะกระจายการสร้างไปทั่วโค้ด

### เหตุผลที่เลือกใช้ Factory

| ข้อดี | คำอธิบาย |
|---------|-------------|
| **รวม logic การสร้าง Object ไว้ที่เดียว** | ทุกส่วนของระบบที่ต้องการสร้าง Science Plan ใช้ Factory เดียวกัน ไม่ต้องเขียนซ้ำ |
| **ลด Code ซ้ำซ้อน** | การแมปข้อมูลและการกำหนดค่าเริ่มต้นต่างๆ อยู่ในที่เดียว |

**สรุป:** Factory รวม logic การสร้าง Science Plan ไว้ที่เดียว ทำให้ทุก service ที่ต้องการสร้าง plan ใช้วิธีเดียวกัน และมั่นใจได้ว่า object ที่ได้มีข้อมูลครบถ้วน


---
---
---


## Conclusion

### Summary

- **Singleton** — Spring จัดการให้โดยอัตโนมัติ ทำให้ทุก service และ component ใช้งาน resource อย่างมีประสิทธิภาพ
- **Proxy** — ใช้เป็น layer กลางสำหรับตรวจสอบสิทธิ์และบันทึก log ก่อนส่งต่อให้ service จริงทำงาน
- **Adapter** — ใช้เชื่อมต่อกับระบบ Legacy OCS ที่มี API ต่างออกไป โดยไม่กระทบโค้ดหลัก
- **Factory** — รวม logic การสร้าง Science Plan ไว้ที่เดียว ลด code ซ้ำซ้อนทั่วระบบ

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
