<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    option: {
      type: [Object, Array],
      default: () => {}
    },
    data: {
      type: [Object, Array],
      default: () => {}
    }
  },
  mounted () {
    setTimeout(() => {
      this.renderChart({
        labels: this.data.labels,
        datasets: this.data.dataset
      }, {responsive: true, maintainAspectRatio: false})
    }, 500)
  }
}
</script>
