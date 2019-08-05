<template>
  <section>
    Repl is not available today
    <!-- <div v-if="Object.keys(data.parameters).length > 0">
      <div class="row">
        <div class="col-4">
          <b-form>
            <b-form-group
              v-for="(param, field) in data.parameters"
              :key="field"
            >
              <b-form-input
                v-model="formModel.field"
                :required="param.required"
                :value="param.value"
                :placeholder="field"
              />
              <b-badge>{{ param.type }}</b-badge>
            </b-form-group>
            <b-button @click="onSubmit">
              Execute
            </b-button>
          </b-form>
        </div>
        <div class="col-8">
          <div class="card">
            <div class="card-body">
              result
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      This routes doesn't have any given parameters
    </div> -->
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => ''
    }
  },
  data() {
    return {
      formModel: {},
      formType: {
        text: 'textarea',
        number: 'number',
        integer: 'number'
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('foo')
    }
  }
}
</script>
