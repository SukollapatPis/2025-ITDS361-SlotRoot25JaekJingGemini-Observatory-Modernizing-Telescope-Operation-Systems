# Class diagram

---

# UC-01: Create a science plan
## Usecase description 
<table border="1" width="100%">
  <tr>
    <td><strong>Use Case Name:</strong> Create Science Plan</td>
    <td><strong>ID:</strong> UC-01</td>
    <td><strong>Importance Level:</strong> High</td>
  </tr>
  <tr>
    <td><strong>Primary Actor:</strong> Astronomer</td>
    <td colspan="2">
      <strong>Use Case Type:</strong> Detail and Real</td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Stakeholders and Interests:</strong> 
      <br>
      <pre> Astronomer: ต้องการสร้าง Science Plan ที่ครบถ้วน ถูกต้อง และสามารถนำไปทดสอบหรือส่งตรวจได้โดยไม่เกิดข้อผิดพลาด</pre>
      </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Brief Description: </strong>
      <br>
      <pre> Astronomer ทำการสร้างและบันทึก Science Plan ใหม่เพื่อเตรียมสำหรับการทดสอบและการส่งตรวจต่อไป </pre>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Trigger: </strong>Astronomer ต้องการจัดทำ Science Plan ใหม่
      <br>
      <strong>Type: </strong> External
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Relationships: </strong> 
      <pre>
        <b>Association: </b>Astronomer
        <b>Include: </b>-
        <b>Extend: </b>-
        <b>Generalization</b>-
      </pre>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Normal Flow of Events: </strong>
        <ol>
          <li>Astronomer เข้าสู่เมนูจัดการ Science Plan</li>
          <li>System แสดงรายการ Science Plan ของผู้ใช้ พร้อมปุ่ม "Create New Science Plan"</li>
          <li>Astronomer เลือกสร้าง Science Plan ใหม่</li>
          <li>System แสดงแบบฟอร์มสำหรับกรอกพารามิเตอร์ที่จำเป็น</li>
          <li>Astronomer กรอกหรือแก้ไขข้อมูลพารามิเตอร์</li>
          <li>System ตรวจสอบความครบถ้วนและความถูกต้องของข้อมูล และแจ้งเตือนหากพบข้อผิดพลาด</li>
          <li>Astronomer กดปุ่ม "Save"</li>
          <li>System บันทึก Science Plan และเปลี่ยนสถานะจาก "Unsaved" เป็น "Draft" พร้อมแสดงเลขอ้างอิงและข้อความยืนยันการบันทึกสำเร็จ</li>
        </ol>
    </td>
  </tr>
  
      
      
</table>

## Activity diagram

## Sequence diagram

---

# UC-02: Test a science plan
## Usecase description 

## Activity diagram

## Sequence diagram

---

# UC-03: Submit a science plan
## Usecase description 

## Activity diagram

## Sequence diagram

---

# UC-04: Validate a science plan
## Usecase description 

## Activity diagram

## Sequence diagram

---

# UC-05: Create an observing program
## Usecase description 

## Activity diagram

## Sequence diagram

---
