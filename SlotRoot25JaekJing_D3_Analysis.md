# Class diagram

---

# UC-01: Create a science plan
## Usecase description 
<table border="1" width="100%">
  <tr>
    <td><strong>Use Case Name:</strong> Create a science plan</td>
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
      <pre><b>Astronomer:</b> ต้องการสร้าง Science Plan ที่ครบถ้วน ถูกต้อง และสามารถนำไปทดสอบหรือส่งตรวจได้โดยไม่เกิดข้อผิดพลาด</pre>
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
          <li>System ตรวจสอบความครบถ้วนและความถูกต้องของข้อมูล</li>
          <li>Astronomer กดปุ่ม "Save"</li>
          <li>System บันทึก Science Plan และเปลี่ยนสถานะจาก "Unsaved" เป็น "Draft" พร้อมแสดงเลขอ้างอิงและข้อความยืนยันการบันทึกสำเร็จ</li>
        </ol>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Subflow: </strong>-
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Alternate/Exceptional Flow: </strong>
      <ul>
        <li><b>5a ยกเลิกการสร้างแผน:</b> System ปิดแบบฟอร์ม โดยไม่บันทึกข้อมูลใด ๆ</li>
        <li><b>6a1 ข้อมูลไม่ครบถ้วน:</b> System ตรวจพบว่าช่องข้อมูลที่จำเป็นยังไม่ครบ จึงทำการแสดงข้อความแจ้งเตือนและไฮไลต์ช่องที่ขาด, Use case กลับไปยังขั้นตอนที่ 5 </li>
        <li><b>6a2 ข้อมูลไม่สอดคล้องกัน:</b> System ตรวจพบว่าค่าพารามิเตอร์บางส่วนขัดแย้งกัน จึงทำการแสดงข้อความอธิบายข้อผิดพลาด, Use case กลับไปยังขั้นตอนที่ 5 </li>
        <li><b>7e ไม่สามารถบันทึกข้อมูลได้:</b> System ไม่สามารถบันทึกข้อมูลได้ (เช่น ระบบขัดข้อง) จึงแสดงข้อความ "Save Failed" และคงสถานะของ Science plan ไว้ที่ “Unsaved”</li>
      </ul>
    </td>
  </tr>
</table>

## Activity diagram

## Sequence diagram

---

# UC-02: Test a science plan
## Usecase description 
<table border="1" width="100%">
  <tr>
    <td><strong>Use Case Name:</strong> Test a science plan</td>
    <td><strong>ID:</strong> UC-02</td>
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
      <pre><b>Astronomer:</b> ต้องการตรวจสอบว่า Science Plan สามารถปฏิบัติการได้จริงภายใต้ข้อจำกัดของหอดูดาว ไม่มีความขัดแย้งของพารามิเตอร์ และพร้อมสำหรับการส่งตรวจในขั้นตอนถัดไป</pre>
      </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Brief Description: </strong>
      <br>
      <pre> Astronomer เลือก Science Plan ที่บันทึกไว้และทำการทดสอบผ่านระบบจำลอง (Virtual Telescope) เพื่อจำลองการสังเกตและดูผลลัพธ์/ข้อจำกัดก่อนส่งให้ตรวจสอบจริง</pre>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Trigger: </strong>Astronomer กดปุ่ม “Test via Virtual Telescope” บน Science Plan ที่บันทึกไว้
      <br>
      <strong>Type: </strong> External
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Relationships: </strong> 
      <pre>
        <b>Association: </b>Astronomer
        <b>Include: </b>operate the interactive obsering (virtual telescope)
        <b>Extend: </b>-
        <b>Generalization</b>-
      </pre>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Normal Flow of Events: </strong>
        <ol>
          <li>Astronomer เลือกเมนู Saved Science Plans</li>
          <li>System แสดงรายชื่อ Science Plan พร้อมสถานะ</li>
          <li>Astronomer เลือก Science Plan ที่ต้องการทดสอบและกดปุ่ม "Test via Virtual Telescope"</li>
          <li>System โหลดพารามิเตอร์ของ Science Plan และ เปิดหน้าต่างจำลองการทำงาน (Virtual Telescope Interface)</li>
          <li>Astronomer ตรวจสอบค่าพารามิเตอร์บนหน้าจอจำลอง และกดปุ่ม "Start Simulation"
            <ol>
              <li>Usecase Include: Operate the interactive observing</li>
            </ol>
          </li>
          <li>System จำลองการสังเกต แสดง Interactive Visualization และตรวจสอบข้อจำกัดทางกายภาพโดยอัตโนมัติ</li>
          <li>System แสดง Simulation Result พร้อมสถานะ "ผ่าน" และรายละเอียด Log</li>
          <li>Astronomer ดูผลลัพธ์และกดปุ่ม “Confirm Result” เพื่อบันทึกสถานะผลการทดสอบ</li>
        </ol>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Subflow: </strong>-
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Alternate/Exceptional Flow: </strong>
      <ul>
        <li><b>5a ยกเลิกการจำลองระหว่างทำงาน: </b>Astronomer กด "Stop Simulation" จึง System หยุดการจำลองและไม่มีการประเมินผล (ผ่าน/ไม่ผ่าน)</li>
        <li><b>6a ทดสอบล้มเหลว: </b>System ตรวจพบว่าค่าพารามิเตอร์ขัดแย้งกับข้อจำกัดทางกายภาพหรืออุปกรณ์ และยุติกระบวนการจำลอง จากนั้นแสดงสถานะ "ไม่ผ่าน" พร้อม Error Log และรายละเอียดข้อผิดพลาด พร้อมตัวเลือก "กลับไปแก้ไข" หรือ "ปิดหน้าจอ Simulation"</li>
      </ul>
    </td>
  </tr>
</table>

## Activity diagram

## Sequence diagram

---

# UC-03: Submit a science plan
## Usecase description 
<table border="1" width="100%">
  <tr>
    <td><strong>Use Case Name:</strong> Submit a science plan</td>
    <td><strong>ID:</strong> UC-03</td>
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
      <pre><b>Astronomer: </b>ต้องการส่ง Science Plan ที่ผ่านการทดสอบแล้วเข้าสู่กระบวนการตรวจสอบ เพื่อให้สามารถดำเนินการสังเกตการณ์จริงในขั้นตอนถัดไป และทราบสถานการณ์พิจารณาของแผน</pre>
       <pre><b>Science Observer: </b>ต้องการได้รับ Science Plan ที่ครบถ้วน ถูกต้อง และพร้อมสำหรับการตรวจสอบ โดยไม่ต้องแก้ไขข้อผิดพลาดพื้นฐานก่อนดำเนินการต่อ</pre>
      </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Brief Description: </strong>
      <br>
      <pre>Astronomer ส่ง Science Plan ที่บันทึกไว้เข้าสู่ระบบ เพื่อให้ Science Observer ตรวจสอบและพิจารณาในขั้นตอนถัดไป</pre>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Trigger: </strong>Astronomer ต้องการ Submit Science Plan ที่บันทึกไว้
      <br>
      <strong>Type: </strong>External
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
          <li>Astronomer เลือก Science Plan ที่ต้องการส่ง</li>
          <li>System แสดงรายละเอียดสรุปของ Science Plan</li>
          <li>Astronomer ตรวจสอบรายละเอียดสรุป</li>
          <li>Astronomer กดปุ่ม "Submit"</li>
          <li>System ทำการตรวจสอบความครบถ้วนของข้อมูลขั้นสุดท้าย</li>
          <li>System เปลี่ยนสถานะของ Science Plan จาก "Draft" เป็น "Submitted" บันทึกเวลาการส่ง แจ้ง Science Observer ว่ามี Science Plan ใหม่รอการตรวจสอบ และแสดงข้อความยืนยันว่า "ส่ง Science Plan เรียบร้อยแล้ว"</li>
        </ol>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Subflow: </strong>-
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Alternate/Exceptional Flow: </strong>
      <ul>
        <li><b>3e ผู้ใช้ยกเลิกการส่ง:</b> System ปิดหน้าต่างยืนยันและ Science Plan ยังคงสถานะ "Draft"</li>
        <li><b>5a1 ข้อมูลไม่ครบ:</b> System ตรวจพบข้อมูลที่จำเป็นยังไม่ครบ จึงทำการไฮไลต์ช่องที่ขาด แสดงข้อความแจ้งเตือนและไม่อนุญาตให้ส่ง, Use case กลับไปยังขั้นตอนที่ 2 </li>
        <li><b>5a2 ข้อมูลผิดเงื่อนไขทางเทคนิค:</b> System ตรวจพบ Logical Conflict จึงทำการแสดง Error Message และคงสถานะของ Science Plan ไว้ที่ "Draft", Use case กลับไปยังขั้นตอนที่ 2 </li>
        <li><b>5a3 ระบบตรวจพบค่าที่ควรปรับปรุง:</b>System จะแสดง Warning แต่ยอมให้เลือก "Submit anyway" เพื่อดำเนินการต่อได้</li>
        <li><b>6e ระบบขัดข้อง:</b> System ไม่สามารถเปลี่ยนสถานะได้ จึงทำการแสดงข้อความ "Submission Failed" และคงสถานะของ Science Plan ไว้ที่ "Draft"</li>
      </ul>
    </td>
  </tr>
</table>

## Activity diagram

## Sequence diagram

---

# UC-04: Validate a science plan
## Usecase description 
<table border="1" width="100%">
  <tr>
    <td><strong>Use Case Name:</strong> Validate a science plan</td>
    <td><strong>ID:</strong> UC-04</td>
    <td><strong>Importance Level:</strong> High</td>
  </tr>
  <tr>
    <td><strong>Primary Actor:</strong> Science Observer</td>
    <td colspan="2">
      <strong>Use Case Type:</strong> Detail and Real</td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Stakeholders and Interests:</strong> 
      <br>
      <pre><b>Science Observer: </b>ต้องการส่ง Science Plan ที่ผ่านการทดสอบแล้วเข้าสู่กระบวนการตรวจสอบ เพื่อให้สามารถดำเนินการสังเกตการณ์จริงในขั้นตอนถัดไป และทราบสถานการณ์พิจารณาของแผน</pre>
       <pre><b>Astronomer: </b>ต้องการทราบผลการอนุมัติหรือข้อเสนอแนะเพื่อปรับปรุง Science Plan</pre>
      </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Brief Description: </strong>
      <br>
      <pre>Science Observer ตรวจสอบ Science Plan ที่ถูกส่งเข้ามา เพื่อประเมินความถูกต้อง ความปลอดภัย และความเหมาะสมในการปฏิบัติการ พร้อมบันทึกผลการพิจารณา</pre>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Trigger: </strong>Science Observer ต้องการตรวจสอบ Science Plan ที่ Astronomer Submit เข้ามาในระบบ 
      <br>
      <strong>Type: </strong>External
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Relationships: </strong> 
      <pre>
        <b>Association: </b>Science Observer
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
          <li>Science Observer เลือกเมนูรายการ Science Plan ที่มีสถานะ "Submitted"</li>
          <li>System แสดงรายการ Science Plan ที่รอการตรวจสอบ</li>
          <li>Science Observer เลือก Science Plan</li>
          <li>System แสดงรายละเอียดของ Science Plan รวมถึงพารามิเตอร์และผลการทดสอบ</li>
          <li>Science Observer ทำการประเมินความปลอดภัยของอุปกรณ์และความเหมาะสมของ Science Plan</li>
          <li>Science Observer กด "Approve" เพื่อยืนยันการตรวจสอบ และให้ข้อเสนอแนะ</li>
          <li>System ตรวจผลการตรวจสอบ </li>
          <li>System บันทึกผลการอนุมัติ เปลี่ยนสถานะของ Science Plan เป็น "Validated" และบันทึกเวลา/ผู้ตรวจ แสดงข้อความยืนยันให้กับ Science Observer และแจ้งผลการตรวจสอบไปยัง Astronomer</li>
        </ol>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Subflow: </strong>-
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Alternate/Exceptional Flow: </strong>
      <ul>
        <li><b>2a Science Plan มี Version Conflict:</b> Science Plan ถูกอัปเดตใหม่ขณะกำลังเปิดดู System แจ้งเตือนและบังคับให้ Reload ข้อมูลล่าสุด, Use case กลับไปยังขั้นตอนที่ 1</li>
        <li><b>7a1 ตรวจพบจุดเสี่ยง:</b> System แจ้งเตือนจุดเสี่ยง แต่อนุญาตให้ Science Observer เลือก "Approve anyway" เพื่อไปขั้นตอนที่ 8 ต่อได้</li>
        <li><b>7a2 ข้อมูลไม่สมบูรณ์หรือขัดแย้ง:</b> System แสดงรายการ Error แบบชี้จุด และเปลี่ยนสถานะเป็น "Needs Revision"</li>
        <li><b>8e บันทึกข้อมูลล้มเหลว:</b> System ไม่สามารถบันทึกข้อมูลได้ จึงทำการแสดงข้อความ "Validation could not be saved" และคงสถานะของ Science Plan ไว้ที่ "Submitted"</li>
      </ul>
    </td>
  </tr>
</table>

## Activity diagram

## Sequence diagram

---

# UC-05: Create an observing program
## Usecase description 
<table border="1" width="100%">
  <tr>
    <td><strong>Use Case Name:</strong> Create an observing program</td>
    <td><strong>ID:</strong> UC-05</td>
    <td><strong>Importance Level:</strong> High</td>
  </tr>
  <tr>
    <td><strong>Primary Actor:</strong> Science Observer</td>
    <td colspan="2">
      <strong>Use Case Type:</strong> Detail and Real</td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Stakeholders and Interests:</strong> 
      <br>
      <pre><b>Science Observer: </b>ต้องการสร้าง Observing Program จาก Science Plan ที่อนุมัติแล้ว ให้พร้อมใช้งานในการสังเกตจริง โดยคงเจตนาของแผนและลดความเสี่ยงในการรันผิดพลาด</pre>
       <pre><b>Telescope Operator:  </b>ต้องการโปรแกรมที่รันได้จริง มีข้อมูลครบ และตรวจสอบย้อนกลับได้ว่ามาจาก Science Plan ใด</pre>
      </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Brief Description: </strong>
      <br>
      <pre>Science Observer แปลง Science Plan ที่ผ่านการอนุมัติแล้วให้เป็น Observing Program เพื่อเตรียมสำหรับการรันจริง</pre>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Trigger: </strong>Science Observer เปิดรายการ Science Plan ที่ผ่านการอนุมัติ และเลือกแผนเพื่อเริ่มสร้าง Observing Program
      <br>
      <strong>Type: </strong>External
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Relationships: </strong> 
      <pre>
        <b>Association: </b>Science Observer
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
          <li>System แสดงรายการ Science Plan ที่มีสถานะ "Validated"</li>
          <li>Science Observer เลือก Science Plan และกดปุ่ม "Transform to Observing Program"</li>
          <li>System แปลงข้อมูลจาก Science Plan เพื่อสร้าง Observing Program แบบร่าง</li>
          <li>System แสดงรายละเอียดของ Observing Program ที่สร้างขึ้น</li>
          <li>Science Observer ตรวจสอบและปรับแก้รายละเอียดที่จำเป็น</li>
          <li>Science Observer กด "Save"</li>
          <li>System ตรวจสอบความครบถ้วนและความถูกต้องของข้อมูล</li>
          <li>System บันทึก Observing Program และกำหนดสถานะเป็น "Draft" พร้อมแสดงข้อความยืนยัน</li>
        </ol>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Subflow: </strong>-
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <strong>Alternate/Exceptional Flow: </strong>
      <ul>
        <li><b>2a Science Plan มี Version Conflict:</b> System แจ้งว่า "Source plan changed" และให้ Science Observer ทำการ Reload ก่อน, Use case กลับไปขั้นตอนที่ 1</li>
        <li><b>3a แปลงข้อมูลล้มเหลว:</b> System ไม่สามารถสร้าง Observing Program จาก Science Plan ได้ จึงทำการแสดงข้อความ "Create failed"</li>
        <li><b>7a ตรวจพบจุดเสี่ยง:</b> System แจ้งเตือนจุดเสี่ยง แต่อนุญาตให้ Science Observer เลือก "Approve anyway" เพื่อไปขั้นตอนที่ 8 ต่อได้</li>
        <li><b>8e บันทึกข้อมูลล้มเหลว:</b> System ไม่สามารถบันทึกข้อมูลได้ จึงทำการแสดงข้อความว่าไม่สามารถบันทึกได้</li>
      </ul>
    </td>
  </tr>
</table>

## Activity diagram

## Sequence diagram

---
