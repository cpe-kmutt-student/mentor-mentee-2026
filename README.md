# โปรเจคพี่รหัส-น้องรหัส

<h3>วิธีติดตั้ง Deps อื่นๆ</h3>

ติดตั้ง dependency เฉพาะ workspace ที่ต้องการ โดยใช้คำสั่งดังนี้ <br/>
<code>pnpm install [dep] --filter [workspace]</code><br/>
dep: ชื่อของ dependency ที่ต้องการติดตั้ง
workspace: ชื่อของ workspace ที่ต้องการติดตั้ง dependency เช่น `@repo/my-workspace`

<br/>

ติดตั้ง dependency ที่ root <br/>
<code>pnpm install [dep] -w</code><br/>
dep: ชื่อของ dependency ที่ต้องการติดตั้ง

<br/>

<h3>การเรียกใช้งาน Package</h3>
ในไฟล์ `package.json` ของแต่ละ workspace จะมีการกำหนดชื่อ package ไว้ที่ `name` ซึ่งสามารถเรียกใช้งานได้ดังนี้ <br/>
<code>import { functionName } from '@repo/my-workspace'</code>

<br/>

การ import เข้า dependencies ใน package.json ของ workspace อื่นๆ สามารถทำได้ดังนี้ <br/>
<code>pnpm add @repo/my-workspace --filter [workspace]</code><br/>
workspace: ชื่อของ workspace ที่ต้องการติดตั้ง dependency เช่น `@repo/my-workspace`
