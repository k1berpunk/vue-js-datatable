(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('datatables.net')) :
	typeof define === 'function' && define.amd ? define(['exports', 'datatables.net'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueJsDatatable = {}, global.datatable));
}(this, (function (exports, datatable) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var datatable__default = /*#__PURE__*/_interopDefaultLegacy(datatable);

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	if (typeof global.$ === "undefined") {
		global.$ = require( 'jquery' );
	}
	if (typeof global.jQuery === "undefined") {
		global.jQuery = require( 'jquery' );
	}
	if (typeof global.$.fn.DataTable === "undefined") {
	    global.$.fn.DataTable = datatable__default['default'];
	}

	var script = {
		name: 'VueJsDatatable',
		props: {
			columns: {
				type: Array|null,
				default: function () { return []; }
			},
			url: {
				type: String,
				default: null
			},
			type: {
				type: String,
				default: 'GET'
			},
			searching: {
				type: Boolean,
				default: true
			},
			lengthChange: {
				type: Boolean,
				default: true
			},
			order: {
				type: Array,
				default: function () { return []; }
			},
			className: {
				type: String,
				default: ''
			},
	        paging: {
	            type: Boolean,
	            default: true
	        },
	        ordering: {
	            type: Boolean,
	            default: true
	        },
	        serverSide: {
	            type: Boolean,
	            default: true
			},
			headers: {
				type: Object,
				default: function () {}
			},
			dom: {
				type: String,
				default: "lfrtip"
			},
			language: {
				type: Object,
				default: null
			},
			autocomplete: {
				type: Boolean,
				default: false
			},
			data: {
				type: Object,
				default: function () {}
			}
		},
		data: function data() {
			return {
				datatable: null,
			}
		},
		mounted: function mounted() {
			var this$1 = this;

			var that = this;
			this.datatable = $(this.$el).DataTable({
			    "paging": this.paging,
			    "lengthChange": this.lengthChange,
			    "searching": this.searching,
			    "ordering": this.ordering,
			    "info": true,
			    "responsive": true,
			    "processing": true,
				"serverSide": this.serverSide,
				"order": this.order,
			    ajax: {
			        'url': this.url,
			        'type' : this.type,
			        "beforeSend": function (xhr) {
						if(this$1.headers) {
							for (var key of Object.keys(this$1.headers)) {
								xhr.setRequestHeader(key, this$1.headers[key]);
							}
						}
			         },
	                "data": function (tableData) {
	                    return Object.assign(tableData, this$1.data);
	                }
			    },
		      	"columns": this.columns,
		      	"drawCallback":function(setting){
			        $('td [data-g-action]').click(function(e){
			            e.preventDefault();

			            var action = $(this).attr('data-g-action');

			            var actionData = $(this).attr('data-g-actiondata');

			            var args = {
			            	action: action,
			            	data: actionData
			            };

						that.$emit('gaction', args);
			        });
			    },
	            "dom": this.dom,
	            "language": this.language,
	            "initComplete": this.autocomplete ? function () {} : function () {
			        // That's not good solution but it's better than nothing
	                // Without this string you can get login entered in filter field and table starts filtering itself
	                // With this string autocomplete still works but the filter field is empty and table is not filtered
	                $('div.dataTables_filter input').prop('autocomplete', 'off').val('').parent().wrap('<form autocomplete="off" onsubmit="return false">');
	            }
		    });
		},
		methods: {
			reload: function reload(url) {
				this.datatable.ajax.url(url).load();
			},
			update: function update() {
				this.datatable.ajax.reload();
			},
			draw: function draw() {
				this.datatable.draw();
			}
		}
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	    if (typeof shadowMode !== 'boolean') {
	        createInjectorSSR = createInjector;
	        createInjector = shadowMode;
	        shadowMode = false;
	    }
	    // Vue.extend constructor export interop.
	    var options = typeof script === 'function' ? script.options : script;
	    // render functions
	    if (template && template.render) {
	        options.render = template.render;
	        options.staticRenderFns = template.staticRenderFns;
	        options._compiled = true;
	        // functional template
	        if (isFunctionalTemplate) {
	            options.functional = true;
	        }
	    }
	    // scopedId
	    if (scopeId) {
	        options._scopeId = scopeId;
	    }
	    var hook;
	    if (moduleIdentifier) {
	        // server build
	        hook = function (context) {
	            // 2.3 injection
	            context =
	                context || // cached call
	                    (this.$vnode && this.$vnode.ssrContext) || // stateful
	                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	            // 2.2 with runInNewContext: true
	            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	                context = __VUE_SSR_CONTEXT__;
	            }
	            // inject component styles
	            if (style) {
	                style.call(this, createInjectorSSR(context));
	            }
	            // register component module identifier for async chunk inference
	            if (context && context._registeredComponents) {
	                context._registeredComponents.add(moduleIdentifier);
	            }
	        };
	        // used by ssr in case component is cached and beforeCreate
	        // never gets called
	        options._ssrRegister = hook;
	    }
	    else if (style) {
	        hook = shadowMode
	            ? function (context) {
	                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	            }
	            : function (context) {
	                style.call(this, createInjector(context));
	            };
	    }
	    if (hook) {
	        if (options.functional) {
	            // register for functional component in vue file
	            var originalRender = options.render;
	            options.render = function renderWithStyleInjection(h, context) {
	                hook.call(context);
	                return originalRender(h, context);
	            };
	        }
	        else {
	            // inject component registration as beforeCreate hook
	            var existing = options.beforeCreate;
	            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	    }
	    return script;
	}

	/* script */
	var __vue_script__ = script;

	/* template */
	var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"table table-hover",class:_vm.className,attrs:{"align":"center","width":"100%"}},[_c('thead',[_c('tr',[_vm._t("default")],2)]),_vm._v(" "),_c('tbody')])};
	var __vue_staticRenderFns__ = [];

	  /* style */
	  var __vue_inject_styles__ = undefined;
	  /* scoped */
	  var __vue_scope_id__ = undefined;
	  /* module identifier */
	  var __vue_module_identifier__ = undefined;
	  /* functional template */
	  var __vue_is_functional_template__ = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  var __vue_component__ = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	function install(Vue) {
	  if (install.installed) { return; }
	  install.installed = true;
	  Vue.component("VueJsDatatable", __vue_component__);
	}

	var plugin = {
	  install: install
	};

	var GlobalVue = null;
	if (typeof window !== "undefined") {
	  GlobalVue = window.Vue;
	} else if (typeof global !== "undefined") {
	  GlobalVue = global.vue;
	}

	if (GlobalVue) {
	  GlobalVue.use(plugin);
	}

	__vue_component__.install = install;

	exports.default = __vue_component__;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
