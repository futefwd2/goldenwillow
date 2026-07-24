// Garden Gnome Software - Skin
// Pano2VR 6.1.9/17983
// Filename: skin.ggsk
// Generated 2025-05-21T20:57:43

function pano2vrSkin(player,base) {
	player.addVariable('var_compass', 2, false);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._compass=document.createElement('div');
		el.ggId="Compass";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 100px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 100px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._compass.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._compass.ggUpdatePosition=function (useTransition) {
		}
		el=me._compassring=document.createElement('div');
		el.ggId="CompassRing";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'background-clip : padding-box;';
		hs+='background-clip : padding-box;';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='border : 14px solid rgba(255,255,255,0);';
		hs+='cursor : default;';
		hs+='height : 72px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 72px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._compassring.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._compassring.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._image_3=document.createElement('div');
		els=me._image_3__img=document.createElement('img');
		els.className='ggskin ggskin_image_3';
		hs=basePath + 'images/image_3.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 3";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._compassring.appendChild(me._image_3);
		el=me._n=document.createElement('div');
		els=me._n__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="N";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 15px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -13px;';
		hs+='visibility : inherit;';
		hs+='width : 15px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 15px;';
		hs+='height: 15px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,58,86,1);';
		hs+='font-size: 10px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="N";
		el.appendChild(els);
		me._n.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._n.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._compassring.appendChild(me._n);
		el=me._e=document.createElement('div');
		els=me._e__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="E";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:90,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 15px;';
		hs+='position : absolute;';
		hs+='right : -13px;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 15px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='right: 0px;';
		hs+='top:  0px;';
		hs+='width: 15px;';
		hs+='height: 15px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,58,86,1);';
		hs+='font-size: 10px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="E";
		el.appendChild(els);
		me._e.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._e.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._compassring.appendChild(me._e);
		el=me._s=document.createElement('div');
		els=me._s__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="S";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:-180,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : -13px;';
		hs+='height : 15px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 15px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 15px;';
		hs+='height: 15px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,58,86,1);';
		hs+='font-size: 10px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="S";
		el.appendChild(els);
		me._s.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._s.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._compassring.appendChild(me._s);
		el=me._w=document.createElement('div');
		els=me._w__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="W";
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:-90,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 15px;';
		hs+='left : -13px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 15px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 15px;';
		hs+='height: 15px;';
		hs+='border: 0px solid #003a56;';
		hs+='color: rgba(0,58,86,1);';
		hs+='font-size: 10px;';
		hs+='font-weight: bold;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="W";
		el.appendChild(els);
		me._w.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._w.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._compassring.appendChild(me._w);
		me._compass.appendChild(me._compassring);
		el=me._compasspointer1=document.createElement('div');
		els=me._compasspointer1__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiA8cGF0aCBmaWxsLW9wYWNpdHk9IjAuNjg2Mjc1IiBmaWxsPSIjMDAwMDAwIiBkPSJNNTcuMTgxLDgxLjM1OVY0OC40N2g3LjdMNTAsMTguNjQxLDM1LjExNSw0OC40N2g3LjdWODEuMzU5SDU3LjE4MVoiIGlkPSJBcnJvd185XzEiIGRhdGEtbmFtZT0iQXJyb3cgOSAxIiBjbGFzcz0iY2xzLTEiLz4KPC9zdmc+Cg==';
		me._compasspointer1__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="CompassPointer1";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._compasspointer1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._compasspointer1.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('var_compass') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._compasspointer1.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._compasspointer1.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._compasspointer1.style[domTransition]='';
				if (me._compasspointer1.ggCurrentLogicStateVisible == 0) {
					me._compasspointer1.style.visibility="hidden";
					me._compasspointer1.ggVisible=false;
				}
				else {
					me._compasspointer1.style.visibility="hidden";
					me._compasspointer1.ggVisible=false;
				}
			}
		}
		me._compasspointer1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._compass.appendChild(me._compasspointer1);
		el=me._beamdot=document.createElement('div');
		el.ggId="BeamDot";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 999px;';
		hs+='border-radius : 999px;';
		hs+='background : rgba(0,0,0,0.862745);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._beamdot.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._beamdot.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('var_compass') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._beamdot.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._beamdot.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._beamdot.style[domTransition]='';
				if (me._beamdot.ggCurrentLogicStateVisible == 0) {
					me._beamdot.style.visibility=(Number(me._beamdot.style.opacity)>0||!me._beamdot.style.opacity)?'inherit':'hidden';
					me._beamdot.ggVisible=true;
				}
				else {
					me._beamdot.style.visibility="hidden";
					me._beamdot.ggVisible=false;
				}
			}
		}
		me._beamdot.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._compassbeam=document.createElement('div');
		els=me._compassbeam__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+CiA8cGF0aCBmaWxsLW9wYWNpdHk9IjAuNjg2Mjc1IiBmaWxsPSIjMDAwMDAwIiBkPSJNNTAsNTBMNjYsMThIMzRMNTAsNTAiIGlkPSJUcmlhbmdsZV8xIiBkYXRhLW5hbWU9IlRyaWFuZ2xlIDEiIGNsYXNzPSJjbHMtMSIvPgo8L3N2Zz4K';
		me._compassbeam__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="CompassBeam";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 100px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._compassbeam.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._compassbeam.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._beamdot.appendChild(me._compassbeam);
		me._compass.appendChild(me._beamdot);
		el=me._image_1=document.createElement('div');
		els=me._image_1__img=document.createElement('img');
		els.className='ggskin ggskin_image_1';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 100%;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_1.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('var_compass') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_1.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_1.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_1.style[domTransition]='';
				if (me._image_1.ggCurrentLogicStateVisible == 0) {
					me._image_1.style.visibility=(Number(me._image_1.style.opacity)>0||!me._image_1.style.opacity)?'inherit':'hidden';
					me._image_1.ggVisible=true;
				}
				else {
					me._image_1.style.visibility=(Number(me._image_1.style.opacity)>0||!me._image_1.style.opacity)?'inherit':'hidden';
					me._image_1.ggVisible=true;
				}
			}
		}
		me._image_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._compass.appendChild(me._image_1);
		me.divSkin.appendChild(me._compass);
		el=me._button_auto_rotate=document.createElement('div');
		el.ggId="button_auto_rotate";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.8,sy:0.8 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 80px;';
		hs+='height : 32px;';
		hs+='left : 200px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._button_auto_rotate.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._button_auto_rotate.ggUpdatePosition=function (useTransition) {
		}
		el=me._rectangle_1=document.createElement('div');
		el.ggId="Rectangle 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'background-clip : padding-box;';
		hs+='background-clip : padding-box;';
		hs+=cssPrefix + 'border-radius : 10px;';
		hs+='border-radius : 10px;';
		hs+='background : rgba(0,0,0,0.392157);';
		hs+='border : 1px solid rgba(0,0,0,0);';
		hs+='cursor : default;';
		hs+='height : 40px;';
		hs+='left : -241px;';
		hs+='position : absolute;';
		hs+='top : -4px;';
		hs+='visibility : inherit;';
		hs+='width : 376px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rectangle_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rectangle_1.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._rectangle_1);
		el=me._button_1_4=document.createElement('div');
		els=me._button_1_4__img=document.createElement('img');
		els.className='ggskin ggskin_button_1_4';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 1_4";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 35px;';
		hs+='left : -151px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 35px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_1_4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_1_4.onclick=function (e) {
			player.changeTiltLog(1,true);
		}
		me._button_1_4.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_1_4);
		el=me._button_1_3=document.createElement('div');
		els=me._button_1_3__img=document.createElement('img');
		els.className='ggskin ggskin_button_1_3';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 1_3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 35px;';
		hs+='left : -114px;';
		hs+='position : absolute;';
		hs+='top : -2px;';
		hs+='visibility : inherit;';
		hs+='width : 35px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_1_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_1_3.onclick=function (e) {
			player.changeTiltLog(-1,true);
		}
		me._button_1_3.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_1_3);
		el=me._button_1_2=document.createElement('div');
		els=me._button_1_2__img=document.createElement('img');
		els.className='ggskin ggskin_button_1_2';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 1_2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 35px;';
		hs+='left : -76px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 35px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_1_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_1_2.onclick=function (e) {
			player.changePanLog(1,true);
		}
		me._button_1_2.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_1_2);
		el=me._button_1=document.createElement('div');
		els=me._button_1__img=document.createElement('img');
		els.className='ggskin ggskin_button_1';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 35px;';
		hs+='left : -36px;';
		hs+='position : absolute;';
		hs+='top : -1px;';
		hs+='visibility : inherit;';
		hs+='width : 35px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_1.onclick=function (e) {
			player.changePanLog(-1,true);
		}
		me._button_1.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_1);
		el=me._button_2=document.createElement('div');
		els=me._button_2__img=document.createElement('img');
		els.className='ggskin ggskin_button_2';
		hs=basePath + 'images/button_2.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -226px;';
		hs+='position : absolute;';
		hs+='top : 2px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_2.onmouseout=function (e) {
			me.elementMouseDown['button_2']=false;
		}
		me._button_2.onmousedown=function (e) {
			me.elementMouseDown['button_2']=true;
		}
		me._button_2.onmouseup=function (e) {
			me.elementMouseDown['button_2']=false;
		}
		me._button_2.ontouchend=function (e) {
			me.elementMouseDown['button_2']=false;
		}
		me._button_2.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_2);
		el=me._button_3=document.createElement('div');
		els=me._button_3__img=document.createElement('img');
		els.className='ggskin ggskin_button_3';
		hs=basePath + 'images/button_3.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -189px;';
		hs+='position : absolute;';
		hs+='top : 2px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_3.onmouseout=function (e) {
			me.elementMouseDown['button_3']=false;
		}
		me._button_3.onmousedown=function (e) {
			me.elementMouseDown['button_3']=true;
		}
		me._button_3.onmouseup=function (e) {
			me.elementMouseDown['button_3']=false;
		}
		me._button_3.ontouchend=function (e) {
			me.elementMouseDown['button_3']=false;
		}
		me._button_3.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_3);
		el=me._button_4=document.createElement('div');
		els=me._button_4__img=document.createElement('img');
		els.className='ggskin ggskin_button_4';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 4";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 1px;';
		hs+='position : absolute;';
		hs+='top : 1px;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_4.onclick=function (e) {
			player.exitFullscreen();
			me._button_5.style[domTransition]='none';
			me._button_5.style.visibility=(Number(me._button_5.style.opacity)>0||!me._button_5.style.opacity)?'inherit':'hidden';
			me._button_5.ggVisible=true;
			me._button_4.style[domTransition]='none';
			me._button_4.style.visibility='hidden';
			me._button_4.ggVisible=false;
		}
		me._button_4.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_4);
		el=me._button_5=document.createElement('div');
		els=me._button_5__img=document.createElement('img');
		els.className='ggskin ggskin_button_5';
		hs=basePath + 'images/button_5.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 5";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 1px;';
		hs+='position : absolute;';
		hs+='top : 2px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_5.onclick=function (e) {
			player.enterFullscreen();
			me._button_4.style[domTransition]='none';
			me._button_4.style.visibility=(Number(me._button_4.style.opacity)>0||!me._button_4.style.opacity)?'inherit':'hidden';
			me._button_4.ggVisible=true;
			me._button_5.style[domTransition]='none';
			me._button_5.style.visibility='hidden';
			me._button_5.ggVisible=false;
		}
		me._button_5.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_5);
		el=me._button_6=document.createElement('div');
		els=me._button_6__img=document.createElement('img');
		els.className='ggskin ggskin_button_6';
		hs=basePath + 'images/button_6.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 6";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 40px;';
		hs+='position : absolute;';
		hs+='top : -2px;';
		hs+='visibility : hidden;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_6.onclick=function (e) {
			player.stopAutorotate();
			me._button_7.style[domTransition]='none';
			me._button_7.style.visibility=(Number(me._button_7.style.opacity)>0||!me._button_7.style.opacity)?'inherit':'hidden';
			me._button_7.ggVisible=true;
			me._button_6.style[domTransition]='none';
			me._button_6.style.visibility='hidden';
			me._button_6.ggVisible=false;
		}
		me._button_6.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_6);
		el=me._button_7=document.createElement('div');
		els=me._button_7__img=document.createElement('img');
		els.className='ggskin ggskin_button_7';
		hs=basePath + 'images/button_7.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 7";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 40px;';
		hs+='position : absolute;';
		hs+='top : -2px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_7.onclick=function (e) {
			player.startAutorotate("0.05");
			me._button_6.style[domTransition]='none';
			me._button_6.style.visibility=(Number(me._button_6.style.opacity)>0||!me._button_6.style.opacity)?'inherit':'hidden';
			me._button_6.ggVisible=true;
			me._button_7.style[domTransition]='none';
			me._button_7.style.visibility='hidden';
			me._button_7.ggVisible=false;
		}
		me._button_7.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_7);
		el=me._button_9=document.createElement('div');
		els=me._button_9__img=document.createElement('img');
		els.className='ggskin ggskin_button_9';
		hs='data:image/png;base64,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'+
			'QL3c0nEWALDVzR1nrev5CmAAYI0QAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAA'+
			'AwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEA'+
			'AAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAANaSn'+
			'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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 9";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 84px;';
		hs+='position : absolute;';
		hs+='top : -2px;';
		hs+='visibility : hidden;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_9.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_9.onclick=function (e) {
			me._button_7.style[domTransition]='none';
			me._button_7.style.visibility=(Number(me._button_7.style.opacity)>0||!me._button_7.style.opacity)?'inherit':'hidden';
			me._button_7.ggVisible=true;
			me._button_5.style[domTransition]='none';
			me._button_5.style.visibility=(Number(me._button_5.style.opacity)>0||!me._button_5.style.opacity)?'inherit':'hidden';
			me._button_5.ggVisible=true;
			me._button_3.style[domTransition]='none';
			me._button_3.style.visibility=(Number(me._button_3.style.opacity)>0||!me._button_3.style.opacity)?'inherit':'hidden';
			me._button_3.ggVisible=true;
			me._button_2.style[domTransition]='none';
			me._button_2.style.visibility=(Number(me._button_2.style.opacity)>0||!me._button_2.style.opacity)?'inherit':'hidden';
			me._button_2.ggVisible=true;
			me._button_1.style[domTransition]='none';
			me._button_1.style.visibility=(Number(me._button_1.style.opacity)>0||!me._button_1.style.opacity)?'inherit':'hidden';
			me._button_1.ggVisible=true;
			me._button_1_2.style[domTransition]='none';
			me._button_1_2.style.visibility=(Number(me._button_1_2.style.opacity)>0||!me._button_1_2.style.opacity)?'inherit':'hidden';
			me._button_1_2.ggVisible=true;
			me._button_1_3.style[domTransition]='none';
			me._button_1_3.style.visibility=(Number(me._button_1_3.style.opacity)>0||!me._button_1_3.style.opacity)?'inherit':'hidden';
			me._button_1_3.ggVisible=true;
			me._button_1_4.style[domTransition]='none';
			me._button_1_4.style.visibility=(Number(me._button_1_4.style.opacity)>0||!me._button_1_4.style.opacity)?'inherit':'hidden';
			me._button_1_4.ggVisible=true;
			me._button_9.style[domTransition]='none';
			me._button_9.style.visibility='hidden';
			me._button_9.ggVisible=false;
			me._button_8.style[domTransition]='none';
			me._button_8.style.visibility=(Number(me._button_8.style.opacity)>0||!me._button_8.style.opacity)?'inherit':'hidden';
			me._button_8.ggVisible=true;
			if (player.transitionsDisabled) {
				me._rectangle_1.style[domTransition]='none';
			} else {
				me._rectangle_1.style[domTransition]='all 100ms ease-out 0ms';
			}
			me._rectangle_1.ggParameter.sx=1;me._rectangle_1.ggParameter.sy=1;
			me._rectangle_1.style[domTransform]=parameterToTransform(me._rectangle_1.ggParameter);
			me._button_9.style[domTransition]='none';
			me._button_9.ggParameter.rx=-155;me._button_9.ggParameter.ry=0;
			me._button_9.style[domTransform]=parameterToTransform(me._button_9.ggParameter);
		}
		me._button_9.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_9);
		el=me._button_8=document.createElement('div');
		els=me._button_8__img=document.createElement('img');
		els.className='ggskin ggskin_button_8';
		hs='data:image/png;base64,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'+
			'QL3c0nEWALDVzR1nrev5CmAAYI0QAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAA'+
			'AwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEA'+
			'AAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAAMSAAAwIAEAAANaSn'+
			'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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : 84px;';
		hs+='position : absolute;';
		hs+='top : -2px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_8.onclick=function (e) {
			me._button_7.style[domTransition]='none';
			me._button_7.style.visibility='hidden';
			me._button_7.ggVisible=false;
			me._button_6.style[domTransition]='none';
			me._button_6.style.visibility='hidden';
			me._button_6.ggVisible=false;
			me._button_5.style[domTransition]='none';
			me._button_5.style.visibility='hidden';
			me._button_5.ggVisible=false;
			me._button_4.style[domTransition]='none';
			me._button_4.style.visibility='hidden';
			me._button_4.ggVisible=false;
			me._button_3.style[domTransition]='none';
			me._button_3.style.visibility='hidden';
			me._button_3.ggVisible=false;
			me._button_2.style[domTransition]='none';
			me._button_2.style.visibility='hidden';
			me._button_2.ggVisible=false;
			me._button_1.style[domTransition]='none';
			me._button_1.style.visibility='hidden';
			me._button_1.ggVisible=false;
			me._button_1_2.style[domTransition]='none';
			me._button_1_2.style.visibility='hidden';
			me._button_1_2.ggVisible=false;
			me._button_1_3.style[domTransition]='none';
			me._button_1_3.style.visibility='hidden';
			me._button_1_3.ggVisible=false;
			me._button_1_4.style[domTransition]='none';
			me._button_1_4.style.visibility='hidden';
			me._button_1_4.ggVisible=false;
			me._button_8.style[domTransition]='none';
			me._button_8.style.visibility='hidden';
			me._button_8.ggVisible=false;
			me._button_9.style[domTransition]='none';
			me._button_9.style.visibility=(Number(me._button_9.style.opacity)>0||!me._button_9.style.opacity)?'inherit':'hidden';
			me._button_9.ggVisible=true;
			if (player.transitionsDisabled) {
				me._rectangle_1.style[domTransition]='none';
			} else {
				me._rectangle_1.style[domTransition]='all 500ms ease-out 0ms';
			}
			me._rectangle_1.ggParameter.sx=0.3;me._rectangle_1.ggParameter.sy=1;
			me._rectangle_1.style[domTransform]=parameterToTransform(me._rectangle_1.ggParameter);
			me._button_9.style[domTransition]='none';
			me._button_9.ggParameter.rx=-155;me._button_9.ggParameter.ry=0;
			me._button_9.style[domTransform]=parameterToTransform(me._button_9.ggParameter);
		}
		me._button_8.ggUpdatePosition=function (useTransition) {
		}
		me._button_auto_rotate.appendChild(me._button_8);
		me.divSkin.appendChild(me._button_auto_rotate);
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_point01_positionchanged = function(){
		if(hotspotTemplates['Point01']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point01'].length; i++) {
				if (hotspotTemplates['Point01'][i]._image_2 && hotspotTemplates['Point01'][i]._image_2.logicBlock_visible) {
					hotspotTemplates['Point01'][i]._image_2.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point02_positionchanged = function(){
		if(hotspotTemplates['Point02']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point02'].length; i++) {
				if (hotspotTemplates['Point02'][i]._image_4 && hotspotTemplates['Point02'][i]._image_4.logicBlock_visible) {
					hotspotTemplates['Point02'][i]._image_4.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point03_positionchanged = function(){
		if(hotspotTemplates['Point03']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point03'].length; i++) {
				if (hotspotTemplates['Point03'][i]._image_5 && hotspotTemplates['Point03'][i]._image_5.logicBlock_visible) {
					hotspotTemplates['Point03'][i]._image_5.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point04_positionchanged = function(){
		if(hotspotTemplates['Point04']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point04'].length; i++) {
				if (hotspotTemplates['Point04'][i]._image_6 && hotspotTemplates['Point04'][i]._image_6.logicBlock_visible) {
					hotspotTemplates['Point04'][i]._image_6.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point06_positionchanged = function(){
		if(hotspotTemplates['Point06']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point06'].length; i++) {
				if (hotspotTemplates['Point06'][i]._image_8 && hotspotTemplates['Point06'][i]._image_8.logicBlock_visible) {
					hotspotTemplates['Point06'][i]._image_8.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point05_positionchanged = function(){
		if(hotspotTemplates['Point05']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point05'].length; i++) {
				if (hotspotTemplates['Point05'][i]._image_7 && hotspotTemplates['Point05'][i]._image_7.logicBlock_visible) {
					hotspotTemplates['Point05'][i]._image_7.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point07_positionchanged = function(){
		if(hotspotTemplates['Point07']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point07'].length; i++) {
				if (hotspotTemplates['Point07'][i]._image_9 && hotspotTemplates['Point07'][i]._image_9.logicBlock_visible) {
					hotspotTemplates['Point07'][i]._image_9.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point08_positionchanged = function(){
		if(hotspotTemplates['Point08']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point08'].length; i++) {
				if (hotspotTemplates['Point08'][i]._image_10 && hotspotTemplates['Point08'][i]._image_10.logicBlock_visible) {
					hotspotTemplates['Point08'][i]._image_10.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point09_positionchanged = function(){
		if(hotspotTemplates['Point09']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point09'].length; i++) {
				if (hotspotTemplates['Point09'][i]._image_11 && hotspotTemplates['Point09'][i]._image_11.logicBlock_visible) {
					hotspotTemplates['Point09'][i]._image_11.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point10_positionchanged = function(){
		if(hotspotTemplates['Point10']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point10'].length; i++) {
				if (hotspotTemplates['Point10'][i]._image_12 && hotspotTemplates['Point10'][i]._image_12.logicBlock_visible) {
					hotspotTemplates['Point10'][i]._image_12.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point11_positionchanged = function(){
		if(hotspotTemplates['Point11']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point11'].length; i++) {
				if (hotspotTemplates['Point11'][i]._image_13 && hotspotTemplates['Point11'][i]._image_13.logicBlock_visible) {
					hotspotTemplates['Point11'][i]._image_13.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point12_positionchanged = function(){
		if(hotspotTemplates['Point12']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point12'].length; i++) {
				if (hotspotTemplates['Point12'][i]._image_14 && hotspotTemplates['Point12'][i]._image_14.logicBlock_visible) {
					hotspotTemplates['Point12'][i]._image_14.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point14_positionchanged = function(){
		if(hotspotTemplates['Point14']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point14'].length; i++) {
				if (hotspotTemplates['Point14'][i]._image_16 && hotspotTemplates['Point14'][i]._image_16.logicBlock_visible) {
					hotspotTemplates['Point14'][i]._image_16.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point15_positionchanged = function(){
		if(hotspotTemplates['Point15']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point15'].length; i++) {
				if (hotspotTemplates['Point15'][i]._image_17 && hotspotTemplates['Point15'][i]._image_17.logicBlock_visible) {
					hotspotTemplates['Point15'][i]._image_17.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point16_positionchanged = function(){
		if(hotspotTemplates['Point16']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point16'].length; i++) {
				if (hotspotTemplates['Point16'][i]._image_18 && hotspotTemplates['Point16'][i]._image_18.logicBlock_visible) {
					hotspotTemplates['Point16'][i]._image_18.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point17_positionchanged = function(){
		if(hotspotTemplates['Point17']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point17'].length; i++) {
				if (hotspotTemplates['Point17'][i]._image_19 && hotspotTemplates['Point17'][i]._image_19.logicBlock_visible) {
					hotspotTemplates['Point17'][i]._image_19.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_point18_positionchanged = function(){
		if(hotspotTemplates['Point18']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point18'].length; i++) {
				if (hotspotTemplates['Point18'][i]._image_20 && hotspotTemplates['Point18'][i]._image_20.logicBlock_visible) {
					hotspotTemplates['Point18'][i]._image_20.logicBlock_visible();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		var hs='';
		if (me._compassring.ggParameter) {
			hs+=parameterToTransform(me._compassring.ggParameter) + ' ';
		}
		hs+='rotate(' + (-1.0*(-1 * player.getPanNorth() + 0)) + 'deg) ';
		me._compassring.style[domTransform]=hs;
		var hs='';
		if (me._compassbeam.ggParameter) {
			hs+=parameterToTransform(me._compassbeam.ggParameter) + ' ';
		}
		hs+='scale(' + (Math.tan(player.getFov()/2.0*Math.PI/180.0)*1 + 0) + ',1.0) ';
		hs+='scale(1.0,' + (Math.cos(1*player.getTilt()*Math.PI/180.0 + 0)) + ') ';
		me._compassbeam.style[domTransform]=hs;
		if (me.elementMouseDown['button_2']) {
			player.changeFovLog(-0.5,true);
		}
		if (me.elementMouseDown['button_3']) {
			player.changeFovLog(0.5,true);
		}
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_point01(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point01=document.createElement('div');
		el.ggId="Point01";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point01.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point01.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point01.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point01.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point01.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point01.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_2=document.createElement('div');
		els=me._image_2__img=document.createElement('img');
		els.className='ggskin ggskin_image_2';
		hs=basePath + 'images/image_2.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 97px;';
		hs+='left : -5px;';
		hs+='position : absolute;';
		hs+='top : -91px;';
		hs+='visibility : hidden;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_2.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -56)) && 
				((player.getPanN() > -108))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_2.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_2.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_2.style[domTransition]='';
				if (me._image_2.ggCurrentLogicStateVisible == 0) {
					me._image_2.style.visibility=(Number(me._image_2.style.opacity)>0||!me._image_2.style.opacity)?'inherit':'hidden';
					me._image_2.ggVisible=true;
				}
				else {
					me._image_2.style.visibility="hidden";
					me._image_2.ggVisible=false;
				}
			}
		}
		me._image_2.ggUpdatePosition=function (useTransition) {
		}
		me._point01.appendChild(me._image_2);
		el=me._svg_116=document.createElement('div');
		els=me._svg_116__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_116__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_116.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_116.ggUpdatePosition=function (useTransition) {
		}
		me._point01.appendChild(me._svg_116);
		me.__div = me._point01;
	};
	function SkinHotspotClass_point02(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point02=document.createElement('div');
		el.ggId="Point02";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point02.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point02.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point02.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point02.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point02.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point02.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_4=document.createElement('div');
		els=me._image_4__img=document.createElement('img');
		els.className='ggskin ggskin_image_4';
		hs=basePath + 'images/image_4.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 4";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 116px;';
		hs+='left : -141px;';
		hs+='position : absolute;';
		hs+='top : -108px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_4.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -141)) && 
				((player.getPanN() > -165))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_4.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_4.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_4.style[domTransition]='';
				if (me._image_4.ggCurrentLogicStateVisible == 0) {
					me._image_4.style.visibility=(Number(me._image_4.style.opacity)>0||!me._image_4.style.opacity)?'inherit':'hidden';
					me._image_4.ggVisible=true;
				}
				else {
					me._image_4.style.visibility="hidden";
					me._image_4.ggVisible=false;
				}
			}
		}
		me._image_4.ggUpdatePosition=function (useTransition) {
		}
		me._point02.appendChild(me._image_4);
		el=me._svg_115=document.createElement('div');
		els=me._svg_115__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_115__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_115.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_115.ggUpdatePosition=function (useTransition) {
		}
		me._point02.appendChild(me._svg_115);
		me.__div = me._point02;
	};
	function SkinHotspotClass_point03(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point03=document.createElement('div');
		el.ggId="Point03";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point03.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point03.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point03.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point03.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point03.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point03.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_5=document.createElement('div');
		els=me._image_5__img=document.createElement('img');
		els.className='ggskin ggskin_image_5';
		hs=basePath + 'images/image_5.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 5";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 160px;';
		hs+='left : -6px;';
		hs+='position : absolute;';
		hs+='top : -153px;';
		hs+='visibility : hidden;';
		hs+='width : 200px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_5.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -141)) && 
				((player.getPanN() > -165))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_5.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_5.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_5.style[domTransition]='';
				if (me._image_5.ggCurrentLogicStateVisible == 0) {
					me._image_5.style.visibility=(Number(me._image_5.style.opacity)>0||!me._image_5.style.opacity)?'inherit':'hidden';
					me._image_5.ggVisible=true;
				}
				else {
					me._image_5.style.visibility="hidden";
					me._image_5.ggVisible=false;
				}
			}
		}
		me._image_5.ggUpdatePosition=function (useTransition) {
		}
		me._point03.appendChild(me._image_5);
		el=me._svg_114=document.createElement('div');
		els=me._svg_114__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_114__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_114.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_114.ggUpdatePosition=function (useTransition) {
		}
		me._point03.appendChild(me._svg_114);
		me.__div = me._point03;
	};
	function SkinHotspotClass_point04(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point04=document.createElement('div');
		el.ggId="Point04";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point04.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point04.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point04.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point04.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point04.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point04.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_6=document.createElement('div');
		els=me._image_6__img=document.createElement('img');
		els.className='ggskin ggskin_image_6';
		hs=basePath + 'images/image_6.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 6";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 165px;';
		hs+='left : -139px;';
		hs+='position : absolute;';
		hs+='top : -158px;';
		hs+='visibility : hidden;';
		hs+='width : 145px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_6.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -141)) && 
				((player.getPanN() > -165))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_6.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_6.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_6.style[domTransition]='';
				if (me._image_6.ggCurrentLogicStateVisible == 0) {
					me._image_6.style.visibility=(Number(me._image_6.style.opacity)>0||!me._image_6.style.opacity)?'inherit':'hidden';
					me._image_6.ggVisible=true;
				}
				else {
					me._image_6.style.visibility="hidden";
					me._image_6.ggVisible=false;
				}
			}
		}
		me._image_6.ggUpdatePosition=function (useTransition) {
		}
		me._point04.appendChild(me._image_6);
		el=me._svg_113=document.createElement('div');
		els=me._svg_113__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_113__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_113.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_113.ggUpdatePosition=function (useTransition) {
		}
		me._point04.appendChild(me._svg_113);
		me.__div = me._point04;
	};
	function SkinHotspotClass_point06(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point06=document.createElement('div');
		el.ggId="Point06";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point06.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point06.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point06.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point06.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point06.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point06.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_8=document.createElement('div');
		els=me._image_8__img=document.createElement('img');
		els.className='ggskin ggskin_image_8';
		hs=basePath + 'images/image_8.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 8";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 215px;';
		hs+='left : -5px;';
		hs+='position : absolute;';
		hs+='top : -208px;';
		hs+='visibility : hidden;';
		hs+='width : 145px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_8.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -141)) && 
				((player.getPanN() > -165))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_8.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_8.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_8.style[domTransition]='';
				if (me._image_8.ggCurrentLogicStateVisible == 0) {
					me._image_8.style.visibility=(Number(me._image_8.style.opacity)>0||!me._image_8.style.opacity)?'inherit':'hidden';
					me._image_8.ggVisible=true;
				}
				else {
					me._image_8.style.visibility="hidden";
					me._image_8.ggVisible=false;
				}
			}
		}
		me._image_8.ggUpdatePosition=function (useTransition) {
		}
		me._point06.appendChild(me._image_8);
		el=me._svg_112=document.createElement('div');
		els=me._svg_112__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_112__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_112.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_112.ggUpdatePosition=function (useTransition) {
		}
		me._point06.appendChild(me._svg_112);
		me.__div = me._point06;
	};
	function SkinHotspotClass_point05(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point05=document.createElement('div');
		el.ggId="Point05";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point05.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point05.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point05.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point05.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point05.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point05.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_7=document.createElement('div');
		els=me._image_7__img=document.createElement('img');
		els.className='ggskin ggskin_image_7';
		hs='data:image/png;base64,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'+
			'gGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACSbk11AQedlFwAAUC9GyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQA'+
			'YAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIA'+
			'gGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABACQTyAAAkglkAADJBDIAgGQCGQBAMoEMACCZQAYAkEwgAwBIJpABAC'+
			'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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 7";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 95px;';
		hs+='left : -6px;';
		hs+='position : absolute;';
		hs+='top : -87px;';
		hs+='visibility : hidden;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_7.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -141)) && 
				((player.getPanN() > -165))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_7.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_7.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_7.style[domTransition]='';
				if (me._image_7.ggCurrentLogicStateVisible == 0) {
					me._image_7.style.visibility=(Number(me._image_7.style.opacity)>0||!me._image_7.style.opacity)?'inherit':'hidden';
					me._image_7.ggVisible=true;
				}
				else {
					me._image_7.style.visibility="hidden";
					me._image_7.ggVisible=false;
				}
			}
		}
		me._image_7.ggUpdatePosition=function (useTransition) {
		}
		me._point05.appendChild(me._image_7);
		el=me._svg_111=document.createElement('div');
		els=me._svg_111__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_111__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_111.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_111.ggUpdatePosition=function (useTransition) {
		}
		me._point05.appendChild(me._svg_111);
		me.__div = me._point05;
	};
	function SkinHotspotClass_point07(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point07=document.createElement('div');
		el.ggId="Point07";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point07.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point07.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point07.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point07.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point07.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point07.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_9=document.createElement('div');
		els=me._image_9__img=document.createElement('img');
		els.className='ggskin ggskin_image_9';
		hs=basePath + 'images/image_9.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 9";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 105px;';
		hs+='left : -5px;';
		hs+='position : absolute;';
		hs+='top : -98px;';
		hs+='visibility : hidden;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_9.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_9.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -56)) && 
				((player.getPanN() > -108))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_9.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_9.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_9.style[domTransition]='';
				if (me._image_9.ggCurrentLogicStateVisible == 0) {
					me._image_9.style.visibility=(Number(me._image_9.style.opacity)>0||!me._image_9.style.opacity)?'inherit':'hidden';
					me._image_9.ggVisible=true;
				}
				else {
					me._image_9.style.visibility="hidden";
					me._image_9.ggVisible=false;
				}
			}
		}
		me._image_9.ggUpdatePosition=function (useTransition) {
		}
		me._point07.appendChild(me._image_9);
		el=me._svg_110=document.createElement('div');
		els=me._svg_110__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_110__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_110.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_110.ggUpdatePosition=function (useTransition) {
		}
		me._point07.appendChild(me._svg_110);
		me.__div = me._point07;
	};
	function SkinHotspotClass_point08(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point08=document.createElement('div');
		el.ggId="Point08";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point08.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point08.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point08.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point08.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point08.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point08.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_10=document.createElement('div');
		els=me._image_10__img=document.createElement('img');
		els.className='ggskin ggskin_image_10';
		hs=basePath + 'images/image_10.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 10";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 66px;';
		hs+='left : -5px;';
		hs+='position : absolute;';
		hs+='top : -58px;';
		hs+='visibility : hidden;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_10.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -108)) && 
				((player.getPanN() > -140))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_10.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_10.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_10.style[domTransition]='';
				if (me._image_10.ggCurrentLogicStateVisible == 0) {
					me._image_10.style.visibility=(Number(me._image_10.style.opacity)>0||!me._image_10.style.opacity)?'inherit':'hidden';
					me._image_10.ggVisible=true;
				}
				else {
					me._image_10.style.visibility="hidden";
					me._image_10.ggVisible=false;
				}
			}
		}
		me._image_10.ggUpdatePosition=function (useTransition) {
		}
		me._point08.appendChild(me._image_10);
		el=me._svg_19=document.createElement('div');
		els=me._svg_19__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_19__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_19.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_19.ggUpdatePosition=function (useTransition) {
		}
		me._point08.appendChild(me._svg_19);
		me.__div = me._point08;
	};
	function SkinHotspotClass_point09(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point09=document.createElement('div');
		el.ggId="Point09";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point09.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point09.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point09.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point09.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point09.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point09.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_11=document.createElement('div');
		els=me._image_11__img=document.createElement('img');
		els.className='ggskin ggskin_image_11';
		hs=basePath + 'images/image_11.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 11";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 160px;';
		hs+='left : -134px;';
		hs+='position : absolute;';
		hs+='top : -154px;';
		hs+='visibility : hidden;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_11.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_11.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -141)) && 
				((player.getPanN() > -165))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_11.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_11.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_11.style[domTransition]='';
				if (me._image_11.ggCurrentLogicStateVisible == 0) {
					me._image_11.style.visibility=(Number(me._image_11.style.opacity)>0||!me._image_11.style.opacity)?'inherit':'hidden';
					me._image_11.ggVisible=true;
				}
				else {
					me._image_11.style.visibility="hidden";
					me._image_11.ggVisible=false;
				}
			}
		}
		me._image_11.ggUpdatePosition=function (useTransition) {
		}
		me._point09.appendChild(me._image_11);
		el=me._svg_18=document.createElement('div');
		els=me._svg_18__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_18__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_18.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_18.ggUpdatePosition=function (useTransition) {
		}
		me._point09.appendChild(me._svg_18);
		me.__div = me._point09;
	};
	function SkinHotspotClass_point10(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point10=document.createElement('div');
		el.ggId="Point10";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point10.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point10.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point10.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point10.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point10.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point10.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_12=document.createElement('div');
		els=me._image_12__img=document.createElement('img');
		els.className='ggskin ggskin_image_12';
		hs=basePath + 'images/image_12.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 12";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 149px;';
		hs+='left : -5px;';
		hs+='position : absolute;';
		hs+='top : -142px;';
		hs+='visibility : hidden;';
		hs+='width : 130px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_12.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_12.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < 65)) && 
				((player.getPanN() > 40))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_12.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_12.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_12.style[domTransition]='';
				if (me._image_12.ggCurrentLogicStateVisible == 0) {
					me._image_12.style.visibility=(Number(me._image_12.style.opacity)>0||!me._image_12.style.opacity)?'inherit':'hidden';
					me._image_12.ggVisible=true;
				}
				else {
					me._image_12.style.visibility="hidden";
					me._image_12.ggVisible=false;
				}
			}
		}
		me._image_12.ggUpdatePosition=function (useTransition) {
		}
		me._point10.appendChild(me._image_12);
		el=me._svg_17=document.createElement('div');
		els=me._svg_17__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_17__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_17.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_17.ggUpdatePosition=function (useTransition) {
		}
		me._point10.appendChild(me._svg_17);
		me.__div = me._point10;
	};
	function SkinHotspotClass_point11(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point11=document.createElement('div');
		el.ggId="Point11";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point11.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point11.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point11.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point11.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point11.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point11.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_13=document.createElement('div');
		els=me._image_13__img=document.createElement('img');
		els.className='ggskin ggskin_image_13';
		hs=basePath + 'images/image_13.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 13";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 144px;';
		hs+='left : -5px;';
		hs+='position : absolute;';
		hs+='top : -136px;';
		hs+='visibility : hidden;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_13.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_13.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < 115)) && 
				((player.getPanN() > 65))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_13.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_13.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_13.style[domTransition]='';
				if (me._image_13.ggCurrentLogicStateVisible == 0) {
					me._image_13.style.visibility=(Number(me._image_13.style.opacity)>0||!me._image_13.style.opacity)?'inherit':'hidden';
					me._image_13.ggVisible=true;
				}
				else {
					me._image_13.style.visibility="hidden";
					me._image_13.ggVisible=false;
				}
			}
		}
		me._image_13.ggUpdatePosition=function (useTransition) {
		}
		me._point11.appendChild(me._image_13);
		el=me._svg_16=document.createElement('div');
		els=me._svg_16__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_16__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_16.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_16.ggUpdatePosition=function (useTransition) {
		}
		me._point11.appendChild(me._svg_16);
		me.__div = me._point11;
	};
	function SkinHotspotClass_point12(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point12=document.createElement('div');
		el.ggId="Point12";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point12.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point12.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point12.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point12.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point12.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point12.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_14=document.createElement('div');
		els=me._image_14__img=document.createElement('img');
		els.className='ggskin ggskin_image_14';
		hs=basePath + 'images/image_14.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 14";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 160px;';
		hs+='left : -6px;';
		hs+='position : absolute;';
		hs+='top : -153px;';
		hs+='visibility : hidden;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_14.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_14.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < 35)) && 
				((player.getPanN() > -17))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_14.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_14.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_14.style[domTransition]='';
				if (me._image_14.ggCurrentLogicStateVisible == 0) {
					me._image_14.style.visibility=(Number(me._image_14.style.opacity)>0||!me._image_14.style.opacity)?'inherit':'hidden';
					me._image_14.ggVisible=true;
				}
				else {
					me._image_14.style.visibility="hidden";
					me._image_14.ggVisible=false;
				}
			}
		}
		me._image_14.ggUpdatePosition=function (useTransition) {
		}
		me._point12.appendChild(me._image_14);
		el=me._svg_15=document.createElement('div');
		els=me._svg_15__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_15__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_15.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_15.ggUpdatePosition=function (useTransition) {
		}
		me._point12.appendChild(me._svg_15);
		me.__div = me._point12;
	};
	function SkinHotspotClass_point13(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point13=document.createElement('div');
		el.ggId="Point13";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point13.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point13.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point13.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point13.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point13.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point13.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_15=document.createElement('div');
		els=me._image_15__img=document.createElement('img');
		els.className='ggskin ggskin_image_15';
		hs=basePath + 'images/image_15.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 15";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 160px;';
		hs+='left : -6px;';
		hs+='position : absolute;';
		hs+='top : -153px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_15.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_15.ggUpdatePosition=function (useTransition) {
		}
		me._point13.appendChild(me._image_15);
		el=me._svg_14=document.createElement('div');
		els=me._svg_14__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_14__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_14.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_14.ggUpdatePosition=function (useTransition) {
		}
		me._point13.appendChild(me._svg_14);
		me.__div = me._point13;
	};
	function SkinHotspotClass_point14(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point14=document.createElement('div');
		el.ggId="Point14";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point14.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point14.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point14.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point14.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point14.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point14.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_16=document.createElement('div');
		els=me._image_16__img=document.createElement('img');
		els.className='ggskin ggskin_image_16';
		hs=basePath + 'images/image_16.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 16";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 117px;';
		hs+='left : -162px;';
		hs+='position : absolute;';
		hs+='top : -109px;';
		hs+='visibility : hidden;';
		hs+='width : 170px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_16.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_16.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -141)) && 
				((player.getPanN() > -165))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_16.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_16.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_16.style[domTransition]='';
				if (me._image_16.ggCurrentLogicStateVisible == 0) {
					me._image_16.style.visibility=(Number(me._image_16.style.opacity)>0||!me._image_16.style.opacity)?'inherit':'hidden';
					me._image_16.ggVisible=true;
				}
				else {
					me._image_16.style.visibility="hidden";
					me._image_16.ggVisible=false;
				}
			}
		}
		me._image_16.ggUpdatePosition=function (useTransition) {
		}
		me._point14.appendChild(me._image_16);
		el=me._svg_13=document.createElement('div');
		els=me._svg_13__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_13__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_13.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_13.ggUpdatePosition=function (useTransition) {
		}
		me._point14.appendChild(me._svg_13);
		me.__div = me._point14;
	};
	function SkinHotspotClass_point15(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point15=document.createElement('div');
		el.ggId="Point15";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point15.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point15.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point15.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point15.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point15.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point15.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_17=document.createElement('div');
		els=me._image_17__img=document.createElement('img');
		els.className='ggskin ggskin_image_17';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbYAAAGfCAYAAAAzqveOAAAVKklEQVR4nO3dYYxd9X3n4e+s7LIwmFhENimmQOx4gqO1XQKlWSgbYcjarpKoL9ZgI15UshN26wq6RnXUNqAVsFnFCtYmtbc0Hb+LgmN3X6zSynZDnE0quylLSGxWGOzYwUmgiVFZDAxs196dfTEYgfH43pm5c8+d3zyPhMAz5577O7zgw//cc8/pGx4eDgCMw68k+bdJ1iT5F2/97H8meSzJo0n+TxND9e1q4l0BmNJWDA/PS/JXSX59lE1+lOSTu/v6XljR5QVU367Ekg1geuobz4tWDA9fkOTvkyxtsemPkvxmurxy+2fdfDMASvhsWkctGVnN3T3Js7yHsAEwVndO0rYdIWwAjNW1Y9j2o5M2xSiEDYCxumAM2/7KpE0xCmEDoBRhA6AUYQOgFG'+
			'EDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGEDoBRhA6AUYQOgFGGDSda/bFmu2bEjK4aH3/7rmh070r9sWdOjQUl9u5Lhpodg+rnhwIFcumTJqL9/Yc+ePL1iRRcnmhyzV6/O9YODmdHf/57fnR4aypPr1uWV7dvP+drFu3dn3vLlo+775YMH88TSpR2blWmpbzwvWjE8PNZujOt9xmtGN9+ssjnr1+e6LVvG'+
			'9drXjh3LL77znSTJ6ZMnc/y++zo5Gg2ZOTCQpV/+8jmjliQz+vtz/eBgvvvUUzl1+HCXp4O6hK0HzJo/P7Pmz3/7z4s2bMiJ/fvzs69/PS9t3drgZEzElRs35sK5c8+7zYz+/ly5cWOOrlvXpamgPp+x9ai5N96Y67ZsyUf37Wt6FMbpfYsWtbXdB265ZZIngelF2Hrc3BtvzE1Hj2bmwEDTozBGMy6+uKPbAe0Rtilg1vz5uWHXrqbHYIxOv/56R7cD2iNsU8Ss+fNzzY4dTY/BGJw8dKit7f7xBz+Y5ElgehG2KeTqVat892kK+emmTXnzxInzbnN6aCg/e/TRLk0E04OwTTHzN25segTadOrw4Ry4997zxu3A5z6Xob17uzgV1CdsXXRo8+bs7ut7z18/+P3fz/M7d7a1j8t+67dcSDKFvLJ9e/bffHOObNv2rp'+
			'+/sGdP/vbWW32dAyaBsPWAl7ZuzbO3357vr1mT00ND5912Rn9/5txxR5cmoxNOHT6co+vWvet/Zp5escJKDSaJsPWQV7Zvz5E///OW21141VVdmAZganLnkR5z/L77svDuu0e9DVOSXHTFFR15r9mrV+f9t92WmZdckqtXrTrnNif278/JQ4fy5vHjefGhhzryvt125jjf/xu/cc77Uz6/c2dOvfqqu39AEcLWg9785S/fdYutTlswOJgrPvWplrd7Ska+ID73xhuTJEsefDDP79yZnz366JhPo60Y4z1T5y1fnnlnvWasN0a+6pFHcvVdd7U8zjNRX7h2bV7YsyfP3nPPu+7d2Gr2Q5s3j3p/z1Y3e37zxIl897LLzrt/YGycipxGLr///tz2+utZuHZtW1E7l6tXrcrN3/52Fu/e3eHpOqd/2bLcdPRoFm3YMObj'+
			'nLd8eW597rlc9cgjkzQdMNmErQddOAn/B//Rffuy5MEHz3uKcyzmLV+ej//yl5m9enVH9tcpc9avz83f/vaEV7yLNmzo6XgDoxO2HjNn/fqW8Xnj5z9ve38zBwZy09Gjb59O7KQL587Nxx57LHPWr+/4vsfjqkceGfejg85l3vLlueHAgY7tD+gOYesh/cuW5SMPPNByuzePH297nzfs2jWpn9clyXVbtjQetznr12fRhg0d3+/5Ph8DepOLR3rAVY88khnve18Wrl3b1vYvfeMbbW330X37Jj1qZyz94hfzd4cONfLdrP5ly7L0i1/s+vsCvUnYumjRhg0TXlW8sGdPW09bXjA4OCmnH0czo78/v/4Xf5F9CxZ07T3P+PBDD3Xss0Ng6hO2KebYpk0tt5k5MJAPjuGijiPbtuX0yZPnvGR9weBgLrriisxbvrzlfm'+
			'bNn58Fg4Nd/T7YnPXrxxTwM9/LO3vGOevX55Jrr2171Qz0LmGbQp7fubOtU30LHn64rRXMkW3bWkbozO+fHRjINV/5SsvAfXD16vx006b3rCp39/W968+tvt/V7nfWPvjZz7bcJhn5vtgzDz446r0ZX9q6NS9l5HgX797dVsiB3uTikSni5YMH8+ztt7fcbubAQK747d8+7zZvnjiRv7311jGtrE4dPpynV6zIoc2bz7vdjP7+XH733W3vdyJmr17d1sUdrx07lv0339z2DYfbOU6gdwnbFHBi//48sXRpW9te3uJ2XEly4N57x32Rx/H77nvPnerPdsXv/M649j1W77/ttpbbvHniRJ5YubKtzyXfqZ3jBHqTsPWw00NDObR5c5666aa2X/P+j33svL8/sm1bXtm+fUJzHV237rzPGJs1f35XHq3zgVtuabnNkS1b'+
			'xhy1M1odJ9CbfMbWg04PDeUn27eP6yKMS1us7BauXduVCyTm3HHHpN80udUdWt48cWLCMzz/ta9NyvfjgMljxdaDnly3blxRmzkw0DOXvU/2o3X6ly1reaw//+Y3J/w+L7bxGCGgtwhbFx3avDkvHzzYcruBP/qjce1/9ic+Ma7XTYZOPVpn1P0vWtRym7HcoWU0pw4fzmvHjk14P0D3CFuX/eSrX225zaVLljR+i6qJuvBXf3VS9z/z0ktbbnNy376OvNep11/vyH6A7hC2Lntp69a8sGdPy+3auWfk2S7q0u2zesHM2bO79l5v/sM/dO29gIkTtga0c/eQC+fOHfMzwU698sp4R5py2jnWmeN85tzZJnv1CXSWsDVgaO/etlZtV99115j2e+rll8c70pTTzrFetHBhR95r5sUXd2Q/QHe43L8hz95zTy576qnzXt'+
			'l34dy5Y7r34huHDp3396eHhvJ4kf9ItzrWJLlk8eK8OMH3mTkw0LUnJACdYcXWkFOHD+cnbXxR+oOrV7f9ZeehvXtzemho1N/P6O/vuSdej1erY02Syz7+8Qm/T7duDwZ0jrA16KebNrW8s8WM/v4sePjhtvf5cosnPv/a7/5u2/vqda2OdTyfU55trKeDgeYJW4NOHT6c57/2tZbbXb1qVfqXLWtrnydbnKKbt3x5Lr///rb21etaHWuSLLz77rb/3Z3tmh07cmGHLkABukfYGnb8vvvauh/h/I0b29rfL77+9ZbbfORznxv39+TmrF+fm44ezYLBwXG9vpPaOdYzD0Ada9wWDA7m6lWrxjsa0CBh6wHPPPhgy23mLV/eVozaueJyRn9/rtuyZUxxmjkwkGt27Mh1W7Zk1vz5Wbh2bVYMDzcauHavLp01f36uf+yx'+
			'tmO+ePduDxyFKUzYesBLW7e2dautdh+q2c735JK8K06jnZ5cMDiYxbt359bnnjvnCqbpwLV7rBfOnZvrtmzJDQcOnHPWOevXZ8HgYFYMD3vIKExxLvfvET/56ldz6ZYt593mzK22Wj0wc2jv3hzZtq3tVceZ7Za0sXI83z4Wrl2b769ZM+HH4ozF0N69eX7nzrZPG166ZEkuXbLEigwKs2LrEZ2+1dbRdeu6fvPelw8e7GrUznj29tvdqBh4m7D1kE7fauuJlSu79qDMN0+cyA8bvNjiR5/5TMvvtQHTg7D1kDOn1Vq5+q672vrS9qnDh/PkmjWTvpp57dixPLlmzbifVN0JQ3v35sl16zoeNytBmHqErccc/fznW/7H+cK5c3Nlm5f/D+3dmydWrsyJ/fs7Md57vHzwYJ5YuTJDe/dOyv7H4pXt2/N3n/50x2L08s'+
			'GD2bdgQUf2BXSPsPWYybjV1qnDh/PUTTfl4AMPdHRFc2jz5jyxdGmjK7WzDe3dm30LFrT1eeX5HNm2LU8sXdqhqYBuErYeNBm32kqSFx96KI9ffHGObNs27s/eTg8N5ci2bdnd15fj9903rn10w9MrVuT7a9aMeaV6Yv/+fH/NmrZvPA30nr5dyXDTQ9CM/mXL8oE770yS817+fmTbtiTJPz7+eCNXPU7UzIGBXLlxY2Zecsk5vxZwYv/+nDx0KD/dtKmnVp/QBX3jedGK4eGxdmNc7zNewgYwfZUMm1ORAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACU'+
			'ImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUImwAlCJsAJQibACUMiNJX9NDAECnWLEBUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUI'+
			'qwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqw'+
			'AVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVCKsAFQirABUIqwAVBK3/DwcNMzADC1jDUcfZMyxSis2AAoRdgAKEXYAChF2AAoRdgAKEXYAChF2AAoRdgAKEXYAChF2AAoRdgAKEXYAChF2AAoRdgAKEXYAChF2AAoRdgAKEXYAChF2ABo1zVJ7hzH6+5M8uEOzzKqvuHh4W69FwBTy0VJPpnk00k+kWTuBPd3Ism3kvy3JH+d5I0J7u+chA2As12X5PeS3J7k4kl6j9eT7EjyX5L8oJM7FjYAzrglyf1v/b2bvpPkobf+PmHCBsCHknwlycqG59iV5J4kP57ITlw8AjB9XZDkPyQ5mOajlozMcDAjM10w3p1YsQFMTwuSbE9yfd'+
			'ODjOLJJHckOTbWF1qxAUw//ybJU+ndqCUjs/0wI7OOibABTC9/kpGrES9pepA2XJKRWf9kLC9yKhJgeuhLsjnJHzQ9yDj95yQbkrSMlhUbwPTwhUzdqCUjs3+hnQ2t2ADq+8Mkm5oeokP+MMmXzreBsAHUtirJNzJyKrKC4YxcLblztA2EDaCuD2XkdlVT4UKRsXg1I7f9OucXuX3GBlDTBZk6Vz+O1ZmrJc/5JW5hA6jp80mubXqISXRtRo7xPZyKBKhnICO3phr3bammiH9KsjjJkXf+0IoNoJ4/Tf2oJSPHuOXsH1qxAdTyr5J8t+khuuzjSb535g9WbAC13N/0AA1412dtVmwAddyQ5O+bHqIhv5nkicSKDaCS32t6gAa9fexWbAA1zEryiyQXNT1IQ95IclmS163YAGr4VKZv1JKRY/904lQkQBUrmx6gB6xM'+
			'nIoEqOKFJJc3PUTDXkwyT9gApr5FSZ5peogescipSICp78amB+ghNwkbwNS3uOkBeshiYQOY+j7U9AA95EPCBjD1Xdn0AD3k14QNYOqb3fQAPWS2sAFMfRWfkj1e73O5P8DU93/jhhtn/D//IgAoRdgApr7Xmh6gh7wmbABT36tND9BDTgobwNR3sukBesgrwgYw9R1veoAe8jNhA5j6ftz0AD3kx8IGMPU93fQAPeRpYQOY+vY3PUAP2e8L2gA1eNDoWw8atWIDqOE7TQ/QA/YmvqANUMWupgfoAbuSxKlIgBpmJflFkouaHqQhbyT5QNx5BKCM15L816aHaNBf5q1biwkbQB1bmh6gQVvP/IOwAdTxRJLHmx6iAY9n5NiTCBtANf+x6QEa8PA7/yBsALX89yTfanqILvpWku++8weuigSo58NJDiS5oOlBJtk/JV'+
			'mS5PA7f2jFBlDPc0m+1PQQXfClnBW1xIoNoKp/npF7SF7b9CCT5IdJbkzyv8/+hbAB1DWQ5H8kuaTpQTrs1STXJzlyrl86FQlQ1+Ekn0lSaQUznJFjOmfUEmEDqG5Hkj9ueogO+uOMHNOonIoEmB6+nOSepoeYoK8kubfVRlZsANPDHyT506aHmICvZOQYWhI2gOlhOCMrtgcytT5zG87IzPemzbmdigSYflYlGUzvXy35apJ1SXaO5UXCBjA9LUzyjfTu99yeSrI657n6cTRORQJMT0eS/Msk/ynJ6YZneafTSb6QkS9fjzlqiRUbAMlHMnLV5G0Nz/E3Sf59kmcmshMrNgCeSfKJjITtew28//feeu/lmWDUEis2AN7rhiT/LiMXmfRP0nu8nuQvk/xZ3vGQ0E4QNgBG05/kk0k+leRfJ5kzwf29lJHTjd9M8ldJ'+
			'hia4v3MSNgDa0Zfkmoys5hZn5AbLVyWZlWR2kovf2u71JP/rrb8fz8j9Kp/OyKrs2XThO3T/H2agnlXZn4kMAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 17";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 66px;';
		hs+='left : -63px;';
		hs+='position : absolute;';
		hs+='top : -60px;';
		hs+='visibility : hidden;';
		hs+='width : 70px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_17.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_17.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -108)) && 
				((player.getPanN() > -140))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_17.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_17.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_17.style[domTransition]='';
				if (me._image_17.ggCurrentLogicStateVisible == 0) {
					me._image_17.style.visibility=(Number(me._image_17.style.opacity)>0||!me._image_17.style.opacity)?'inherit':'hidden';
					me._image_17.ggVisible=true;
				}
				else {
					me._image_17.style.visibility="hidden";
					me._image_17.ggVisible=false;
				}
			}
		}
		me._image_17.ggUpdatePosition=function (useTransition) {
		}
		me._point15.appendChild(me._image_17);
		el=me._svg_12=document.createElement('div');
		els=me._svg_12__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_12__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_12.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_12.ggUpdatePosition=function (useTransition) {
		}
		me._point15.appendChild(me._svg_12);
		me.__div = me._point15;
	};
	function SkinHotspotClass_point16(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point16=document.createElement('div');
		el.ggId="Point16";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point16.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point16.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point16.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point16.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point16.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point16.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_18=document.createElement('div');
		els=me._image_18__img=document.createElement('img');
		els.className='ggskin ggskin_image_18';
		hs=basePath + 'images/image_18.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 18";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 139px;';
		hs+='left : -5px;';
		hs+='position : absolute;';
		hs+='top : -132px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_18.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_18.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -108)) && 
				((player.getPanN() > -140))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_18.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_18.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_18.style[domTransition]='';
				if (me._image_18.ggCurrentLogicStateVisible == 0) {
					me._image_18.style.visibility=(Number(me._image_18.style.opacity)>0||!me._image_18.style.opacity)?'inherit':'hidden';
					me._image_18.ggVisible=true;
				}
				else {
					me._image_18.style.visibility="hidden";
					me._image_18.ggVisible=false;
				}
			}
		}
		me._image_18.ggUpdatePosition=function (useTransition) {
		}
		me._point16.appendChild(me._image_18);
		el=me._svg_11=document.createElement('div');
		els=me._svg_11__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_11__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_11.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_11.ggUpdatePosition=function (useTransition) {
		}
		me._point16.appendChild(me._svg_11);
		me.__div = me._point16;
	};
	function SkinHotspotClass_point17(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point17=document.createElement('div');
		el.ggId="Point17";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point17.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point17.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point17.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point17.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point17.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point17.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_19=document.createElement('div');
		els=me._image_19__img=document.createElement('img');
		els.className='ggskin ggskin_image_19';
		hs=basePath + 'images/image_19.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 19";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 190px;';
		hs+='left : -5px;';
		hs+='position : absolute;';
		hs+='top : -183px;';
		hs+='visibility : hidden;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_19.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_19.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -108)) && 
				((player.getPanN() > -140))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_19.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_19.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_19.style[domTransition]='';
				if (me._image_19.ggCurrentLogicStateVisible == 0) {
					me._image_19.style.visibility=(Number(me._image_19.style.opacity)>0||!me._image_19.style.opacity)?'inherit':'hidden';
					me._image_19.ggVisible=true;
				}
				else {
					me._image_19.style.visibility="hidden";
					me._image_19.ggVisible=false;
				}
			}
		}
		me._image_19.ggUpdatePosition=function (useTransition) {
		}
		me._point17.appendChild(me._image_19);
		el=me._svg_10=document.createElement('div');
		els=me._svg_10__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_10__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_10.ggUpdatePosition=function (useTransition) {
		}
		me._point17.appendChild(me._svg_10);
		me.__div = me._point17;
	};
	function SkinHotspotClass_point18(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._point18=document.createElement('div');
		el.ggId="Point18";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 334px;';
		hs+='position : absolute;';
		hs+='top : 355px;';
		hs+='visibility : hidden;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._point18.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._point18.onclick=function (e) {
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._point18.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._point18.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._point18.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._point18.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_20=document.createElement('div');
		els=me._image_20__img=document.createElement('img');
		els.className='ggskin ggskin_image_20';
		hs=basePath + 'images/image_20.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 20";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 190px;';
		hs+='left : -113px;';
		hs+='position : absolute;';
		hs+='top : -183px;';
		hs+='visibility : hidden;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_20.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_20.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getPanN() < -108)) && 
				((player.getPanN() > -140))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._image_20.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._image_20.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._image_20.style[domTransition]='';
				if (me._image_20.ggCurrentLogicStateVisible == 0) {
					me._image_20.style.visibility=(Number(me._image_20.style.opacity)>0||!me._image_20.style.opacity)?'inherit':'hidden';
					me._image_20.ggVisible=true;
				}
				else {
					me._image_20.style.visibility="hidden";
					me._image_20.ggVisible=false;
				}
			}
		}
		me._image_20.ggUpdatePosition=function (useTransition) {
		}
		me._point18.appendChild(me._image_20);
		el=me._svg_1=document.createElement('div');
		els=me._svg_1__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IiB3aWR0aD0iMjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KIDxnPgogIDxjaXJjbGUgc3Ryb2tlPSIjZmZmZmZmIiBjeT0iNTAiIGZpbGw9Im5vbmUiIHI9IjAiIGN4PSI1MCIgc3Ryb2tlLXdpZHRoPSI5Ij4KICAgPGFuaW1hdGUgdmFsdWVzPS'+
			'IwOzQwIiBjYWxjTW9kZT0ic3BsaW5lIiBhdHRyaWJ1dGVOYW1lPSJyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgZHVyPSIxcyIgYmVnaW49IjBzIiBrZXlUaW1lcz0iMDsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICA8YW5pbWF0ZSB2YWx1ZXM9IjE7MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIga2V5U3BsaW5lcz0iMC4yIDAgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSIwcyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHN0cm9rZT0iI2ZmZmZmZiIgY3k9IjUwIiBmaWxsPSJu'+
			'b25lIiByPSIwIiBjeD0iNTAiIHN0cm9rZS13aWR0aD0iOSI+CiAgIDxhbmltYXRlIHZhbHVlcz0iMDs0MCIgY2FsY01vZGU9InNwbGluZSIgYXR0cmlidXRlTmFtZT0iciIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGR1cj0iMXMiIGJlZ2luPSItMC41cyIga2V5VGltZXM9IjA7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgPGFuaW1hdGUgdmFsdWVzPSIxOzAiIGNhbGNNb2RlPSJzcGxpbmUiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNXMiIGtleVRpbWVzPSIwOzEiIHJlcGVhdENvdW50PSJpbmRlZm'+
			'luaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGcvPgogPC9nPgogPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pbyAtLT4KPC9zdmc+Cg==';
		me._svg_1__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Svg 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -20px;';
		hs+='position : absolute;';
		hs+='top : -19px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._svg_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._svg_1.ggUpdatePosition=function (useTransition) {
		}
		me._point18.appendChild(me._svg_1);
		me.__div = me._point18;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='Point01') {
			hotspot.skinid = 'Point01';
			hsinst = new SkinHotspotClass_point01(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point01_positionchanged();;
		} else
		if (hotspot.skinid=='Point02') {
			hotspot.skinid = 'Point02';
			hsinst = new SkinHotspotClass_point02(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point02_positionchanged();;
		} else
		if (hotspot.skinid=='Point03') {
			hotspot.skinid = 'Point03';
			hsinst = new SkinHotspotClass_point03(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point03_positionchanged();;
		} else
		if (hotspot.skinid=='Point04') {
			hotspot.skinid = 'Point04';
			hsinst = new SkinHotspotClass_point04(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point04_positionchanged();;
		} else
		if (hotspot.skinid=='Point06') {
			hotspot.skinid = 'Point06';
			hsinst = new SkinHotspotClass_point06(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point06_positionchanged();;
		} else
		if (hotspot.skinid=='Point05') {
			hotspot.skinid = 'Point05';
			hsinst = new SkinHotspotClass_point05(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point05_positionchanged();;
		} else
		if (hotspot.skinid=='Point07') {
			hotspot.skinid = 'Point07';
			hsinst = new SkinHotspotClass_point07(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point07_positionchanged();;
		} else
		if (hotspot.skinid=='Point08') {
			hotspot.skinid = 'Point08';
			hsinst = new SkinHotspotClass_point08(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point08_positionchanged();;
		} else
		if (hotspot.skinid=='Point09') {
			hotspot.skinid = 'Point09';
			hsinst = new SkinHotspotClass_point09(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point09_positionchanged();;
		} else
		if (hotspot.skinid=='Point10') {
			hotspot.skinid = 'Point10';
			hsinst = new SkinHotspotClass_point10(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point10_positionchanged();;
		} else
		if (hotspot.skinid=='Point11') {
			hotspot.skinid = 'Point11';
			hsinst = new SkinHotspotClass_point11(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point11_positionchanged();;
		} else
		if (hotspot.skinid=='Point12') {
			hotspot.skinid = 'Point12';
			hsinst = new SkinHotspotClass_point12(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point12_positionchanged();;
		} else
		if (hotspot.skinid=='Point13') {
			hotspot.skinid = 'Point13';
			hsinst = new SkinHotspotClass_point13(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='Point14') {
			hotspot.skinid = 'Point14';
			hsinst = new SkinHotspotClass_point14(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point14_positionchanged();;
		} else
		if (hotspot.skinid=='Point15') {
			hotspot.skinid = 'Point15';
			hsinst = new SkinHotspotClass_point15(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point15_positionchanged();;
		} else
		if (hotspot.skinid=='Point16') {
			hotspot.skinid = 'Point16';
			hsinst = new SkinHotspotClass_point16(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point16_positionchanged();;
		} else
		if (hotspot.skinid=='Point17') {
			hotspot.skinid = 'Point17';
			hsinst = new SkinHotspotClass_point17(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point17_positionchanged();;
		} else
		{
			hotspot.skinid = 'Point18';
			hsinst = new SkinHotspotClass_point18(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_point18_positionchanged();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['Point01']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point01'].length; i++) {
				hotspotTemplates['Point01'][i] = null;
			}
		}
		if(hotspotTemplates['Point02']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point02'].length; i++) {
				hotspotTemplates['Point02'][i] = null;
			}
		}
		if(hotspotTemplates['Point03']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point03'].length; i++) {
				hotspotTemplates['Point03'][i] = null;
			}
		}
		if(hotspotTemplates['Point04']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point04'].length; i++) {
				hotspotTemplates['Point04'][i] = null;
			}
		}
		if(hotspotTemplates['Point06']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point06'].length; i++) {
				hotspotTemplates['Point06'][i] = null;
			}
		}
		if(hotspotTemplates['Point05']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point05'].length; i++) {
				hotspotTemplates['Point05'][i] = null;
			}
		}
		if(hotspotTemplates['Point07']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point07'].length; i++) {
				hotspotTemplates['Point07'][i] = null;
			}
		}
		if(hotspotTemplates['Point08']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point08'].length; i++) {
				hotspotTemplates['Point08'][i] = null;
			}
		}
		if(hotspotTemplates['Point09']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point09'].length; i++) {
				hotspotTemplates['Point09'][i] = null;
			}
		}
		if(hotspotTemplates['Point10']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point10'].length; i++) {
				hotspotTemplates['Point10'][i] = null;
			}
		}
		if(hotspotTemplates['Point11']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point11'].length; i++) {
				hotspotTemplates['Point11'][i] = null;
			}
		}
		if(hotspotTemplates['Point12']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point12'].length; i++) {
				hotspotTemplates['Point12'][i] = null;
			}
		}
		if(hotspotTemplates['Point13']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point13'].length; i++) {
				hotspotTemplates['Point13'][i] = null;
			}
		}
		if(hotspotTemplates['Point14']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point14'].length; i++) {
				hotspotTemplates['Point14'][i] = null;
			}
		}
		if(hotspotTemplates['Point15']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point15'].length; i++) {
				hotspotTemplates['Point15'][i] = null;
			}
		}
		if(hotspotTemplates['Point16']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point16'].length; i++) {
				hotspotTemplates['Point16'][i] = null;
			}
		}
		if(hotspotTemplates['Point17']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point17'].length; i++) {
				hotspotTemplates['Point17'][i] = null;
			}
		}
		if(hotspotTemplates['Point18']) {
			var i;
			for(i = 0; i < hotspotTemplates['Point18'].length; i++) {
				hotspotTemplates['Point18'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._compasspointer1.logicBlock_visible();
	me._beamdot.logicBlock_visible();
	me._image_1.logicBlock_visible();
	player.addListener('changenode', function(args) { me._compasspointer1.logicBlock_visible();me._beamdot.logicBlock_visible();me._image_1.logicBlock_visible(); });
	player.addListener('varchanged_var_compass', function(args) { me._compasspointer1.logicBlock_visible();me._beamdot.logicBlock_visible();me._image_1.logicBlock_visible(); });
	player.addListener('positionchanged', function(args) { me.callChildLogicBlocksHotspot_point01_positionchanged();me.callChildLogicBlocksHotspot_point02_positionchanged();me.callChildLogicBlocksHotspot_point03_positionchanged();me.callChildLogicBlocksHotspot_point04_positionchanged();me.callChildLogicBlocksHotspot_point06_positionchanged();me.callChildLogicBlocksHotspot_point05_positionchanged();me.callChildLogicBlocksHotspot_point07_positionchanged();me.callChildLogicBlocksHotspot_point08_positionchanged();me.callChildLogicBlocksHotspot_point09_positionchanged();me.callChildLogicBlocksHotspot_point10_positionchanged();me.callChildLogicBlocksHotspot_point11_positionchanged();me.callChildLogicBlocksHotspot_point12_positionchanged();me.callChildLogicBlocksHotspot_point14_positionchanged();me.callChildLogicBlocksHotspot_point15_positionchanged();me.callChildLogicBlocksHotspot_point16_positionchanged();me.callChildLogicBlocksHotspot_point17_positionchanged();me.callChildLogicBlocksHotspot_point18_positionchanged(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};