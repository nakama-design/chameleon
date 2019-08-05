<script>
import { Line } from 'vue-chartjs'
import parse from 'dayjs'

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
        labels: this.data.labels.map(time => parse(parseInt(time) * 1).format('MM/DD HH:mm')),
        datasets: this.data.dataset
      }, {
        responsive: true,
        maintainAspectRatio: false
      })
    }, 500)
  }
}
</script>
