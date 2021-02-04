<template>
  <div>
    <div class="panel">
      <div class="panel-header">
        <h1 class="title">{{ title }}</h1>
        <div v-if="hasSearch">
          <slot name="search-contacts" />
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <slot name="register-form" />
            <slot name="add-contact-form" />
            <slot name="contacts-list" />
            <slot name="edit-contact-form" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'hasSearch'],
}
</script>
