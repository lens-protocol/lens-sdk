(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{7334:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(780)}])},780:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return x}});var r=n(7458),i=n(8337);class s{walletFactory;walletGateway;credentialsIssuer;credentialsWriter;activeWalletPresenter;connectionErrorPresenter;activeProfile;constructor(e,t,n,r,i,s,a){this.walletFactory=e,this.walletGateway=t,this.credentialsIssuer=n,this.credentialsWriter=r,this.activeWalletPresenter=i,this.connectionErrorPresenter=s,this.activeProfile=a}async login(e){let t=await this.walletFactory.create(e),n=await this.credentialsIssuer.issueCredentials(t);if(n.isFailure()){this.connectionErrorPresenter.presentConnectionError(n.error);return}await this.walletGateway.save(t),await this.credentialsWriter.save(n.value),this.activeWalletPresenter.presentActiveWallet(t),await this.activeProfile.loadActiveProfileByOwnerAddress(t.address)}}var a=n(2139),l=n(9924);class o{errorHandler;constructor(e){this.errorHandler=e}presentConnectionError(e){e instanceof i.Ai||e instanceof i.$w&&e.reason===i.pj.CONNECTION_REFUSED||this.errorHandler(e)}}var c=n(7646),d=n(3520),h=n(5255),u=n.n(h),w=n(5130),f=n(2477);function x(){let e=function(){let e=function(){let{activeProfile:e,credentialsFactory:t,credentialsGateway:n,onError:r,walletFactory:i,walletGateway:c}=(0,a.z0)();return a=>{let d=new l.xt,h=new o(r),u=new s(i,c,t,n,d,h,e);u.login(a)}}();return(t,n=i.Sq.UNSPECIFIED)=>{t.getAddress().then(t=>{e({address:t,type:n})})}}(),{data:t}=function(){let e=(0,c.mr)(),t=(0,d.iB)();return e===c.UC.LOADING?{loading:!0,data:void 0}:t?{loading:!1,data:t}:{loading:!1,data:null}}(),{isDisconnected:n}=(0,w.mA)(),{connectAsync:h}=(0,w.$4)({connector:new f._k}),x=async()=>{if(n){let{connector:t}=await h();if(t instanceof f._k){let r=await t.getSigner();e(r,i.Sq.INJECTED)}}};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(u(),{children:[(0,r.jsx)("title",{children:"Lens SDK - NextJS"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("link",{rel:"icon",href:"data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>\uD83C\uDF3F</text></svg>"})]}),(0,r.jsxs)("header",{children:[(0,r.jsx)("h1",{children:"Lens SDK"}),(0,r.jsxs)("p",{children:["Example app that demonstrates a possible integration strategy with\xa0",(0,r.jsx)("a",{href:"https://nextjs.org/",children:"NextJS"}),"."]})]}),(0,r.jsxs)("main",{children:[t&&(0,r.jsxs)("p",{children:["Welcome ",(0,r.jsxs)("b",{children:["@",t.handle]})]}),!t&&(0,r.jsx)("button",{onClick:x,children:"Log in"})]})]})}},5255:function(e,t,n){e.exports=n(4181)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=7334)}),_N_E=e.O()}]);