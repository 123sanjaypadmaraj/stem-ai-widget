(function(){

const API="https://sanjaypadmaraj-stem-llm-backend.hf.space/ask";

/* button */
const btn=document.createElement("div");
btn.innerHTML="🤖";
btn.style.position="fixed";
btn.style.bottom="30px";
btn.style.right="30px";
btn.style.width="60px";
btn.style.height="60px";
btn.style.background="#5f4bff";
btn.style.color="white";
btn.style.borderRadius="50%";
btn.style.display="flex";
btn.style.alignItems="center";
btn.style.justifyContent="center";
btn.style.cursor="pointer";
btn.style.zIndex="999999";
document.body.appendChild(btn);

/* chat window */
const panel=document.createElement("div");
panel.style.position="fixed";
panel.style.bottom="100px";
panel.style.right="30px";
panel.style.width="380px";
panel.style.height="480px";
panel.style.background="white";
panel.style.borderRadius="12px";
panel.style.boxShadow="0 10px 30px rgba(0,0,0,0.3)";
panel.style.display="none";
panel.style.flexDirection="column";
panel.style.zIndex="999999";

panel.innerHTML=`
<div style="background:#5f4bff;color:white;padding:12px;font-weight:bold">
STEM AI Assistant
</div>

<div id="stem-chat" style="flex:1;padding:10px;overflow-y:auto;background:#f7f7f7"></div>

<div style="display:flex;border-top:1px solid #ddd">
<input id="stem-input" placeholder="Ask about STEM club..."
style="flex:1;padding:10px;border:none;outline:none">
<button id="stem-send" style="background:#5f4bff;color:white;border:none;padding:10px 16px">
Ask
</button>
</div>
`;

document.body.appendChild(panel);

/* open/close */
btn.onclick=()=>{
panel.style.display=
panel.style.display==="none"?"flex":"none";
};

/* send message */
document.addEventListener("click",async e=>{
if(e.target.id==="stem-send"){

const input=document.getElementById("stem-input");
const chat=document.getElementById("stem-chat");

const q=input.value.trim();
if(!q) return;

chat.innerHTML+=`<div><b>You:</b> ${q}</div>`;
input.value="";

chat.innerHTML+=`<div id="thinking">Thinking...</div>`;

try{

const r=await fetch(API,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({question:q})
});

const data=await r.json();

document.getElementById("thinking").remove();

chat.innerHTML+=`<div><b>AI:</b> ${data.answer}</div>`;
chat.scrollTop=chat.scrollHeight;

}catch{
document.getElementById("thinking").innerText="Server error";
}

}
});

})();
