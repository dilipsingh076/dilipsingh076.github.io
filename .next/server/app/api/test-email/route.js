"use strict";(()=>{var e={};e.id=528,e.ids=[528],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1282:e=>{e.exports=require("child_process")},4770:e=>{e.exports=require("crypto")},665:e=>{e.exports=require("dns")},7702:e=>{e.exports=require("events")},2048:e=>{e.exports=require("fs")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},8216:e=>{e.exports=require("net")},9801:e=>{e.exports=require("os")},5315:e=>{e.exports=require("path")},6162:e=>{e.exports=require("stream")},2452:e=>{e.exports=require("tls")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},1568:e=>{e.exports=require("zlib")},9378:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>f,patchFetch:()=>h,requestAsyncStorage:()=>u,routeModule:()=>c,serverHooks:()=>g,staticGenerationAsyncStorage:()=>m});var r={};o.r(r),o.d(r,{GET:()=>d,POST:()=>p});var s=o(9303),i=o(8716),a=o(3131),l=o(7070),n=o(471);async function p(e){try{let{to:t,subject:o,message:r}=await e.json();if(!t||!o||!r)return l.NextResponse.json({success:!1,message:"Missing required fields: to, subject, message"},{status:400});let s=await (0,n.Cz)({to:t,subject:o,html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Test Email from Portfolio
          </h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            This is a test email to verify that your email service is working correctly.
          </p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Test Message</h3>
            <p style="line-height: 1.6; color: #333;">${r}</p>
          </div>
          <p style="font-size: 14px; color: #6c757d;">
            If you received this email, your contact form email service is working correctly!
          </p>
        </div>
      `});return l.NextResponse.json({success:s,message:s?"Test email sent successfully":"Failed to send test email"})}catch(e){return l.NextResponse.json({success:!1,message:"Failed to send test email",error:e instanceof Error?e.message:"Unknown error"},{status:500})}}async function d(){return l.NextResponse.json({message:"Test email endpoint. Use POST with { to, subject, message } to test email functionality.",example:{to:"your-email@example.com",subject:"Test Email",message:"This is a test message from your portfolio contact form."}})}let c=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/test-email/route",pathname:"/api/test-email",filename:"route",bundlePath:"app/api/test-email/route"},resolvedPagePath:"/workspaces/dilipsingh076.github.io/src/app/api/test-email/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:u,staticGenerationAsyncStorage:m,serverHooks:g}=c,f="/api/test-email/route";function h(){return(0,a.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:m})}},471:(e,t,o)=>{o.d(t,{Cz:()=>i,GB:()=>l,Lf:()=>a});let r=o(5245),s=()=>r.createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}}),i=async e=>{try{let t=s(),o={from:process.env.EMAIL_USER,to:e.to,subject:e.subject,html:e.html,text:e.text||e.html.replace(/<[^>]*>/g,"")};return await t.sendMail(o),!0}catch(e){return!1}},a=async e=>{let t=process.env.ADMIN_EMAIL||process.env.EMAIL_USER;if(!t)return!1;let o=`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
            <td style="padding: 8px 0;">${e.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${e.email}" style="color: #007bff;">${e.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
            <td style="padding: 8px 0;">${e.subject}</td>
          </tr>
          ${e.phone?`
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
            <td style="padding: 8px 0;">${e.phone}</td>
          </tr>
          `:""}
          ${e.company?`
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
            <td style="padding: 8px 0;">${e.company}</td>
          </tr>
          `:""}
        </table>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
        <h3 style="color: #007bff; margin-top: 0;">Message</h3>
        <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${e.message}</p>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background-color: #e9ecef; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #6c757d; font-size: 14px;">
          This message was sent from your portfolio contact form at http://localhost:3000
        </p>
        <p style="margin: 10px 0 0 0;">
          <a href="mailto:${e.email}?subject=Re: ${e.subject}" 
             style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reply to ${e.name}
          </a>
        </p>
      </div>
    </div>
  `;return await i({to:t,subject:`New Contact Form Submission: ${e.subject}`,html:o})},l=async e=>{let t=`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        Thank you for contacting Dilip Singh
      </h2>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333;">
        Hi ${e.name},
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333;">
        Thank you for reaching out to me! I have received your message and will get back to you as soon as possible.
      </p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Your Message</h3>
        <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${e.message}</p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333;">
        I typically respond within 24-48 hours. If you have any urgent inquiries, please don't hesitate to reach out again.
      </p>
      
      <div style="margin-top: 30px; padding: 20px; background-color: #e9ecef; border-radius: 8px;">
        <h3 style="color: #007bff; margin-top: 0;">Best regards,</h3>
        <p style="margin: 0; font-size: 16px; color: #333;">
          <strong>Dilip Singh</strong><br>
          Senior Full Stack Developer<br>
          <a href="mailto:dilipsinghf@gmail.com" style="color: #007bff;">dilipsinghf@gmail.com</a>
        </p>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;">
        <p style="margin: 0; color: #856404; font-size: 14px;">
          This is an automated response. Please do not reply to this email.
        </p>
      </div>
    </div>
  `;return await i({to:e.email,subject:"Thank you for contacting Dilip Singh",html:t})}}};var t=require("../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[276,972,245],()=>o(9378));module.exports=r})();