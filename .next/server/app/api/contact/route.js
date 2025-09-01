"use strict";(()=>{var e={};e.id=386,e.ids=[386],e.modules={1185:e=>{e.exports=require("mongoose")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1282:e=>{e.exports=require("child_process")},4770:e=>{e.exports=require("crypto")},665:e=>{e.exports=require("dns")},7702:e=>{e.exports=require("events")},2048:e=>{e.exports=require("fs")},2615:e=>{e.exports=require("http")},8791:e=>{e.exports=require("https")},8216:e=>{e.exports=require("net")},9801:e=>{e.exports=require("os")},5315:e=>{e.exports=require("path")},6162:e=>{e.exports=require("stream")},2452:e=>{e.exports=require("tls")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},1568:e=>{e.exports=require("zlib")},2049:(e,t,s)=>{s.r(t),s.d(t,{originalPathname:()=>x,patchFetch:()=>b,requestAsyncStorage:()=>h,routeModule:()=>g,serverHooks:()=>y,staticGenerationAsyncStorage:()=>f});var a={};s.r(a),s.d(a,{GET:()=>m,POST:()=>u});var r=s(9303),o=s(8716),i=s(3131),n=s(7070),l=s(6961),p=s(471),d=s(4184),c=s(5033);async function u(e){try{let{name:t,email:s,subject:a,message:r,phone:o,company:i}=await e.json();if(!t||!s||!a||!r)return n.NextResponse.json({success:!1,message:"Missing required fields"},{status:400});if(!(0,l.vV)(s))return n.NextResponse.json({success:!1,message:"Invalid email format"},{status:400});if(t.length<2)return n.NextResponse.json({success:!1,message:"Name must be at least 2 characters long"},{status:400});if(r.length<10)return n.NextResponse.json({success:!1,message:"Message must be at least 10 characters long"},{status:400});await (0,d.v)();let u=await c.Z.findOne({email:s});u?await u.addMessage(a,r,o,i):(u=new c.Z({email:s,name:t,phone:o||"",company:i||"",messages:[{subject:a,message:r,status:"pending",createdAt:new Date}],lastMessageAt:new Date,firstContactAt:new Date}),await u.save());try{await (0,p.Lf)({name:t,email:s,subject:a,message:r,phone:o,company:i})}catch(e){}try{await (0,p.GB)({name:t,email:s,subject:a,message:r,phone:o,company:i})}catch(e){}return n.NextResponse.json({success:!0,message:"Contact form submitted successfully! I will get back to you soon.",submission:{id:u._id.toString(),email:u.email,name:u.name,message:u.messages[u.messages.length-1]}},{status:201})}catch(e){return n.NextResponse.json({success:!1,message:"Failed to submit contact form"},{status:500})}}async function m(e){try{await (0,d.v)();let{searchParams:t}=new URL(e.url),s=parseInt(t.get("page")||"1"),a=t.get("status"),r=parseInt(t.get("limit")||"10"),o=(s-1)*r,i={};a&&"all"!==a&&(i.overallStatus=a);let l=await c.Z.find(i).sort({lastMessageAt:-1}).skip(o).limit(r).lean(),p=await c.Z.countDocuments(i);return n.NextResponse.json({success:!0,contacts:l.map(e=>({id:e._id.toString(),email:e.email,name:e.name,phone:e.phone,company:e.company,overallStatus:e.overallStatus,lastMessageAt:e.lastMessageAt,firstContactAt:e.firstContactAt,messages:e.messages,createdAt:e.createdAt,updatedAt:e.updatedAt})),total:p,page:s,limit:r,totalPages:Math.ceil(p/r)})}catch(e){return n.NextResponse.json({success:!1,message:"Failed to fetch contact submissions"},{status:500})}}let g=new r.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"/workspaces/dilipsingh076.github.io/src/app/api/contact/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:h,staticGenerationAsyncStorage:f,serverHooks:y}=g,x="/api/contact/route";function b(){return(0,i.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:f})}},6961:(e,t,s)=>{s.d(t,{GD:()=>r,MW:()=>a,vV:()=>o});let a=[];function r(e){return e.toLowerCase().replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim()}function o(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}},471:(e,t,s)=>{s.d(t,{Cz:()=>o,GB:()=>n,Lf:()=>i});let a=s(5245),r=()=>a.createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}}),o=async e=>{try{let t=r(),s={from:process.env.EMAIL_USER,to:e.to,subject:e.subject,html:e.html,text:e.text||e.html.replace(/<[^>]*>/g,"")};return await t.sendMail(s),!0}catch(e){return!1}},i=async e=>{let t=process.env.ADMIN_EMAIL||process.env.EMAIL_USER;if(!t)return!1;let s=`
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
  `;return await o({to:t,subject:`New Contact Form Submission: ${e.subject}`,html:s})},n=async e=>{let t=`
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
  `;return await o({to:e.email,subject:"Thank you for contacting Dilip Singh",html:t})}},5033:(e,t,s)=>{s.d(t,{Z:()=>n});var a=s(1185),r=s.n(a);let o=new a.Schema({subject:{type:String,required:!0,trim:!0},message:{type:String,required:!0},status:{type:String,enum:["pending","read","replied"],default:"pending"},sent_on:{type:Date},isAdminReply:{type:Boolean,default:!1},adminReplyTo:{type:String}},{timestamps:!0}),i=new a.Schema({name:{type:String,required:!0,trim:!0},email:{type:String,required:!0,trim:!0,unique:!0},phone:{type:String,trim:!0},company:{type:String,trim:!0},messages:[o],overallStatus:{type:String,enum:["pending","read","replied"],default:"pending"},lastMessageAt:{type:Date,required:!0},firstContactAt:{type:Date,required:!0}},{timestamps:!0});i.index({email:1}),i.index({overallStatus:1}),i.index({lastMessageAt:-1}),i.index({firstContactAt:-1}),i.methods.addMessage=function(e,t,s,a){return s&&(this.phone=s),a&&(this.company=a),this.messages.push({subject:e,message:t,status:"pending",createdAt:new Date}),this.lastMessageAt=new Date,this.firstContactAt||(this.firstContactAt=new Date),this.updateOverallStatus(),this.save()},i.methods.updateOverallStatus=function(){let e=this.messages.filter(e=>"pending"===e.status).length;this.messages.filter(e=>"replied"===e.status).length===this.messages.length?this.overallStatus="replied":0===e?this.overallStatus="read":this.overallStatus="pending"},i.methods.addAdminReply=function(e,t,s){return this.messages.push({subject:e,message:t,status:"replied",sent_on:new Date,isAdminReply:!0,adminReplyTo:s,createdAt:new Date}),this.lastMessageAt=new Date,this.updateOverallStatus(),this.save()},i.methods.markAllAsRead=function(){return this.messages.forEach(e=>{"pending"===e.status&&(e.status="read")}),this.updateOverallStatus(),this.save()},i.methods.markAllAsReplied=function(){return this.messages.forEach(e=>{"replied"!==e.status&&(e.status="replied",e.sent_on=new Date)}),this.updateOverallStatus(),this.save()};let n=r().models.Contact||r().model("Contact",i)},4184:(e,t,s)=>{s.d(t,{v:()=>l});var a=s(1185),r=s.n(a);let o=process.env.MONGODB_URI,i=process.env.MONGODB_DB_NAME||"portfolio";if(!o)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let n=global.mongoose||{conn:null,promise:null};async function l(){if(n.conn)return n.conn;n.promise||(n.promise=r().connect(o,{bufferCommands:!1,dbName:i}).then(e=>e));try{n.conn=await n.promise}catch(e){throw n.promise=null,e}return n.conn}global.mongoose||(global.mongoose=n)}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[276,972,245],()=>s(2049));module.exports=a})();