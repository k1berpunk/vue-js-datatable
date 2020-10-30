# vue-js-datatable
[![npm version](https://badge.fury.io/js/%40parthfaladu%2Fvue-js-datatable.svg)](https://badge.fury.io/js/%40parthfaladu%2Fvue-js-datatable)

`vue-js-datatable` is wrapper vue package of `datatables.net`

## Installation
```
npm install --save @parthfaladu/vue-js-datatable
```
Or using yarn
```
yarn add @parthfaladu/vue-js-datatable -dev
```

For Installing plugin import `vue-js-datatable` in your component page.

```js
//foo.vue
import VueJsDatatable from "@parthfaladu/vue-js-datatable";
export default {
  components: {
    VueJsDatatable,
  },
}
```

### Note

Please note that this package depends on `jQuery` and `jquery.dataTables.js`, but you won't need to add it to your project manually, `vue-js-datatable` will handle this for you automatically if this dependencies are not detected.


### CSS
For styling of the table import datatable css file.


## Basic Usage

You can pass an array of fullclendar objects through the props

```html
<VueJsDatatable :url="url" type="post" :columns="columns" @gaction="onAction">
    <th>ID</th>
    <th>name</th>
    <th>City</th>
    <th>Action</th>
</VueJsDatatable>
...
<script>
import VueJsDatatable from '@parthfaladu/vue-js-datatable';
...
  components: {
	VueJsDatatable,
  },
  data() {
    return {
        columns: [
          {data:'id', name:'id' , width:"100px"},
          {data:'name', name:'name' , width:"300px"},
          {data:'city', name:'city' , width:"200px"},
          {data:(data) => {
		return "<button class='btn btn-outline-alternate' data-g-action='view' data-g-actiondata="+data.id+">Edit</button>";
	  }, name:'action', width:"150px"}
	],
	url: 'https://example.com/api/v1/get/user'
    }
  },
  ...
  methods: {
    onAction(action) {
	if(action.action === 'view') {
		console.log('view button click.');
	}
    }
  }
...
</script>
```
### Props

| Name                  | Type       | Default        | Description                                                                                                                 |
| --------------------- | ---------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| columns               | `Array`    | []             | Table all columns                                                                                                       |
| url                   | `String`   | null           | Ajax request url
| type                  | `String`   | 'GET'          | Ajax request type
| searching             | `Boolean`  | true           | Feature control search (filtering) abilities
| lengthChange          | `Boolean`  | true           | Feature control the end user's ability to change the paging display length of the table
| paging                | `Boolean`  | true           | Enable or disable table pagination
| ordering              | `Boolean`  | true           | Feature control ordering (sorting) abilities in DataTables
| className             | `String`   | ''             | Table class names
| serverSide            | `Boolean`  | true           | Feature control DataTables' server-side processing mode
| headers               | `Object`   | {}             | Ajax request headers
| order                 | `Array`    | []             | Initial order (sort) to apply to the table
| dom                   | `String`   | 'lfrtip'       | Set layout for table, pagination, info, etc. [docs](https://datatables.net/reference/option/dom)
| language              | `Object`   | null           | Set own titles, placeholders, etc. [docs](https://datatables.net/reference/option/language)
| autocomplete          | `Boolean`  | false          | This feature can disable (false) or keep enabled (true) default browser autocomplete feature on table's filter field
| data                  | `Object`   | {}             | Ajax request additional data, can be used for custom filter feature [docs](https://datatables.net/reference/option/ajax.data)


### Events

| Name     | Description               |
| -------- | -------------------------------------------------------------------------------------------------- |
| gaction  |  In button define `data-g-action='view'` attribute and on button click this event will be emitted  |

### API

You can force the table to fetch data from server:
```html
<VueJsDatatable :url="url" type="post" :columns="columns" @gaction="onAction" ref="myTable">
    <th>ID</th>
    <th>name</th>
    <th>City</th>
</VueJsDatatable>
<button type="button" @click="updateTable">Fetch new data</button>
...
<script>
import VueJsDatatable from '@parthfaladu/vue-js-datatable';
...
  components: {
	VueJsDatatable,
  },
  data() {
    return {
        columns: [
          {data:'id', name:'id' , width:"100px"},
          {data:'name', name:'name' , width:"300px"},
          {data:'city', name:'city' , width:"200px"},
	],
	url: 'https://example.com/api/v1/get/user',
    }
  },
  ...
  methods: {
    updateTable() {
        this.$refs.myTable.update();
    }
  }
...
</script>
```