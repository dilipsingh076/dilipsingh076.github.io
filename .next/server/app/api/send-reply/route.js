"use strict";(()=>{var e={};e.id=835,e.ids=[835],e.modules={1185:e=>{e.exports=require("mongoose")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1282:e=>{e.exports=require("child_process")},4770:e=>{e.exports=require("crypto")},665:e=>{e.exports=require("dns")},7702:e=>{e.exports=require("events")},2048:e=>{e.exports=require("fs")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},8216:e=>{e.exports=require("net")},9801:e=>{e.exports=require("os")},5315:e=>{e.exports=require("path")},6162:e=>{e.exports=require("stream")},2452:e=>{e.exports=require("tls")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},1568:e=>{e.exports=require("zlib")},3589:(e,t,s)=>{s.r(t),s.d(t,{originalPathname:()=>f,patchFetch:()=>y,requestAsyncStorage:()=>g,routeModule:()=>u,serverHooks:()=>h,staticGenerationAsyncStorage:()=>m});var r={};s.r(r),s.d(r,{POST:()=>c});var o=s(9303),i=s(8716),a=s(3131),n=s(7070),l=s(471),p=s(4184),d=s(5033);async function c(e){try{let{contactId:t,to:s,subject:r,message:o}=await e.json();if(!t||!s||!r||!o)return n.NextResponse.json({success:!1,message:"Missing required fields"},{status:400});await (0,p.v)();let i=await d.Z.findById(t);if(!i)return n.NextResponse.json({success:!1,message:"Contact not found"},{status:404});let a=i.messages[i.messages.length-1];try{await (0,l.Cz)({to:s,subject:r,html:`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Reply from Dilip Singh</h2>
              <p style="color: #666; margin-bottom: 0;">
                This is a reply to your message: <strong>${a.subject}</strong>
              </p>
            </div>

            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin-bottom: 20px;">
              <div style="white-space: pre-wrap; line-height: 1.6; color: #333;">
                ${o}
              </div>
            </div>

            <div style="background-color: #e9ecef; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #007bff; margin-top: 0; font-size: 16px;">Original Message</h3>
                          <p style="color: #666; margin-bottom: 10px;">
              <strong>From:</strong> ${i.name} (${i.email})
            </p>
              <p style="color: #666; margin-bottom: 10px;">
                <strong>Subject:</strong> ${a.subject}
              </p>
              <div style="background-color: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                <p style="color: #333; margin: 0; white-space: pre-wrap; line-height: 1.5;">
                  ${a.message}
                </p>
              </div>
            </div>

            <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                <strong>Dilip Singh</strong><br>
                Senior Full Stack Developer<br>
                <a href="mailto:dilipsinghf@gmail.com" style="color: #007bff;">dilipsinghf@gmail.com</a>
              </p>
            </div>
          </div>
        `})}catch(e){}let c={subject:r,message:o,status:"replied",sent_on:new Date,isAdminReply:!0,adminReplyTo:a._id.toString(),createdAt:new Date};return i.messages.push(c),i.lastMessageAt=new Date,await i.save(),n.NextResponse.json({success:!0,message:"Reply sent successfully"})}catch(e){return n.NextResponse.json({success:!1,message:"Failed to send reply"},{status:500})}}let u=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/send-reply/route",pathname:"/api/send-reply",filename:"route",bundlePath:"app/api/send-reply/route"},resolvedPagePath:"/workspaces/dilipsingh076.github.io/src/app/api/send-reply/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:g,staticGenerationAsyncStorage:m,serverHooks:h}=u,f="/api/send-reply/route";function y(){return(0,a.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:m})}},471:(e,t,s)=>{s.d(t,{Cz:()=>i,GB:()=>n,Lf:()=>a});let r=s(5245),o=()=>r.createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}}),i=async e=>{try{let t=o(),s={from:process.env.EMAIL_USER,to:e.to,subject:e.subject,html:e.html,text:e.text||e.html.replace(/<[^>]*>/g,"")};return await t.sendMail(s),!0}catch(e){return!1}},a=async e=>{let t=process.env.ADMIN_EMAIL||process.env.EMAIL_USER;if(!t)return!1;let s=`
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
  `;return await i({to:t,subject:`New Contact Form Submission: ${e.subject}`,html:s})},n=async e=>{let t=`
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
  `;return await i({to:e.email,subject:"Thank you for contacting Dilip Singh",html:t})}},5033:(e,t,s)=>{s.d(t,{Z:()=>n});var r=s(1185),o=s.n(r);let i=new r.Schema({subject:{type:String,required:!0,trim:!0},message:{type:String,required:!0},status:{type:String,enum:["pending","read","replied"],default:"pending"},sent_on:{type:Date},isAdminReply:{type:Boolean,default:!1},adminReplyTo:{type:String}},{timestamps:!0}),a=new r.Schema({name:{type:String,required:!0,trim:!0},email:{type:String,required:!0,trim:!0,unique:!0},phone:{type:String,trim:!0},company:{type:String,trim:!0},messages:[i],overallStatus:{type:String,enum:["pending","read","replied"],default:"pending"},lastMessageAt:{type:Date,required:!0},firstContactAt:{type:Date,required:!0}},{timestamps:!0});a.index({email:1}),a.index({overallStatus:1}),a.index({lastMessageAt:-1}),a.index({firstContactAt:-1}),a.methods.addMessage=function(e,t,s,r){return s&&(this.phone=s),r&&(this.company=r),this.messages.push({subject:e,message:t,status:"pending",createdAt:new Date}),this.lastMessageAt=new Date,this.firstContactAt||(this.firstContactAt=new Date),this.updateOverallStatus(),this.save()},a.methods.updateOverallStatus=function(){let e=this.messages.filter(e=>"pending"===e.status).length;this.messages.filter(e=>"replied"===e.status).length===this.messages.length?this.overallStatus="replied":0===e?this.overallStatus="read":this.overallStatus="pending"},a.methods.addAdminReply=function(e,t,s){return this.messages.push({subject:e,message:t,status:"replied",sent_on:new Date,isAdminReply:!0,adminReplyTo:s,createdAt:new Date}),this.lastMessageAt=new Date,this.updateOverallStatus(),this.save()},a.methods.markAllAsRead=function(){return this.messages.forEach(e=>{"pending"===e.status&&(e.status="read")}),this.updateOverallStatus(),this.save()},a.methods.markAllAsReplied=function(){return this.messages.forEach(e=>{"replied"!==e.status&&(e.status="replied",e.sent_on=new Date)}),this.updateOverallStatus(),this.save()};let n=o().models.Contact||o().model("Contact",a)},4184:(e,t,s)=>{s.d(t,{v:()=>l});var r=s(1185),o=s.n(r);let i=process.env.MONGODB_URI,a=process.env.MONGODB_DB_NAME||"portfolio";if(!i)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let n=global.mongoose||{conn:null,promise:null};async function l(){if(n.conn)return n.conn;n.promise||(n.promise=o().connect(i,{bufferCommands:!1,dbName:a}).then(e=>e));try{n.conn=await n.promise}catch(e){throw n.promise=null,e}return n.conn}global.mongoose||(global.mongoose=n)}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[276,972,245],()=>s(3589));module.exports=r})();