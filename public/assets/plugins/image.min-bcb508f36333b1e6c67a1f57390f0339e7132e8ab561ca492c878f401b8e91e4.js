/*!
 * froala_editor v2.2.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2016 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";a.extend(a.FE.POPUP_TEMPLATES,{"image.insert":"[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]","image.edit":"[_BUTTONS_]","image.alt":"[_BUTTONS_][_ALT_LAYER_]","image.size":"[_BUTTONS_][_SIZE_LAYER_]"}),a.extend(a.FE.DEFAULTS,{imageInsertButtons:["imageBack","|","imageUpload","imageByURL"],imageEditButtons:["imageReplace","imageAlign","imageRemove","|","imageLink","linkOpen","linkEdit","linkRemove","-","imageDisplay","imageStyle","imageAlt","imageSize"],imageAltButtons:["imageBack","|"],imageSizeButtons:["imageBack","|"],imageUploadURL:"http://i.froala.com/upload",imageUploadParam:"file",imageUploadParams:{},imageUploadToS3:!1,imageUploadMethod:"POST",imageMaxSize:10485760,imageAllowedTypes:["jpeg","jpg","png","gif","svg+xml"],imageResize:!0,imageResizeWithPercent:!1,imageDefaultWidth:300,imageDefaultAlign:"center",imageDefaultDisplay:"block",imageSplitHTML:!1,imageStyles:{"fr-rounded":"Rounded","fr-bordered":"Bordered"},imageMove:!0,imageMultipleStyles:!0,imageTextNear:!0,imagePaste:!0}),a.FE.PLUGINS.image=function(b){function c(){var a=b.popups.get("image.insert"),c=a.find(".fr-image-by-url-layer input");c.val(""),na&&c.val(na.attr("src")),c.trigger("change")}function d(){var a=b.$tb.find('.fr-command[data-cmd="insertImage"]'),c=b.popups.get("image.insert");if(c||(c=I()),r(),!c.hasClass("fr-active"))if(b.popups.refresh("image.insert"),b.popups.setContainer("image.insert",b.$tb),a.is(":visible")){var d=a.offset().left+a.outerWidth()/2,e=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("image.insert",d,e,a.outerHeight())}else b.position.forSelection(c),b.popups.show("image.insert")}function e(){var c=b.popups.get("image.edit");c||(c=p()),b.popups.setContainer("image.edit",a(b.opts.scrollableContainer)),b.popups.refresh("image.edit");var d=na.offset().left+na.outerWidth()/2,e=na.offset().top+na.outerHeight();b.popups.show("image.edit",d,e,na.outerHeight())}function f(){r()}function g(a){if(!a.hasClass("fr-dii")&&!a.hasClass("fr-dib")){var c=a.css("float");a.css("float","none"),"block"==a.css("display")?(a.css("float",c),0===parseInt(a.css("margin-left"),10)&&(a.attr("style")||"").indexOf("margin-right: auto")>=0?a.addClass("fr-fil"):0===parseInt(a.css("margin-right"),10)&&(a.attr("style")||"").indexOf("margin-left: auto")>=0&&a.addClass("fr-fir"),a.addClass("fr-dib")):(a.css("float",c),"left"==a.css("float")?a.addClass("fr-fil"):"right"==a.css("float")&&a.addClass("fr-fir"),a.addClass("fr-dii")),a.css("margin",""),a.css("float",""),a.css("display",""),a.css("z-index",""),a.css("position",""),a.css("overflow",""),a.css("vertical-align","")}a.attr("width")&&(a.css("width",a.width()),a.removeAttr("width")),b.opts.imageTextNear||a.removeClass("fr-dii").addClass("fr-dib")}function h(){for(var c="IMG"==b.$el.get(0).tagName?[b.$el.get(0)]:b.$el.get(0).querySelectorAll("img"),d=0;d<c.length;d++)g(a(c[d])),b.opts.iframe&&a(c[d]).on("load",b.size.syncIframe)}function i(){var c,d=Array.prototype.slice.call(b.$el.get(0).querySelectorAll("img")),e=[];for(c=0;c<d.length;c++)e.push(d[c].getAttribute("src")),a(d[c]).toggleClass("fr-draggable",b.opts.imageMove);if(Aa)for(c=0;c<Aa.length;c++)e.indexOf(Aa[c].getAttribute("src"))<0&&b.events.trigger("image.removed",[a(Aa[c])]);Aa=d}function j(){oa||U(),(b.$wp||a(b.opts.scrollableContainer)).append(oa),oa.data("instance",b);var c=b.$wp?b.$wp.scrollTop()-(b.$wp.offset().top+1):-1,d=b.$wp?b.$wp.scrollLeft()-(b.$wp.offset().left+1):-1;b.$wp&&(d-=b.helpers.getPX(b.$wp.css("border-left-width"))),oa.css("top",b.opts.iframe?na.offset().top-1:na.offset().top+c).css("left",b.opts.iframe?na.offset().left-1:na.offset().left+d).css("width",na.outerWidth()).css("height",na.outerHeight()).addClass("fr-active")}function k(a){return'<div class="fr-handler fr-h'+a+'"></div>'}function l(c){return b.core.sameInstance(oa)?(c.preventDefault(),c.stopPropagation(),b.$el.find("img.fr-error").left?!1:(b.undo.canDo()||b.undo.saveStep(),pa=a(this),pa.data("start-x",c.pageX||c.originalEvent.touches[0].pageX),pa.data("start-width",na.width()),qa.show(),b.popups.hideAll(),void ba())):!0}function m(c){if(!b.core.sameInstance(oa))return!0;if(pa&&na){if(c.preventDefault(),b.$el.find("img.fr-error").left)return!1;var d=c.pageX||(c.originalEvent.touches?c.originalEvent.touches[0].pageX:null);if(!d)return!1;var e=pa.data("start-x"),f=d-e,g=pa.data("start-width");if((pa.hasClass("fr-hnw")||pa.hasClass("fr-hsw"))&&(f=0-f),b.opts.imageResizeWithPercent){var h=na.parentsUntil(b.$el,b.html.blockTagsQuery()).get(0);na.css("width",((g+f)/a(h).outerWidth()*100).toFixed(2)+"%")}else na.css("width",g+f);na.css("height","").removeAttr("height"),j(),b.events.trigger("image.resize",[la()])}}function n(a){if(!b.core.sameInstance(oa))return!0;if(pa&&na){if(a&&a.stopPropagation(),b.$el.find("img.fr-error").left)return!1;pa=null,qa.hide(),j(),e(),b.undo.saveStep(),b.events.trigger("image.resizeEnd",[la()])}}function o(a,c){b.edit.on(),na&&na.addClass("fr-error"),t(b.language.translate("Something went wrong. Please try again.")),b.events.trigger("image.error",[{code:a,message:za[a]},c])}function p(a){if(a)return b.$wp&&b.events.$on(b.$wp,"scroll",function(){na&&b.popups.isVisible("image.edit")&&e()}),!0;var c="";b.opts.imageEditButtons.length>1&&(c+='<div class="fr-buttons">',c+=b.button.buildList(b.opts.imageEditButtons),c+="</div>");var d={buttons:c},f=b.popups.create("image.edit",d);return f}function q(){var a=b.popups.get("image.insert");a&&(a.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),a.find(".fr-image-progress-bar-layer").addClass("fr-active"),a.find(".fr-buttons").hide(),s("Uploading",0))}function r(a){var c=b.popups.get("image.insert");c&&(c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),c.find(".fr-image-progress-bar-layer").removeClass("fr-active"),c.find(".fr-buttons").show(),(a||b.$el.find("img.fr-error").length)&&(b.events.focus(),b.$el.find("img.fr-error").remove(),b.undo.saveStep(),b.undo.run(),b.undo.dropRedo()))}function s(a,c){var d=b.popups.get("image.insert");if(d){var e=d.find(".fr-image-progress-bar-layer");e.find("h3").text(a+(c?" "+c+"%":"")),e.removeClass("fr-error"),c?(e.find("div").removeClass("fr-indeterminate"),e.find("div > span").css("width",c+"%")):e.find("div").addClass("fr-indeterminate")}}function t(a){var c=b.popups.get("image.insert"),d=c.find(".fr-image-progress-bar-layer");d.addClass("fr-error"),d.find("h3").text(a)}function u(){var a=b.popups.get("image.insert"),c=a.find(".fr-image-by-url-layer input");c.val().length>0&&(q(),s("Loading image"),w(b.helpers.sanitizeURL(c.val()),!0,[],na),c.val(""),c.blur())}function v(){var c=a(this);b.popups.hide("image.insert"),c.removeClass("fr-uploading"),c.next().is("br")&&c.next().remove(),c.trigger("click").trigger("touchend"),b.events.trigger("image.loaded",[c])}function w(a,c,d,e,f){b.edit.off(),s("Loading image");var g=new Image;g.onload=function(){var c,g;if(e){var h=e.data("fr-old-src");b.$wp?(c=e.clone().removeData("fr-old-src"),h&&e.attr("src",h),e.removeClass("fr-uploading"),e.replaceWith(c),c.off("load")):c=e;for(var i=c.get(0).attributes,j=0;j<i.length;j++){var k=i[j];0===k.nodeName.indexOf("data-")&&c.removeAttr(k.nodeName)}if("undefined"!=typeof d)for(g in d)"link"!=g&&c.attr("data-"+g,d[g]);c.on("load",v),c.attr("src",a),b.edit.on(),b.undo.saveStep(),b.events.trigger(h?"image.replaced":"image.inserted",[c,f])}else c=C(a,d,v),b.undo.saveStep(),b.events.trigger("image.inserted",[c,f])},g.onerror=function(){o(sa)},g.src=a}function x(c){try{if(b.events.trigger("image.uploaded",[c],!0)===!1)return b.edit.on(),!1;var d=a.parseJSON(c);return d.link?d:(o(ta,c),!1)}catch(e){return o(va,c),!1}}function y(c){try{var d=a(c).find("Location").text(),e=a(c).find("Key").text();return b.events.trigger("image.uploadedToS3",[d,e,c],!0)===!1?(b.edit.on(),!1):d}catch(f){return o(va,c),!1}}function z(a){s("Loading image");var c=this.status,d=this.response,e=this.responseXML,f=this.responseText;try{if(b.opts.imageUploadToS3)if(201==c){var g=y(e);g&&w(g,!1,[],a,d||e)}else o(va,d||e);else if(c>=200&&300>c){var h=x(f);h&&w(h.link,!1,h,a,d||f)}else o(ua,d||f)}catch(i){o(va,d||f)}}function A(){o(va,this.response||this.responseText||this.responseXML)}function B(a){if(a.lengthComputable){var b=a.loaded/a.total*100|0;s("Uploading",b)}}function C(c,d,e){var f,g="";if(d&&"undefined"!=typeof d)for(f in d)"link"!=f&&(g+=" data-"+f+'="'+d[f]+'"');var h=b.opts.imageDefaultWidth||"auto";h&&"auto"!=h&&(""+h).indexOf("px")<0&&(""+h).indexOf("%")<0&&(h+="px");var i=a('<img class="fr-di'+b.opts.imageDefaultDisplay[0]+("center"!=b.opts.imageDefaultAlign?" fr-fi"+b.opts.imageDefaultAlign[0]:"")+'" src="'+c+'"'+g+(h?' style="width: '+h+';"':"")+">");i.on("load",e),b.edit.on(),b.events.focus(!0),b.selection.restore(),b.undo.saveStep(),b.opts.imageSplitHTML?b.markers.split():b.markers.insert();var j=b.$el.find(".fr-marker");return j.replaceWith(i),b.html.wrap(),b.selection.clear(),i}function D(c,d,f){function g(){var f=a(this);f.off("load"),f.addClass("fr-uploading"),f.next().is("br")&&f.next().remove(),b.placeholder.refresh(),f.is(na)||f.trigger("click").trigger("touchend"),j(),e(),ia(),q(),ia(),b.edit.off(),c.onload=function(){z.call(c,f)},c.onerror=A,c.upload.onprogress=B,c.send(d)}var h,i=new FileReader;i.addEventListener("load",function(){for(var a=atob(i.result.split(",")[1]),c=[],d=0;d<a.length;d++)c.push(a.charCodeAt(d));var e=window.URL.createObjectURL(new Blob([new Uint8Array(c)],{type:"image/jpeg"}));na?(na.on("load",g),b.edit.on(),b.undo.saveStep(),na.data("fr-old-src",na.attr("src")),na.attr("src",e)):h=C(e,null,g)},!1),i.readAsDataURL(f)}function E(a){if(b.events.trigger("image.beforeUpload",[a])===!1)return!1;if("undefined"!=typeof a&&a.length>0){var c=a[0];if(c.size>b.opts.imageMaxSize)return o(wa),!1;if(b.opts.imageAllowedTypes.indexOf(c.type.replace(/image\//g,""))<0)return o(xa),!1;var d;if(b.drag_support.formdata&&(d=b.drag_support.formdata?new FormData:null),d){var e;if(b.opts.imageUploadToS3!==!1){d.append("key",b.opts.imageUploadToS3.keyStart+(new Date).getTime()+"-"+(c.name||"untitled")),d.append("success_action_status","201"),d.append("X-Requested-With","xhr"),d.append("Content-Type",c.type);for(e in b.opts.imageUploadToS3.params)d.append(e,b.opts.imageUploadToS3.params[e])}for(e in b.opts.imageUploadParams)d.append(e,b.opts.imageUploadParams[e]);d.append(b.opts.imageUploadParam,c);var f=b.opts.imageUploadURL;b.opts.imageUploadToS3&&(f="https://"+b.opts.imageUploadToS3.region+".amazonaws.com/"+b.opts.imageUploadToS3.bucket);var g=b.core.getXHR(f,b.opts.imageUploadMethod);D(g,d,c)}}}function F(c){b.events.$on(c,"dragover dragenter",".fr-image-upload-layer",function(){return a(this).addClass("fr-drop"),!1}),b.events.$on(c,"dragleave dragend",".fr-image-upload-layer",function(){return a(this).removeClass("fr-drop"),!1}),b.events.$on(c,"drop",".fr-image-upload-layer",function(d){d.preventDefault(),d.stopPropagation(),a(this).removeClass("fr-drop");var e=d.originalEvent.dataTransfer;if(e&&e.files){var f=c.data("instance")||b;f.image.upload(e.files)}}),b.events.$on(c,"change",'.fr-image-upload-layer input[type="file"]',function(){if(this.files){var d=c.data("instance")||b;d.image.upload(this.files)}a(this).val("")})}function G(c){var d=c.originalEvent.dataTransfer;if(d&&d.files&&d.files.length){var e=d.files[0];if(e&&e.type&&b.opts.imageAllowedTypes.indexOf(e.type.replace(/image\//g,""))>=0){b.markers.remove(),b.markers.insertAtPoint(c.originalEvent),b.$el.find(".fr-marker").replaceWith(a.FE.MARKERS),b.popups.hideAll();var f=b.popups.get("image.insert");return f||(f=I()),b.popups.setContainer("image.insert",a(b.opts.scrollableContainer)),b.popups.show("image.insert",c.originalEvent.pageX,c.originalEvent.pageY),q(),b.popups.show("image.insert",c.originalEvent.pageX,c.originalEvent.pageY),E(d.files),c.preventDefault(),c.stopPropagation(),!1}}}function H(){b.events.$on(b.$el,b._mousedown,"IMG"==b.$el.get(0).tagName?null:"img",function(a){b.selection.clear(),ra=!0,b.browser.msie&&(b.events.disableBlur(),b.$el.attr("contenteditable",!1)),b.draggable||a.preventDefault(),a.stopPropagation()}),b.events.$on(b.$el,b._mouseup,"IMG"==b.$el.get(0).tagName?null:"img",function(a){ra&&(ra=!1,a.stopPropagation(),b.browser.msie&&(b.$el.attr("contenteditable",!0),b.events.enableBlur()))}),b.events.on("drop",G),b.events.on("mousedown window.mousedown",aa),b.events.on("window.touchmove",ba),b.events.on("mouseup window.mouseup",_),b.events.on("commands.mousedown",function(a){a.parents(".fr-toolbar").length>0&&_()}),b.events.on("blur image.hideResizer commands.undo commands.redo element.dropped",function(){ra=!1,_(!0)})}function I(a){if(a)return b.popups.onRefresh("image.insert",c),b.popups.onHide("image.insert",f),!0;var d,e="";b.opts.imageInsertButtons.length>1&&(e='<div class="fr-buttons">'+b.button.buildList(b.opts.imageInsertButtons)+"</div>");var g=b.opts.imageInsertButtons.indexOf("imageUpload"),h=b.opts.imageInsertButtons.indexOf("imageByURL"),i="";g>=0&&(d=" fr-active",h>=0&&g>h&&(d=""),i='<div class="fr-image-upload-layer'+d+' fr-layer" id="fr-image-upload-layer-'+b.id+'"><strong>'+b.language.translate("Drop image")+"</strong><br>("+b.language.translate("or click")+')<div class="fr-form"><input type="file" accept="image/*" tabIndex="-1"></div></div>');var j="";h>=0&&(d=" fr-active",g>=0&&h>g&&(d=""),j='<div class="fr-image-by-url-layer'+d+' fr-layer" id="fr-image-by-url-layer-'+b.id+'"><div class="fr-input-line"><input type="text" placeholder="http://" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2">'+b.language.translate("Insert")+"</button></div></div>");var k='<div class="fr-image-progress-bar-layer fr-layer"><h3 class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-back" data-cmd="imageDismissError" tabIndex="2">OK</button></div></div>',l={buttons:e,upload_layer:i,by_url_layer:j,progress_bar:k},m=b.popups.create("image.insert",l);return b.$wp&&b.events.$on(b.$wp,"scroll",function(){na&&b.popups.isVisible("image.insert")&&ia()}),F(m),m}function J(){if(na){var a=b.popups.get("image.alt");a.find("input").val(na.attr("alt")||"").trigger("change")}}function K(){var c=b.popups.get("image.alt");c||(c=L()),r(),b.popups.refresh("image.alt"),b.popups.setContainer("image.alt",a(b.opts.scrollableContainer));var d=na.offset().left+na.width()/2,e=na.offset().top+na.height();b.popups.show("image.alt",d,e,na.outerHeight())}function L(a){if(a)return b.popups.onRefresh("image.alt",J),!0;var c="";c='<div class="fr-buttons">'+b.button.buildList(b.opts.imageAltButtons)+"</div>";var d="";d='<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-'+b.id+'"><div class="fr-input-line"><input type="text" placeholder="'+b.language.translate("Alternate Text")+'" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2">'+b.language.translate("Update")+"</button></div></div>";var e={buttons:c,alt_layer:d},f=b.popups.create("image.alt",e);return b.$wp&&b.events.$on(b.$wp,"scroll.image-alt",function(){na&&b.popups.isVisible("image.alt")&&K()}),f}function M(a){if(na){var c=b.popups.get("image.alt");na.attr("alt",a||c.find("input").val()||""),c.find("input").blur(),setTimeout(function(){na.trigger("click").trigger("touchend")},b.helpers.isAndroid()?50:0)}}function N(){if(na){var a=b.popups.get("image.size");a.find('input[name="width"]').val(na.get(0).style.width).trigger("change"),a.find('input[name="height"]').val(na.get(0).style.height).trigger("change")}}function O(){var c=b.popups.get("image.size");c||(c=P()),r(),b.popups.refresh("image.size"),b.popups.setContainer("image.size",a(b.opts.scrollableContainer));var d=na.offset().left+na.width()/2,e=na.offset().top+na.height();b.popups.show("image.size",d,e,na.outerHeight())}function P(a){if(a)return b.popups.onRefresh("image.size",N),!0;var c="";c='<div class="fr-buttons">'+b.button.buildList(b.opts.imageSizeButtons)+"</div>";var d="";d='<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-'+b.id+'"><div class="fr-image-group"><div class="fr-input-line"><input type="text" name="width" placeholder="'+b.language.translate("Width")+'" tabIndex="1"></div><div class="fr-input-line"><input type="text" name="height" placeholder="'+b.language.translate("Height")+'" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2">'+b.language.translate("Update")+"</button></div></div>";var e={buttons:c,size_layer:d},f=b.popups.create("image.size",e);return b.$wp&&b.events.$on(b.$wp,"scroll.image-size",function(){na&&b.popups.isVisible("image.size")&&O()}),f}function Q(a,c){if(na){var d=b.popups.get("image.size");na.css("width",a||d.find('input[name="width"]').val()),na.css("height",c||d.find('input[name="height"]').val()),d.find("input").blur(),setTimeout(function(){na.trigger("click").trigger("touchend")},b.helpers.isAndroid()?50:0)}}function R(a){var c,d,e=b.popups.get("image.insert");if(na||b.opts.toolbarInline)na&&(d=na.offset().top+na.outerHeight());else{var f=b.$tb.find('.fr-command[data-cmd="insertImage"]');c=f.offset().left+f.outerWidth()/2,d=f.offset().top+(b.opts.toolbarBottom?10:f.outerHeight()-10)}!na&&b.opts.toolbarInline&&(d=e.offset().top-b.helpers.getPX(e.css("margin-top")),e.hasClass("fr-above")&&(d+=e.outerHeight())),e.find(".fr-layer").removeClass("fr-active"),e.find(".fr-"+a+"-layer").addClass("fr-active"),b.popups.show("image.insert",c,d,na?na.outerHeight():0)}function S(a){var c=b.popups.get("image.insert");c.find(".fr-image-upload-layer").hasClass("fr-active")&&a.addClass("fr-active")}function T(a){var c=b.popups.get("image.insert");c.find(".fr-image-by-url-layer").hasClass("fr-active")&&a.addClass("fr-active")}function U(){var c;b.shared.$image_resizer?(oa=b.shared.$image_resizer,qa=b.shared.$img_overlay,b.events.on("destroy",function(){oa.removeClass("fr-active").appendTo(a("body"))},!0)):(b.shared.$image_resizer=a('<div class="fr-image-resizer"></div>'),oa=b.shared.$image_resizer,b.events.$on(oa,"mousedown",function(a){a.stopPropagation()},!0),b.opts.imageResize&&(oa.append(k("nw")+k("ne")+k("sw")+k("se")),b.shared.$img_overlay=a('<div class="fr-image-overlay"></div>'),qa=b.shared.$img_overlay,c=oa.get(0).ownerDocument,a(c).find("body").append(qa))),b.events.on("shared.destroy",function(){oa.html("").removeData().remove(),b.opts.imageResize&&qa.remove()},!0),b.helpers.isMobile()||b.events.$on(a(b.o_win),"resize.image",function(){_(!0)}),b.opts.imageResize&&(c=oa.get(0).ownerDocument,b.events.$on(oa,b._mousedown,".fr-handler",l),b.events.$on(a(c),b._mousemove,m),b.events.$on(a(c.defaultView||c.parentWindow),b._mouseup,n),b.events.$on(qa,"mouseleave",n))}function V(c){c=c||na,c&&b.events.trigger("image.beforeRemove",[c])!==!1&&(b.popups.hideAll(),_(!0),c.get(0)==b.$el.get(0)?c.removeAttr("src"):("A"==c.get(0).parentNode.tagName?(b.selection.setBefore(c.get(0).parentNode)||b.selection.setAfter(c.get(0).parentNode),a(c.get(0).parentNode).remove()):(b.selection.setBefore(c.get(0))||b.selection.setAfter(c.get(0)),c.remove()),b.selection.restore(),b.html.fillEmptyBlocks()),b.undo.saveStep())}function W(){H(),"IMG"==b.$el.get(0).tagName&&b.$el.addClass("fr-view"),b.events.$on(b.$el,b.helpers.isMobile()&&!b.helpers.isWindowsPhone()?"touchend":"click","IMG"==b.$el.get(0).tagName?null:"img",$),b.helpers.isMobile()&&(b.events.$on(b.$el,"touchstart","IMG"==b.$el.get(0).tagName?null:"img",function(){Ba=!1}),b.events.$on(b.$el,"touchmove",function(){Ba=!0})),b.events.on("window.keydown",function(c){var d=c.which;return!na||d!=a.FE.KEYCODE.BACKSPACE&&d!=a.FE.KEYCODE.DELETE?na&&d==a.FE.KEYCODE.ESC?(_(!0),c.preventDefault(),!1):na&&!b.keys.ctrlKey(c)?(c.preventDefault(),!1):void 0:(c.preventDefault(),V(),!1)},!0),b.events.$on(a(b.o_win),"keydown",function(b){var c=b.which;return na&&c==a.FE.KEYCODE.BACKSPACE?(b.preventDefault(),!1):void 0}),b.events.on("paste.before",Y),b.events.on("paste.beforeCleanup",Z),b.events.on("paste.after",X),b.events.on("html.set",h),h(),b.events.on("html.get",function(a){return a=a.replace(/<(img)((?:[\w\W]*?))class="([\w\W]*?)(fr-uploading|fr-error)([\w\W]*?)"((?:[\w\W]*?))>/g,"")}),b.opts.iframe&&b.events.on("image.loaded",b.size.syncIframe),b.$wp&&(i(),b.events.on("contentChanged",i)),b.events.$on(a(b.o_win),"orientationchange.image."+b.id,function(){setTimeout(function(){var a=la();a&&a.trigger("click").trigger("touchend")},0)}),p(!0),I(!0),P(!0),L(!0),b.events.on("node.remove",function(a){return"IMG"==a.get(0).tagName?(V(a),!1):void 0})}function X(){b.opts.imagePaste?b.$el.find("img[data-fr-image-pasted]").each(function(c,d){if(0===d.src.indexOf("data:")){if(b.events.trigger("image.beforePasteUpload",[d])===!1)return!1;var f=b.opts.imageDefaultWidth||"auto";"auto"!=f&&(f+=b.opts.imageResizeWithPercent?"%":"px"),a(d).css("width",f),a(d).addClass("fr-dib"),na=a(d),j(),e(),ia(),q(),b.edit.off();for(var g=atob(a(d).attr("src").split(",")[1]),h=[],i=0;i<g.length;i++)h.push(g.charCodeAt(i));var k=new Blob([new Uint8Array(h)],{type:"image/jpeg"});E([k]),a(d).removeAttr("data-fr-image-pasted")}else 0!==d.src.indexOf("http")?(b.selection.save(),a(d).remove(),b.selection.restore()):a(d).removeAttr("data-fr-image-pasted")}):b.$el.find("img[data-fr-image-pasted]").remove()}function Y(a){if(a&&a.clipboardData&&a.clipboardData.items&&a.clipboardData.items[0]){var c=a.clipboardData.items[0].getAsFile();if(c){var d=new FileReader;return d.onload=function(a){var c=a.target.result,d=b.opts.imageDefaultWidth||"auto";d&&"auto"!=d&&(""+d).indexOf("px")<0&&(""+d).indexOf("%")<0&&(d+="px"),b.html.insert('<img data-fr-image-pasted="true" class="fr-di'+b.opts.imageDefaultDisplay[0]+("center"!=b.opts.imageDefaultAlign?" fr-fi"+b.opts.imageDefaultAlign[0]:"")+'" src="'+c+'"'+(d?' style="width: '+d+';"':"")+">"),b.events.trigger("paste.after")},d.readAsDataURL(c),!1}}}function Z(a){return a=a.replace(/<img /gi,'<img data-fr-image-pasted="true" ')}function $(c){if(c&&"touchend"==c.type&&Ba)return!0;if(b.edit.isDisabled())return c.stopPropagation(),c.preventDefault(),!1;for(var d=0;d<a.FE.INSTANCES.length;d++)a.FE.INSTANCES[d]!=b&&a.FE.INSTANCES[d].events.trigger("image.hideResizer");b.toolbar.disable(),c.stopPropagation(),c.preventDefault(),b.helpers.isMobile()&&(b.events.disableBlur(),b.$el.blur(),b.events.enableBlur()),b.opts.iframe&&b.size.syncIframe(),na=a(this),ja(),j(),e(),b.selection.clear(),b.button.bulkRefresh(),b.events.trigger("video.hideResizer"),b.helpers.isIOS()&&setTimeout(e,100)}function _(a){na&&(ca()||a===!0)&&(b.toolbar.enable(),oa.removeClass("fr-active"),b.popups.hide("image.edit"),na=null,ba())}function aa(){Ca=!0}function ba(){Ca=!1}function ca(){return Ca}function da(a){na.removeClass("fr-fir fr-fil"),"left"==a?na.addClass("fr-fil"):"right"==a&&na.addClass("fr-fir"),j(),e()}function ea(a){na&&(na.hasClass("fr-fil")?a.find("> *:first").replaceWith(b.icon.create("align-left")):na.hasClass("fr-fir")?a.find("> *:first").replaceWith(b.icon.create("align-right")):a.find("> *:first").replaceWith(b.icon.create("align-justify")))}function fa(a,b){if(na){var c="justify";na.hasClass("fr-fil")?c="left":na.hasClass("fr-fir")&&(c="right"),b.find('.fr-command[data-param1="'+c+'"]').addClass("fr-active")}}function ga(a){na.removeClass("fr-dii fr-dib"),"inline"==a?na.addClass("fr-dii"):"block"==a&&na.addClass("fr-dib"),j(),e()}function ha(a,b){var c="block";na.hasClass("fr-dii")&&(c="inline"),b.find('.fr-command[data-param1="'+c+'"]').addClass("fr-active")}function ia(){var c=b.popups.get("image.insert");c||(c=I()),b.popups.isVisible("image.insert")||(r(),b.popups.refresh("image.insert"),b.popups.setContainer("image.insert",a(b.opts.scrollableContainer)));var d=na.offset().left+na.width()/2,e=na.offset().top+na.height();b.popups.show("image.insert",d,e,na.outerHeight())}function ja(){if(na){b.selection.clear();var a=b.doc.createRange();a.selectNode(na.get(0));var c=b.selection.get();c.addRange(a)}}function ka(){na?na.trigger("click").trigger("touchend"):(b.events.disableBlur(),b.selection.restore(),b.events.enableBlur(),b.popups.hide("image.insert"),b.toolbar.showInline())}function la(){return na}function ma(a){if(!na)return!1;if(!b.opts.imageMultipleStyles){var c=Object.keys(b.opts.imageStyles);c.splice(c.indexOf(a),1),na.removeClass(c.join(" "))}na.toggleClass(a),na.trigger("click").trigger("touchend")}var na,oa,pa,qa,ra=!1,sa=1,ta=2,ua=3,va=4,wa=5,xa=6,ya=7,za={};za[sa]="Image cannot be loaded from the passed link.",za[ta]="No link in upload response.",za[ua]="Error during file upload.",za[va]="Parsing response failed.",za[wa]="File is too large.",za[xa]="Image file type is invalid.",za[ya]="Files can be uploaded only to same domain in IE 8 and IE 9.";var Aa,Ba,Ca=!1;return{_init:W,showInsertPopup:d,showLayer:R,refreshUploadButton:S,refreshByURLButton:T,upload:E,insertByURL:u,align:da,refreshAlign:ea,refreshAlignOnShow:fa,display:ga,refreshDisplayOnShow:ha,replace:ia,back:ka,get:la,insert:w,showProgressBar:q,remove:V,hideProgressBar:r,applyStyle:ma,showAltPopup:K,showSizePopup:O,setAlt:M,setSize:Q,exitEdit:_}},a.FE.DefineIcon("insertImage",{NAME:"image"}),a.FE.RegisterShortcut(80,"insertImage"),a.FE.RegisterCommand("insertImage",{title:"Insert Image",undo:!1,focus:!0,refershAfterCallback:!1,popup:!0,callback:function(){this.popups.isVisible("image.insert")?(this.$el.find(".fr-marker")&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("image.insert")):this.image.showInsertPopup()},plugin:"image"}),a.FE.DefineIcon("imageUpload",{NAME:"upload"}),a.FE.RegisterCommand("imageUpload",{title:"Upload Image",undo:!1,focus:!1,callback:function(){this.image.showLayer("image-upload")},refresh:function(a){this.image.refreshUploadButton(a)}}),a.FE.DefineIcon("imageByURL",{NAME:"link"}),a.FE.RegisterCommand("imageByURL",{title:"By URL",undo:!1,focus:!1,callback:function(){this.image.showLayer("image-by-url")},refresh:function(a){this.image.refreshByURLButton(a)}}),a.FE.RegisterCommand("imageInsertByURL",{title:"Insert Image",undo:!0,refreshAfterCallback:!1,callback:function(){this.image.insertByURL()},refresh:function(a){var b=this.image.get();b?a.text("Replace"):a.text(this.language.translate("Insert"))}}),a.FE.DefineIcon("imageDisplay",{NAME:"star"}),a.FE.RegisterCommand("imageDisplay",{title:"Display",type:"dropdown",options:{inline:"Inline",block:"Break Text"},callback:function(a,b){this.image.display(b)},refresh:function(a){this.opts.imageTextNear||a.addClass("fr-hidden")},refreshOnShow:function(a,b){this.image.refreshDisplayOnShow(a,b)}}),a.FE.DefineIcon("imageAlign",{NAME:"align-center"}),a.FE.RegisterCommand("imageAlign",{type:"dropdown",title:"Align",options:{left:"Align Left",justify:"None",right:"Align Right"},html:function(){var b='<ul class="fr-dropdown-list">',c=a.FE.COMMANDS.imageAlign.options;for(var d in c)b+='<li><a class="fr-command fr-title" data-cmd="imageAlign" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.icon.create("align-"+d)+"</a></li>";return b+="</ul>"},callback:function(a,b){this.image.align(b)},refresh:function(a){this.image.refreshAlign(a)},refreshOnShow:function(a,b){this.image.refreshAlignOnShow(a,b)}}),a.FE.DefineIcon("imageReplace",{NAME:"exchange"}),a.FE.RegisterCommand("imageReplace",{title:"Replace",undo:!1,focus:!1,refreshAfterCallback:!1,callback:function(){this.image.replace()}}),a.FE.DefineIcon("imageRemove",{NAME:"trash"}),a.FE.RegisterCommand("imageRemove",{title:"Remove",callback:function(){this.image.remove()}}),a.FE.DefineIcon("imageBack",{NAME:"arrow-left"}),a.FE.RegisterCommand("imageBack",{title:"Back",undo:!1,focus:!1,back:!0,callback:function(){this.image.back()},refresh:function(a){var b=this.image.get();b||this.opts.toolbarInline?(a.removeClass("fr-hidden"),a.next(".fr-separator").removeClass("fr-hidden")):(a.addClass("fr-hidden"),a.next(".fr-separator").addClass("fr-hidden"))}}),a.FE.RegisterCommand("imageDismissError",{title:"OK",undo:!1,callback:function(){this.image.hideProgressBar(!0)}}),a.FE.DefineIcon("imageStyle",{NAME:"magic"}),a.FE.RegisterCommand("imageStyle",{title:"Style",type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list">',b=this.opts.imageStyles;for(var c in b)a+='<li><a class="fr-command" data-cmd="imageStyle" data-param1="'+c+'">'+this.language.translate(b[c])+"</a></li>";return a+="</ul>"},callback:function(a,b){this.image.applyStyle(b)},refreshOnShow:function(b,c){var d=this.image.get();d&&c.find(".fr-command").each(function(){var b=a(this).data("param1");a(this).toggleClass("fr-active",d.hasClass(b))})}}),a.FE.DefineIcon("imageAlt",{NAME:"info"}),a.FE.RegisterCommand("imageAlt",{undo:!1,focus:!1,title:"Alternate Text",callback:function(){this.image.showAltPopup()}}),a.FE.RegisterCommand("imageSetAlt",{undo:!0,focus:!1,title:"Update",refreshAfterCallback:!1,callback:function(){this.image.setAlt()}}),a.FE.DefineIcon("imageSize",{NAME:"arrows-alt"}),a.FE.RegisterCommand("imageSize",{undo:!1,focus:!1,title:"Change Size",callback:function(){this.image.showSizePopup()}}),a.FE.RegisterCommand("imageSetSize",{undo:!0,focus:!1,callback:function(){this.image.setSize()}})});