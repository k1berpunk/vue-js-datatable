<template>
	<table align="center" width="100%" class="table table-hover" :class="className">
		<thead>
			<tr>
				<slot></slot>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
</template>
<script>
if (typeof global.$ === "undefined") {
	global.$ = require( 'jquery' );
}
if (typeof global.jQuery === "undefined") {
	global.jQuery = require( 'jquery' );
}
import datatable from 'datatables.net';
global.$.fn.DataTable = datatable;

export default {    
	name: 'VueJsDatatable',
	props: {
		columns: {
			type: Array|null,
			default: () => []
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
			default: () => []
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
			default: () => {}
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
		}
	},
	data() {
		return {
			datatable: null,
		}
	},
	mounted() {
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
		        "beforeSend": (xhr) => {
					if(this.headers) {
						for (var key of Object.keys(this.headers)) {
							xhr.setRequestHeader(key, this.headers[key])
						}
					}
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
		            }

					that.$emit('gaction', args)
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
		reload(url) {
			this.datatable.ajax.url(url).load();
		},
		draw() {
			this.datatable.draw();
		}
	}
}
</script>
