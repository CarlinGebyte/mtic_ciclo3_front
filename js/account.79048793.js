"use strict";(self["webpackChunkciclo3_front_mtic"]=self["webpackChunkciclo3_front_mtic"]||[]).push([[809],{4821:function(e,t,i){i.r(t),i.d(t,{default:function(){return A}});var n=i(3396),a=i(7139),u=i(9242);const o={class:"user"},r=(0,n._)("h1",null,"This is a user account page",-1),l={key:0},c=(0,n._)("p",null,"ID:",-1),d={key:1},s=(0,n._)("button",null,"Enviar",-1),p={key:2},h=(0,n._)("p",null,"Nombre:",-1),m={key:3},g=(0,n._)("button",null,"Enviar",-1),k={key:4},_=(0,n._)("p",null,"Email:",-1),v={key:5},b=(0,n._)("button",null,"Enviar",-1);function w(e,t,i,w,y,E){return(0,n.wg)(),(0,n.iD)("div",o,[r,y.user?((0,n.wg)(),(0,n.iD)("div",l,[c,(0,n.Uk)(" "+(0,a.zw)(y.user.id)+" ",1),(0,n._)("button",{onClick:t[0]||(t[0]=(...e)=>E.changeActionId&&E.changeActionId(...e))},"Editar")])):(0,n.kq)("",!0),"edit1"==y.action?((0,n.wg)(),(0,n.iD)("div",d,[(0,n._)("form",{onSubmit:t[2]||(t[2]=(0,u.iM)(((...e)=>E.updateId&&E.updateId(...e)),["prevent"]))},[(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>y.update.id=e),type:"text",required:""},null,512),[[u.nr,y.update.id]]),s],32)])):(0,n.kq)("",!0),y.user?((0,n.wg)(),(0,n.iD)("div",p,[h,(0,n.Uk)(" "+(0,a.zw)(y.user.name)+" ",1),(0,n._)("button",{onClick:t[3]||(t[3]=(...e)=>E.changeActionName&&E.changeActionName(...e))},"Editar")])):(0,n.kq)("",!0),"edit2"==y.action?((0,n.wg)(),(0,n.iD)("div",m,[(0,n._)("form",{onSubmit:t[5]||(t[5]=(0,u.iM)(((...e)=>E.updateName&&E.updateName(...e)),["prevent"]))},[(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":t[4]||(t[4]=e=>y.update.name=e),type:"text",required:""},null,512),[[u.nr,y.update.name]]),g],32)])):(0,n.kq)("",!0),y.user?((0,n.wg)(),(0,n.iD)("div",k,[_,(0,n.Uk)(" "+(0,a.zw)(y.user.email)+" ",1),(0,n._)("button",{onClick:t[6]||(t[6]=(...e)=>E.changeActionEmail&&E.changeActionEmail(...e))},"Editar")])):(0,n.kq)("",!0),"edit3"==y.action?((0,n.wg)(),(0,n.iD)("div",v,[(0,n._)("form",{onSubmit:t[8]||(t[8]=(0,u.iM)(((...e)=>E.updateEmail&&E.updateEmail(...e)),["prevent"]))},[(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":t[7]||(t[7]=e=>y.update.email=e),type:"text",required:""},null,512),[[u.nr,y.update.email]]),b],32)])):(0,n.kq)("",!0)])}var y=i(6265),E=i.n(y),I={name:"AccountPage",data(){return{user:"",action:"",update:null,oldId:""}},methods:{changeActionId(){this.action="edit1"},changeActionName(){this.action="edit2"},changeActionEmail(){this.action="edit3"},updateId(){this.oldId=this.user.id,this.user.id=this.update.id,E().put(`https://ciclo3-backend.onrender.com/api/user/${this.oldId}/`,this.update).then((e=>{console.log(e),this.action=null,this.updateLocalStorage()})).catch((e=>{console.log("Ocurrió un error, intentelo nuevamente")}))},updateName(){this.user.name=this.update.name,E().put(`https://ciclo3-backend.onrender.com/api/user/${this.user.id}/`,this.update).then((e=>{console.log(e),this.action=null,this.updateLocalStorage()})).catch((e=>{console.log("Ocurrió un error, intentelo nuevamente")}))},updateEmail(){this.user.email=this.update.email,E().put(`https://ciclo3-backend.onrender.com/api/user/${this.user.id}/`,this.update).then((e=>{console.log(e),this.action=null,this.updateLocalStorage()})).catch((e=>{console.log("Ocurrió un error, intentelo nuevamente")}))},updateLocalStorage(){localStorage.setItem("user",JSON.stringify(this.update))}},created(){this.user=JSON.parse(localStorage.getItem("user")),this.update=JSON.parse(localStorage.getItem("user"))}},S=i(89);const f=(0,S.Z)(I,[["render",w]]);var A=f}}]);
//# sourceMappingURL=account.79048793.js.map