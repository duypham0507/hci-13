"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[942],{1942:(Z,p,n)=>{n.r(p),n.d(p,{ErrorsModule:()=>F});var c=n(2252),x=n(1279),a=n(3075),l=n(9808),h=n(1620),e=n(5e3);let d=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[]]}),r})(),m=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[]]}),r})(),y=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[l.ez,a.u5,a.UX,h.o9,d,m],l.ez,a.u5,a.UX,h.o9,d,m]}),r})();var i=n(1777),v=n(2198),S=n(2986);let f=(()=>{class r{constructor(t,s,g){this._animationBuilder=t,this._document=s,this._router=g,this._init()}_init(){this.splashScreenEl=this._document.body.querySelector("#fuse-splash-screen"),this.splashScreenEl&&this._router.events.pipe((0,v.h)(t=>t instanceof c.m2),(0,S.q)(1)).subscribe(()=>{setTimeout(()=>{this.hide()})})}show(){this.player=this._animationBuilder.build([(0,i.oB)({opacity:"0",zIndex:"99999"}),(0,i.jt)("400ms ease",(0,i.oB)({opacity:"1"}))]).create(this.splashScreenEl),setTimeout(()=>{this.player.play()},0)}hide(){this.player=this._animationBuilder.build([(0,i.oB)({opacity:"1"}),(0,i.jt)("400ms ease",(0,i.oB)({opacity:"0",zIndex:"-10"}))]).create(this.splashScreenEl),setTimeout(()=>{this.player.play()},0)}}return r.\u0275fac=function(t){return new(t||r)(e.LFG(i._j),e.LFG(l.K0),e.LFG(c.F0))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})();var u=n(277);const E=[{path:"error-404",component:(()=>{class r{constructor(t,s){this._splashScreenService=t,this._location=s,setTimeout(()=>{this._splashScreenService.hide()})}back(){this._location.back()}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(f),e.Y36(l.Ye))},r.\u0275cmp=e.Xpm({type:r,selectors:[["error-404"]],decls:8,vars:0,consts:[["id","error-404","fxLayout","column","fxLayoutAlign","center center"],["fxLayout","column","fxLayoutAlign","center center",1,"content"],[1,"error-code"],[1,"message"],[1,"back-link",3,"click"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e._uU(3,"404"),e.qZA(),e.TgZ(4,"div",3),e._uU(5,"Ch\u1ee9c n\u0103ng \u0111ang ph\xe1t tri\u1ec3n"),e.qZA(),e.TgZ(6,"a",4),e.NdJ("click",function(){return s.back()}),e._uU(7,"Quay l\u1ea1i"),e.qZA(),e.qZA(),e.qZA())},directives:[u.xw,u.Wh],styles:["error-404{width:100%;height:100%}error-404 #error-404{width:100%;height:100%}error-404 #error-404 .content{width:90%;max-width:512px!important}error-404 #error-404 .content .error-code{font-size:112px;text-align:center;line-height:1;margin-bottom:16px;font-weight:600}error-404 #error-404 .content .message{font-size:28px;text-align:center}error-404 #error-404 .content .search{width:100%;height:56px;line-height:56px;margin:48px auto 16px;padding:16px;border:1px solid;border-radius:28px}error-404 #error-404 .content .search input{padding:0 0 0 16px}error-404 #error-404 .content .back-link{font-size:15px;text-align:center}\n"],encapsulation:2}),r})()},{path:"error-500",component:(()=>{class r{constructor(t){this._splashScreenService=t,setTimeout(()=>{this._splashScreenService.hide()})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(f))},r.\u0275cmp=e.Xpm({type:r,selectors:[["error-500"]],decls:10,vars:1,consts:[["id","error-500","fxLayout","column","fxLayoutAlign","center center"],["fxLayout","column","fxLayoutAlign","center center",1,"content"],[1,"error-code"],[1,"message"],[1,"sub-message"],[1,"report-link",3,"routerLink"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e._uU(3,"500"),e.qZA(),e.TgZ(4,"div",3),e._uU(5,"Well, you broke the internet!"),e.qZA(),e.TgZ(6,"div",4),e._uU(7," Just kidding, looks like we have an internal issue, please try again in couple minutes "),e.qZA(),e.TgZ(8,"a",5),e._uU(9,"Report this problem"),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(8),e.Q6J("routerLink","/apps/dashboards/project"))},directives:[u.xw,u.Wh,c.yS],styles:["error-500{width:100%;height:100%}error-500 #error-500{width:100%;height:100%}error-500 #error-500 .content{width:90%;max-width:512px!important}error-500 #error-500 .content .error-code{font-size:112px;line-height:1;text-align:center;margin-bottom:16px;font-weight:600}error-500 #error-500 .content .message{font-size:24px;text-align:center}error-500 #error-500 .content .sub-message{font-size:17px;text-align:center;margin:16px auto 48px}error-500 #error-500 .content .report-link{text-align:center;font-size:15px}\n"],encapsulation:2}),r})()}];let F=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[c.Bz.forChild(E),x.Ps,y]]}),r})()}}]);